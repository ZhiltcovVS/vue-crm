<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import { mapActions } from 'vuex';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    categoryName: '',
    limit: null,
  }),
  validations() {
    return {
      categoryName: { required },
      limit: { minValue: minValue(100) },
    };
  },
  methods: {
    ...mapActions(['addCategory']),
    async onSubmitCreateCategory() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        const newCategoryData = {
          name: this.categoryName,
          limit: this.limit,
        };

        await this.addCategory(newCategoryData);

        this.categoryName = '';
        this.limit = null;

        this.$emit('addCategory');

        this.$message('Категория создана');
      } catch (e) {}
    },
  },
};
</script>

<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

       <form @submit.prevent="onSubmitCreateCategory"> <!-- TODO: логично тут добавить выбор даты, но будет неудобно для пользователя, слишком запарно -->
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
          <label for="limit">Лимит</label> <!-- TODO: тут у инпута должен быть какой-то шаг отличный от "1" -->
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
