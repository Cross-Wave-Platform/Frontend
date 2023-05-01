<template>
  <div class="announcemanage">
    <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
      <v-card-text>
      <v-data-table
        :headers="header"
        :items="announcementList"
        :items-per-page="5"
        sort-by="id"
        style="background-color:rgba(255, 255, 255, 0.0);"
      >
        <template v-slot:item.deleteAction="{ item }">
          <v-btn text @click="deleteAnnouncement(item)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:item.modifyAction="{ item }">
          <v-btn text @click="modifyAnnouncement(item)">
            <v-icon>
              mdi-pencil
            </v-icon>
            編輯
          </v-btn>
        </template>
      </v-data-table>
      <div>
        <v-btn
          color="primary"
          @click="openCreateDialog"
        >
          新增公告
        </v-btn>
      </div>
      </v-card-text>
      <v-dialog
        v-model="createDialog"
        max-width="1000"
      >
        <v-card>
          <v-card-title>
            新增公告
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="createTitle"
              counter
              label="公告標題"
              rows="3"
              auto-grow
            >
            </v-textarea>
            <v-textarea
              v-model="createContents"
              counter
              label="公告內容"
              auto-grow
            >
            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeCreateDialog">
              取消
            </v-btn>
            <v-btn color="primary" @click="startCreate">
              新增
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
    <v-dialog
        v-model="modifyDialog"
        max-width="1000"
    >
      <v-card>
        <v-card-title>
          編輯公告
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="createTitle"
            counter
            label="公告標題"
            rows="3"
            auto-grow
          >
          </v-textarea>
          <v-textarea
            v-model="createContents"
            counter
            label="公告內容"
            auto-grow
          >
          </v-textarea>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AnnounceManage',
  data () {
    return {
      announcementList: [],
      header: [
        { text: '刪除', align: 'start', value: 'deleteAction', sortable: false },
        { text: '公告標題', align: 'start', value: 'title', sortable: false },
        { text: '編輯公告', align: 'end', value: 'modifyAction', sortable: false }
      ],
      createDialog: false,
      modifyDialog: false,

      createTitle: '',
      createContents: ''
    }
  },
  methods: {
    openCreateDialog () {
      this.createDialog = true
    },
    closeCreateDialog () {
      this.createTitle = ''
      this.createContents = ''
      this.createDialog = false
    },
    startCreate () {
      axios.post('/api/announcementApp/createAnnouncement', {
        title: this.createTitle,
        contents: this.createContents
      })
      this.closeCreateDialog()
    },
    modifyAnnouncement (item) {
      this.modifyDialog = true
    }
  },
  mounted () {
    axios.get('/api/announcementApp/listAnnouncement').then((res) => {
      this.announcementList = res.data.data
    })
  }
}
</script>
