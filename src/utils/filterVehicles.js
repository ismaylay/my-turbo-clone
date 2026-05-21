import { toAZN } from './currency'

export function filterVehicles(list, filters, navCategory) {
  const {
    make,
    model,
    bodyType,
    conditionTab,
    city,
    priceMin,
    priceMax,
    currency,
    yearMin,
    yearMax,
    mileageMin,
    mileageMax,
    gearbox,
    fuelType,
    credit,
    barter,
  } = filters

  const minAZN =
    priceMin !== '' && !Number.isNaN(Number(priceMin))
      ? toAZN(Number(priceMin), currency)
      : null
  const maxAZN =
    priceMax !== '' && !Number.isNaN(Number(priceMax))
      ? toAZN(Number(priceMax), currency)
      : null

  return list.filter((v) => {
    if (navCategory === 'salon' && !v.isSalon) return false
    if (navCategory === 'parts' && v.listingCategory !== 'parts') return false
    if (navCategory === 'accessories' && v.listingCategory !== 'accessories')
      return false

    if (make && v.make !== make) return false
    if (model && v.model !== model) return false
    if (bodyType && v.bodyType !== bodyType) return false
    if (city && v.location !== city) return false

    if (conditionTab === 'new' && v.condition !== 'new') return false
    if (conditionTab === 'used' && v.condition !== 'used') return false

    if (minAZN !== null && v.priceAZN < minAZN) return false
    if (maxAZN !== null && v.priceAZN > maxAZN) return false

    const yearFiltered = Boolean(yearMin) || Boolean(yearMax)
    if (yearFiltered && v.year == null) return false
    if (yearMin && v.year < Number(yearMin)) return false
    if (yearMax && v.year > Number(yearMax)) return false

    const mileageFiltered =
      mileageMin !== '' || mileageMax !== ''
    if (mileageFiltered && v.mileageKm == null) return false
    if (
      mileageMin !== '' &&
      v.mileageKm < Number(mileageMin)
    )
      return false
    if (
      mileageMax !== '' &&
      v.mileageKm > Number(mileageMax)
    )
      return false

    if (gearbox && v.gearbox !== gearbox) return false
    if (fuelType && v.fuelType !== fuelType) return false

    if (credit && !v.creditAvailable) return false
    if (barter && !v.barterAvailable) return false

    return true
  })
}
