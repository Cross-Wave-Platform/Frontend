<template>
  <div class="datamanage">
    <v-card flat>
        <v-card-text>
        <v-text-field
            label="關鍵字搜尋-資料名稱"
            v-model="input_data.keyword"
            ></v-text-field> <!-- 關鍵字輸入 -->
        <v-col
            class="d-flex"
            cols="12"
        >
            <v-select
                :items="groupofData"
                label="月齡組"
                v-model="input_data.group"
            ></v-select>
            <v-select
                :items="monthofData"
                label="波次/月齡"
                v-model="input_data.month"
            ></v-select>
            <v-select
                :items="typeofData"
                label="問卷類型"
                v-model="input_data.type"
            ></v-select>
            <v-select
                :items="releaseState"
                label="釋出狀態"
                v-model="input_data.state"
            ></v-select>
        </v-col>
        <p>
            搜尋狀態: {{ input_data.group }} >>
                    {{ input_data.month }} >>
                    {{ input_data.type }} >>
                    {{ input_data.state }}
                    {{ input_data.keyword.length ?  '>> ': ''}}
                    {{ input_data.keyword }}
        </p>
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th>檔案名稱</th>
                <th>釋出狀態</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in titleMenuData" :key="item.id" style="font-size:16;">
                <td>{{ item.title }}</td>
                <td>{{ item.state ? "已釋出" : "未釋出" }}</td>
                <td>
                    <v-btn text v-b-modal.modal-data>
                    <v-icon left>mdi-pencil</v-icon>編輯
                    </v-btn>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        </v-card-text>
    </v-card>
    <b-modal id="modal-data" title="BootstrapVue">
        <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
<script>
import axios from 'axios'
export default {
  name: 'DataManage',
  data () {
    return {
      menuData: [],
      input_data: {
        group: '全部',
        month: '全部',
        type: '全部',
        state: '全部',
        keyword: ''
      },
      groupofData: ['全部','大月齡組','小月齡組'],
      monthofData: ['全部','3月齡','6月齡','9月齡','12月齡','24月齡','36月齡'],
      typeofData: ['全部','家長','親友','教保/教師'],
      releaseState: ['全部','已釋出','未釋出'],
    }
  },
  computed: {
    typeMenuDataForGroup(){
        if(this.input_data.group === '全部'){
            return this.menuData
        }else{
            return this.menuData.filter(item =>{
                return item.month === this.input_data.group
            })
        }
    },
    typeMenuDataForMonth(){
        if(this.input_data.month === '全部'){
            return this.typeMenuDataForGroup
        }else{
            return this.typeMenuDataForGroup.filter(item =>{
                return item.wave === this.input_data.month
            })
        }
    },
    typeMenuDataForType(){
        if(this.input_data.type === '全部'){
            return this.typeMenuDataForMonth
        }else{
            return this.typeMenuDataForMonth.filter(item =>{
                return item.people === this.input_data.type
            })
        }
    },
    typeMenuDataForState(){
        if(this.input_data.state === '全部'){
            return this.typeMenuDataForType
        }else if(this.input_data.state === '已釋出'){
            return this.typeMenuDataForType.filter(item =>{
                return item.state;
            })
        }else{
            return this.typeMenuDataForType.filter(item =>{
                return !item.state;
            })
        }
    },
    titleMenuData(){
        if(this.input_data.keyword){
            return this.typeMenuDataForState.filter(item =>{
                return (
                    item.title.toLowerCase().indexOf
                        (this.input_data.keyword.toLowerCase()!==-1)
                    )
            })
        }else{
            return this.typeMenuDataForState
        }
    }
  },
  mounted () {
    axios.get('http://localhost:8000/Datas').then((res) => {
      this.menuData = res.data
    })
  }
}
</script>
