<template>
  <q-dialog v-if="fModal" :model-value="true" full-width>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <q-avatar size="55px" color="orange">{{ Array.from(projects.author)[0] }}</q-avatar>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-icon name="forum" size="2em" />Title: {{ projects.title }}<br>
        <b>Description: </b> {{ projects.description }}
      </q-card-section>
      <div class="q-pa-md q-gutter-sm">
        <q-editor v-model="forum" :definitions="{
          bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
        }" />
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
  name: 'TrendModal',
  setup() {
    const $q = useQuasar()
    return {
      forum: ref('Here we are overriding the <b>bold</b> command to include a label instead of an icon and also changing its tooltip.'),
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
    close() {
      this.$emit('close')
    }
  }


}) 
</script>