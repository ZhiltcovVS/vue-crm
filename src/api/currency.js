export const currency = {
  async fetchCurrency() {
    const response = await fetch('http://data.fixer.io/api/latest'
    + `?access_key=${process.env.VUE_APP_FIXER_KEY}`
    + '&symbols=RUB,USD,EUR');

    const data = await response.json();
    return data;
  },
};
