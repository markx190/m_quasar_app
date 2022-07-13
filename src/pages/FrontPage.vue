<template>
  <div>
    <q-icon class="q-pa-md" name="login" />Sign In Here
    <div class="q-pa-md" style="max-width: 400px">
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
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Register" to="/register" type="button" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

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
      }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      let data = {
        username: this.userInput.username,
        password: this.userInput.password
      }
      this.$store.dispatch("auth/login", data).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  }
})
</script>
