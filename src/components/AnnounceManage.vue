<template>
  <div class="announcemanage">
    <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
      <v-card-text>
      <v-data-table
        :headers="header"
        :items="announcementList"
        :items-per-page="5"
        style="background-color:rgba(255, 255, 255, 0.0);"
        :footer-props="{'items-per-page-options': [5]}"
        >
        <template v-slot:item.deleteAction="{ item }">
          <v-btn text @click="deleteAnnouncement(item)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:item.pinAction="{ item }">
          {{ item.pinned?'已置頂':'未置頂' }}
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
        persistent
    >
      <v-card>
        <v-card-title>
          編輯公告
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="modifyTitle"
            counter
            label="公告標題"
            rows="3"
            auto-grow
          >
          </v-textarea>
          <v-textarea
            v-model="modifyContents"
            counter
            label="公告內容"
            auto-grow
          >
          </v-textarea>
          <v-switch
          v-model="modifyPinned"
          :label="`${modifyPinned==true ? '已置頂':'未置頂'}`"
          >
          </v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="closeModifyDialog"
          >
            取消
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="startModify"
          >
            確認編輯
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="deleteDialog"
        max-width="500"
    >
      <v-card>
        <v-container fluid>
          <v-row justify="center">
            <v-card-title>
              確認刪除此公告？
            </v-card-title>
          </v-row>
          <v-row justify="center">
            <v-card-actions>
              <v-btn
                color="green-darken-1"
                variant="text"
                @click="deleteDialog=false"
              >
                取消
              </v-btn>
              <v-btn
                color="primary"
                variant="text"
                @click="startDelete"
              >
                確認刪除
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-container>
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
        { text: '公告日期', align: 'start', value: 'modifyDate', sortable: false },
        { text: '公告標題', align: 'start', value: 'title', sortable: false },
        { text: '置頂狀態', align: 'end', value: 'pinAction', sortable: false },
        { text: '編輯公告', align: 'end', value: 'modifyAction', sortable: false }
      ],
      createDialog: false,
      modifyDialog: false,
      deleteDialog: false,

      createTitle: '',
      createContents: '',
      modifyTitle: '',
      modifyContents: '',
      modifyPinned: ''
    }
  },
  watch: {
    createDialog (val) {
      this.sleep(300)
      axios.get('/api/announcementApp/listAnnouncement').then((res) => {
        this.announcementList = res.data.data
      })
    },
    deleteDialog (val) {
      this.sleep(300)
      axios.get('/api/announcementApp/listAnnouncement').then((res) => {
        this.announcementList = res.data.data
      })
    },
    modifyDialog (val) {
      this.sleep(300)
      axios.get('/api/announcementApp/listAnnouncement').then((res) => {
        this.announcementList = res.data.data
      })
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
        contents: this.createContents,
        pinned: false
      })
      this.closeCreateDialog()
    },
    modifyAnnouncement (item) {
      this.editedItem = Object.assign({}, item)
      this.modifyDialog = true
      const config = {
        url: '/api/announcementApp/queryAnnouncement',
        method: 'get',

        params: {
          id: item.id
        }
      }
      axios(config)
        .then((res) => {
          this.modifyTitle = res.data.data.title
          this.modifyContents = res.data.data.contents
          this.modifyPinned = res.data.data.pinned
        })
    },
    closeModifyDialog () {
      this.modifyDialog = false
      this.modifyTitle = ''
      this.modifyContents = ''
      this.modifyPinned = ''
    },
    startModify () {
      axios.put('/api/announcementApp/updateAnnouncement', {
        id: this.editedItem.id,
        title: this.modifyTitle,
        contents: this.modifyContents,
        pinned: this.modifyPinned
      })
      this.closeModifyDialog()
    },
    deleteAnnouncement (item) {
      this.deleteItem = Object.assign({}, item)
      this.deleteDialog = true
    },
    startDelete () {
      const config = {
        url: '/api/announcementApp/deleteAnnouncement',
        method: 'delete',

        data: {
          id: this.deleteItem.id
        }
      }
      axios(config)
        .then((res) => {
        })
      this.deleteDialog = false
    },
    sleep (val) {
      var now = new Date()
      var exitTime = now.getTime() + val
      while (true) {
        now = new Date()
        if (now.getTime() > exitTime) return
      }
    }
  },
  mounted () {
    axios.get('/api/announcementApp/listAnnouncement').then((res) => {
      this.announcementList = res.data.data
    })
  }
}
</script>
