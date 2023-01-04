<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <span
        class="circle mx-1"
        style="cursor: pointer"
        @click="$router.push('/')"
      >
      </span>
      <span
        class="ml-n9 mr-5"
        style="cursor: pointer"
        @click="$router.push('/')"
      >
        <v-img
          src="./assets/KIT_LOGO.png"
          style="width: 25px"
          background-color="white"
        >
        </v-img>
      </span>
      <v-app-bar-title>
        <span style="cursor: pointer" @click="$router.push('/')">
          臺灣幼兒發展調查資料庫
        </span>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <span
        style="cursor: pointer"
        @click="$router.push('/Profile')"
        v-if="userdata.nickname!=null"
      >
        {{userdata.nickname}}
      </span>

      <v-divider
        vertical
        class="mx-4"
        v-if="userdata.nickname!=null"
      ></v-divider>

      <v-btn
        text
        to="/shopcart"
        v-if="userdata.nickname!=null"
      >
          <v-icon left>mdi-cart-outline</v-icon>
          我的資料
      </v-btn>

      <v-divider
        vertical
        class="mx-4"
        v-if="userdata.nickname!=null"
      ></v-divider>

      <v-dialog
        v-model="dialog"
        max-width="700px"
        v-if="userdata.nickname == null"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            v-bind="attrs"
            v-on="on"
            dense
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
              align="center"
            >
              <v-col
                cols="4"
              >
                  <v-img
                    src="./assets/KIT_LOGO.png"
                    gradient="to top right, rgba(255,255,255,.33), rgba(255,255,255,.7)"
                  >
                  </v-img>
                <!-- <v-card
                  :elevation="0"
                  tile
                >
                </v-card> -->
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
                    <v-tab-item
                      transition="fade-transition" reverse-transition="fade-transition"
                    >
                      <v-card
                        class="pa-4"
                      >
                        <v-form
                          ref="loginForm"
                          v-model="loginValid"
                          lazy-validation
                          @submit.prevent="login"
                        >
                          <v-text-field
                            v-model="account"
                            :rules="accountRules"
                            label="Account"
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
                            @click.prevent="login"
                            type="submit"
                            block
                          >
                            Login
                          </v-btn>
                          <v-alert
                            :value="alertPlace == 'login'"
                            :type="alertType"
                            dense
                            outlined
                            class="mt-2 mb-n1"
                          >
                            {{alertMsg}}
                          </v-alert>
                        </v-form>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item
                      transition="fade-transition" reverse-transition="fade-transition"
                    >
                      <v-card
                        class="pa-4"
                      >
                        <v-form
                          ref="registerForm"
                          v-model="registerValid"
                          lazy-validation
                          @submit.prevent="register"
                        >
                          <v-text-field
                            v-model="username"
                            :rules="usernameRules"
                            label="用戶名稱"
                            outlined
                            required
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="密碼"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            outlined
                            required
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            label="使用者姓名"
                            outlined
                            required
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="identity"
                            :rules="identityRules"
                            label="身分證字號"
                            :append-icon="showIdentity ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showIdentity ? 'text' : 'password'"
                            @click:append="showIdentity = !showIdentity"
                            outlined
                            required
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="信箱"
                            outlined
                            required
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="phone"
                            :rules="phone"
                            label="電話"
                            required
                            outlined
                            dense
                          ></v-text-field>
                          <v-text-field
                            v-model="organization"
                            :rules="organizationRules"
                            label="服務單位"
                            outlined
                            dense
                          ></v-text-field>
                          <v-select
                            v-model="status"
                            :items="statuses"
                            item-text="id"
                            item-value="value"
                            label="與KIT計畫的關係"
                            outlined
                            dense
                          ></v-select>
                          <!--<v-text-field
                            :disabled="!others"
                            v-model="otherStatus"
                            :rules="otherStatusRules"
                            label="與KIT計畫的關係"
                            outlined
                            dense
                          ></v-text-field>-->
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
                            @click.prevent="register"
                            type="submit"
                            block
                          >
                            Register
                          </v-btn>
                          <v-alert
                            :value="alertPlace == 'register'"
                            :type="alertType"
                            dense
                            outlined
                            class="mt-2 mb-n1"
                          >
                            {{alertMsg}}
                          </v-alert>
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

      <v-btn
        outlined
        dense
        v-if="userdata.nickname != null"
        @click="logout"
      >
        <v-icon class="mr-2">mdi-logout</v-icon>
        <span>Logout</span>
      </v-btn>
      <template
        v-slot:extension
        v-if="userdata.nickname != null"
      >
        <v-tabs
          v-if="userdata.nickname != null"
          v-model="mainTab"
          grow
          light
          class="mainTab"
          style="background-color: #C6D033;"
        >
          <!-- background-color="transparent"
          text-color="basil" -->
          <v-tabs-slider color="transparent"></v-tabs-slider>
          <v-tab
            v-for="item in tabItems"
            :key="'Tab_'+item.index"
            class="font-weight-bold"
            :to="item.path"
          >
            {{item.name}}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <!-- <v-tabs
        v-if="userdata.nickname != null"
        v-model="mainTab"
        background-color="secondary"
        text-color="primary"
        grow
      >
        <v-tabs-slider color="secondary"></v-tabs-slider>
        <v-tab
          v-for="item in tabItems"
          :key="'Tab_'+item.index"
          class="font-weight-bold"
          :to="item.path"
        >
          {{item.name}}
        </v-tab>
      </v-tabs> -->
      <v-container
        fluid
        background-color="transparent"
      >
        <!-- style="max-height: 90vh;" -->
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    apiURL: 'http://localhost:5000',
    mainTab: null,
    loginTab: null,
    dialog: false,
    showPassword: false,
    showIdentity: false,
    loginValid: true,
    registerValid: true,
    //  others: false,

    username: null,
    name: null,
    account: null,
    email: null,
    password: null,
    organization: null,
    identity: null,
    phone: null,
    status: null,
    //  otherStatus: null,

    alertPlace: '',
    alertType: null,
    alertMsg: '',

    privacyCheckbox: false,
    // userdata: {
    //   username: null
    // },
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length < 15) || 'Username must be less than 15 characters'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
      // v => (v && v.length >= 8) || 'Password must be longer than 8 characters'
    ],
    nameRules: [
      v => !!v || 'Name is required'
    ],
    accountRules: [
      v => !!v || 'Account is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    identityRules: [
      v => !!v || 'IdentityRules is required'
    ],
    phoneRules: [
      v => !!v || 'Phonenumber is required'
    ],
    organizationRules: [
      v => !!v || '請填寫服務單位'
    ],
    statuses: [
      { id: '計畫主持人', value: 1 },
      { id: '共同主持人', value: 2 },
      { id: '協同研究人員', value: 3 },
      { id: '駐點老師', value: 4 },
      { id: '研究助理', value: 5 },
      { id: '團隊老師指導學生', value: 6 },
      { id: '其他', value: 7 }
    ],
    allTabItems: [
      {
        index: 0,
        name: '最新消息',
        path: '/',
        auth: 3
      },
      {
        index: 1,
        name: '資料匯入',
        path: '/DataImport',
        auth: 1
      },
      {
        index: 2,
        name: '資料查詢',
        path: '/search',
        auth: 2
      },
      {
        index: 3,
        name: '權限管理',
        path: '/admin',
        auth: 1
      },
      // {
      //   index: 5,
      //   name: '歷史紀錄',
      //   path: '/'
      // },
      {
        index: 6,
        name: '問題回報',
        path: '/ProblemReport',
        auth: 2
      },
      // {
      //   index: 7,
      //   name: '聯繫我們',
      //   path: '/ContactUs'
      // }
      {
        index: 8,
        name: '權限申請',
        path: '/permission',
        auth: 2
      }
    ]
  }),
  // beforeMount () {
  //   this.loadInfo()
  // },
  watch: {
  //  status () {
  //    if (this.status === 7) {
  //      this.others = true
  //    } else {
  //      this.others = false
  //    }
  //  }
  },
  computed: {
    tabItems: function () {
      return this.allTabItems.filter(word => word.auth >= this.userdata.auth)
    },
    ...mapState({
      userdata: state => state.userdata
    })
  },
  methods: {
    loadInfo () {
      const config = {
        url: '/api/personalApp/loadInfo',
        method: 'get'
      }
      // console.log('hi')
      axios(config)
        .then((res) => {
          // console.log(res.data.data)
          // this.userdata = res.data.data
          this.$store.commit('loadUserdata', res.data.data)
        })
        .catch(() => {
          this.$store.commit('loadUserdata', { nickname: null, auth: 3 })
        })
    },
    login () {
      if (this.$refs.loginForm.validate()) {
        const config = {
          url: '/api/loginApp/login',
          method: 'post',

          data: {
            username: this.account,
            password: this.password
          }
        }
        axios(config)
          .then((res) => {
            // console.log(res.data.message)
            this.alertPlace = 'login'
            this.alertType = 'success'
            this.alertMsg = res.data.message
            // this.userdata.nickname = this.account
            this.loadInfo()
            this.dialog = false
            // this.$router.go(0)
          })
          .catch((err) => {
            // console.log(err.response.data.message)
            this.alertPlace = 'login'
            this.alertType = 'error'
            this.alertMsg = err.response.data.message
            // console.log('ERR!!!')
          })
      }
    },
    logout () {
      const config = {
        url: '/api/loginApp/logout',
        method: 'post'
      }
      axios(config)
        .then((res) => {
          // console.log('logout!!')
          this.alertPlace = ''
          // this.userdata = {
          //   nickname: null
          // }
          this.loadInfo()

          this.$router.push('/')
        })
    },
    register () {
      if (this.$refs.registerForm.validate()) {
        const config = {
          url: '/api/loginApp/register',
          method: 'post',

          data: {
            username: this.username,
            password: this.password,
            email: this.email,
            name: this.name,
            identity: this.identity,
            phone: this.phone,
            organization: this.organization,
            status: this.status
          }
        }
        axios(config)
          .then((res) => {
            // console.log(res.data.message)
            this.alertPlace = 'register'
            this.alertType = 'success'
            this.alertMsg = res.data.message
          })
          .catch((err) => {
            // console.log(err.response.data.message)
            this.alertPlace = 'register'
            this.alertType = 'error'
            this.alertMsg = err.response.data.message
            // console.log('ERR!!!')
          })
      }
    }
  }
}
</script>

