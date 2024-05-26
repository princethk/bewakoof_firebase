/**
 * Convert USD (United States Dollar) to INR (Indian Rupee).
 * @param {number} amount - The amount in USD to convert.
 * @returns {Promise<number|null>} - The converted amount in INR, or null if conversion fails.
 */
export async function usdToInr(amount) {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    const exchangeRate = data.rates.INR;
    const inrAmount = Math.round(amount * exchangeRate);
    return inrAmount;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
}
