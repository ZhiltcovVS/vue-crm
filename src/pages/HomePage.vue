<script>
import { ref, onMounted } from 'vue';
import HomeBill from '@/components/HomeBill';
import HomeCurrency from '@/components/HomeCurrency';
import { useCurrency } from '@/hooks/useCurrency';

export default {
  components: {
    HomeBill, HomeCurrency,
  },
  setup() {
    const { currencyRates, currencyCodes, fetchCurrency } = useCurrency();

    const loading = ref(true);

    const onHomeDataRefreshButton = async () => {
      loading.value = true;
      await fetchCurrency();
      loading.value = false;
    };

    onMounted(async () => {
      await fetchCurrency();
      loading.value = false;
    });

    return { currencyRates, currencyCodes, loading, onHomeDataRefreshButton };
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
