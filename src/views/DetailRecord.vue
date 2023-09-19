<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    record: {},
    loading: true,
  }),
  methods: {
    ...mapActions(['fetchRecordById', 'fetchCategoryById']),
  },
  async mounted() {
    const record = await this.fetchRecordById(this.$route.params.id);
    const category = await this.fetchCategoryById(record.categoryId);
    this.record = {
      amount: this.$filters.currencyFormatter(record.amount),
      description: record.description,
      date: this.$filters.dateFormatter(record.createDt, 'datetimeNoSec'),
      categoryName: category.name,
      typeText: record.type === 'outcome' ? 'Расход' : 'Доход',
      typeClass: record.type === 'outcome' ? 'red' : 'green',
    };
    this.loading = false;
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
