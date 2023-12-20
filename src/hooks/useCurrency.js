import api from '@/api';
import { ref } from 'vue';
import { useStore } from 'vuex';

export function useCurrency() {
  const store = useStore();

  const currencyRates = ref([]);
  const currencyCodes = ['RUB', 'USD', 'EUR'];

  const fetchCurrency = async () => {
    try {
      currencyRates.value = await api.currency.fetchCurrency();
    } catch (error) {
      store.commit('setError', error);
    }
  };

  return {
    currencyRates,
    currencyCodes,
    fetchCurrency,
  };
}
