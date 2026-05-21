export function TopBar() {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <nav
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted"
          aria-label="Partner saytlar"
        >
          <a href="#" className="hover:text-ink">
            Tap.az
          </a>
          <a href="#" className="hover:text-ink">
            Bina.az
          </a>
          <a href="#" className="hover:text-ink">
            Boss.az
          </a>
        </nav>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
          <span className="text-ink">*0101</span>
          <a href="#" className="hover:text-ink">
            Yardım
          </a>
          <button
            type="button"
            className="hover:text-ink"
            aria-label="Dil: Azərbaycan"
          >
            AZ
          </button>
          <a href="#" className="hover:text-ink">
            Mesajlar
          </a>
          <a href="#" className="inline-flex items-center gap-1 hover:text-ink">
            <HeartSmall />
            Seçilmişlər
          </a>
          <a href="#" className="inline-flex items-center gap-1 hover:text-ink">
            <UserIcon />
            Giriş
          </a>
        </div>
      </div>
    </div>
  )
}

function HeartSmall() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
