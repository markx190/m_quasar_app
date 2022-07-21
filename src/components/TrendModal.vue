<template>
  <q-dialog v-if="fModal" :model-value="true" full-width>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <q-avatar size="55px" color="orange">{{ Array.from(projects.author)[0] }}</q-avatar>
      </q-card-section>
      <q-form @submit="submitComment" class="q-gutter-md" ref="form">
        <q-card-section class="q-pt-none">
          <q-icon name="add_comment" size="2em" />Title: {{ projects.title }}<br>
          <b>Description: </b> {{ projects.description }}
        </q-card-section>
        <div class="q-mt-sm q-mr-md q-gutter-sm">
          <q-editor v-model="forums.comment" :definitions="{
            bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
          }" lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
        </div>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn flat label="Close" @click="close" v-close-popup />
        </q-card-actions>
      </q-form>

      <div class="q-pa-md q-gutter-md">
        <q-item-label header>
          <q-icon name="3p" size="3em"></q-icon>Colleagues's Comments and Suggestions
        </q-item-label>
        <q-list bordered class="rounded-borders" style="max-width: 1850px" v-for="com in qComments" :key="com">


          <q-item clickable v-ripple>
            <q-item-section avatar>
              <!-- <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar> -->
              <q-avatar size="40px" color="cyan">{{ Array.from(com.encoded_by)[0] }}</q-avatar>
            </q-item-section>

            <q-item-section>
              <!-- <q-item-label lines="1">Brunch this weekend?</q-item-label> -->
              <q-item-label caption lines="2">
                <span class="text-weight-bold">{{ com.encoded_by }}</span>
                -- {{ com.comment }}
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              1 min ago
            </q-item-section>
          </q-item>
          <!-- <q-separator inset="item" /> -->
        </q-list>
      </div>
    </q-card>

  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'TrendModal',
  data() {
    return {
      projects: {
        id: 0,
        title: '',
        description: '',
        status: null,
        author: '',
        encoded_by: '',
        date_created: '',
        comment: ''
      },
      forums: {
        id: 0,
        comment: '',
        encoded_by: '',
        user_id_no: '',
        project_id_no: ''
      },
      pageError: ''
    }
  },
  props: ['vData', 'vForum', 'fModal'],
  computed: {
    ...mapGetters({
      loggedIn: 'appStore/loggedIn',
      currentUser: 'appStore/currentUser',
      qProjects: 'appStore/qProjects',
      submitStatus: 'appStore/submitStatus',
      qComments: 'commentStore/qComments'
    })
  },

  watch: {
    vForum: {
      handler(val) {
        if (val) {
          this.forums.id = val.id,
            this.forums.comment = val.comment
        } else {
          this.forums.id = 0,
            this.forums.comment = ''
        }

      }
    },
    vData: {
      handler(val) {
        if (val) {
          this.projects.id = val.id
          this.projects.title = val.title
          this.projects.description = val.description
          this.projects.author = val.author
          this.projects.encoded_by = val.endoded_by

          this.projects.comment = val.comment,
            this.getQComments(this.projects.id)

        } else {
          this.projects.id = 0
          this.projects.title = ''
          this.projects.description = ''
          this.projects.author = ''
          this.projects.encoded_by = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    async getQComments() {
      let data = {
        id: this.projects.id
      }
      const result = await this.$store.dispatch('commentStore/getQComments', data)
      console.log('com: ', result);
      !result ? this.pageError = '...Network Error: Connection Refused' : null
    },
    async submitComment() {
      console.log('project id: ', this.projects.id)
      let data = {
        comment: this.forums.comment,
        encoded_by: this.currentUser.firstname + ' ' + this.currentUser.lastname,
        user_id_no: this.currentUser.id,
        project_id_no: this.projects.id
      }
      const result = await this.$store.dispatch('commentStore/submitComment', data)
      result.request.status === 200 ? (() => { this.close(); this.triggerPositive(); })() : null
    },
    close() {
      this.$emit('close')
      this.projects = {
        comment: ''
      }
    }
  },

  setup() {
    const $q = useQuasar()
    return {
      triggerPositive() {
        $q.notify({
          type: 'positive',
          message: 'Comment was submitted'
        })
      },
      triggerInfo() {
        $q.notify({
          type: 'info',
          message: 'Comment was updated'
        })
      },
      triggerNegative() {
        $q.notify({
          type: 'negative',
          message: 'Comment was deleted'
        })
      }
    }
  },

}) 
</script>