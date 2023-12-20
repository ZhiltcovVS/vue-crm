import { ref, onMounted } from 'vue';
import _ from 'lodash';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export function usePaginate() {
  const store = useStore();
  const router = useRouter();
  const page = ref(1);
  const pageSize = ref(5);
  const pageCount = ref(0);
  const allItems = ref([]);
  const pageItems = ref([]);

  const onChangePage = (currentPage) => {
    router.push(`${router.currentRoute.value.path}?page=${currentPage}`);
    pageItems.value = allItems.value[currentPage - 1] || allItems.value[0];
  };

  const setupPagination = (records) => {
    allItems.value = _.chunk(records, pageSize.value);
    pageCount.value = _.size(allItems.value);
    pageItems.value = allItems.value[page.value - 1] || allItems.value[0];
  };

  onMounted(() => {
    page.value = +router.currentRoute.value.query.page || 1;
  });

  return {
    page,
    pageCount,
    pageItems,
    onChangePage,
    setupPagination,
  };
}
