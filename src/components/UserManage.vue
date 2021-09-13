<template>
  <div class="usermanage">
    <div>
        <v-card flat color="rgba(255, 255, 255, 0.0)">
          <v-card-text>
            <v-text-field
              label="關鍵字搜尋-帳戶名稱及信箱"
              v-model="input_user.keyword"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
            <p>
              <span v-if="blacklist===0">
                搜尋狀態: {{ input_user.option }} {{ input_user.keyword.length ? ">> "+input_user.keyword:"" }}
              </span>
              <span v-if="blacklist===1">
                搜尋狀態: 黑名單 {{ input_user.keyword.length ? ">> "+input_user.keyword:"" }}
              </span>
              <v-btn-toggle
                dense
                style="float:right;"
                v-model="blacklist"
              >
                <v-btn>會員</v-btn>
                <v-btn>黑名單</v-btn>
              </v-btn-toggle>
            </p>
            <div v-if="blacklist===0">
              <v-data-table
                :headers="headers"
                :items="typeMenuUsers"
                :items-per-page="5"
                sort-by="account"
                style="background-color:rgba(255, 255, 255, 0.4);"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar
                    flat
                  >
                    <v-toolbar-title>會員資料</v-toolbar-title>
                    <v-divider
                      class="mx-4"
                      inset
                      vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-select
                      :items="OptionState"
                      v-model="input_user.option"
                    ></v-select>

                    <v-dialog
                      v-model="dialog"
                      max-width="500px"
                    >
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">會員等級變更</span>
                        </v-card-title>

                        <v-card-text>
                          <v-text-field
                            v-model="editedItem.account"
                            label="帳戶名稱"
                            readonly
                          ></v-text-field>
                          <v-text-field
                            v-model="editedItem.email"
                            label="帳戶信箱"
                            readonly
                          ></v-text-field>
                          <v-select
                            :items="EditOption"
                            v-model="editedItem.state"
                            label="帳戶等級"
                          ></v-select>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="close"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="save"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <span v-if="item.account!==username">
                    <!-- <v-btn text @click="editItem(item,'edit')">
                      <v-icon left>mdi-pencil</v-icon>編輯
                    </v-btn> --> <!--超級管理員可用-->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="editItem(item,'black')"
                        >
                          <v-icon>mdi-account-cancel</v-icon>
                        </v-btn>
                      </template>
                      <span>移至黑名單</span>
                    </v-tooltip>
                  </span>
                </template>
              </v-data-table>
            </div>
            <div v-if="blacklist===1">
              <v-data-table
                :headers="headers"
                :items="titleMenuUsers"
                :items-per-page="5"
                sort-by="account"
                style="background-color:rgba(255, 255, 255, 0.4);"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar
                    flat
                  >
                    <v-toolbar-title>黑名單</v-toolbar-title>
                    <v-divider
                      class="mx-4"
                      inset
                      vertical
                    ></v-divider>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="editItem(item,'black')"
                      >
                        <v-icon>mdi-account-arrow-left</v-icon>
                      </v-btn>
                    </template>
                    <span>從黑名單移出</span>
                  </v-tooltip>
                </template>
              </v-data-table>
            </div>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5" v-if="blacklist===0">您確定將此用戶移至黑名單嗎?</v-card-title>
                <v-card-title class="text-h5" v-if="blacklist===1">您確定將此用戶移出黑名單嗎?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeBlack">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="blackItemConfirm">確定</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-card>
    </div>
    </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
<script>
import axios from 'axios'
export default {
  name: 'UserManage',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    blacklist: 0,
    filterBtnTTip: false,
    menuUsers: [[],[]],
    username: '',
    input_user: {
      option: '全部會員',
      keyword: ''
    },
    OptionState: ['全部會員','管理員','一般會員','黑名單'],
    EditOption: ['管理員','一般會員'],
    headers: [
      {
        text: '帳戶名稱',
        align: 'start',
        sortable: false,
        value: 'account',
      },
      { text: '帳戶信箱', value: 'email' },
      { text: '帳戶等級', value: 'state' },
      { text: '', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      account: '',
      email: '',
      state: '',
    },
    defaultItem: {
      account: '',
      email: '',
      state: '',
    },
  }),

  computed: {
    typeMenuUsers(){
        if(this.input_user.option === '全部會員'){
            return this.titleMenuUsers
        }else{
            return this.titleMenuUsers.filter(item =>{
                return item.state === this.input_user.option
            })
        }
    },
    titleMenuUsers(){
        if(this.input_user.keyword){
            return this.menuUsers[this.blacklist].filter(item =>{
                return (
                    item.account.toLowerCase().indexOf
                      (this.input_user.keyword.toLowerCase())!==-1
                    ||item.email.toLowerCase().indexOf
                      (this.input_user.keyword.toLowerCase())!==-1
                )
            })
        }else{
            return this.menuUsers[this.blacklist]
        }
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeBlack()
    }
  },

  methods: {
    editItem (item,string) {
        this.editedIndex = this.menuUsers[this.blacklist].indexOf(item)
        this.editedItem = Object.assign({}, item)
        if(string=='edit')
          this.dialog = true
        else if(string=='black')
          this.dialogDelete = true
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    blackItemConfirm () {
      if(this.blacklist===0){
        this.editedItem.state = '黑名單'
        axios.put('/api/adminApp/change_auth',{
          user: this.editedItem.account, userlevel: 'blacklist'
        }).then((res)=>{
          console.log('移至黑名單')
        }).catch(function (error) {
          console.log(error);
        })
      }else{
        this.editedItem.state = '一般會員'
        axios.put('/api/adminApp/change_auth',{
          user: this.editedItem.account, userlevel: 'member'
        }).then((res)=>{
          console.log('移出黑名單')
        }).catch(function (error) {
          console.log(error);
        })
      }
      this.menuUsers[(this.blacklist+1)%2].push(this.editedItem)
      this.menuUsers[this.blacklist].splice(this.editedIndex, 1)
      this.closeBlack()
    },

    closeBlack () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      Object.assign(this.menuUsers[0][this.editedIndex], this.editedItem)
      let data={
        user: this.editedItem.account,
        userlevel: ''
      }
      if(this.editedItem.state=='管理員') data.userlevel='admin'
      else if(this.editedItem.state=='一般會員') data.userlevel='member'
      else data.userlevel='blacklist'
      axios.put('/api/adminApp/change_auth',data)
      this.close()
    },
  },
  mounted () {
    axios.get('/api/adminApp/user_management',{
      params: { Identity: 'All' }
    }).then((res) => {
      for(let i=0;i<res.data.data.length;i++){
        let arr = ['管理員','一般會員','黑名單']
        let item={
          account: res.data.data[i].account_name,
          email: res.data.data[i].email,
          state: arr[res.data.data[i].auth-1]
        }
        this.menuUsers[0].push(item)
      }
    }).catch(function (error) {
      console.log(error);
    }),

    axios.get('/api/adminApp/user_management',{
      params: { Identity: 'blacklist' }
    }).then((res) => {
      for(let i=0;i<res.data.data.length;i++){
        let item={
          account: res.data.data[i].account_name,
          email: res.data.data[i].email,
          state: '黑名單'
        }
        this.menuUsers[1].push(item)
      }
    }).catch(function (error) {
      console.log(error);
    }),

    axios.get('/api/personalApp/loadInfo').then((res)=>{
      this.username=res.data.data.account_name
      console.log(res.data.data)
    })
  }
}

</script>
