'use client'

import React from 'react'

import type { KontaktErgebnis } from '@/lib/kontakt/schema'

type FormZustand = {
  vorname: string
  nachname: string
  email: string
  telefon: string
  firma: string
  betreff: string
  nachricht: string
}

type SendeStatus = 'ruhend' | 'sendet' | 'erfolg' | 'fehler'

/**
 * Kontaktformular als Client-Komponente. Sendet die Eingaben per fetch() als
 * multipart/form-data an POST /api/kontakt – bewusst keine React Server
 * Action. Bei einem Fehler bleiben die eingegebenen Daten erhalten, bei
 * Erfolg wird eine Erfolgsmeldung im bestehenden Formularlayout angezeigt.
 */
export function KontaktFormular({ betreffVorbelegung }: { betreffVorbelegung: string }) {
  const [werte, setWerte] = React.useState<FormZustand>({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    firma: '',
    betreff: betreffVorbelegung,
    nachricht: '',
  })
  const [status, setStatus] = React.useState<SendeStatus>('ruhend')
  const [fehlermeldung, setFehlermeldung] = React.useState<string | null>(null)
  const [feldFehler, setFeldFehler] = React.useState<Record<string, string>>({})

  function aktualisiereFeld<K extends keyof FormZustand>(feld: K, wert: string) {
    setWerte((vorher) => ({ ...vorher, [feld]: wert }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sendet')
    setFehlermeldung(null)
    setFeldFehler({})

    const formData = new FormData()
    formData.set('vorname', werte.vorname)
    formData.set('nachname', werte.nachname)
    formData.set('email', werte.email)
    formData.set('telefon', werte.telefon)
    formData.set('firma', werte.firma)
    formData.set('betreff', werte.betreff)
    formData.set('nachricht', werte.nachricht)

    try {
      const antwort = await fetch('/api/kontakt', { method: 'POST', body: formData })
      const ergebnis: KontaktErgebnis = await antwort.json()

      if (!ergebnis.erfolg) {
        setStatus('fehler')
        setFehlermeldung(ergebnis.fehler)
        setFeldFehler(ergebnis.feldFehler ?? {})
        return
      }

      setStatus('erfolg')
      setFeldFehler({})
    } catch (error) {
      console.error('[v0] Kontaktformular konnte nicht gesendet werden:', error)
      setStatus('fehler')
      setFehlermeldung('Ihre Nachricht konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.')
    }
  }

  if (status === 'erfolg') {
    return (
      <div className="flex flex-col items-start gap-3 py-4">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Vielen Dank</p>
        <h3 className="font-serif text-2xl text-card-foreground">Ihre Nachricht wurde versendet</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Wir haben Ihre Anfrage erhalten und melden uns zeitnah bei Ihnen zurück. Eine Bestätigung
          wurde zusätzlich an Ihre E-Mail-Adresse gesendet.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-5 sm:mt-8 sm:gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="vorname"
            className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
          >
            Vorname <span className="text-accent">*</span>
          </label>
          <input
            id="vorname"
            name="vorname"
            type="text"
            autoComplete="given-name"
            required
            placeholder="Ihr Vorname"
            value={werte.vorname}
            onChange={(event) => aktualisiereFeld('vorname', event.target.value)}
            className="min-h-12 border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/15"
          />
          {feldFehler.vorname && <p className="text-xs text-destructive">{feldFehler.vorname}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="nachname"
            className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
          >
            Nachname <span className="text-accent">*</span>
          </label>
          <input
            id="nachname"
            name="nachname"
            type="text"
            autoComplete="family-name"
            required
            placeholder="Ihr Nachname"
            value={werte.nachname}
            onChange={(event) => aktualisiereFeld('nachname', event.target.value)}
            className="min-h-12 border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/15"
          />
          {feldFehler.nachname && <p className="text-xs text-destructive">{feldFehler.nachname}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
          >
            E-Mail <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="ihre@email.de"
            value={werte.email}
            onChange={(event) => aktualisiereFeld('email', event.target.value)}
            className="min-h-12 border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/15"
          />
          {feldFehler.email && <p className="text-xs text-destructive">{feldFehler.email}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="telefon"
            className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
          >
            Telefonnummer <span className="text-accent">*</span>
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            autoComplete="tel"
            required
            placeholder="+49 30 12345678"
            value={werte.telefon}
            onChange={(event) => aktualisiereFeld('telefon', event.target.value)}
            className="min-h-12 border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/15"
          />
          {feldFehler.telefon && <p className="text-xs text-destructive">{feldFehler.telefon}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="firma"
          className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
        >
          Firma / Organisation
        </label>
        <input
          id="firma"
          name="firma"
          type="text"
          autoComplete="organization"
          placeholder="Firma oder Organisation"
          value={werte.firma}
          onChange={(event) => aktualisiereFeld('firma', event.target.value)}
          className="min-h-12 border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/15"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="betreff"
          className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
        >
          Betreff <span className="text-accent">*</span>
        </label>
        <input
          id="betreff"
          name="betreff"
          type="text"
          required
          placeholder="z. B. Aktenzeichen oder Betreff Ihrer Anfrage"
          value={werte.betreff}
          onChange={(event) => aktualisiereFeld('betreff', event.target.value)}
          className="min-h-12 border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/15"
        />
        {feldFehler.betreff && <p className="text-xs text-destructive">{feldFehler.betreff}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="nachricht"
          className="text-xs font-medium uppercase tracking-[0.16em] text-foreground"
        >
          Nachricht <span className="text-accent">*</span>
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={5}
          required
          placeholder="Ihre Nachricht an uns"
          value={werte.nachricht}
          onChange={(event) => aktualisiereFeld('nachricht', event.target.value)}
          className="min-h-36 resize-y border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/15"
        />
        {feldFehler.nachricht && <p className="text-xs text-destructive">{feldFehler.nachricht}</p>}
      </div>

      {status === 'fehler' && fehlermeldung && (
        <p className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-destructive">
          {fehlermeldung}
        </p>
      )}

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben gemäß unserer{' '}
          <a href="/datenschutz" className="underline decoration-border underline-offset-4 hover:text-accent">
            Datenschutzerklärung
          </a>{' '}
          zu. <span className="text-accent">*</span> Pflichtfelder.
        </p>
        <button
          type="submit"
          disabled={status === 'sendet'}
          className="inline-flex min-h-12 w-full shrink-0 items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === 'sendet' ? 'Wird gesendet …' : 'Nachricht senden'}
        </button>
      </div>
    </form>
  )
}
