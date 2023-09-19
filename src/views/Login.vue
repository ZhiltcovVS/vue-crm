<script>
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import messages from '@/utils/messages';
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    password: '',
    email: '',
  }),
  validations() {
    return {
      password: { required, minLength: minLength(6) },
      email: { required, email },
    };
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    ...mapActions(['login']),
    async onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.login(formData);
        this.$router.push('/');
      } catch (e) {}
    },
  },
};
</script>

<template>
  <div>
    <form class="card auth-card" @submit.prevent="onSubmit">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email"
      >
      <label for="email">Email</label>
      <small
        class="helper-text invalid"
        v-if="v$.email.$dirty && v$.email.email.$invalid"
        >
          Введите корректный email
      </small>
      <small
        class="helper-text invalid"
        v-else-if="v$.email.$dirty && v$.email.required.$invalid"
        >
          Введите email
      </small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="password"
      >
      <label for="password">Пароль</label>
      <small
        class="helper-text invalid"
        v-if="v$.password.$dirty && v$.password.minLength.$invalid"
        >
          Пароль имеет менее {{ v$.password.minLength.$params.min }} символов. Сейчас {{ password.length }} символов
      </small>
      <small
        class="helper-text invalid"
        v-else-if="v$.password.$dirty && v$.password.required.$invalid"
        >
          Введите пароль
      </small>
    </div>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Войти
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Нет аккаунта?
      <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </div>
</form>
  </div>
</template>
