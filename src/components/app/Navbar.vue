<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import filters from '@/utils/filters';

export default {
  setup() {
    const { logout } = useAuth();
    const router = useRouter();
    const store = useStore();
    const currentUserInfo = computed(() => store.getters.currentUserInfo);

    const date = ref(new Date());
    const interval = ref(null);
    const dropdownRef = ref(null);
    const dropdown = ref(null);

    const onClickLogout = () => {
      logout();
      router.push('/login?message=logout');
    };

    onMounted(() => {
      interval.value = setInterval(() => {
        date.value = new Date();
      }, 1000);

      dropdownRef.value = window.M.Dropdown.init(dropdown.value, {
        constrainWidth: true,
      });
    });

    onBeforeUnmount(() => {
      clearInterval(interval.value);
      if (dropdownRef.value && dropdownRef.value.destroy) {
        dropdownRef.value.destroy();
      }
    });

    return { date, currentUserInfo, dropdown, filters, onClickLogout };
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
          <span class="black-text">{{ filters.dateFormatter(date, 'datetime') }}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                ref="dropdown"
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
            >
              {{ currentUserInfo.name }}
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
