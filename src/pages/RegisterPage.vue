<script>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { register } = useAuth();
    const router = useRouter();

    const emailText = ref('');
    const password = ref('');
    const name = ref('');
    const agree = ref(false);

    const passwordLength = ref(6);
    const rules = computed(() => ({
      password: {
        required,
        minLength: minLength(passwordLength.value),
      },
      emailText: {
        required,
        email,
      },
      name: { required },
      agree: { checked: (v) => v },
    }));
    const v$ = useVuelidate(rules, { password, emailText, name, agree });

    const onSubmit = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }

      const formData = {
        email: emailText.value,
        password: password.value,
        name: name.value,
      };

      await register(formData);
      router.push('/');
    };

    return {
      emailText,
      password,
      name,
      agree,
      onSubmit,
      register,
      v$,
    };
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
          id="emailText"
          type="text"
          v-model.trim="emailText"
      >
      <label for="emailText">Email</label>
      <small
        class="helper-text invalid"
        v-if="v$.emailText.$dirty && v$.emailText.email.$invalid"
        >
          Введите корректный email
      </small>
      <small
        class="helper-text invalid"
        v-else-if="v$.emailText.$dirty && v$.emailText.required.$invalid"
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
        <div class="input-field">
          <input
              id="name"
              type="text"
              class="validate"
              v-model.trim="name"
          >
          <label for="name">Имя</label>
          <small
            class="helper-text invalid"
            v-if="v$.name.$dirty && v$.name.required.$invalid"
          >
            Введите свое имя
          </small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree"/>
            <span>С правилами согласен</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
          >
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
