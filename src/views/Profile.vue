<template>
  <v-tabs
    vertical
  >
    <v-tab>
      個人資訊
    </v-tab>
    <v-tab>
      修改密碼
    </v-tab>
    <v-tab>
      修改暱稱
    </v-tab>

    <v-tab-item>
      <p>註冊email：example@email.com</p>
      <p>暱稱：Username</p>
      <p>使用者身分：一般成員</p>
    </v-tab-item>

    <v-tab-item>
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
    <v-tab-item>
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
    name: ''
  })
}
</script>
