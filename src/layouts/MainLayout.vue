<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- Quasar University -->
        </q-toolbar-title>
        <!-- <div class="q-mr-sm">Hi: {{ currentUser.firstname + ' ' + currentUser.lastname }}</div> -->
        <q-avatar size="34px" color="cyan">{{ Array.from(currentUser.firstname)[0] }}</q-avatar>
        <!-- <div>Cylops Beta v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          <b>FOOTPRINTS</b>
        </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
      <q-list>
        <q-icon v-if="currentUser" class="q-ml-md" size="24px" name="logout" @click="logout"></q-icon>
        <a v-if="currentUser" @click="logout" href="" class="q-pa-lg logout">Logout</a>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Profile',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '/profile'
  },
  {
    title: 'Public',
    caption: 'Thumbnail view',
    icon: 'dashboard',
    link: '/project_map'
  },
  {
    title: 'Projects',
    caption: 'List of Projects',
    icon: 'work',
    link: '/project_list'
  },

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'appStore/currentUser',
      currentUser: 'appStore/currentUser'
    })
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/');
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('appStore/logout')
      this.$router.push('/')
    }
  },
})
</script>
<style>
.logout {
  margin-left: 7px;
}
</style>