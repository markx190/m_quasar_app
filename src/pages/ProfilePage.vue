<template>
  <q-page>
    <div class="q-pa-lg">
      <q-avatar class="center" size="150px" font-size="140px" color="teal" text-color="white" icon="account_circle" />
      <p class="profile"><b>{{ currentUser.firstname }}</b></p>
      <u>
        <li><b>Full Name: </b> {{ currentUser.firstname + ' ' + currentUser.lastname }}</li>
        <li><b>Email: </b> {{ currentUser.email }}</li>
        <li><b>ID Number: </b> {{ currentUser.id }}</li>
        <li v-for="role in currentUser.roles" :key="role"><b>Role: </b>{{ role === 'ROLE_USER' ? 'User' : '' }}</li>
      </u>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile-Page',
  computed: {
    ...mapGetters('appStore', [
      'currentUser',
      'loggedIn'
    ])
  },
  mounted() {
    console.log('profile: ', this.currentUser)
    this.loggedIn ? this.$router.push('/profile') : this.$router.push('/')
    this.currentUser ? this.$router.push('/profile') : this.$router.push('/')
  },
  methods: {
    // async logout() {
    //   await this.$store.dispatch('auth/logout')
    //   this.$router.push('/');
    // }
  }
};
</script>
<style>
.profile {
  font-size: 20px
}
</style>