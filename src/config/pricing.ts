/** Tuition pricing in SAR. */
export const PRICING = {
  oneOnOne: {
    originalPerHour: 400,
    discountPerHour: 250,
    minHours: 2,
    maxHours: 40,
    defaultHours: 10,
  },
  group: {
    original: 5000,
    discount: 1900,
  },
} as const;
