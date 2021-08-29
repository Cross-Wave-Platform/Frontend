<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <v-app-bar-title>
        <span style="cursor: pointer" @click="$router.push('/')">
          幼兒發展資料庫
        </span>
      </v-app-bar-title>

      <!-- <v-img
        src="https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/12465938_539406982888206_5102129001026077151_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ywEtmtgKUBUAX9JO0rK&tn=TKrYiZZRW55v75Rf&_nc_ht=scontent.ftpe7-3.fna&oh=81e7e153f6d44bd7839a61d20e71cac9&oe=612BB1A8"
      >
      </v-img> -->
      <v-spacer></v-spacer>
      <span style="cursor: pointer" @click="$router.push('/Profile')">
        Username
      </span>
      <v-divider
        vertical
        class="mx-4"
      ></v-divider>
      <v-dialog
        v-model="dialog"
        max-width="700px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="mr-2">mdi-login</v-icon>
            <span>Login</span>
          </v-btn>
        </template>
        <v-sheet>
          <v-container
            fluid
            class="ma-0 pa-0"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="4"
              >
                <v-card
                  :elevation="0"
                  tile
                  fill-height
                >
                  <v-img
                    src="https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/12465938_539406982888206_5102129001026077151_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ywEtmtgKUBUAX9JO0rK&tn=TKrYiZZRW55v75Rf&_nc_ht=scontent.ftpe7-3.fna&oh=81e7e153f6d44bd7839a61d20e71cac9&oe=612BB1A8"
                    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                  >
                  </v-img>
                </v-card>
              </v-col>
              <v-col
                cols="8"
              >
                <v-card
                  :elevation="0"
                  tile
                >
                  <v-tabs
                    v-model="loginTab"
                    grow
                  >
                    <v-tab>
                      已有帳號登入
                    </v-tab>
                    <v-tab>
                      創建新的帳號
                    </v-tab>
                  </v-tabs>
                  <v-tabs-items
                    v-model="loginTab"
                  >
                    <v-tab-item>
                      <v-card
                        class="pa-4"
                      >
                        <v-form
                          ref="loginForm"
                          v-model="loginValid"
                          lazy-validation
                        >
                          <v-text-field
                            v-model="account"
                            :rules="accountRules"
                            label="E-mail address"
                            outlined
                            required
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            outlined
                            required
                            dense
                          ></v-text-field>
                          <v-btn
                            :disabled="!loginValid"
                            color="success"
                            @click="login"
                            block
                          >
                            Login
                          </v-btn>
                        </v-form>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card
                        class="pa-4"
                      >
                        <v-form
                          ref="registerForm"
                          v-model="registerValid"
                          lazy-validation
                        >
                          <v-text-field
                            v-model="username"
                            :rules="usernameRules"
                            label="Username"
                            outlined
                            required
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="account"
                            :rules="accountRules"
                            label="E-mail address"
                            outlined
                            required
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            outlined
                            required
                            dense
                          ></v-text-field>
                          <v-checkbox
                            v-model="privacyCheckbox"
                            :rules="[v => !!v || 'You must agree to continue!']"
                            required
                            dense
                            class="ma-0"
                          >
                            <template v-slot:label>
                              <div>
                                I agree this
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on }">
                                    <a
                                      target="_blank"
                                      href="https://vuetifyjs.com"
                                      @click.stop
                                      v-on="on"
                                    >
                                      Privacy
                                    </a>
                                  </template>
                                  Opens in new window
                                </v-tooltip>
                              </div>
                            </template>
                          </v-checkbox>
                          <v-btn
                            :disabled="!registerValid"
                            color="success"
                            @click="register"
                            block
                          >
                            Register
                          </v-btn>
                        </v-form>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-dialog>
    </v-app-bar>
    <v-main>
      <v-tabs
        v-model="mainTab"
        background-color="secondary"
        text-color="primary"
        grow
      >
        <v-tab
          v-for="item in tabItems"
          :key="'Tab_'+item.index"
          class="font-weight-bold"
          :to="item.path"
        >
          {{item.name}}
        </v-tab>
      </v-tabs>
      <v-container
        fluid
        background-color="transparent"
      >
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    mainTab: null,
    loginTab: null,
    dialog: false,
    showPassword: false,
    loginValid: true,
    registerValid: true,
    username: null,
    account: null,
    password: null,
    privacyCheckbox: false,
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length < 15) || 'Username must be less than 15 characters'
    ],
    accountRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be longer than 8 characters'
    ],
    tabItems: [
      {
        index: 0,
        name: '最新消息',
        path: '/'
      },
      {
        index: 1,
        name: '資料匯入',
        path: '/DataImport'
      },
      {
        index: 2,
        name: '資料查詢',
        path: '/'
      },
      {
        index: 3,
        name: '合併分析',
        path: '/export'
      },
      {
        index: 4,
        name: '權限管理',
        path: '/admin'
      },
      {
        index: 5,
        name: '歷史紀錄',
        path: '/'
      },
      {
        index: 6,
        name: '問題回報',
        path: '/ProblemReport'
      },
      {
        index: 7,
        name: '聯繫我們',
        path: '/ContactUs'
      }
    ]
  }),
  methods: {
    login () {
      this.$refs.loginForm.validate()
    },
    register () {
      this.$refs.registerForm.validate()
    }
  }
}
</script>

<style>
.logo {
  height: 100px;
  width: 100px;
  margin-top: -50px;
}
#app {
  /* background-image: url('https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/12465938_539406982888206_5102129001026077151_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ywEtmtgKUBUAX9JO0rK&tn=TKrYiZZRW55v75Rf&_nc_ht=scontent.ftpe7-3.fna&oh=81e7e153f6d44bd7839a61d20e71cac9&oe=612BB1A8'),
                    rgba(0, 0, 0, 0.3);
  background-repeat: no-repeat,
                     no-repeat;
  background-size: center/40% cover,
                   cover; */
                   /* url('https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/12465938_539406982888206_5102129001026077151_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ywEtmtgKUBUAX9JO0rK&tn=TKrYiZZRW55v75Rf&_nc_ht=scontent.ftpe7-3.fna&oh=81e7e153f6d44bd7839a61d20e71cac9&oe=612BB1A8') */
  background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), center/40% url('https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/12465938_539406982888206_5102129001026077151_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ywEtmtgKUBUAX9JO0rK&tn=TKrYiZZRW55v75Rf&_nc_ht=scontent.ftpe7-3.fna&oh=81e7e153f6d44bd7839a61d20e71cac9&oe=612BB1A8')
  /* background: center/40% url('https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/12465938_539406982888206_5102129001026077151_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ywEtmtgKUBUAX9JO0rK&tn=TKrYiZZRW55v75Rf&_nc_ht=scontent.ftpe7-3.fna&oh=81e7e153f6d44bd7839a61d20e71cac9&oe=612BB1A8') */
   no-repeat !important;
  background-size: cover;
}
</style>
