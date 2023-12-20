<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import filters from '@/utils/filters';

export default {
  props: {
    rates: {
      type: Object,
      default: () => ({}),
    },
    currencyCodes: {
      type: Array,
      default: () => ([]),
    },
  },
  setup({ rates }) {
    const store = useStore();
    const currentUserInfo = computed(() => store.getters.currentUserInfo);

    const base = computed(() => currentUserInfo.value.bill / rates.RUB);
    const getCurrency = (currencyCode) => Math.floor(base.value * rates[currencyCode]);

    return { filters, getCurrency };
  },
};
</script>

<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p class="currency-line" v-for="code in currencyCodes" :key="code">
          <span>{{ filters.currencyFormatter(getCurrency(code), code) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
