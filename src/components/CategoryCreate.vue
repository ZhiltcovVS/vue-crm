<script>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import { useCategory } from '@/hooks/useCategory';
import { useModal } from '@/hooks/useModal';

export default {
  emits: ['addCategory'],
  setup(props, { emit }) {
    const { addCategory } = useCategory();
    const { showMessageModal } = useModal();

    const categoryName = ref('');
    const limit = ref(null);

    const limitMin = ref(100);
    const rules = computed(() => ({
      categoryName: { required },
      limit: { minValue: minValue(limitMin.value) },
    }));
    const v$ = useVuelidate(rules, { categoryName, limit });

    const onSubmitCreateCategory = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }

      const newCategoryData = {
        name: categoryName.value,
        limit: limit.value,
      };

      await addCategory(newCategoryData);

      categoryName.value = '';
      limit.value = null;

      emit('addCategory');

      showMessageModal('Категория создана');
    };

    return {
      categoryName,
      limit,
      onSubmitCreateCategory,
      v$,
    };
  },
};
</script>

<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

       <form @submit.prevent="onSubmitCreateCategory">
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
              id="limit"
              type="number"
              v-model.number="limit"
          >
          <label for="limit">Лимит</label>
          <span
            v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
            class="helper-text invalid"
          >
            Минимальная величина: {{ v$.limit.minValue.$params.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit" >
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
