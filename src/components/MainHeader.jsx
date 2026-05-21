const NAV = [
  { id: 'all', label: 'Bütün elanlar' },
  { id: 'salon', label: 'Salonlar' },
  { id: 'parts', label: 'Ehtiyat hissələr' },
  { id: 'accessories', label: 'Aksesuarlar' },
]

export function MainHeader({ activeCategory, onCategoryChange }) {
  return (
    <header className="bg-turbo-red text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            TURBO.AZ
          </a>
          <nav
            className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium sm:text-base"
            aria-label="Əsas bölmələr"
          >
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onCategoryChange(item.id)}
                className={`rounded-md px-1 py-0.5 transition hover:bg-white/10 ${
                  activeCategory === item.id ? 'bg-white/15 underline' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-turbo-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:scale-[0.99]"
        >
          <PlusIcon />
          Yeni elan
        </button>
      </div>
    </header>
  )
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
