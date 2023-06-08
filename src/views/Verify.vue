<template>
<div>
  <v-container>
    <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
      <v-card-title>
          信箱認證
      </v-card-title>
      <v-card-text>
        已完成信箱認證
      </v-card-text>
      <v-card-actions>
        <v-btn
        color="primary"
        @click="$router.push('/')"
        >
          回到首頁
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Verify',
  mounted () {
    const config = {
      url: '/api/loginApp/user_confirm',
      method: 'post',

      data: {
        token: this.$route.params.token
      }
    }
    axios(config)
      .then((res) => {
      })
  }
}
</script>
