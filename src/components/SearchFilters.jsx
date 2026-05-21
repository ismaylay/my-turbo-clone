import { useMemo } from 'react'
import { MAKES, BODY_TYPES } from '../data/vehicles'

const YEARS = Array.from({ length: 2026 - 1995 }, (_, i) => String(2025 - i))

const GEARBOX_OPTS = [
  { value: '', label: 'Sürətlər qutusu' },
  { value: 'manual', label: 'Mexaniki' },
  { value: 'automatic', label: 'Avtomat' },
  { value: 'robot', label: 'Robot' },
  { value: 'cvt', label: 'Variator' },
]

const FUEL_OPTS = [
  { value: '', label: 'Yanacaq növü' },
  { value: 'petrol', label: 'Benzin' },
  { value: 'diesel', label: 'Dizel' },
  { value: 'hybrid', label: 'Hibrid' },
  { value: 'electric', label: 'Elektrik' },
  { value: 'lpg', label: 'Qaz' },
]

const CONDITION_TABS = [
  { id: 'all', label: 'Hamısı' },
  { id: 'new', label: 'Yeni' },
  { id: 'used', label: 'Sürülmüş' },
]

export function SearchFilters({
  vehicles,
  filters,
  onChange,
  detailedOpen,
  onDetailedToggle,
  onReset,
  todayNewCount,
}) {
  const cities = useMemo(
    () => [...new Set(vehicles.map((v) => v.location))].sort(),
    [vehicles],
  )

  const modelsForMake = useMemo(() => {
    if (!filters.make)
      return [...new Set(vehicles.map((v) => v.model))].sort()
    return [
      ...new Set(
        vehicles.filter((v) => v.make === filters.make).map((v) => v.model),
      ),
    ].sort()
  }, [vehicles, filters.make])

  const set = (patch) => onChange({ ...filters, ...patch })

  function scrollToListings() {
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="border-b border-gray-200 bg-surface px-4 py-4 sm:py-6">
      <div className="mx-auto max-w-7xl rounded-xl bg-white/60 p-4 shadow-sm ring-1 ring-gray-200/80 sm:p-5">
        <div className="grid gap-3 sm:gap-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto_1fr] lg:items-end">
            <Field label="Marka">
              <select
                className="input-select"
                value={filters.make}
                onChange={(e) =>
                  set({ make: e.target.value, model: '' })
                }
              >
                <option value="">Hamısı</option>
                {MAKES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Model">
              <select
                className="input-select"
                value={filters.model}
                onChange={(e) => set({ model: e.target.value })}
              >
                <option value="">Hamısı</option>
                {modelsForMake.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted lg:invisible">
                &nbsp;
              </span>
              <div
                className="flex rounded-lg border border-gray-200 bg-white p-0.5"
                role="group"
                aria-label="Elanın vəziyyəti"
              >
                {CONDITION_TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => set({ conditionTab: t.id })}
                    className={`flex-1 rounded-md px-2 py-2 text-sm font-medium transition sm:px-3 ${
                      filters.conditionTab === t.id
                        ? 'bg-turbo-red text-white shadow-sm'
                        : 'text-ink hover:bg-gray-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Şəhər">
              <select
                className="input-select"
                value={filters.city}
                onChange={(e) => set({ city: e.target.value })}
              >
                <option value="">Hamısı</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-3 lg:grid-cols-12 lg:items-end">
            <div className="grid grid-cols-2 gap-2 lg:col-span-4">
              <Field label="Qiymət, min.">
                <input
                  type="number"
                  min={0}
                  inputMode="decimal"
                  placeholder="0"
                  className="input-text"
                  value={filters.priceMin}
                  onChange={(e) => set({ priceMin: e.target.value })}
                />
              </Field>
              <Field label="maks.">
                <input
                  type="number"
                  min={0}
                  inputMode="decimal"
                  placeholder="∞"
                  className="input-text"
                  value={filters.priceMax}
                  onChange={(e) => set({ priceMax: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Valyuta" className="lg:col-span-2">
              <select
                className="input-select"
                value={filters.currency}
                onChange={(e) => set({ currency: e.target.value })}
              >
                <option value="AZN">AZN (₼)</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </Field>
            <div className="flex flex-wrap gap-2 lg:col-span-2">
              <ToggleChip
                pressed={filters.credit}
                onClick={() => set({ credit: !filters.credit })}
              >
                Kredit
              </ToggleChip>
              <ToggleChip
                pressed={filters.barter}
                onClick={() => set({ barter: !filters.barter })}
              >
                Barter
              </ToggleChip>
            </div>
            <Field label="Ban növü" className="lg:col-span-2">
              <select
                className="input-select"
                value={filters.bodyType}
                onChange={(e) => set({ bodyType: e.target.value })}
              >
                <option value="">Hamısı</option>
                {BODY_TYPES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-2 lg:col-span-2">
              <Field label="İl, min.">
                <select
                  className="input-select"
                  value={filters.yearMin}
                  onChange={(e) => set({ yearMin: e.target.value })}
                >
                  <option value="">—</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="maks.">
                <select
                  className="input-select"
                  value={filters.yearMax}
                  onChange={(e) => set({ yearMax: e.target.value })}
                >
                  <option value="">—</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {detailedOpen ? (
            <div className="grid gap-3 border-t border-gray-200 pt-4 sm:grid-cols-3">
              <Field label="Yürüş, min. (km)">
                <input
                  type="number"
                  min={0}
                  className="input-text"
                  placeholder="0"
                  value={filters.mileageMin}
                  onChange={(e) => set({ mileageMin: e.target.value })}
                />
              </Field>
              <Field label="Yürüş, maks. (km)">
                <input
                  type="number"
                  min={0}
                  className="input-text"
                  placeholder="∞"
                  value={filters.mileageMax}
                  onChange={(e) => set({ mileageMax: e.target.value })}
                />
              </Field>
              <Field label="Sürətlər qutusu">
                <select
                  className="input-select"
                  value={filters.gearbox}
                  onChange={(e) => set({ gearbox: e.target.value })}
                >
                  {GEARBOX_OPTS.map((o) => (
                    <option key={o.value || 'any'} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Yanacaq" className="sm:col-span-3 md:col-span-1">
                <select
                  className="input-select"
                  value={filters.fuelType}
                  onChange={(e) => set({ fuelType: e.target.value })}
                >
                  {FUEL_OPTS.map((o) => (
                    <option key={o.value || 'any'} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-gray-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-blue-600">
              Bu gün:{' '}
              <span className="tabular-nums">{todayNewCount}</span> yeni elan
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onReset}
                className="text-sm font-medium text-turbo-red hover:underline"
              >
                Sıfırla
              </button>
              <button
                type="button"
                onClick={onDetailedToggle}
                className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-turbo-red"
                aria-expanded={detailedOpen}
              >
                Ətraflı axtarış
                <Chevron open={detailedOpen} />
              </button>
              <button
                type="button"
                onClick={scrollToListings}
                className="ml-auto w-full rounded-lg bg-turbo-red px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 sm:w-auto"
              >
                Elanları göstər
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .input-select, .input-text {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          background: #fff;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: #212c3d;
        }
        .input-select:focus, .input-text:focus {
          outline: 2px solid #ca1016;
          outline-offset: 1px;
        }
      `}</style>
    </section>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  )
}

function ToggleChip({ pressed, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
        pressed
          ? 'border-turbo-red bg-red-50 text-turbo-red'
          : 'border-gray-200 bg-white text-ink hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  )
}

function Chevron({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`transition ${open ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}
