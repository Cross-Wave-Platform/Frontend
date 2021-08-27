<template>
  <v-row
    justify-center
  >
    <v-col
      cols="4"
      v-for="person in developers"
      :key="person.name"
      justify-center
    >
      <v-card>
        <v-avatar
          color="primary"
          size="72"
        >
          <img
            :src="person.photo"
            :alt="person.name"
          >
        </v-avatar>
        <v-card-title>
          {{person.name}}
        </v-card-title>
        {{person.email}}
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ContactUs',

  data: () => ({
    developers: [
      {
        name: 'rabbit',
        photo: null,
        email: 'example@email.com'
      },
      {
        name: 'rabbit',
        photo: null,
        email: 'example@email.com'
      },
      {
        name: 'rabbit',
        photo: null,
        email: 'example@email.com'
      },
      {
        name: 'rabbit',
        photo: null,
        email: 'example@email.com'
      },
      {
        name: 'rabbit',
        photo: null,
        email: 'example@email.com'
      }
    ]
  })
}
</script>
