<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import { useCategory } from '@/hooks/useCategory';
import { useModal } from '@/hooks/useModal';

export default {
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => ([]),
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const { updateCategory } = useCategory();
    const { showMessageModal } = useModal();

    const categorySelect = ref(null);
    const categoryName = ref('');
    const categoryLimit = ref(null);
    const currentCategoryId = ref(null);
    const select = ref(null);

    const categoryLimitMin = ref(100);
    const rules = computed(() => ({
      categoryName: { required },
      categoryLimit: { minValue: minValue(categoryLimitMin.value) },
    }));
    const v$ = useVuelidate(rules, { categoryName, categoryLimit });

    const onUpdateCategory = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }

      await updateCategory({
        name: categoryName.value,
        limit: categoryLimit.value,
        id: currentCategoryId.value,
      });

      emit('update', {
        name: categoryName.value,
        limit: categoryLimit.value,
        id: currentCategoryId.value,
      });

      showMessageModal('Категория обновлена');
    };

    onMounted(() => {
      select.value = M.FormSelect.init(categorySelect.value);
      M.updateTextFields();
    });

    onUnmounted(() => {
      if (select.value && select.value.destroy) {
        select.value.destroy();
      }
    });

    watch(currentCategoryId, (categoryId) => {
      const { id, name, limit } = props.categories.find((category) => category.id === categoryId);
      currentCategoryId.value = id;
      categoryName.value = name;
      categoryLimit.value = limit;
    });

    if (props.categories.length) {
      const [{ id, name, limit }] = props.categories;

      currentCategoryId.value = id;
      categoryName.value = name;
      categoryLimit.value = limit;
    }

    return {
      categoryName,
      categoryLimit,
      categorySelect,
      currentCategoryId,
      onUpdateCategory,
      v$,
    };
  },
};
</script>

<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onUpdateCategory">
        <div class="input-field" >
          <select
            ref="categorySelect"
            v-model="currentCategoryId"
          >
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >{{ c.name }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="categoryName"
          >
          <label for="name">Наименование</label>
          <span
            v-if="v$.categoryName.$dirty && v$.categoryName.required.$invalid"
            class="helper-text invalid"
          >
            Введите наименование категории
          </span>
        </div>

        <div class="input-field">
          <input
              id="categoryLimit"
              type="number"
              v-model.number="categoryLimit"
          >
          <label for="categoryLimit">Лимит</label>
          <span
            v-if="v$.categoryLimit.$dirty && v$.categoryLimit.minValue.$invalid"
            class="helper-text invalid"
          >
            Минимальная величина: {{ v$.limit.minValue.$params.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
