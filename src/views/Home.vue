<script>
import HomeBill from '@/components/HomeBill';
import HomeCurrency from '@/components/HomeCurrency';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters(['currencyCodes', 'currencyRates', 'currentUserInfo']),
  },
  methods: {
    ...mapActions(['fetchCurrency', 'homeDataRefresh']),
    async onHomeDataRefreshButton() {
      this.loading = true;
      await this.fetchCurrency();
      this.loading = false;
    },
  },
  components: {
    HomeBill, HomeCurrency,
  },
  async mounted() {
    try {
      await this.fetchCurrency();
    } catch (e) {} finally {
      this.loading = false;
    }
  },
};
</script>

<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="onHomeDataRefreshButton">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div class="row" v-else>

      <HomeBill
        :rates="currencyRates.rates"
        :currencyCodes="currencyCodes"
      />

      <HomeCurrency
        :rates="currencyRates.rates"
        :date="currencyRates.date"
        :currencyCodes="currencyCodes"
      />

    </div>
  </div>
</template>
