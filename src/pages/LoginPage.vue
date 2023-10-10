<script>
import { ref, computed, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import messages from '@/utils/messages';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'vue-router';
import { useModal } from '@/hooks/useModal';

export default {
  setup() {
    const { showMessageModal } = useModal();
    const { login } = useAuth();
    const router = useRouter();

    const password = ref('');
    const emailText = ref('');

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
    }));
    const v$ = useVuelidate(rules, { password, emailText });

    const onSubmit = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }

      const formData = {
        email: emailText.value,
        password: password.value,
      };

      await login(formData);
      router.push('/');
    };

    onMounted(() => {
      if (messages[router.currentRoute.value.query.message]) {
        showMessageModal(messages[router.currentRoute.value.query.message]);
      }
    });

    return {
      password,
      emailText,
      login,
      onSubmit,
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
