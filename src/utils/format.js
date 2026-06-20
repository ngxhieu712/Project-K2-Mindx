/**
 * Format Vietnamese currency
 * @param {number} amount
 * @returns {string} e.g. "28.990.000đ"
 */
export function formatPrice(amount) {
  return amount.toLocaleString("vi-VN") + "đ";
}

/**
 * Format countdown timer to { hours, minutes, seconds }
 * @param {number} ms - milliseconds remaining
 */
export function formatCountdown(ms) {
  if (ms <= 0) return { hours: "00", minutes: "00", seconds: "00" };
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}
