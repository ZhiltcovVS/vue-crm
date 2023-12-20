<script>
import { ref, onMounted } from 'vue';
import CategoryCreate from '@/components/CategoryCreate';
import CategoryEdit from '@/components/CategoryEdit';
import { useCategory } from '@/hooks/useCategory';

export default {
  components: {
    CategoryCreate, CategoryEdit,
  },
  setup() {
    const { fetchCategories } = useCategory();
    const categories = ref([]);
    const loading = ref(true);
    const updateCount = ref(0);

    const onUpdateCategory = async () => {
      categories.value = await fetchCategories();
      updateCount.value++;
    };

    const onAddCategory = async () => {
      categories.value = await fetchCategories();
    };

    onMounted(async () => {
      categories.value = await fetchCategories() || [];
      loading.value = false;
    });

    return { categories, loading, onUpdateCategory, onAddCategory };
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
