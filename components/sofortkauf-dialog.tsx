'use client'

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Paperclip,
  ShieldAlert,
  X,
} from 'lucide-react'
import React, { useCallback, useEffect, useId, useRef, useState, useTransition } from 'react'
import { createPortal } from 'react-dom'

import {
  dokumentSlotsFuer,
  ERLAUBTE_DOKUMENT_TYPEN,
  kaeuferdatenSchema,
  MAX_DOKUMENT_GROESSE_BYTES,
  MAX_GESAMT_DOKUMENT_GROESSE_BYTES,
  ZIEL_BILD_GROESSE_BYTES,
  type DokumentSlot,
  type KaeuferTyp,
  type SofortkaufErgebnis,
} from '@/lib/sofortkauf/schema'

const MAX_DOKUMENT_GROESSE_MB = Math.round(MAX_DOKUMENT_GROESSE_BYTES / (1024 * 1024))
const MAX_GESAMT_DOKUMENT_GROESSE_MB = (
  MAX_GESAMT_DOKUMENT_GROESSE_BYTES /
  (1024 * 1024)
).toLocaleString('de-DE', { maximumFractionDigits: 1 })
const DATEI_ACCEPT_ATTRIBUT = ERLAUBTE_DOKUMENT_TYPEN.join(',')

async function optimiereBilddatei(datei: File): Promise<File> {
  if (!['image/jpeg', 'image/png'].includes(datei.type) || datei.size <= ZIEL_BILD_GROESSE_BYTES) {
    return datei
  }

  let bild: ImageBitmap
  try {
    bild = await createImageBitmap(datei)
  } catch {
    return datei
  }

  try {
    let faktor = Math.min(1, 2048 / Math.max(bild.width, bild.height))
    let qualitaet = 0.86
    let ergebnis: Blob | null = null

    for (let versuch = 0; versuch < 6; versuch += 1) {
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(bild.width * faktor))
      canvas.height = Math.max(1, Math.round(bild.height * faktor))

      const kontext = canvas.getContext('2d')
      if (!kontext) return datei

      kontext.drawImage(bild, 0, 0, canvas.width, canvas.height)
      ergebnis = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', qualitaet)
      })

      if (!ergebnis || ergebnis.size <= ZIEL_BILD_GROESSE_BYTES) break

      qualitaet = Math.max(0.58, qualitaet - 0.08)
      faktor *= 0.88
    }

    if (!ergebnis || ergebnis.size >= datei.size) return datei

    const basisname = datei.name.replace(/\.[^.]+$/, '')
    return new File([ergebnis], `${basisname}-optimiert.jpg`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    })
  } finally {
    bild.close()
  }
}

type Props = {
  produktId: string
  produktTitel: string
  preisText: string
  standort?: string | null
}

type Formwerte = {
  vorname: string
  nachname: string
  email: string
  telefon: string
  strasse: string
  hausnummer: string
  plz: string
  ort: string
  land: string
  firma: string
  firmenname: string
  handelsregisternummer: string
  ustIdNr: string
  nachricht: string
}

const LEERE_FORMWERTE: Formwerte = {
  vorname: '',
  nachname: '',
  email: '',
  telefon: '',
  strasse: '',
  hausnummer: '',
  plz: '',
  ort: '',
  land: 'Deutschland',
  firma: '',
  firmenname: '',
  handelsregisternummer: '',
  ustIdNr: '',
  nachricht: '',
}

const eingabeKlasse =
  'min-h-12 w-full border border-border bg-background px-3.5 py-2.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent sm:text-sm'

const labelKlasse = 'text-xs font-medium uppercase tracking-[0.14em] text-foreground'

function Feld({
  id,
  label,
  required,
  fehler,
  children,
}: {
  id: string
  label: string
  required?: boolean
  fehler?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelKlasse}>
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
      {fehler && <p className="text-xs text-accent">{fehler}</p>}
    </div>
  )
}

