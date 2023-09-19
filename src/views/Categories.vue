<script>
import CategoryCreate from '@/components/CategoryCreate';
import CategoryEdit from '@/components/CategoryEdit';
import { mapActions } from 'vuex';

export default {
  components: {
    CategoryCreate, CategoryEdit,
  },
  data: () => ({
    categories: [], // TODO: лучше перенести категории в store
    loading: true,
    updateCount: 0,
  }),
  methods: {
    ...mapActions(['fetchCategories']),
    async onUpdateCategory(updatedCategory) {
      this.categories = await this.fetchCategories();
      this.updateCount++;
    },
    async onAddCategory() {
      this.categories = await this.fetchCategories();
    },
  },
  async mounted() {
    this.categories = await this.fetchCategories() || [];
    this.loading = false;
  },
};
</script>

<template>
  <Loader v-if="loading"/>
  <div v-else>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">

        <CategoryCreate @addCategory="onAddCategory"/>

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          @update="onUpdateCategory"
          :key="categories.length + updateCount"
        />

      </div>
    </section>
  </div>
</template>
