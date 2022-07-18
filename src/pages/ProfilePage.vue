<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card q-pa-md">
        <div>
          <q-icon class="p-icon" name="account_circle" size="60px" color="cyan" />
        </div>
        <q-card-section class="q-pt-none">
          {{ currentUser.firstname + ' ' + currentUser.lastname }}
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          User ID Number: {{ currentUser.id }}
        </q-card-section>
      </q-card>
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
.p-icon {
  margin-left: 10px
}
</style>