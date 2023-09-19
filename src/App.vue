<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  name: 'App',
  computed: {
    layoutName() {
      return `${this.$route.meta.layoutName || 'empty'}Layout`;
    },
  },
  components: {
    EmptyLayout, MainLayout,
  },
  mounted() {
    // Инициализация Materialize JavaScript после монтирования компонента
    M.AutoInit();
  },
};

</script>

<template>
  <div id="app">
    <component :is="layoutName">
      <!-- <router-view/> -->
    </component>
  </div>
</template>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
