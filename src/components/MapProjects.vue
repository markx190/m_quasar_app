<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <TrendModal :fModal="trendModal" :vData="projects" :vForum="forums" @close="closeDialog" @hide="closeDialog" />
      <q-card class="my-card" v-for="project in qProjects" :key="project">
        <div class="q-pa-md">
          <q-avatar size="55px" color="orange">{{ Array.from(project.author)[0] }}</q-avatar>
        </div>
        <q-card-section class="q-pt-none">
          Title: {{ project.title }}
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <!-- Description: {{ project.description }} <br> -->
          Author: {{ project.author }}<br>
          Status: {{ project.status === 0 ? 'In-Progress' : 'Deployed' }}<br>
          Date Completed: {{ project.date_created }}<br>
        </q-card-section>
        <q-card-section>
          <q-btn flat round color="primary" icon="insert_comment" @click="getSingle(project)" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import TrendModal from 'components/TrendModal.vue'

export default defineComponent({
  name: 'ProjectMap',
  components: {
    TrendModal
  },
  setup() {
    return {
      loading,
      filter
    }
  },
  data() {
    return {
      trendModal: false,
      pageError: '',
      projects: {
        id: 0,
        title: '',
        description: '',
        status: '',
        author: '',
        date_created: ''
      },
      forums: {
        id: 0,
        comment: '',
        encoded_by: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      loggedIn: 'appStore/loggedIn',
      currentUser: 'appStore/currentUser',
      qProjects: 'appStore/qProjects',
      pageStatus: 'appStore/pageStatus',
      singProject: 'appStonre/singleProject'
    })

  },

  mounted() {
    this.getQProjects()
  },
  methods: {
    async getQProjects() {
      this.loading = true
      const getData = await this.$store.dispatch('appStore/getQProjects')
      this.loading = false
      !getData ? this.pageError = '...Network Error: Connection Refused' : null
    },
    getSingle(project) {
      this.trendModal = true
      this.projects = {
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status,
        author: project.author
      }
    },
    closeDialog() {
      this.trendModal = false,
        this.forums = {
          id: 0,
          comment: '',
          user_id_no: '',
          encoded_by: '',
          project_id_no: ''
        }
    }

  }
})
const loading = ref(true)
const filter = ref('')
</script>
<style scoped>
.q-card {
  width: 380px;
  height: 290px
}
</style>

