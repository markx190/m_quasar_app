<template>
  <q-dialog v-if="fModal" :model-value="true">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="submitForm" class="q-gutter-md" ref="form">
          <q-input v-if="title !== 'Delete Record'" filled v-model="records.title" label="Title" hint="Content Title"
            lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          <q-input v-if="title !== 'Delete Record'" filled v-model="records.description" label="Description"
            hint="Content Description" lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          <q-card-section v-else class="q-pt-none">
            Are you sure you want to delete this record?
          </q-card-section>
          <q-toggle v-if="title !== 'Delete Record' && title === 'Edit Record'"
            :label="`Status is ${records.published ? 'Published' : 'Pending'} `" v-model="records.published" />
          <div>
            <q-btn v-if="title === 'Delete Record'" label="Delete" type="submit" color="red" />
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
  name: 'AddModal',
  setup() {
    const $q = useQuasar()
    return {
      triggerPositive() {
        $q.notify({
          type: 'positive',
          message: 'Form was submitted'
        })
      }
    }
  },
  data() {
    return {
      records: {
        id: 0,
        title: "",
        description: "",
        published: null
      },
      blueModel: false
    }
  },
  props: ['vData', 'fModal', 'title'],
  computed: {
    ...mapGetters('moduleExample', [
      'qStudents',
      'submitResponse'
    ])
  },
  watch: {
    vData: {
      handler(val) {
        if (val) {
          this.records.id = val.id
          this.records.title = val.title
          this.records.description = val.description
        } else {
          this.records.id = 0
          this.records.title = ""
          this.records.description = ""
        }
      },
      immediate: true
    }

  },
  methods: {
    async getQStudents() {
      await this.$store.dispatch('moduleExample/getQStudents')
      this.loading = false
    },
    async saveContent() {
      let data = {
        id: this.records.id,
        title: this.records.title,
        description: this.records.description
      }
      const result = await this.$store.dispatch('moduleExample/saveContent', data)
      console.log('result :', result.status)
      this.submitResponse === 200 ? (() => { this.close(); this.triggerPositive(); this.getQStudents(); })() : this.submitResponse

    },
    async saveEditContent() {
      console.log('edit: ', this.records.title)
      let data = {
        id: this.records.id,
        title: this.records.title,
        description: this.records.description,
        published: this.records.published
      }
      const result = await this.$store.dispatch('moduleExample/saveEditContent', data)
      this.submitResponse === 200 ? (() => { this.close(); this.triggerPositive(); this.getQStudents(); })() : this.submitResponse
      this.getQStudents()
    },
    async deleteRecord() {
      let data = {
        id: this.records.id
      }
      const callNotif = { ...this.triggerPositive }
      console.log(callNotif);
      await this.$store.dispatch('moduleExample/confirmDeleteRecord', data)
      this.submitResponse === 200 ? (() => { this.close(); this.triggerPositive(); this.getQStudents(); })() : this.submitResponse
      this.getQStudents()

    },
    submitForm() {
      console.log('action: ', this.title)
      this.title === 'Add New Record' ? this.saveContent() : this.title === 'Edit Record' ? this.saveEditContent() : this.deleteRecord()
    },
    close() {
      this.$emit('close')
    }
  }
}) 
</script>