/** Demo FX; replace with API-backed rates in production. */
const RATES_TO_AZN = {
  AZN: 1,
  USD: 1.7,
  EUR: 1.85,
}

export function toAZN(amount, fromCurrency) {
  const rate = RATES_TO_AZN[fromCurrency] ?? 1
  return amount * rate
}

export function fromAZN(amountAZN, toCurrency) {
  const rate = RATES_TO_AZN[toCurrency] ?? 1
  return amountAZN / rate
}

export function formatMoney(amount, currency) {
  const rounded = Math.round(amount)
  const spaced = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (currency === 'AZN') return `${spaced} ₼`
  if (currency === 'USD') return `${spaced} USD`
  return `${spaced} EUR`
}
