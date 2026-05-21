import { useMemo, useState, useCallback } from 'react'
import { TopBar } from './components/TopBar'
import { MainHeader } from './components/MainHeader'
import { SearchFilters } from './components/SearchFilters'
import { VehicleCard } from './components/VehicleCard'
import { vehicles } from './data/vehicles'
import { filterVehicles } from './utils/filterVehicles'

const LS_FAV = 'turbo-az-favorites'

function readFavoriteIds() {
  try {
    const raw = localStorage.getItem(LS_FAV)
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? new Set(arr) : new Set()
  } catch {
    return new Set()
  }
}

const defaultFilters = {
  make: '',
  model: '',
  bodyType: '',
  conditionTab: 'all',
  city: '',
  priceMin: '',
  priceMax: '',
  currency: 'AZN',
  yearMin: '',
  yearMax: '',
  mileageMin: '',
  mileageMax: '',
  gearbox: '',
  fuelType: '',
  credit: false,
  barter: false,
}

export default function App() {
  const [navCategory, setNavCategory] = useState('all')
  const [filters, setFilters] = useState(defaultFilters)
  const [detailedOpen, setDetailedOpen] = useState(false)
  const [favorites, setFavorites] = useState(() => readFavoriteIds())

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        try {
          localStorage.setItem(LS_FAV, JSON.stringify([...next]))
        } catch {
          /* ignore */
        }
        return next
      })
    },
    [],
  )

  const filtered = useMemo(
    () => filterVehicles(vehicles, filters, navCategory),
    [filters, navCategory],
  )

  const premiumList = useMemo(
    () => filtered.filter((v) => v.isPremium),
    [filtered],
  )

  const latestList = useMemo(
    () => filtered.filter((v) => !v.isPremium),
    [filtered],
  )

  const todayNewCount = useMemo(
    () => vehicles.filter((v) => v.timestamp.startsWith('bugün')).length,
    [],
  )

  function handleReset() {
    setFilters(defaultFilters)
    setDetailedOpen(false)
  }

  return (
    <div className="min-h-svh bg-white">
      <TopBar />
      <MainHeader
        activeCategory={navCategory}
        onCategoryChange={setNavCategory}
      />
      <SearchFilters
        vehicles={vehicles}
        filters={filters}
        onChange={setFilters}
        detailedOpen={detailedOpen}
        onDetailedToggle={() => setDetailedOpen((o) => !o)}
        onReset={handleReset}
        todayNewCount={todayNewCount}
      />

      <main
        id="listings"
        className="mx-auto max-w-7xl px-4 py-8 sm:py-10"
      >
        <ListingSection
          title="VIP / Premium elanlar"
          subtitle="Ödənişli yerləşdirmə və təsdiqlənmiş salonlar"
          items={premiumList}
          emptyHint="Bu filtr üzrə premium elan yoxdur."
          displayCurrency={filters.currency}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        <ListingSection
          title="Son elanlar"
          subtitle="Ən son əlavə olunan elanlar"
          items={latestList}
          emptyHint="Bu filtr üzrə elan tapılmadı."
          displayCurrency={filters.currency}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          className="mt-12"
        />
      </main>

      <footer className="border-t border-gray-100 bg-surface py-6 text-center text-sm text-muted">
        Demo layihə — Turbo.az ilhamlı UI. Şəkillər Unsplash-dandır.
      </footer>
    </div>
  )
}

function ListingSection({
  title,
  subtitle,
  items,
  emptyHint,
  displayCurrency,
  favorites,
  onToggleFavorite,
  className = '',
}) {
  return (
    <section className={className}>
      <header className="mb-4 sm:mb-6">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </header>
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-200 bg-surface/50 py-10 text-center text-muted">
          {emptyHint}
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((v) => (
            <li key={v.id}>
              <VehicleCard
                vehicle={v}
                displayCurrency={displayCurrency}
                isFavorite={favorites.has(v.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
