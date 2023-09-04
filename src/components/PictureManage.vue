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
        <v-btn color="error">
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
        <v-btn color=primary>
          新增
        </v-btn>
        <v-btn color="error">
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
        <v-btn color=primary>
          新增
        </v-btn>
        <v-btn color="error">
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
        <v-btn color=primary>
          新增
        </v-btn>
        <v-btn color="error">
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
            :src="item"
          >
          </v-carousel-item>
        </v-carousel>
      </v-col>
      </v-row>
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
      items: [
        'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
      ]
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
        })
    }
  }
}
</script>
