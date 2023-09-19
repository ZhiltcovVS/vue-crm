<script>
import messages from '@/utils/messages';
import { mapGetters } from 'vuex';

export default {
  name: 'EmptyLayout',
  computed: {
    ...mapGetters(['error']),
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    },
  },
};
</script>

<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>
