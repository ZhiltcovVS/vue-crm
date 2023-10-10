<script>
import { ref, computed, onMounted } from 'vue';
import { useCategory } from '@/hooks/useCategory';
import { useRecord } from '@/hooks/useRecord';
import { useStore } from 'vuex';
import filters from '@/utils/filters';

export default {
  setup() {
    const { fetchCategories } = useCategory();
    const { fetchRecords } = useRecord();
    const store = useStore();

    const currentUserInfo = computed(() => store.getters.currentUserInfo);

    const categoryOutcome = ref([]);
    const loading = ref(true);

    onMounted(async () => {
      const categories = await fetchCategories();
      const records = await fetchRecords();

      categoryOutcome.value = categories.map((category) => {
        const spend = records
          .filter((record) => record.type === 'outcome' && record.categoryId === category.id)
          .reduce((total, record) => total + record.amount, 0);

        let spendPercent = spend * 100 / category.limit;
        spendPercent = spendPercent > 100 ? spendPercent = 100 : spendPercent;

        const balance = category.limit - spend;
        const tooltipValue = `${balance < 0 ? 'Превышен на' : 'Осталось'} ${filters.currencyFormatter(Math.abs(balance))}`;

        const categoryColor = spendPercent < 60 ? 'green' : spendPercent < 100 ? 'yellow' : 'red';

        return { ...category, spend, spendPercent, categoryColor, tooltipValue };
      });

      loading.value = false;
    });

    return { currentUserInfo, categoryOutcome, filters, loading };
  },
};
</script>

<template>
  <div>

    <Loader v-if="loading"/>

    <h5 class="center" v-else-if="!categoryOutcome.length">Нет категорий</h5>

    <div v-else>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ filters.currencyFormatter(currentUserInfo.bill) }}</h4>
      </div>
      <section>
        <div
          v-for="category in categoryOutcome"
          :key="category.id"
        >
          <p>
            <strong>{{ category.name }}</strong>
            {{ filters.currencyFormatter(category.spend) }} из {{ filters.currencyFormatter(category.limit) }}
          </p>
           <div class="progress" v-tooltip="category.tooltipValue">
            <div
              class="determinate"
              :class="category.categoryColor"
              :style="`width:${category.spendPercent}%`"
            ></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
