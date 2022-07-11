<template>
  <q-page>
    <div class="q-pa-md">
      <q-avatar size=" 100px" font-size="52px" color="teal" text-color="white" icon="account_circle" />
    </div>
    <div class="q-pa-md" style="max-width: 400px">

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="name" label="Your name *" hint="Username" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please enter you username']" />

        <q-input v-model="password" label="Your password *" filled :type="isPwd ? 'password' : 'text'"
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
import { ref } from 'vue'

export default {
  setup() {
    return {
      password: ref(''),
      isPwd: ref(true),

      email: ref(''),
      search: ref(''),
      tel: ref(''),
      url: ref(''),
      time: ref(''),
      date: ref('')
    }
  }
}
</script>