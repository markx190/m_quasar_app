<template>
  <q-page>
    <div class="q-pa-md">
      <q-btn color="primary" label="Add New Record" icon="camera_enhance" class="q-mb-sm" @click="openAdd" />
      <q-input borderless dense debounce="300" color="primary" placeholder="Search" v-model="filter">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <AddModal :fModal="medium" :vData="records" :title="formTitle" @close="closeDialog" @hide="closeDialog" />
      <q-table title="Students" :rows="qStudents" :columns="columns" :filter="filter" :loading="loading"
        row-key="title">
        <template #loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn round icon="mode_edit" color="primary" @click="openEdit(props.row)" class="q-mr-sm" />
            <q-btn round icon="delete" color="red" @click="deleteModal(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import AddModal from 'components/AddModal.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    AddModal
  },
  setup() {
    return {
      columns,
      loading,
      filter
    }
  },
  data() {
    return {
      medium: false,
      formTitle: "",
      formAction: "",
      records: {
        id: 0,
        title: "",
        description: "",
        published: null
      }
    }
  },

  computed: {
    ...mapGetters({
      loggedIn: 'appStore/loggedIn',
      currentUser: 'appStore/currentUser',
      qStudents: 'moduleExample/qStudents'
    })
  },

  mounted() {
    this.getQStudents()
    console.log('current: ', this.loggedIn)
    !this.currentUser ? this.$router.push('/') : this.$router.push('/student_list')
  },
  methods: {
    async getQStudents() {
      await this.$store.dispatch('moduleExample/getQStudents')
      this.loading = false
    },
    openEdit(row) {
      this.medium = true
      this.formTitle = "Edit Record"
      this.records = {
        id: row.id,
        title: row.title,
        description: row.description,
        published: row.published
      }
    },
    openAdd() {
      this.medium = true
      this.formTitle = "Add New Record"
      this.records = {
        id: 0,
        title: '',
        description: ''
      }
    },
    deleteModal(row) {
      this.medium = true
      this.formTitle = "Delete Record"
      this.records = {
        id: row.id
      }
    },
    closeDialog() {
      this.medium = false
    }

  }
})
const columns = [
  {
    name: 'title',
    required: true,
    label: 'NAME',
    align: 'left',
    field: row => row.title,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'description',
    align: 'left',
    label: 'DESCRIPTION',
    field: 'description',
    sortable: true
  },
  {
    name: 'published',
    align: 'left',
    label: 'STATUS',
    field: 'published',
    sortable: true
  },
  {
    name: 'actions',
    align: 'center',
    label: 'ACTION',
    field: 'actions',
    sortable: false
  }
]
const loading = ref(true)
const filter = ref('')
</script>

