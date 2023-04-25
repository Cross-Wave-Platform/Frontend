<template>
  <div class="announcemanage">
    <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
      <v-form
          ref="passwordForm"
          v-model="passwordForm"
          lazy-validation
          class="pa-5"
          @submit.prevent="changePassword"
        >
          <v-text-field
            v-model="password.oldPassword"
            label="公告標題"
            :append-icon="showPassword.oldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword.oldPassword ? 'text' : 'password'"
            :rules="[v => !!v || 'Please enter current password.']"
            @click:append="showPassword.oldPassword = !showPassword.oldPassword"
            outlined
          >
          </v-text-field>
          <v-text-field
            v-model="password.newPassword"
            label="公告內容"
            :append-icon="showPassword.newPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword.newPassword ? 'text' : 'password'"
            :rules="[v => !!v || 'Please enter new password.']"
            @click:append="showPassword.newPassword = !showPassword.newPassword"
            outlined
          >
          </v-text-field>
          <v-btn
            dark
            color="primary"
            block
            type="submit"
            @click.prevent="changePassword"
          >
            儲存
            <v-icon right>mdi-content-save</v-icon>
          </v-btn>
        </v-form>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'AnnounceManage',

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
    }
  })
}
</script>
