<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  computed: {
    ...mapGetters(['currentUserInfo']),
    currentUserName() {
      return this.currentUserInfo.name;
    },
  },
  methods: {
    ...mapActions(['logout']),
    onClickLogout() {
      this.logout();
      this.$router.push('/login?message=logout');
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },
  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>

<template>
  <div>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('onClick')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{ $filters.dateFormatter(date, 'datetime') }}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                ref="dropdown"
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
            >
              {{ currentUserName }}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <router-link
                  to=""
                  class="black-text"
                  @click.prevent="onClickLogout"
                  >
                  <i class="material-icons">assignment_return</i>Выйти
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
