<template>
  <q-page>
    <div class="q-pa-md">
      <q-btn color="primary" label="Add New Project" icon="camera_enhance" class="q-mb-sm" @click="openAdd" />

      <q-input borderless dense debounce="300" color="primary" placeholder="Search" v-model="filter">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      {{ pageError }}
      <AddNewProjectModal :fModal="medium" :vData="projects" :title="formTitle" @close="closeDialog"
        @hide="closeDialog" />
      <q-table title="PROJECTS" :rows="qProjects" :columns="columns" :filter="filter" :loading="loading"
        row-key="title">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn round icon="mode_edit" color="primary" @click="openEdit(props.row)" class="q-mr-sm" />
            <q-btn round icon="delete" color="red" @click="deleteModal(props.row)" />
          </q-td>
        </template>
        <template #loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import AddNewProjectModal from 'components/AddNewProjectModal.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    AddNewProjectModal
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
      formTitle: '',
      formAction: '',
      projects: {
        id: 0,
        title: '',
        description: '',
        status: null,
        checked_by: '',
        approved_by: ''
      },
      pageError: ''
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
    !this.currentUser ? this.$router.push('/') : this.$router.push('/project_list')
  },
  methods: {
    async getQProjects() {
      const getData = await this.$store.dispatch('appStore/getQProjects')
      this.loading = false
      console.log('result: ', getData);
      !getData ? this.pageError = '...Network Error: Connection Refused' : null
    },
    openEdit(row) {
      this.medium = true
      this.formTitle = "Edit Project"
      this.projects = {
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status,
        author: row.author,
        date_created: row.date_created,
        checked_by: row.checked_by,
        approved_by: row.approved_by
      }
    },
    openAdd() {
      this.medium = true
      this.formTitle = "Add New Project"
      this.projects = {
        id: 0,
        title: '',
        description: '',
        author: '',
        date_created: ''
      }
    },
    deleteModal(row) {
      this.medium = true
      this.formTitle = "Delete Project"
      this.projects = {
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
    label: 'TITLE',
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
    name: 'status',
    align: 'left',
    label: 'STATUS',
    field: 'status',
    sortable: true
  },
  {
    name: 'author',
    align: 'left',
    label: 'AUTHOR',
    field: 'author',
    sortable: true
  },
  {
    name: 'date_created',
    align: 'left',
    label: 'DATE COMPLETED',
    field: 'date_created',
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

