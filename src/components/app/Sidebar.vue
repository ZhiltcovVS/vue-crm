<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
    },
  },
  setup() {
    const links = [
      { id: 1, title: 'Счет', url: '/', exact: true },
      { id: 2, title: 'История', url: '/history' },
      { id: 3, title: 'Планирование', url: '/planning' },
      { id: 4, title: 'Новая запись', url: '/record' },
      { id: 5, title: 'Категории', url: '/categories' },
    ];

    return { links };
  },
};
</script>

<template>
  <div>
    <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
      <li
        v-for="link in links"
        :key="link.id"
        :class="{'active': $route.path === link.url}"
        @click="$router.push(link.url)"
        >
        <a class="waves-effect waves-orange pointer">
          {{ link.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
