<script>
import { mapGetters, mapActions } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    categories: [],
    loading: true,
    select: null,
    currentCategoryId: null,
    type: 'outcome',
    amount: null,
    description: null,
  }),
  computed: {
    ...mapGetters(['currentUserInfo']),
  },
  methods: {
    ...mapActions(['fetchCategories', 'addNewRecord', 'updateUserInfo']),
    async onSubmitRecordCreate() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      if (this.type === 'outcome' && this.amount > this.currentUserInfo.bill) {
        this.$message(`На счете не хватает: ${this.currentUserInfo.bill - this.amount}`);
        return;
      }

      await this.addNewRecord({ // TODO: туn можно было бы создать recordId. Объект добавляется в сущность-связь record-category
        categoryId: this.currentCategoryId,
        type: this.type,
        amount: this.amount,
        description: this.description,
        createDt: new Date().toJSON(),
      });

      const bill = this.type === 'outcome'
        ? this.currentUserInfo.bill - this.amount
        : this.currentUserInfo.bill + this.amount;

      await this.updateUserInfo({ ...this.currentUserInfo, bill });

      this.type = 'outcome';
      this.amount = null;
      this.description = null;

      this.$message('Запись создана!');
    },
  },
  validations() {
    return {
      amount: { required, minValue: minValue(1) },
      description: { required },
    };
  },
  async mounted() {
    this.categories = await this.fetchCategories();

    if (!this.categories.length) {
      this.loading = false;
      return;
    }
    this.currentCategoryId = this.categories[0].id;
    this.loading = false;

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.categorySelect);
      M.updateTextFields();
    }, 0);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
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
          <!-- TODO: Здесь нужно динамически определять список категорий в зависимости от типа -->
          <!-- TODO: Для типа доход убрать возможность заполнять лимит и возможность редактирования  -->
          <!-- TODO: Добавить возможность удалять категории, удалять записи из истории -->
          <!-- TODO: Добавить сразу категории по дефолту -->
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
