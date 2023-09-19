<script>
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters(['currentUserInfo']),
    base() { // TODO: переназвать. База это считается код валюты относительно которого рассчитываются остальные коэффициенты. Это не база
      return this.currentUserInfo.bill / this.rates.RUB;
    },
  },
  methods: {
    getCurrency(currencyCode) { // TODO: сомнительное название для этого метода. Непонятно вообще что он делает
      return Math.floor(this.base * this.rates[currencyCode]);
    },
  },
};
</script>

<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p class="currency-line" v-for="code in currencyCodes" :key="code">
          <span>{{ $filters.currencyFormatter(getCurrency(code), code) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
