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
    currentCategoryId: null,
    select: null,
  }),
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => ([]),
    },
  },
  validations() {
    return {
      categoryName: { required },
      limit: { minValue: minValue(100) },
    };
  },
  methods: {
    ...mapActions(['updateCategory']),
    async onUpdateCategory() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        await this.updateCategory({
          name: this.categoryName,
          limit: this.limit,
          id: this.currentCategoryId,
        });

        this.$emit('update', {
          name: this.categoryName,
          limit: this.limit,
          id: this.currentCategoryId,
        });

        this.$message('Категория обновлена');
      } catch (e) {}
    },
  },
  watch: {
    currentCategoryId(categoryId) {
      const { id, name, limit } = this.categories.find((c) => c.id === categoryId);
      this.currentCategoryId = id;
      this.categoryName = name;
      this.limit = limit;
    },
  },
  created() {
    if (!this.categories.length) return;
    const { id, name, limit } = this.categories[0]; // TODO: здесь не всегда по умолчанию нужно подставлять первый элемент
    this.currentCategoryId = id;
    this.categoryName = name;
    this.limit = limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.categorySelect);
    M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
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
              id="limit"
              type="number"
              v-model.number="limit"
          >
          <label for="limit">Лимит</label> <!-- TODO: тут у инпута должен быть шаг в сотню -->
          <span
            v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
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
