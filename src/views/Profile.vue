<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Profile',
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      name: { required },
    };
  },
  data: () => ({
    name: '',
  }),
  computed: {
    ...mapGetters(['currentUserInfo']),
  },
  methods: {
    ...mapActions(['updateUserInfo']),
    onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        this.updateUserInfo({ name: this.name });
      } catch (e) {}
    },
  },
  mounted() {
    this.name = this.currentUserInfo.name;
    setTimeout(() => {
      M.updateTextFields();
    });
  },
};
</script>

<template>
  <div>
    <div>
      <div class="page-title">
        <h3>Профиль</h3>
      </div>

      <form class="form" @submit.prevent="onSubmit">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="name"
          >
          <label for="name">Имя</label>
          <small
            v-if="v$.name.$dirty && v$.name.required.$invalid"
            class="helper-text invalid"
            >
              Введите имя
          </small>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
