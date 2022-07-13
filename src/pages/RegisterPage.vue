<template>
  <q-page class=" q-pa-md">
    <div class="q-pa-md">
      <q-avatar size=" 100px" font-size="52px" color="teal" text-color="white" icon="account_circle" />
    </div>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="handleRegister" @reset="onReset" class="q-gutter-md">
        <q-input type="text" filled v-model="userInput.firstname" label="First Name *" hint="Your First Name" lazy-rules
          :rules="[val => val && val.length > 0 || 'First Name is required']" />
        <q-input type="text" filled v-model="userInput.lastname" label="Last Name *" hint="Your Last Name" lazy-rules
          :rules="[val => val && val.length > 0 || 'Last Name is required']" />
        <q-input type="text" filled v-model="userInput.username" label="Username *" hint="Your User Name" lazy-rules
          :rules="[val => val && val.length > 0 || 'Username is required']" />
        <q-input filled v-model="userInput.email" label="Email *" hint="Email" lazy-rules
          :rules="[val => !!val || 'Email is required', isValidEmail]" />
        <q-input v-model="userInput.password" label="Your password *" filled :type="isPwd ? 'password' : 'text'"
          hint="Password with toggle" lazy-rules :rules="[val => val && val.length > 0 || 'Please enter you password']">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script>
import { mapGetters } from 'vuex'
import { ref } from 'vue'

export default {
  setup() {
    return {
      isPwd: ref(true),
      email: ref(''),
      username: ref(''),
      password: ref(''),
      firstname: ref(''),
      lastname: ref('')
    }
  },
  data() {
    return {
      userInput: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters('appStore', [
      'loggedIn'
    ]),
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    async handleRegister() {
      console.log('username: ', this.userInput.username)
      let data = {
        firstname: this.userInput.firstname,
        lastname: this.userInput.lastname,
        username: this.userInput.username,
        email: this.userInput.email,
        password: this.userInput.password
      }
      await this.$store.dispatch("auth/register", data)
      alert('saved')
    },
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    }
  }
}
</script>