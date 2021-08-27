<template>
  <div class="usermanage">
    <div>
        <v-card flat>
          <v-card-text>
            <v-col
              class="d-flex"
              cols="12"
            >
              <v-text-field
                label="關鍵字搜尋-用戶名稱及信箱"
                v-model="input_user.keyword"
              ></v-text-field> <!-- 關鍵字輸入 -->

              <v-select
                :items="OptionState"
                label="篩選(身份)"
                v-model="input_user.option"
              ></v-select>
            </v-col>
            <p>
              搜尋狀態: {{ input_user.option }} {{ input_user.keyword.length ? ">> "+input_user.keyword:"" }}
            </p>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Account ID</th>
                    <th>Email</th>
                    <th>State</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                  v-for="(item,index) in titleMenuUsers"
                  :key="item.id"
                  style="font-size:16;"
                  v-show="(page-1)*15<=index&&index<page*15">
                    <td>{{ item.id }}</td>
                    <td>{{ item.account }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.state }}</td>
                    <td>
                      <v-btn v-b-modal.modal-user text>
                        <v-icon left>mdi-pencil</v-icon>編輯
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="10"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
    </div>
    <b-modal id="modal-user" title="BootstrapVue">
        <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
<script>
import axios from 'axios'
export default {
  name: 'UserManage',
  data () {
    return {
      page: 1,
      menuUsers: [],
      input_user: {
        option: '全部會員',
        keyword: ''
      },
      OptionState: ['全部會員','管理員','使用者','黑名單'],
    }
  },
  computed: {
    typeMenuUsers(){
        if(this.input_user.option === '全部會員'){
            return this.menuUsers
        }else{
            return this.menuUsers.filter(item =>{
                return item.state === this.input_user.option
            })
        }
    },
    titleMenuUsers(){
        if(this.input_user.keyword){
            return this.typeMenuUsers.filter(item =>{
                return (
                    item.account.toLowerCase().indexOf
                      (this.input_user.keyword.toLowerCase())!==-1
                    ||item.email.toLowerCase().indexOf
                      (this.input_user.keyword.toLowerCase())!==-1
                )
            })
        }else{
            return this.typeMenuUsers
        }
    }
  },
  mounted () {
    axios.get('http://localhost:8000/Users').then((res) => {
      this.menuUsers = res.data
    })
  }

}

</script>
