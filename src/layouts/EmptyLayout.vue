<script>
import { computed, watch } from 'vue';
import messages from '@/utils/messages';
import { useStore } from 'vuex';
import { useModal } from '@/hooks/useModal';

export default {
  name: 'EmptyLayout',
  setup() {
    const store = useStore();
    const { showErrorModal } = useModal();
    const error = computed(() => store.getters.error);

    watch(error, (fbError) => {
      showErrorModal(messages[fbError.code] || 'Что-то пошло не так');
    });
  },
};
</script>

<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>
