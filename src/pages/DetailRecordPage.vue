<script>
import { ref, onMounted } from 'vue';
import { useCategory } from '@/hooks/useCategory';
import { useRecord } from '@/hooks/useRecord';
import filters from '@/utils/filters';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { fetchCategoryById } = useCategory();
    const { fetchRecordById } = useRecord();
    const router = useRouter();

    const record = ref({});
    const loading = ref(true);

    onMounted(async () => {
      const fetchedRecord = await fetchRecordById(router.currentRoute.value.params.id);
      const category = await fetchCategoryById(fetchedRecord.categoryId);
      record.value = {
        amount: filters.currencyFormatter(fetchedRecord.amount),
        description: fetchedRecord.description,
        date: filters.dateFormatter(fetchedRecord.createDt, 'datetimeNoSec'),
        categoryName: category.name,
        typeText: fetchedRecord.type === 'outcome' ? 'Расход' : 'Доход',
        typeClass: fetchedRecord.type === 'outcome' ? 'red' : 'green',
      };
      loading.value = false;
    });

    return {
      record,
      loading,
      fetchCategoryById,
      fetchRecordById,
    };
  },
};
</script>

<template>
  <div>
    <div>
      <div>
        <div class="breadcrumb-wrap">
          <router-link class="breadcrumb" to="/history">История</router-link>
          <a class="breadcrumb">
            {{ record.typeText }}
          </a>
        </div>

        <Loader v-if="loading" />

        <div v-else class="row">
          <div class="col s12 m6">
            <div class="card" :class="record.typeClass">
              <div class="card-content white-text">
                <p>Категория: {{ record.categoryName }}</p>
                <p>Сумма: {{ record.amount }}</p>
                <p>Описание: {{ record.description }}</p>

                <small>{{ record.date }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
