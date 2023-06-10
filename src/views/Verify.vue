<template>
  <div>
    <v-container>
      <template v-if="success">
        <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
          <v-card-title>
              信箱認證
          </v-card-title>
          <v-card-text>
            認證信箱成功，回到首頁開始使用。
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
      </template>
      <template v-if="fail">
        <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
          <v-card-title>
              信箱認證
          </v-card-title>
          <v-card-text>
            認證信箱失敗，請重新驗證
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
      </template>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Verify',
  data () {
    return {
      success: false,
      fail: false
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
        this.success = true
      })
      .catch((err) => {
        this.errorMsg = err
        this.fail = true
      })
  }
}
</script>
