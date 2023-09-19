<script>
import Navbar from '@/components/app/Navbar';
import Sidebar from '@/components/app/Sidebar';
import { mapGetters, mapActions } from 'vuex';
import messages from '@/utils/messages';

export default {
  name: 'mainLayout',
  components: {
    Navbar, Sidebar,
  },
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  computed: {
    ...mapGetters(['currentUserInfo', 'error']),
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    },
  },
  methods: {
    ...mapActions(['fetchUserInfo']),
  },
  async mounted() {
    if (!Object.keys(this.currentUserInfo).length) {
      try {
        await this.fetchUserInfo();
      } catch (e) {} finally {
        this.loading = false;
      }
    }
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
