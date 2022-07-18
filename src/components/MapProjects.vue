<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="project in qProjects" :key="project">
        <div class="q-pa-md">
          <q-avatar size="45px" color="orange">{{ Array.from(project.author)[0] }}</q-avatar>
        </div>
        <q-card-section class="q-pt-none">
          Title: {{ project.title }}
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          Description: {{ project.description }} <br>
          Status: {{ project.status === 0 ? 'In-Progress' : 'Deployed' }}<br>
          Author: {{ project.author }}
        </q-card-section>
        <q-card-section>
          Date Completed: {{ project.date_created }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'ProjectMap',
  setup() {
    return {
      loading,
      filter
    }
  },
  data() {
    return {
      pageError: '',
    }
  },

  computed: {
    ...mapGetters({
      loggedIn: 'appStore/loggedIn',
      currentUser: 'appStore/currentUser',
      qProjects: 'appStore/qProjects',
      pageStatus: 'appStore/pageStatus'
    })

  },

  mounted() {
    this.getQProjects()
    !this.currentUser ? this.$router.push('/') : this.$router.push('/project_map')
  },
  methods: {
    async getQProjects() {
      const getData = await this.$store.dispatch('appStore/getQProjects')
      this.loading = false
      console.log('result: ', getData);
      !getData ? this.pageError = '...Network Error: Connection Refused' : null
    },

  }
})
const loading = ref(true)
const filter = ref('')
</script>

