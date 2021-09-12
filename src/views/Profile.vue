<template>
  <v-tabs
    vertical
  >
    <v-tab
      style="width: 200px"
    >
      個人資訊
    </v-tab>
    <v-tab>
      修改密碼
    </v-tab>
    <v-tab>
      修改暱稱
    </v-tab>

    <v-tab-item
      transition="fade-transition" reverse-transition="fade-transition"
    >
      <v-container
        class="mx-8"
      >
        <v-row
          v-for="item in info"
          :key="item.title"
          align="center"
          class="my-n4"
        >
          <v-col
            cols="3"
          >
            <v-subtitle
              class="primary--text font-weight-bold"
              justify="center"
            >
              {{item.title}}
            </v-subtitle>
          </v-col>
          <v-col
            cols="9"
          >
            <v-text-field
              :value="item.content"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-tab-item>

    <v-tab-item
      transition="fade-transition" reverse-transition="fade-transition"
    >
      <v-card>
        <v-form
          ref="passwordForm"
          v-model="passwordForm"
          lazy-validation
          class="pa-5"
        >
          <v-text-field
            v-model="password.oldPassword"
            label="Current Password"
            :append-icon="showPassword.oldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword.oldPassword ? 'text' : 'password'"
            :rules="[v => !!v || 'Please enter current password.']"
            @click:append="showPassword.oldPassword = !showPassword.oldPassword"
            outlined
          >
          </v-text-field>
          <v-text-field
            v-model="password.newPassword"
            label="New Password"
            :append-icon="showPassword.newPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword.newPassword ? 'text' : 'password'"
            :rules="[v => !!v || 'Please enter new password.']"
            @click:append="showPassword.newPassword = !showPassword.newPassword"
            outlined
          >
          </v-text-field>
          <v-text-field
            v-model="password.confirm"
            label="Confirm New Password"
            :append-icon="showPassword.confirm ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword.confirm ? 'text' : 'password'"
            :rules="[v => !!v && v===password.newPassword || 'You should enter the same password with the new one.']"
            @click:append="showPassword.confirm = !showPassword.confirm"
            outlined
          >
          </v-text-field>
        </v-form>
        <v-btn
          dark
          color="primary"
          block
        >
          Save
          <v-icon right>mdi-content-save</v-icon>
        </v-btn>
      </v-card>
    </v-tab-item>
    <v-tab-item
      transition="fade-transition" reverse-transition="fade-transition"
    >
      <v-card>
        <v-form
          ref="nameForm"
          v-model="nameForm"
          lazy-validation
          class="pa-5"
        >
          <v-text-field
            v-model="name"
            label="New Username"
            :rules="[v => !!v || 'Please enter new username.']"
            outlined
          >
          </v-text-field>
        </v-form>
        <v-btn
          dark
          color="primary"
          block
        >
          Save
          <v-icon right>mdi-content-save</v-icon>
        </v-btn>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Profile',

  data: () => ({
    passwordForm: false,
    showPassword: {
      oldPassword: false,
      newPassword: false,
      confirm: false
    },
    password: {
      oldPassword: '',
      newPassword: ''
    },
    nameForm: false,
    name: '',
    userdata: null
  }),
  beforeMount () {
    this.loadInfo()
  },
  computed: {
    info: function () {
      if (this.userdata == null) {
        return [
          {
            title: '註冊E-mail',
            content: ''
          },
          {
            title: '暱稱',
            content: ''
          },
          {
            title: '使用者身分',
            content: ''
          }
        ]
      }
      var ret = [
        {
          title: '註冊E-mail',
          content: this.userdata.email
        },
        {
          title: '暱稱',
          content: this.userdata.nickname
        }
      ]
      if (this.userdata.auth === 1) { ret.push({ title: '使用者身分', content: '管理員' }) } else { ret.push({ title: '使用者身分', content: '一般會員' }) }
      return ret
    }
  },
  methods: {
    loadInfo () {
      const config = {
        url: '/api/personalApp/loadInfo',
        method: 'get'
      }
      axios(config)
        .then((res) => {
          console.log(res.data.data)
          this.userdata = res.data.data
        })
    }
  }
}
</script>
