<template>
  <div>
    <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
      <v-card-title
        class="font-weight-bold"
      >
        匯入圖片
      </v-card-title>
      <v-row>
      <v-file-input
        v-model="pictureInput"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        label="圖片檔1"
      >
      </v-file-input>
      <v-card-actions>
        <v-btn color=primary @click="inputPictureOne" >
          新增
        </v-btn>
        <v-btn color="error" @click="deletePicture(1)">
          刪除
        </v-btn>
      </v-card-actions>
      </v-row>
      <v-row>
      <v-file-input
        v-model="pictureInput2"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        label="圖片檔2"
      >
      </v-file-input>
      <v-card-actions>
        <v-btn color=primary @click="inputPictureTwo">
          新增
        </v-btn>
        <v-btn color="error" @click="deletePicture(2)">
          刪除
        </v-btn>
      </v-card-actions>
      </v-row>
      <v-row>
      <v-file-input
        v-model="pictureInput3"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        label="圖片檔3"
      >
      </v-file-input>
      <v-card-actions>
        <v-btn color=primary @click="inputPictureThree">
          新增
        </v-btn>
        <v-btn color="error" @click="deletePicture(3)">
          刪除
        </v-btn>
      </v-card-actions>
      </v-row>
      <v-row>
      <v-file-input
        v-model="pictureInput4"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        label="圖片檔4"
      >
      </v-file-input>
      <v-card-actions>
        <v-btn color=primary @click="inputPictureFour">
          新增
        </v-btn>
        <v-btn color="error" @click="deletePicture(4)">
          刪除
        </v-btn>
      </v-card-actions>
      </v-row>
      <v-row>
        <v-col md="6">
        <v-card-title class="font-weight-bold">
          圖片預覽
        </v-card-title>
        <v-carousel
          cycle
          height="450px"
          v-model="preview"
          interval="3000"
        >
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="'data:image/jpg;base64,'+ item"
          >
          </v-carousel-item>
        </v-carousel>
      </v-col>
      </v-row>
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
    </v-card>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      pictureInput: null,
      pictureInput2: null,
      pictureInput3: null,
      pictureInput4: null,
      preview: 0,
      items: [],
      deleteID: '',
      deleteDialog: false
    }
  },

  methods: {
    inputPictureOne () {
      var formData = new FormData()
      formData.append('id', 1)
      formData.append('picture', this.pictureInput)
      const config = {
        url: '/api/pictureApp/inputPicture',
        method: 'post',

        data: formData
      }
      axios(config)
        .then((res) => {
          this.pictureInput = null
        })
      this.sleep(300)
      axios.get('/api/pictureApp/listPicture').then((res) => {
        this.items = res.data.data
      })
    },
    inputPictureTwo () {
      var formData = new FormData()
      formData.append('id', 2)
      formData.append('picture', this.pictureInput2)
      const config = {
        url: '/api/pictureApp/inputPicture',
        method: 'post',

        data: formData
      }
      axios(config)
        .then((res) => {
          this.pictureInput2 = null
        })
      this.sleep(300)
      axios.get('/api/pictureApp/listPicture').then((res) => {
        this.items = res.data.data
      })
    },
    inputPictureThree () {
      var formData = new FormData()
      formData.append('id', 3)
      formData.append('picture', this.pictureInput3)
      const config = {
        url: '/api/pictureApp/inputPicture',
        method: 'post',

        data: formData
      }
      axios(config)
        .then((res) => {
          this.pictureInput3 = null
        })
      this.sleep(300)
      axios.get('/api/pictureApp/listPicture').then((res) => {
        this.items = res.data.data
      })
    },
    inputPictureFour () {
      var formData = new FormData()
      formData.append('id', 4)
      formData.append('picture', this.pictureInput4)
      const config = {
        url: '/api/pictureApp/inputPicture',
        method: 'post',

        data: formData
      }
      axios(config)
        .then((res) => {
          this.pictureInput4 = null
        })
      this.sleep(300)
      axios.get('/api/pictureApp/listPicture').then((res) => {
        this.items = res.data.data
      })
    },
    deletePicture (val) {
      this.deleteID = val
      this.deleteDialog = true
    },
    startDelete () {
      const config = {
        url: '/api/pictureApp/deletePicture',
        method: 'delete',

        data: {
          id: this.deleteID
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
    axios.get('/api/pictureApp/listPicture').then((res) => {
      this.items = res.data.data
    })
  }
}
</script>
