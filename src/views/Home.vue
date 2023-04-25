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
          <template
            v-for="(message,i) in messages"
          >
            <v-list-item two-line :key="message.title">
              <v-list-item-content>
                <v-list-item-title>{{ message.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ message.text }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="i"></v-divider>
          </template>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      model: 0,
      items: [
        'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
      ],
      messages: [
        {
          title: 'I am title1',
          text: 'I am subtitle'
        },
        {
          title: 'I am title2',
          text: 'I am subtitle'
        },
        {
          title: 'I am title3',
          text: 'I am subtitle'
        }
      ]
    }
  }
}
</script>
