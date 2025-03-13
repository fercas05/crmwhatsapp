/* eslint-disable new-cap */
export default function formatToCurrency(value) {
  return Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
