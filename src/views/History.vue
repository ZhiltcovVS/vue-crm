<script>
import HistoryTable from '@/components/HistoryTable';
import { mapActions } from 'vuex';
import paginateMixin from '@/mixins/paginate.mixin';
import PieChart from '@/components/PieChart';

export default {
  components: {
    HistoryTable, PieChart,
  },
  mixins: [paginateMixin],
  data: () => ({
    records: [],
    categories: [],
    loading: true,
  }),
  methods: {
    ...mapActions(['fetchRecords', 'fetchCategories']),
  },
  async mounted() {
    this.records = await this.fetchRecords();
    this.categories = await this.fetchCategories();

    const serializedRecords = this.records.map((record, indx) => ({
      id: record.id,
      rowNumber: indx + 1,
      amount: this.$filters.currencyFormatter(record.amount),
      date: this.$filters.dateFormatter(record.createDt, 'datetimeNoSec'),
      categoryName: this.categories.find((category) => category.id === record.categoryId).name,
      typeText: record.type === 'outcome' ? 'Расход' : 'Приход',
      typeClass: record.type === 'outcome' ? 'red' : 'green',
    }));

    this.setupPagination(serializedRecords);

    this.loading = false;
  },
};
</script>

<template>
  <div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">Пока что нет записей. <router-link to="/record">Создать запись</router-link></p>

    <div v-else>
      <div class="page-title">
        <h3>История записей</h3>
      </div>

      <PieChart :categories="categories" :records="records"/>

      <!-- TODO: Здесь можно сделать сортировку по дате, сумме; переключатель типа, фильтр-select по категории -->

      <section>
        <HistoryTable :records="items" />

        <!-- TODO: Здесь есть проблема. Paginate изначально вне зависимости от значения модели page показывает первую страницу -->
        <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="onChangePage"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
        />

      </section>

    </div>

  </div>
</template>
