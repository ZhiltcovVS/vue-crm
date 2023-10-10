<script>
import { ref, computed, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const currentUserInfo = computed(() => store.getters.currentUserInfo);

    const name = ref('');

    const rules = computed(() => ({
      name: { required },
    }));
    const v$ = useVuelidate(rules, { name });

    const onSubmit = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }
      await store.dispatch('updateUserInfo', { name: name.value });
    };

    onMounted(() => {
      name.value = currentUserInfo.value.name;
      setTimeout(() => {
        M.updateTextFields();
      });
    });

    return { name, v$, onSubmit };
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
