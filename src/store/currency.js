export default {
  state: {
    currencyRates: null,
    currencyCodes: ['RUB', 'USD', 'EUR'],
  },
  getters: {
    currencyRates: (s) => s.currencyRates,
    currencyCodes: (s) => s.currencyCodes,
  },
  mutations: {
    setCurrencyRates(state, value) {
      state.currencyRates = value;
    },
  },
  actions: {
    async fetchCurrency({ commit }) {
      try {
        const response = await fetch('http://data.fixer.io/api/latest'
            + `?access_key=${process.env.VUE_APP_FIXER_KEY}`
            + '&symbols=RUB,USD,EUR');

        const data = await response.json();
        commit('setCurrencyRates', data);
      } catch (e) {}
    },
  },
};
