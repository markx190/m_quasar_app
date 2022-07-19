<template>
  <div>
    <q-icon class="q-pa-md" name="login" size="50px" />Sign In To <b>NASANA</b>
    <div class="q-pa-md" style="max-width: 400px">
      <div>
        <q-label>
          {{ signInMessage }}
        </q-label>
      </div>
      <q-form @submit="handleLogin" class="q-gutter-md">
        <q-input filled v-model="userInput.username" name="username" label="Username *" hint="Username" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please enter you username']" />
        <q-input v-model="userInput.password" name="password" label="Your password *" filled
          :type="isPwd ? 'password' : 'text'" hint="Password" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please enter you password']">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <div>
          <q-btn label="Submit" type="Sign In" color="primary" />
          Don't have an account yet?
          <q-btn label="Register" to="/register" type="button" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'Front-Page',
  setup() {
    return {
      password: ref(''),
      isPwd: ref(true),
      username: ref(''),
      email: ref('')
    }
  },
  data() {
    return {
      userInput: {
        username: '',
        email: '',
        password: ''
      },
      signInMessage: ''
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'appStore/loggedIn',
      regResponse: 'appStore/regResponse',
      authResponse: 'appStore/authResponse'
    })
  },
  created() {
    console.log('login: ', this.loggedIn)
    !this.loggedIn ? this.$router.push('/') : null
  },
  methods: {
    async handleLogin(user) {
      this.loading = true;
      let data = {
        username: this.userInput.username,
        password: this.userInput.password
      }
      const logged = await this.$store.dispatch('appStore/login', data)
      console.log('logged: ', this.authResponse)
      this.signInMessage = this.authResponse
      !this.loggedIn ? this.$router.push('/') : this.$router.push('/profile')
    },
  }
})
</script>
