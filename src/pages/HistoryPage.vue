<script>
import { ref, onMounted } from 'vue';
import HistoryTable from '@/components/HistoryTable';
import PieChart from '@/components/PieChart';
import Paginate from 'vuejs-paginate/src/components/Paginate.vue';
import { useCategory } from '@/hooks/useCategory';
import { useRecord } from '@/hooks/useRecord';
import { usePaginate } from '@/hooks/usePaginate';
import filters from '@/utils/filters';

export default {
  components: {
    HistoryTable, PieChart, Paginate,
  },
  setup() {
    const { fetchCategories } = useCategory();
    const { fetchRecords } = useRecord();
    const {
      page,
      pageCount,
      pageItems,
      onChangePage,
      setupPagination,
    } = usePaginate();

    const records = ref([]);
    const categories = ref([]);
    const loading = ref(true);

    onMounted(async () => {
      records.value = await fetchRecords();
      categories.value = await fetchCategories();
      const serializedRecords = records.value.map((record, indx) => ({
        id: record.id,
        rowNumber: indx + 1,
        amount: filters.currencyFormatter(record.amount),
        date: filters.dateFormatter(record.createDt, 'datetimeNoSec'),
        categoryName: categories.value.find((category) => category.id === record.categoryId).name,
        typeText: record.type === 'outcome' ? 'Расход' : 'Приход',
        typeClass: record.type === 'outcome' ? 'red' : 'green',
      }));

      setupPagination(serializedRecords);

      loading.value = false;
    });

    return {
      records,
      categories,
      loading,
      page,
      pageCount,
      pageItems,
      onChangePage,
    };
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

      <section>
        <HistoryTable :records="pageItems" />

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
