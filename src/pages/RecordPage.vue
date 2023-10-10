<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useStore } from 'vuex';
import { required, minValue } from '@vuelidate/validators';
import { useCategory } from '@/hooks/useCategory';
import { useRecord } from '@/hooks/useRecord';
import { useModal } from '@/hooks/useModal';

export default {
  setup() {
    const { showErrorModal } = useModal();
    const { fetchCategories } = useCategory();
    const { addNewRecord } = useRecord();
    const store = useStore();

    const currentUserInfo = computed(() => store.getters.currentUserInfo);

    const categorySelect = ref(null);
    const categories = ref([]);
    const loading = ref(true);
    const select = ref(null);
    const currentCategoryId = ref(null);
    const type = ref('outcome');
    const amount = ref(null);
    const description = ref(null);

    const amountMin = ref(1);
    const rules = computed(() => ({
      amount: {
        required,
        minValue: minValue(amountMin.value),
      },
      description: {
        required,
      },
    }));
    const v$ = useVuelidate(rules, { amount, description });

    const onSubmitRecordCreate = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }

      if (type.value === 'outcome' && amount.value > currentUserInfo.value.bill) {
        showErrorModal(`На счете не хватает: ${currentUserInfo.value.bill - amount.value}`);
        return;
      }

      await addNewRecord({
        categoryId: currentCategoryId.value,
        type: type.value,
        amount: amount.value,
        description: description.value,
        createDt: new Date().toJSON(),
      });

      const bill = type.value === 'outcome'
        ? currentUserInfo.value.bill - amount.value
        : currentUserInfo.value.bill + amount.value;

      await store.dispatch('updateUserInfo', { ...currentUserInfo.value, bill });

      type.value = 'outcome';
      amount.value = null;
      description.value = null;

      showErrorModal('Запись создана!');
    };

    onMounted(async () => {
      categories.value = await fetchCategories();

      if (!categories.value.length) {
        loading.value = false;
        return;
      }
      currentCategoryId.value = categories.value[0].id;
      loading.value = false;

      setTimeout(() => {
        select.value = M.FormSelect.init(categorySelect.value);
        M.updateTextFields();
      }, 0);
    });

    onUnmounted(() => {
      if (select.value && select.value.destroy) {
        select.value.destroy();
      }
    });

    return {
      categories,
      loading,
      currentCategoryId,
      type,
      amount,
      description,
      amountMin,
      categorySelect,
      onSubmitRecordCreate,
      v$,
    };
  },
};
</script>

<template>
  <div>
    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length"><router-link to="/categories">Сначала нужно создать категорию</router-link></p>

    <div v-else>
      <div class="page-title">
        <h3>Новая запись</h3>
      </div>

      <form class="form" @submit.prevent="onSubmitRecordCreate">
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

        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
                v-model="type"
            />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
                v-model="type"
            />
            <span>Расход</span>
          </label>
        </p>

        <div class="input-field">
          <input
              id="amount"
              type="number"
              v-model.number="amount"
          >
          <label for="amount">Сумма</label>
          <span
            v-if="v$.amount.$dirty && (v$.amount.required.$invalid || v$.amount.minValue.$invalid)"
            class="helper-text invalid"
          >Введите сумму больше 0</span>
        </div>

        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model="description"
          >
          <label for="description">Описание</label>
          <span
            v-if="v$.description.$dirty && v$.description.required.$invalid"
              class="helper-text invalid"
            >Заполните описание</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
