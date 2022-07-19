<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <div>
          <div class="q-pa-md">
            <q-avatar size="55px" color="cyan">{{ Array.from(currentUser.firstname)[0] }}</q-avatar>
          </div>
        </div>
        <q-card-section>
          Full Name: <b>{{ currentUser.firstname + ' ' + currentUser.lastname }}</b><br>
          Username: <b>{{ currentUser.username }}</b>
        </q-card-section>
        <q-separator inset />
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
<style scoped>
.p-icon {
  margin-left: 10px
}

.q-card {
  width: 1590px;
  height: 210px
}
</style>
