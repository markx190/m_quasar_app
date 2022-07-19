<template>
  <q-dialog v-if="fModal" :model-value="true">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="submitForm" class="q-gutter-md" ref="form">
          <q-input v-if="title !== 'Delete Project'" filled v-model="projects.title" label="Title" hint="Content Title"
            lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          <q-input v-if="title !== 'Delete Project'" filled v-model="projects.description" label="Description"
            hint="Content Description" lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          <q-input v-if="title !== 'Delete Project'" filled v-model="projects.author" label="Author" hint="Author"
            lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          <q-input v-if="title !== 'Delete Project'" type="date" filled v-model="projects.date_created"
            hint="Date Completed" lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          <q-card-section v-else class="q-pt-none">
            Are you sure you want to delete this project?
          </q-card-section>
          <q-toggle v-if="title !== 'Delete Project' && title === 'Edit Project'"
            :label="`Status is ${projects.status ? 'Deployed' : 'In Progress'} `" v-model="projects.status" lazy-rules
            :rules="[val => val && val.length > 0 || 'This is required']" />
          <div>
            <q-btn v-if="title === 'Delete Project'" label="Delete" type="submit" color="red" />
            <q-btn v-else label="Submit" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Close" @click="close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'AddNewProjectModal',
  setup() {
    const $q = useQuasar()
    return {
      triggerPositive() {
        $q.notify({
          type: 'positive',
          message: 'Project was submitted'
        })
      },
      triggerInfo() {
        $q.notify({
          type: 'info',
          message: 'Project was updated'
        })
      },
      triggerNegative() {
        $q.notify({
          type: 'negative',
          message: 'Project was deleted'
        })
      }
    }
  },
  data() {
    return {
      projects: {
        id: 0,
        title: '',
        description: '',
        status: null,
        author: '',
        encoded_by: '',
        date_created: ''
      }
    }
  },
  props: ['vData', 'fModal', 'title'],
  computed: {
    ...mapGetters({
      loggedIn: 'appStore/loggedIn',
      currentUser: 'appStore/currentUser',
      qProjects: 'moduleExample/qProjects',
      submitStatus: 'appStore/submitStatus'
    })
  },
  watch: {
    vData: {
      handler(val) {
        if (val) {
          this.projects.id = val.id
          this.projects.title = val.title
          this.projects.description = val.description
          this.projects.author = val.author
          this.projects.encoded_by = val.encoded_by
          this.projects.status = val.status,
            this.projects.date_created = val.date_created
        } else {
          this.projects.id = 0
          this.projects.title = ''
          this.projects.description = ''
          this.projects.author = ''
          this.projects.encoded_by = ''
          this.projects.status = '',
            this.projects.date_created = ''
        }
      },
      immediate: true
    }

  },
  methods: {
    async getQProjects() {
      await this.$store.dispatch('appStore/getQProjects')
      this.loading = false
    },
    async saveProject() {
      let data = {
        id: this.projects.id,
        title: this.projects.title,
        description: this.projects.description,
        author: this.projects.author,
        encoded_by: this.currentUser.firstname + ' ' + this.currentUser.lastname,
        date_created: this.projects.date_created
      }
      const result = await this.$store.dispatch('appStore/saveProject', data)
      console.log('result :', result.status)
      this.submitStatus === 200 ? (() => { this.close(); this.triggerPositive(); this.getQProjects(); })() : null
    },
    async saveEditProject() {
      let data = {
        id: this.projects.id,
        title: this.projects.title,
        description: this.projects.description,
        author: this.projects.author,
        status: this.projects.status,
        encoded_by: this.currentUser.firstname + ' ' + this.currentUser.lastname,
        date_created: this.projects.date_created
      }
      const result = await this.$store.dispatch('appStore/saveEditProject', data)
      this.submitStatus === 200 ? (() => { this.close(); this.triggerInfo(); this.getQProjects(); })() : null
      this.getQProjects()
    },
    async deleteProject() {
      let data = {
        id: this.projects.id
      }
      const callNotif = { ...this.triggerNegative }
      console.log(callNotif);
      await this.$store.dispatch('appStore/confirmDeleteProject', data)
      this.submitStatus === 200 ? (() => { this.close(); this.triggerNegative(); this.getQProjects(); })() : null
      this.getQProjects()

    },
    submitForm() {
      console.log('action: ', this.title)
      this.title === 'Add New Project' ? this.saveProject() : this.title === 'Edit Project' ? this.saveEditProject() : this.deleteProject()
    },
    close() {
      this.$emit('close')
    }
  }
}) 
</script>