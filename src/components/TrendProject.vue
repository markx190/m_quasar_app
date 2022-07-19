<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <div class="q-pa-md">
          <q-avatar size="55px" color="orange">{{ Array.from(project.author)[0] }}</q-avatar>
        </div>
        <q-card-section class="q-pt-none">
          Title: {{ project.author }}
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <!-- Description: {{ singProject.description }} <br> -->
          Author: <br>
          Status: <br>
          Date Completed: <br>
        </q-card-section>
        <q-card-section>
          <q-btn flat round color="primary" icon="insert_comment" />
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
      project: {
        id: 0,
        title: '',
        description: '',
        author: '',
        date_created: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      loggedIn: 'appStore/loggedIn',
      currentUser: 'appStore/currentUser',
      qProjects: 'appStore/qProjects',
      pageStatus: 'appStore/pageStatus',
      singleProject: 'appStore/singleProject',
    })

  },

  mounted() {
    this.getSingleProject()
    !this.currentUser ? this.$router.push('/') : this.$router.push('/trend_it/' + this.singleProject.id)
  },
  methods: {
    async getSingleProject() {
      this.project = {
        id: this.singleProject.id,
        title: this.singleProject.title,
        description: this.singleProject.description,
        author: this.singleProject.author
      }
    },

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

