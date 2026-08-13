'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'dpss-cookie-consent'
const OPEN_EVENT = 'dpss:open-cookie-settings'

const initialState: ConsentState = { necessary: true, analytics: false, marketing: false }

function readConsent(): ConsentState | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    if (!value) return null
    const parsed = JSON.parse(value) as Partial<ConsentState>
    return { necessary: true, analytics: parsed.analytics === true, marketing: parsed.marketing === true }
  } catch {
    return null
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState(false)

  useEffect(() => {
    const stored = readConsent()
    const hydrate = window.setTimeout(() => {
      setConsent(stored)
      setOpen(stored === null)
    }, 0)

    const openSettings = () => {
      setConsent(readConsent() ?? initialState)
      setOpen(true)
      setSettings(true)
    }
    window.addEventListener(OPEN_EVENT, openSettings)
    return () => {
      window.clearTimeout(hydrate)
      window.removeEventListener(OPEN_EVENT, openSettings)
    }
  }, [])

  function save(next: ConsentState) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setConsent(next)
    setOpen(false)
    setSettings(false)
  }

  if (!open) return null

  const current = consent ?? initialState

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6" role="presentation">
      <div
        className="mx-auto max-w-3xl border border-border bg-background p-5 shadow-2xl md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Datenschutz &amp; Cookies</p>
            <h2 id="cookie-consent-title" className="mt-3 font-serif text-2xl text-foreground">
              Ihre Einstellungen
            </h2>
          </div>
          {settings && (
            <button type="button" onClick={() => setOpen(false)} className="text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline" aria-label="Cookie-Einstellungen schließen">
              Schließen
            </button>
          )}
        </div>

        {!settings ? (
          <>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Wir verwenden technisch notwendige Technologien, um unsere Website bereitzustellen. Optionale Technologien verwenden wir nur mit Ihrer Einwilligung.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button type="button" onClick={() => save({ necessary: true, analytics: true, marketing: true })} className="bg-accent px-5 py-3 text-sm font-medium text-accent-foreground hover:opacity-90">Alle akzeptieren</button>
              <button type="button" onClick={() => save(initialState)} className="border border-border px-5 py-3 text-sm font-medium text-foreground hover:border-accent hover:text-accent">Nur notwendige</button>
              <button type="button" onClick={() => setSettings(true)} className="px-2 py-3 text-sm font-medium text-foreground underline-offset-4 hover:text-accent hover:underline">Einstellungen</button>
              <Link href="/datenschutz" className="px-2 py-3 text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline">Datenschutzerklärung</Link>
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Wählen Sie, welchen Kategorien Sie zustimmen möchten. Notwendige Technologien sind für den Betrieb der Website erforderlich.</p>
            <div className="mt-6 divide-y divide-border border-y border-border">
              <ConsentOption title="Notwendig" description="Technisch notwendige Technologien, die für den Betrieb der Website erforderlich sind." checked disabled />
              <ConsentOption title="Statistik" description="Optionale Technologien zur statistischen Auswertung der Website. Derzeit werden keine Statistikdienste aktiviert." checked={current.analytics} onChange={(checked) => setConsent({ ...current, analytics: checked })} />
              <ConsentOption title="Marketing" description="Optionale Technologien für Marketing und personalisierte Inhalte. Derzeit werden keine Marketingdienste aktiviert." checked={current.marketing} onChange={(checked) => setConsent({ ...current, marketing: checked })} />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={() => save(current)} className="bg-accent px-5 py-3 text-sm font-medium text-accent-foreground hover:opacity-90">Auswahl speichern</button>
              <button type="button" onClick={() => save({ necessary: true, analytics: true, marketing: true })} className="border border-border px-5 py-3 text-sm font-medium text-foreground hover:border-accent hover:text-accent">Alle akzeptieren</button>
              <button type="button" onClick={() => save(initialState)} className="border border-border px-5 py-3 text-sm font-medium text-foreground hover:border-accent hover:text-accent">Nur notwendige</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ConsentOption({ title, description, checked, disabled, onChange }: { title: string; description: string; checked: boolean; disabled?: boolean; onChange?: (checked: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-5 py-4 first:pt-0 last:pb-0">
      <span>
        <span className="block text-sm font-medium text-foreground">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{description}</span>
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} className="mt-1 h-4 w-4 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" />
    </label>
  )
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}
