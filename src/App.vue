<script>
import { computed, onMounted, watch } from 'vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import messages from '@/utils/messages';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useModal } from '@/hooks/useModal';

export default {
  name: 'App',
  components: {
    EmptyLayout, MainLayout,
  },
  setup() {
    const { showErrorModal } = useModal();
    const router = useRouter();
    const store = useStore();
    const error = computed(() => store.getters.error);
    const layoutName = computed(() => `${router.currentRoute.value.meta.layoutName || 'empty'}Layout`);

    watch(error, (fbError) => {
      showErrorModal(messages[fbError.code] || 'Что-то пошло не так');
    });

    onMounted(() => {
      M.AutoInit();
    });

    return { layoutName };
  },
};

</script>

<template>
  <div id="app">
    <component :is="layoutName">
    </component>
  </div>
</template>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