export function SofortkaufDialog({ produktId, produktTitel, preisText, standort }: Props) {
  const idBasis = useId()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [kaeuferTyp, setKaeuferTyp] = useState<KaeuferTyp>('privatperson')
  const [werte, setWerte] = useState<Formwerte>(LEERE_FORMWERTE)
  const [dateien, setDateien] = useState<Record<string, File | null>>({})
  const [dateienWerdenVerarbeitet, setDateienWerdenVerarbeitet] = useState<Record<string, boolean>>({})
  const [feldFehler, setFeldFehler] = useState<Record<string, string>>({})
  const [serverFehler, setServerFehler] = useState<string | null>(null)
  const [bestaetigtRichtig, setBestaetigtRichtig] = useState(false)
  const [bestaetigtUebermittlung, setBestaetigtUebermittlung] = useState(false)
  const [erfolgId, setErfolgId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const dialogRef = useRef<HTMLDivElement>(null)

  const slots: DokumentSlot[] = dokumentSlotsFuer(kaeuferTyp)

  const zuruecksetzen = useCallback(() => {
    setStep(1)
    setKaeuferTyp('privatperson')
    setWerte(LEERE_FORMWERTE)
    setDateien({})
    setDateienWerdenVerarbeitet({})
    setFeldFehler({})
    setServerFehler(null)
    setBestaetigtRichtig(false)
    setBestaetigtUebermittlung(false)
    setErfolgId(null)
  }, [])

  const schliessen = useCallback(() => {
    setOpen(false)
    // Kurze Verzögerung, damit ein eventuell laufender Übergang nicht abrupt springt.
    setTimeout(zuruecksetzen, 200)
  }, [zuruecksetzen])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') schliessen()
    }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [open, schliessen])

  function feldAendern<K extends keyof Formwerte>(feld: K, wert: string) {
    setWerte((prev) => ({ ...prev, [feld]: wert }))
  }

  async function dateiAuswaehlen(slotKey: string, datei: File | null) {
    setFeldFehler((prev) => {
      const naechste = { ...prev }
      delete naechste[slotKey]
      delete naechste._gesamt
      return naechste
    })

    if (!datei) {
      setDateien((prev) => ({ ...prev, [slotKey]: null }))
      return
    }

    setDateienWerdenVerarbeitet((prev) => ({ ...prev, [slotKey]: true }))
    try {
      const optimiert = await optimiereBilddatei(datei)

      if (!ERLAUBTE_DOKUMENT_TYPEN.includes(optimiert.type)) {
        setDateien((prev) => ({ ...prev, [slotKey]: null }))
        setFeldFehler((prev) => ({
          ...prev,
          [slotKey]: 'Erlaubt sind JPG, JPEG, PNG und PDF.',
        }))
        return
      }

      if (optimiert.size > MAX_DOKUMENT_GROESSE_BYTES) {
        setDateien((prev) => ({ ...prev, [slotKey]: null }))
        setFeldFehler((prev) => ({
          ...prev,
          [slotKey]: `Die Datei ist auch nach der Optimierung größer als ${MAX_DOKUMENT_GROESSE_MB} MB. Bitte verwenden Sie eine kleinere Datei.`,
        }))
        return
      }

      setDateien((prev) => ({ ...prev, [slotKey]: optimiert }))
    } catch (error) {
      console.error('[v0] Dokument konnte nicht vorbereitet werden:', error)
      setDateien((prev) => ({ ...prev, [slotKey]: null }))
      setFeldFehler((prev) => ({
        ...prev,
        [slotKey]: 'Das Foto konnte nicht verarbeitet werden. Bitte verwenden Sie ein JPG, PNG oder PDF.',
      }))
    } finally {
      setDateienWerdenVerarbeitet((prev) => ({ ...prev, [slotKey]: false }))
    }
  }

  function schritt1Validieren(): boolean {
    const ergebnis = kaeuferdatenSchema.safeParse({
      kaeuferTyp,
      ...werte,
    })
    if (ergebnis.success) {
      setFeldFehler({})
      return true
    }
    const fehler: Record<string, string> = {}
    for (const issue of ergebnis.error.issues) {
      const pfad = issue.path.join('.')
      if (pfad && !fehler[pfad]) fehler[pfad] = issue.message
    }
    setFeldFehler(fehler)
    return false
  }

  function schritt2Validieren(): boolean {
    const fehler: Record<string, string> = {}
    let gesamtgroesse = 0

    if (Object.values(dateienWerdenVerarbeitet).some(Boolean)) {
      fehler._gesamt = 'Bitte warten Sie, bis alle Fotos vorbereitet wurden.'
    }

    for (const slot of slots) {
      const datei = dateien[slot.key]
      if (!datei) {
        fehler[slot.key] = 'Bitte laden Sie dieses Dokument hoch.'
      } else if (datei.size > MAX_DOKUMENT_GROESSE_BYTES) {
        fehler[slot.key] = `Die Datei darf maximal ${MAX_DOKUMENT_GROESSE_MB} MB groß sein.`
      } else if (!ERLAUBTE_DOKUMENT_TYPEN.includes(datei.type)) {
        fehler[slot.key] = 'Erlaubt sind JPG, JPEG, PNG und PDF.'
      } else {
        gesamtgroesse += datei.size
      }
    }

    if (gesamtgroesse > MAX_GESAMT_DOKUMENT_GROESSE_BYTES) {
      fehler._gesamt = `Alle Dateien zusammen dürfen maximal ${MAX_GESAMT_DOKUMENT_GROESSE_MB} MB groß sein. Bitte ersetzen Sie eine Datei durch eine kleinere Version.`
    }

    setFeldFehler(fehler)
    return Object.keys(fehler).length === 0
  }

  function weiter() {
    if (step === 1 && schritt1Validieren()) setStep(2)
    else if (step === 2 && schritt2Validieren()) setStep(3)
  }

  function zurueck() {
    setServerFehler(null)
    setStep((s) => (s === 3 ? 2 : 1))
  }

  function absenden() {
    setServerFehler(null)
    if (!bestaetigtRichtig || !bestaetigtUebermittlung) {
      setServerFehler('Bitte bestätigen Sie beide Checkboxen, bevor Sie die Kaufanfrage absenden.')
      return
    }

    const formData = new FormData()
    formData.set('produktId', produktId)
    formData.set('kaeuferTyp', kaeuferTyp)
    for (const [key, value] of Object.entries(werte)) {
      formData.set(key, value)
    }
    formData.set('bestaetigungRichtigkeit', bestaetigtRichtig ? 'on' : 'off')
    formData.set('bestaetigungUebermittlung', bestaetigtUebermittlung ? 'on' : 'off')
    for (const slot of slots) {
      const datei = dateien[slot.key]
      if (datei) formData.set(slot.key, datei)
    }

    startTransition(async () => {
      try {
        const antwort = await fetch('/api/sofortkauf', {
          method: 'POST',
          body: formData,
        })

        const istJson = antwort.headers.get('content-type')?.includes('application/json')
        const ergebnis = istJson ? ((await antwort.json()) as SofortkaufErgebnis) : null

        if (!antwort.ok) {
          if (antwort.status === 413) {
            setServerFehler(
              `Die ausgewählten Dateien sind insgesamt zu groß. Bitte verwenden Sie Dateien mit zusammen höchstens ${MAX_GESAMT_DOKUMENT_GROESSE_MB} MB.`,
            )
          } else {
            setServerFehler(
              ergebnis && !ergebnis.erfolg
                ? ergebnis.fehler
                : 'Die Kaufanfrage konnte technisch nicht verarbeitet werden. Bitte versuchen Sie es erneut.',
            )
          }
          if (ergebnis && !ergebnis.erfolg && ergebnis.feldFehler) {
            setFeldFehler(ergebnis.feldFehler)
          }
          return
        }

        if (!ergebnis) {
          setServerFehler(
            'Der Server hat keine gültige Antwort gesendet. Bitte versuchen Sie es erneut.',
          )
        } else if (ergebnis.erfolg) {
          setErfolgId(ergebnis.kaufanfrageId)
        } else {
          setServerFehler(ergebnis.fehler)
          if (ergebnis.feldFehler) setFeldFehler(ergebnis.feldFehler)
        }
      } catch (error) {
        console.error('[v0] Kaufanfrage konnte nicht übermittelt werden:', error)
        setServerFehler(
          'Ihre Kaufanfrage konnte nicht übermittelt werden. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
        )
      }
    })
  }

  const vollerName = `${werte.vorname} ${werte.nachname}`.trim()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
      >
        Sofort kaufen
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/55 backdrop-blur-[2px] sm:items-center sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) schliessen()
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${idBasis}-titel`}
            className="flex h-[100dvh] max-h-[100dvh] w-full max-w-3xl flex-col overflow-hidden border border-border bg-card shadow-xl sm:h-auto sm:max-h-[88dvh]"
          >
            {/* Kopfzeile */}
            <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  Sofortkauf anfragen
                </p>
                <h2 id={`${idBasis}-titel`} className="mt-1 line-clamp-2 font-serif text-xl leading-snug text-card-foreground">
                  {produktTitel}
                </h2>
                {!erfolgId && (
                  <ol className="mt-4 grid grid-cols-3 gap-2" aria-label={`Schritt ${step} von 3`}>
                    {['Ihre Daten', 'Nachweise', 'Prüfen'].map((label, index) => {
                      const nummer = index + 1
                      return (
                        <li key={label} className="min-w-0">
                          <span className={`block h-1.5 ${nummer <= step ? 'bg-accent' : 'bg-border'}`} aria-hidden="true" />
                          <span className={`mt-1.5 block truncate text-[11px] ${nummer === step ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                            {nummer}. {label}
                          </span>
                        </li>
                      )
                    })}
                  </ol>
                )}
              </div>
              <button
                type="button"
                onClick={schliessen}
                aria-label="Dialog schließen"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Inhalt */}
            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
              {erfolgId ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center border border-accent text-accent">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="font-serif text-2xl text-card-foreground">
                    Ihre Kaufanfrage ist eingegangen
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    Vielen Dank. Wir prüfen Ihre Angaben und die eingereichten Unterlagen und melden
                    uns in Kürze bei Ihnen unter {werte.email || 'der angegebenen E-Mail-Adresse'}.
                  </p>
                  <p className="text-xs text-muted-foreground">Referenz: {erfolgId}</p>
                </div>
              ) : (
                <>
                  {step === 1 && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <p className={`${labelKlasse} mb-2`}>Käufertyp</p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                          {(
                            [
                              { value: 'privatperson', label: 'Privatperson' },
                              { value: 'unternehmen', label: 'Unternehmen / Gewerbe' },
                            ] as const
                          ).map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setKaeuferTyp(option.value)}
                              className={`min-h-12 border px-4 py-3 text-sm font-medium transition-colors ${
                                kaeuferTyp === option.value
                                  ? 'border-accent bg-accent text-accent-foreground'
                                  : 'border-border text-foreground hover:border-accent'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Feld id="vorname" label="Vorname" required fehler={feldFehler.vorname}>
                          <input
                            id="vorname"
                            className={eingabeKlasse}
                            value={werte.vorname}
                            onChange={(e) => feldAendern('vorname', e.target.value)}
                            autoComplete="given-name"
                          />
                        </Feld>
                        <Feld id="nachname" label="Nachname" required fehler={feldFehler.nachname}>
                          <input
                            id="nachname"
                            className={eingabeKlasse}
                            value={werte.nachname}
                            onChange={(e) => feldAendern('nachname', e.target.value)}
                            autoComplete="family-name"
                          />
                        </Feld>
                        <Feld id="email" label="E-Mail" required fehler={feldFehler.email}>
                          <input
                            id="email"
                            type="email"
                            className={eingabeKlasse}
                            value={werte.email}
                            onChange={(e) => feldAendern('email', e.target.value)}
                            autoComplete="email"
                          />
                        </Feld>
                        <Feld id="telefon" label="Telefon" required fehler={feldFehler.telefon}>
                          <input
                            id="telefon"
                            type="tel"
                            className={eingabeKlasse}
                            value={werte.telefon}
                            onChange={(e) => feldAendern('telefon', e.target.value)}
                            autoComplete="tel"
                          />
                        </Feld>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr]">
                        <Feld id="strasse" label="Straße" required fehler={feldFehler.strasse}>
                          <input
                            id="strasse"
                            className={eingabeKlasse}
                            value={werte.strasse}
                            onChange={(e) => feldAendern('strasse', e.target.value)}
                            autoComplete="address-line1"
                          />
                        </Feld>
                        <Feld id="hausnummer" label="Hausnummer" required fehler={feldFehler.hausnummer}>
                          <input
                            id="hausnummer"
                            className={eingabeKlasse}
                            value={werte.hausnummer}
                            onChange={(e) => feldAendern('hausnummer', e.target.value)}
                          />
                        </Feld>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1.5fr_1fr]">
                        <Feld id="plz" label="PLZ" required fehler={feldFehler.plz}>
                          <input
                            id="plz"
                            className={eingabeKlasse}
                            value={werte.plz}
                            onChange={(e) => feldAendern('plz', e.target.value)}
                            autoComplete="postal-code"
                          />
                        </Feld>
                        <Feld id="ort" label="Ort" required fehler={feldFehler.ort}>
                          <input
                            id="ort"
                            className={eingabeKlasse}
                            value={werte.ort}
                            onChange={(e) => feldAendern('ort', e.target.value)}
                            autoComplete="address-level2"
                          />
                        </Feld>
                        <Feld id="land" label="Land" required fehler={feldFehler.land}>
                          <input
                            id="land"
                            className={eingabeKlasse}
                            value={werte.land}
                            onChange={(e) => feldAendern('land', e.target.value)}
                            autoComplete="country-name"
                          />
                        </Feld>
                      </div>

                      <Feld id="firma" label="Firma (optional)" fehler={feldFehler.firma}>
                        <input
                          id="firma"
                          className={eingabeKlasse}
                          value={werte.firma}
                          onChange={(e) => feldAendern('firma', e.target.value)}
                          autoComplete="organization"
                        />
                      </Feld>

                      {kaeuferTyp === 'unternehmen' && (
                        <div className="flex flex-col gap-4 border-t border-border pt-5">
                          <Feld id="firmenname" label="Firmenname" required fehler={feldFehler.firmenname}>
                            <input
                              id="firmenname"
                              className={eingabeKlasse}
                              value={werte.firmenname}
                              onChange={(e) => feldAendern('firmenname', e.target.value)}
                            />
                          </Feld>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Feld
                              id="handelsregisternummer"
                              label="Handelsregisternummer (optional)"
                              fehler={feldFehler.handelsregisternummer}
                            >
                              <input
                                id="handelsregisternummer"
                                className={eingabeKlasse}
                                value={werte.handelsregisternummer}
                                onChange={(e) => feldAendern('handelsregisternummer', e.target.value)}
                              />
                            </Feld>
                            <Feld id="ustIdNr" label="USt-IdNr. (optional)" fehler={feldFehler.ustIdNr}>
                              <input
                                id="ustIdNr"
                                className={eingabeKlasse}
                                value={werte.ustIdNr}
                                onChange={(e) => feldAendern('ustIdNr', e.target.value)}
                              />
                            </Feld>
                          </div>
                        </div>
                      )}

                      <Feld
                        id="nachricht"
                        label="Zusätzliche Nachricht (optional)"
                        fehler={feldFehler.nachricht}
                      >
                        <textarea
                          id="nachricht"
                          className={`${eingabeKlasse} min-h-28 resize-y`}
                          value={werte.nachricht}
                          onChange={(e) => feldAendern('nachricht', e.target.value)}
                          maxLength={2000}
                          rows={4}
                          placeholder="Möchten Sie uns noch etwas zu Ihrer Kaufanfrage mitteilen?"
                        />
                        <span className="text-right text-xs text-muted-foreground">
                          {werte.nachricht.length.toLocaleString('de-DE')} / 2.000 Zeichen
                        </span>
                      </Feld>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-3 border border-border bg-muted px-4 py-3.5">
                        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <p className="text-sm leading-relaxed text-foreground">
                          Bitte laden Sie nur die für die Prüfung erforderlichen Unterlagen hoch. Nicht
                          erforderliche personenbezogene Angaben sollten – soweit rechtlich zulässig –
                          geschwärzt werden.
                        </p>
                      </div>

                      {slots.map((slot) => {
                        const datei = dateien[slot.key]
                        return (
                          <div key={slot.key} className="flex flex-col gap-2">
                            <label htmlFor={slot.key} className={labelKlasse}>
                              {slot.label} <span className="text-accent">*</span>
                            </label>
                            <div
                              className={`flex flex-col items-stretch gap-3 border px-4 py-3 text-sm transition-colors sm:flex-row sm:items-center sm:justify-between ${
                                feldFehler[slot.key] ? 'border-accent' : 'border-border'
                              }`}
                            >
                              <span className="flex items-center gap-2 truncate text-foreground">
                                <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <span className="truncate">
                                  {dateienWerdenVerarbeitet[slot.key]
                                    ? 'Foto wird optimiert …'
                                    : datei
                                      ? datei.name
                                      : 'Keine Datei ausgewählt'}
                                </span>
                              </span>
                              <label
                                htmlFor={slot.key}
                                className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center border border-border px-3 py-2 text-xs font-medium uppercase tracking-[0.1em] text-foreground transition-colors hover:border-accent hover:text-accent"
                              >
                                Datei wählen
                              </label>
                              <input
                                id={slot.key}
                                type="file"
                                accept={DATEI_ACCEPT_ATTRIBUT}
                                className="sr-only"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] ?? null
                                  void dateiAuswaehlen(slot.key, file)
                                }}
                              />
                            </div>
                            {feldFehler[slot.key] && (
                              <p className="text-xs text-accent">{feldFehler[slot.key]}</p>
                            )}
                          </div>
                        )
                      })}
                      {feldFehler._gesamt && (
                        <div
                          className="flex items-start gap-2.5 border border-accent bg-accent/5 px-4 py-3 text-sm text-accent"
                          role="alert"
                        >
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{feldFehler._gesamt}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                          Produkt
                        </h3>
                        <dl className="flex flex-col gap-2 border-t border-border pt-3 text-sm">
                          <div className="flex justify-between gap-4">
                            <dt className="text-muted-foreground">Produkt</dt>
                            <dd className="text-right text-foreground">{produktTitel}</dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="text-muted-foreground">Preis</dt>
                            <dd className="text-right text-foreground">{preisText}</dd>
                          </div>
                          {standort && (
                            <div className="flex justify-between gap-4">
                              <dt className="text-muted-foreground">Standort</dt>
                              <dd className="text-right text-foreground">{standort}</dd>
                            </div>
                          )}
                        </dl>
                      </div>

                      <div>
                        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                          Käuferdaten
                        </h3>
                        <dl className="flex flex-col gap-2 border-t border-border pt-3 text-sm">
                          <div className="flex justify-between gap-4">
                            <dt className="text-muted-foreground">Käufertyp</dt>
                            <dd className="text-right text-foreground">
                              {kaeuferTyp === 'unternehmen' ? 'Unternehmen / Gewerbe' : 'Privatperson'}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="text-muted-foreground">Name</dt>
                            <dd className="text-right text-foreground">{vollerName}</dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="text-muted-foreground">E-Mail</dt>
                            <dd className="text-right text-foreground">{werte.email}</dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="text-muted-foreground">Telefon</dt>
                            <dd className="text-right text-foreground">{werte.telefon}</dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="text-muted-foreground">Adresse</dt>
                            <dd className="text-right text-foreground">
                              {werte.strasse} {werte.hausnummer}, {werte.plz} {werte.ort}, {werte.land}
                            </dd>
                          </div>
                          {werte.firma && (
                            <div className="flex justify-between gap-4">
                              <dt className="text-muted-foreground">Firma</dt>
                              <dd className="text-right text-foreground">{werte.firma}</dd>
                            </div>
                          )}
                        </dl>
                      </div>

                      {kaeuferTyp === 'unternehmen' && (
                        <div>
                          <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            Firmendaten
                          </h3>
                          <dl className="flex flex-col gap-2 border-t border-border pt-3 text-sm">
                            <div className="flex justify-between gap-4">
                              <dt className="text-muted-foreground">Firmenname</dt>
                              <dd className="text-right text-foreground">{werte.firmenname}</dd>
                            </div>
                            {werte.handelsregisternummer && (
                              <div className="flex justify-between gap-4">
                                <dt className="text-muted-foreground">Handelsregisternummer</dt>
                                <dd className="text-right text-foreground">
                                  {werte.handelsregisternummer}
                                </dd>
                              </div>
                            )}
                            {werte.ustIdNr && (
                              <div className="flex justify-between gap-4">
                                <dt className="text-muted-foreground">USt-IdNr.</dt>
                                <dd className="text-right text-foreground">{werte.ustIdNr}</dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      )}

                      {werte.nachricht.trim() && (
                        <div>
                          <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            Zusätzliche Nachricht
                          </h3>
                          <p className="whitespace-pre-wrap break-words border-t border-border pt-3 text-sm leading-relaxed text-foreground">
                            {werte.nachricht}
                          </p>
                        </div>
                      )}

                      <div>
                        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                          Hochgeladene Dokumente
                        </h3>
                        <ul className="flex flex-col gap-2 border-t border-border pt-3 text-sm">
                          {slots.map((slot) => (
                            <li key={slot.key} className="flex items-center gap-2 text-foreground">
                              <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                              <span className="text-muted-foreground">{slot.label}:</span>
                              <span className="truncate">{dateien[slot.key]?.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {serverFehler && (
                        <div className="flex items-start gap-2.5 border border-accent bg-accent/5 px-4 py-3 text-sm text-accent">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{serverFehler}</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Fußzeile */}
            {!erfolgId && (
              <div className="shrink-0 border-t border-border bg-card">
                {step === 3 && (
                  <div className="grid gap-2 border-b border-border bg-accent/5 px-4 py-3 sm:grid-cols-2 sm:gap-5 sm:px-6">
                    <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-foreground sm:text-sm">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                        checked={bestaetigtRichtig}
                        onChange={(e) => {
                          setBestaetigtRichtig(e.target.checked)
                          setServerFehler(null)
                        }}
                      />
                      Angaben sind vollständig und richtig.
                    </label>
                    <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-foreground sm:text-sm">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                        checked={bestaetigtUebermittlung}
                        onChange={(e) => {
                          setBestaetigtUebermittlung(e.target.checked)
                          setServerFehler(null)
                        }}
                      />
                      Kaufanfrage an DPSS Management übermitteln.
                    </label>
                  </div>
                )}

                <div className="flex flex-col-reverse items-stretch gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={zurueck}
                      disabled={isPending}
                      className="inline-flex min-h-12 items-center justify-center gap-2 border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground disabled:opacity-50 sm:border-0 sm:px-0"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Zurück
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={weiter}
                      disabled={Object.values(dateienWerdenVerarbeitet).some(Boolean)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-50"
                    >
                      Weiter
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <div className="flex flex-col gap-1.5 sm:items-end">
                      {(!bestaetigtRichtig || !bestaetigtUebermittlung) && (
                        <p className="text-center text-xs font-medium text-accent sm:text-right">
                          Bitte beide Bestätigungen auswählen.
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={absenden}
                        disabled={isPending || !bestaetigtRichtig || !bestaetigtUebermittlung}
                        className="inline-flex min-h-12 items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        {isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                        Kaufanfrage absenden
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {erfolgId && (
              <div className="flex justify-end border-t border-border px-4 py-3 sm:px-6 sm:py-4">
                <button
                  type="button"
                  onClick={schliessen}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Schließen
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
