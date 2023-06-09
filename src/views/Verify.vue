<template>
<div>
  <v-container>
    <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
      <v-card-title>
          信箱認證
      </v-card-title>
      <v-card-actions>
        <v-btn
        color="primary"
        @click="$router.push('/')"
        >
          回到首頁
        </v-btn>
      </v-card-actions>
      <v-dialog
        width="600"
        v-model="successResponse"
      >
        <v-card>
          <v-card-title justify="center">
            信箱認證成功
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-dialog
      width="600"
      v-model="failResponse"
      >
        <v-card>
          <v-card-title justify="center">
            信箱認證失敗
          </v-card-title>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Verify',
  data () {
    return {
      successResponse: false,
      failResponse: false
    }
  },
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
        this.successResponse = true
      })
      .catch((err) => {
        this.errorMsg = err
        this.failResponse = true
      })
  }
}
</script>