<style>
/* .v-tab:not(.v-tab--active)  {
  color: #2D7535!important;

} */
/* >>> .v-tab--active {
  color: #2D7535
}
>>> .v-tab:not(.v-tab--active) {
  color: #2D7535;
} */
.basil {
  background-color: #C6D033 !important;
}
.basil--text {
  color: #2D7535 !important;
}
.circle {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%
}
.diamond {
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-bottom-color: white;
  position: relative;
  top: -20px;
}
.diamond:after {
  content: '';
  position: absolute;
  left: -20px;
  top: 20px;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-top-color:  white;
}
.logo {
  max-height: 100%;
  width: 1vw;
  margin-bottom: -100px;
  padding-bottom: -10px;
}
#app {
  /* background-image: url('https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/12465938_539406982888206_5102129001026077151_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ywEtmtgKUBUAX9JO0rK&tn=TKrYiZZRW55v75Rf&_nc_ht=scontent.ftpe7-3.fna&oh=81e7e153f6d44bd7839a61d20e71cac9&oe=612BB1A8'),
                    rgba(0, 0, 0, 0.3);
  background-repeat: no-repeat,
                     no-repeat;
  background-size: center/40% cover,
                   cover; */
                   /* url('https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/12465938_539406982888206_5102129001026077151_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ywEtmtgKUBUAX9JO0rK&tn=TKrYiZZRW55v75Rf&_nc_ht=scontent.ftpe7-3.fna&oh=81e7e153f6d44bd7839a61d20e71cac9&oe=612BB1A8') */
  /* background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), center/40% url('https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/12465938_539406982888206_5102129001026077151_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ywEtmtgKUBUAX9JO0rK&tn=TKrYiZZRW55v75Rf&_nc_ht=scontent.ftpe7-3.fna&oh=81e7e153f6d44bd7839a61d20e71cac9&oe=612BB1A8') */
  background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), right bottom/20% url('./assets/KIT_LOGO.png')
  /* background: center/40% url('https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/12465938_539406982888206_5102129001026077151_o.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ywEtmtgKUBUAX9JO0rK&tn=TKrYiZZRW55v75Rf&_nc_ht=scontent.ftpe7-3.fna&oh=81e7e153f6d44bd7839a61d20e71cac9&oe=612BB1A8') */
   no-repeat !important;
  background-size: cover;
}
</style>
