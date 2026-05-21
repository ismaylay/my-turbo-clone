import { formatMoney, fromAZN } from '../utils/currency'

const GEARBOX_LABELS = {
  manual: 'Mexaniki',
  automatic: 'Avtomat',
  robot: 'Robot',
  cvt: 'Variator',
}

const FUEL_LABELS = {
  petrol: 'Benzin',
  diesel: 'Dizel',
  hybrid: 'Hibrid',
  electric: 'Elektrik',
  lpg: 'Qaz',
}

export function VehicleCard({
  vehicle,
  displayCurrency,
  isFavorite,
  onToggleFavorite,
}) {
  const displayPrice = fromAZN(vehicle.priceAZN, displayCurrency)
  const specParts = []
  if (vehicle.year != null) specParts.push(String(vehicle.year))
  if (vehicle.engineLabel && vehicle.engineLabel !== '—')
    specParts.push(vehicle.engineLabel)
  if (vehicle.mileageKm != null)
    specParts.push(
      `${vehicle.mileageKm.toLocaleString('az-AZ')} km`,
    )

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(vehicle.id)}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-sm transition hover:bg-white"
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Seçilmişlərdən çıxar' : 'Seçilmişlərə əlavə et'}
        >
          <HeartIcon filled={isFavorite} />
        </button>
        <div className="absolute bottom-2 right-2 flex gap-1">
          {vehicle.isPremium ? (
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-amber-950 shadow"
              title="VIP"
            >
              👑
            </span>
          ) : null}
          {vehicle.isVerified ? (
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white shadow"
              title="Yoxlanılıb"
            >
              V
            </span>
          ) : null}
        </div>
        {vehicle.isSalon ? (
          <span className="absolute bottom-2 left-2 rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white shadow">
            Salon
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 text-left">
        <p className="text-lg font-bold text-ink">
          {formatMoney(displayPrice, displayCurrency)}
        </p>
        <h3 className="text-base font-semibold leading-snug text-ink">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-muted">
          {specParts.length > 0
            ? specParts.join(', ')
            : [
                GEARBOX_LABELS[vehicle.gearbox],
                FUEL_LABELS[vehicle.fuelType],
              ].join(' · ')}
        </p>
        <p className="mt-auto pt-1 text-xs text-muted">
          {vehicle.location}, {vehicle.timestamp}
        </p>
      </div>
    </article>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      className={filled ? 'text-turbo-red' : 'text-gray-500'}
      aria-hidden
    >
      <path
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      />
    </svg>
  )
}
