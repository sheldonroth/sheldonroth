/** Digital gift certificates. Client-safe. Amounts in USD; every amount is at or below the lowest print price. */
export const GIFT_AMOUNTS = [250, 500, 1000, 1650] as const;
export type GiftAmount = (typeof GIFT_AMOUNTS)[number];

/** Show the holiday note (homepage, nav and /gift) until this date. */
export const HOLIDAY_GIFT_UNTIL = '2026-12-26';
export const holidaySeason = (now = new Date()) => now < new Date(`${HOLIDAY_GIFT_UNTIL}T00:00:00-07:00`);
