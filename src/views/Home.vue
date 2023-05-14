<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col md="6">
          <v-card
            max-width="600px"
            class="mx-auto"
          >
            <v-carousel
              cycle
              height="450px"
              v-model="model"
              interval="3000"
            >
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item"
              >
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col md="6">
          <v-card
            height="450px"
            outlined
            tile
            color="rgba(256,256,256,0.1)"
            elevation="6"
          >
            <v-card-title>
              公告
            </v-card-title>
            <v-data-table
              :headers="header"
              :items="announcementList"
              :items-per-page="5"
              sort-by="-id"
              style="background-color:rgba(255, 255, 255, 0.0);"
            >
              <template v-slot:item.searchAction="{ item }">
                <v-btn text @click="searchAnnouncement(item)">
                  <v-icon>
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="searchDialog" max-width="1000">
        <v-card>
          <v-card-text>
            <v-textarea
              v-model="title"
              label="標題"
              rows="3"
              auto-grow
              readonly
            >
            </v-textarea>
            <v-textarea
              v-model="contents"
              label="內容"
              auto-grow
              readonly
            >
            </v-textarea>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      model: 0,
      announcementList: [],
      items: [
        'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
      ],
      header: [
        { text: '標題', align: 'center', value: 'title', sortable: false },
        { text: '詳細內容', align: 'end', value: 'searchAction', sortable: false }
      ],
      searchDialog: false,
      title: '',
      contents: ''
    }
  },
  methods: {
    searchAnnouncement (item) {
      const config = {
        url: '/api/announcementApp/queryAnnouncement',
        method: 'get',

        params: {
          id: item.id
        }
      }
      axios(config)
        .then((res) => {
          this.title = res.data.data.title
          this.contents = res.data.data.contents
        })
      this.searchDialog = true
    }
  },
  mounted () {
    axios.get('/api/announcementApp/listAnnouncement').then((res) => {
      this.announcementList = res.data.data
    })
  }
}
</script>
