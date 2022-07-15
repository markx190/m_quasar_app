<template>
  <div>
    <q-icon class="q-pa-md" name="app_registration" size="50px" />Register
    <div class="q-pa-md" style="max-width: 400px">
      <div>
        <q-label>
          {{ formMessage }}
        </q-label>
      </div>
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
          Already have an Account?
          <q-btn label="Sign Inn" to="/" type="button" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const $q = useQuasar()
    return {
      isPwd: ref(true),
      email: ref(''),
      username: ref(''),
      password: ref(''),
      firstname: ref(''),
      lastname: ref(''),
      triggerPositive() {
        $q.notify({
          type: 'positive',
          message: 'You are registered'
        })
      },
      triggerNegative() {
        $q.notify({
          type: 'negative',
          message: 'An error was fount during registration'
        })
      }
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
      },
      formMessage: ''
    }
  },
  computed: {
    ...mapGetters('appStore', [
      'loggedIn',
      'regResponse',
      'isSuccess'
    ])
  },

  mounted() {
    console.log('hoy reg response: ', this.regResponse)
    this.loggedIn ? this.$router.push('/profile') : '/register'
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
      const res = await this.$store.dispatch('appStore/register', data)
      this.formMessage = this.regResponse
    },
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    }
  }
  // watch: {
  //   loggedIn(val) {
  //     console.log('log', val)
  //   },
  //   regResponse(val) {
  //     console.log('reg', val)
  //   }
  // }
})
</script>