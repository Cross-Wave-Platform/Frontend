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
              搜尋狀態: {{ input_user.option }} {{ input_user.keyword.length ? ">> "+input_user.keyword:"" }}
            </p>
            <v-data-table
              :headers="headers"
              :items="typeMenuUsers"
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
                  <template>
                    <v-select
                      :items="OptionState"
                      v-model="input_user.option"
                    ></v-select>
                  </template>

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
                <v-btn text @click="editItem(item)">
                  <v-icon left>mdi-pencil</v-icon>編輯
                </v-btn>
              </template>
            </v-data-table>
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
    menuUsers: [],
    input_user: {
      option: '全部會員',
      keyword: ''
    },
    OptionState: ['全部會員','管理員','一般會員','黑名單'],
    EditOption: ['管理員','一般會員','黑名單'],
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
      id: '',
      account: '',
      email: '',
      state: '',
    },
    defaultItem: {
      id: '',
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
            return this.menuUsers.filter(item =>{
                return (
                    item.account.toLowerCase().indexOf
                      (this.input_user.keyword.toLowerCase())!==-1
                    ||item.email.toLowerCase().indexOf
                      (this.input_user.keyword.toLowerCase())!==-1
                )
            })
        }else{
            return this.menuUsers
        }
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.menuUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      Object.assign(this.menuUsers[this.editedIndex], this.editedItem)
      this.close()
    },
  },
  mounted () {
    axios.get('http://localhost:8000/Users').then((res) => {
      this.menuUsers = res.data
    })
  }
}

</script>
