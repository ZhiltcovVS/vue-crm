<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    categoryOutcome: [],
    loading: true,
  }),
  computed: {
    ...mapGetters(['currentUserInfo']),
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchRecords']),
  },
  async mounted() {
    const categories = await this.fetchCategories();
    const records = await this.fetchRecords();

    this.categoryOutcome = categories.map((category) => {
      const spend = records
        .filter((record) => record.type === 'outcome' && record.categoryId === category.id)
        .reduce((total, record) => total + record.amount, 0);

      let spendPercent = spend * 100 / category.limit;
      spendPercent = spendPercent > 100 ? spendPercent = 100 : spendPercent;

      const balance = category.limit - spend;
      const tooltipValue = `${balance < 0 ? 'Превышен на' : 'Осталось'} ${this.$filters.currencyFormatter(Math.abs(balance))}`;

      const categoryColor = spendPercent < 60 ? 'green' : spendPercent < 100 ? 'yellow' : 'red';

      return { ...category, spend, spendPercent, categoryColor, tooltipValue };
    });

    this.loading = false;
  },
};
</script>

<template>
  <div>
    <!-- TODO: В теории здесь можно сделать удобный поиск, разные сортировки, сортировку по умолчанию и фильтрации -->
    <Loader v-if="loading"/>

    <h5 class="center" v-else-if="!categoryOutcome.length">Нет категорий</h5>

    <div v-else>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ this.$filters.currencyFormatter(currentUserInfo.bill) }}</h4>
      </div>
      <section>
        <div
          v-for="category in categoryOutcome"
          :key="category.id"
        >
          <p>
            <strong>{{ category.name }}</strong>
            {{ this.$filters.currencyFormatter(category.spend) }} из {{ this.$filters.currencyFormatter(category.limit) }}
          </p>
           <div class="progress" v-tooltip="category.tooltipValue"> <!-- TODD: сделать компактнее или поменять формат отображения -->
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
