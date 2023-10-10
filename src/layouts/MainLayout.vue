<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useModal } from '@/hooks/useModal';
import Navbar from '@/components/app/Navbar';
import Sidebar from '@/components/app/Sidebar';
import messages from '@/utils/messages';

export default {
  name: 'mainLayout',
  components: {
    Navbar, Sidebar,
  },
  setup() {
    const store = useStore();
    const { showErrorModal } = useModal();
    const error = computed(() => store.getters.error);

    const isOpen = ref(true);
    const loading = ref(true);

    watch(error, (fbError) => {
      showErrorModal(messages[fbError.code] || 'Что-то пошло не так');
    });

    onMounted(async () => {
      await store.dispatch('fetchUserInfo');
      loading.value = false;
    });

    return { isOpen, loading };
  },
};

</script>

<template>
  <div >
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>

      <Navbar @onClick="isOpen = !isOpen"/>

      <Sidebar
        v-model:isOpen="isOpen"
      />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn" v-tooltip="'Добавить запись'"> <!-- TODO: здесь есть проблема, tooltip не помещается на странице -->
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
