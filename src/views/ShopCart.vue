<template>
    <div id="shopcart">
      <v-row>
        <v-col cols=10>
          <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
              <v-card-title class="font-weight-bold">我的資料</v-card-title>
              <v-data-table
                  :headers="header"
                  :items="problemList"
                  :items-per-page="5"
                  item-key="pid"
                  sort-by="pid"
                  style="background-color:rgba(255, 255, 255, 0.0);"
              >
                  <template v-slot:header.delAction>
                      <v-icon @click="delete_all">
                          mdi-delete
                      </v-icon>
                  </template>
                  <template v-slot:item.delAction="{ item }">
                      <v-icon @click="deleteItem(item)">
                          mdi-delete
                      </v-icon>
                  </template>
                  <template v-slot:item.typeAction="{ item }">
                      <v-select
                          v-model="tableType[item.index]"
                          :items="item.exist"
                          item-text="type"
                      >
                      </v-select>
                  </template>
                  <template v-slot:item.waveAction="{ item }">
                      <div>
                          <label>小月齡組:</label>
                          <span v-for="wave in TableWave(item.index)[0].young" :key="wave"> {{wave}} </span>
                      </div>
                      <div>
                          <label>大月齡組: </label>
                          <span v-for="wave in TableWave(item.index)[0].old" :key="wave"> {{wave}} </span>
                      </div>
                  </template>
              </v-data-table>

              <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card class="elevation-8">
                      <v-container fluid>
                      <v-row justify="center">
                        <v-card-title class="text-h5" v-if="deleteAll">確定要刪除所有變項?</v-card-title>
                        <v-card-title class="text-h5" v-else>確定要刪除此變項?</v-card-title>
                      </v-row>
                      <v-row justify="center" class="mt-5 mb-2">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
                          <v-btn color="blue darken-1" text @click="deleteItemConfirm">確認</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-row>
                    </v-container>
                  </v-card>
              </v-dialog>

              <v-dialog v-model="waveDialog" max-width="500px" scrollable persistent>
                  <v-card class="elevation-8">
                      <v-container fluid>
                      <v-row justify="center">
                        <v-card-title class="text-h5">請選擇波次</v-card-title>
                      </v-row>
                      <v-divider></v-divider>
                        <v-select
                          v-model="waveSelect"
                          :items="waveList"
                          >
                        </v-select>
                      <v-divider></v-divider>
                      <v-row justify="center" class="mt-5 mb-2">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeWaveDialog">取消</v-btn>
                          <v-btn color="blue darken-1" text @click="waveConfirm">確認</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-row>
                    </v-container>
                  </v-card>
              </v-dialog>
              <v-dialog
                v-model="innerJoin"
                max-width="650px"
              >
                <v-card>
                  <v-container>
                    <v-row justify="center">
                      <v-card-title>
                        Inner Join
                      </v-card-title>
                    </v-row>
                    <v-row>
                      <v-card-text>
                        匯出資料檔中的樣本，為勾選的資料檔的每一個波次皆完訪的樣本（亦即全勤樣本）。輸出資料格式為一個樣本一列，變項往右展開（wide format）。
                      </v-card-text>
                    </v-row>
                    <img
                      :src="require('@/assets/innerJoin.png')"
                      style="width: 600px"
                    >
                  </v-container>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="outerJoin"
                max-width="650px"
              >
                <v-card>
                  <v-container>
                    <v-row justify="center">
                      <v-card-title>
                        Outer Join
                      </v-card-title>
                    </v-row>
                    <v-row>
                      <v-card-text>
                        匯出資料檔中的樣本，為勾選的資料檔的任何一個波次曾經完訪的樣本。輸出資料格式為一個樣本一列，變項往右展開（wide format）。
                      </v-card-text>
                    </v-row>
                    <img
                      :src="require('@/assets/outerJoin.png')"
                      style="width: 600px"
                    >
                  </v-container>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="unionJoin"
                max-width="650px"
              >
                <v-card>
                  <v-container>
                    <v-row justify="center">
                      <v-card-title>
                        Union
                      </v-card-title>
                    </v-row>
                    <v-row>
                      <v-card-text>
                        匯出資料檔中的樣本，為勾選的資料檔的任何一個波次曾經完訪的樣本。輸出資料格式為一個樣本會有一列以上，每一個變項只會往右列出一次，波次則是往下展開（long format） 。
                      </v-card-text>
                    </v-row>
                    <img
                      :src="require('@/assets/union.png')"
                      style="width: 300px"
                    >
                  </v-container>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="leftJoin"
                max-width="650px"
              >
                <v-card>
                  <v-container>
                    <v-row justify="center">
                      <v-card-title>
                        Left Join
                      </v-card-title>
                    </v-row>
                    <v-row>
                      <v-card-text>
                        匯出資料檔中的樣本，為勾選的資料檔的第一個波次曾經完訪的樣本。輸出資料格式為一個樣本一列，變項往右展開（wide format）。
                      </v-card-text>
                    </v-row>
                    <img
                      :src="require('@/assets/leftJoin.png')"
                      style="width: 600px"
                    >
                  </v-container>
                </v-card>
              </v-dialog>
          </v-card>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col cols=2>
          <v-list dense style="background-color:rgba(255, 255, 255, 0.0);">
            <v-list-item>
              <v-select
                :items="OptionJoin"
                item-value="value"
                v-model="exportContent.mergeMethod"
                label="合併方式"
              >
                <template slot='selection' slot-scope='{ item }'>
                  <v-row>
                    <v-col justify="start">{{ item.method }}</v-col>
                  </v-row>
                </template>
                <template slot='item' slot-scope='{ item }'>
                  <v-row>
                    <v-col justify="start">{{ item.method }}</v-col>
                    <v-col justify="end" md="1">
                    </v-col>
                  </v-row>
                </template>
              </v-select>
            </v-list-item>
            <v-list-item>
              <v-radio-group
                  v-model="exportContent.fileFormat"
                  column
                  label="匯出方式"
              >
                  <v-radio v-for="item in OptionExport" :key="item" :label="item" :value="item"></v-radio>
              </v-radio-group>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn dark color=primary @click="exportFile" :disabled="exportDialog">匯出</v-btn>
              </v-list-item-content>
            </v-list-item>

                <v-dialog
                v-model="exportDialog"
                hide-overlay
                persistent
                width="400"
              >
                <v-card class="elevation-8 pb-3">
                  <v-container fluid>
                    <v-row justify="center">
                      <h2 class="mt-5">
                        正在合併資料，請勿跳轉頁面
                      </h2>
                    </v-row>
                    <v-row justify="center" class="mt-5 mb-2">
                      <v-progress-circular
                          indeterminate
                          color="secondary"
                          :size="36"
                      ></v-progress-circular>
                    </v-row>
                  </v-container>
                </v-card>
              </v-dialog>
          </v-list>
        </v-col>
      </v-row>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'search',
  data () {
    return {
      waveSelect: '',
      shopcart: [],
      select: false,
      deleteAll: false,
      header: [
        { text: '', value: 'delAction', sortable: false },
        { text: '問題編碼', align: 'center', value: 'problem_id' },
        { text: '問題敘述', align: 'center', value: 'topic' },
        // { text: '回答選項', align: 'center', value: 'answerTag' },
        { text: '主構面', align: 'center', value: 'class', filterable: false },
        { text: '次構面', align: 'center', value: 'subclass' },
        { text: '存有類型', value: 'typeAction' },
        { text: '存有波次', value: 'waveAction', sortable: false }
      ],
      tableType: [],
      waveList: [],
      dialogDelete: false,
      waveDialog: false,
      editedIndex: -1,
      editedItem: {},
      exportContent: {
        mergeMethod: '',
        fileFormat: ''
      },
      OptionJoin: [
        {
          method: 'Inner Join',
          value: 'inner',
          icon: 'mdi-set-center',
          text: '交集，資料為"橫著併"'
        },
        {
          method: 'Outer Join',
          value: 'outer',
          icon: 'mdi-set-all',
          text: '聯集，資料為"橫著併"，若有闕漏者補空白'
        },
        {
          method: 'Union',
          value: 'union',
          icon: 'mdi-set-all',
          text: '聯集，資料為"直著併"，闕漏者不補空白'
        },
        {
          method: 'Left Join',
          value: 'left',
          icon: 'mdi-set-all',
          text: '資料向選定對齊，其餘省略'
        }
      ],
      OptionExport: ['CSV', 'SAV'],

      innerJoin: false,
      outerJoin: false,
      unionJoin: false,
      leftJoin: false,

      searchResult: [],
      problemList: [],
      facetList: [],
      problemsForStore: [],
      exportDialog: false
    }
  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
    'exportContent.mergeMethod': function () {
      if (this.exportContent.mergeMethod === 'left') {
        this.leftJoin = true
        this.waveDialog = true
      } else if (this.exportContent.mergeMethod === 'inner') {
        this.innerJoin = true
      } else if (this.exportContent.mergeMethod === 'outer') {
        this.outerJoin = true
      } else if (this.exportContent.mergeMethod === 'union') {
        this.unionJoin = true
      }
    }
  },
  methods: {
    deleteItem (item) {
      this.editedIndex = this.problemList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      if (this.deleteAll) {
        this.problemList = []
      } else {
        this.problemList.splice(this.editedIndex, 1)
        for (let i = this.editedIndex; i < this.problemList.length; i++) { this.problemList[i].index-- }
        if (!this.problemList.length) {
          axios.delete('/api/searchApp/delProblem')
          // .catch((err) => { console.err(err) })
        } else {
          this.changeApiFormat()
          axios.post('/api/searchApp/storeProblem', {
            problemList: this.problemsForStore
          })
        }
      }
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.deleteAll = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    delete_all () {
      this.deleteAll = true
      this.dialogDelete = true

      axios.delete('/api/searchApp/delProblem')
      // .catch((err) => { console.err(err) })
    },
    TableWave (index) {
      return this.problemList[index].exist.filter(item => {
        const target = this.tableType[index].toLowerCase()
        const type = item.type.toLowerCase()
        return target === type
      })
    },
    getSearchProblem () {
      axios.get('/api/searchApp/searchProblem')
        .then((res) => {
          this.searchResult = res.data.data.info
          this.problemList = this.searchResult.filter(item => {
            return this.shopcart.findIndex(problem => problem.problem_id === item.pid) !== -1
          })
          this.waveList = this.problemList[0].exist[0].young
          if (this.waveList.length === 0) {
            this.waveList = this.problemList[0].exist[0].old
          }
          // Facet
          for (let i = 0; i < this.problemList.length; i++) {
            for (let j = 0; j < this.problemList[i].exist.length; j++) {
              if (this.problemList[i].exist[j].type === 'parent') this.problemList[i].exist[j].type = '家長'
              else if (this.problemList[i].exist[j].type === 'relative') this.problemList[i].exist[j].type = '親友'
              else if (this.problemList[i].exist[j].type === 'teacher') this.problemList[i].exist[j].type = '教保/教師'
            }
            this.problemList[i].index = i
            this.tableType[i] = this.problemList[i].exist[0].type
          }
        })
    },
    closeWaveDialog () {
      this.waveSelect = ''
      this.exportContent.mergeMethod = ''
      this.waveDialog = false
    },
    waveConfirm () {
      if (this.waveSelect === '') {
        this.$swal({ title: '請選擇波次', icon: 'warning' })
        this.exportContent.mergeMethod = ''
        return
      }
      this.waveDialog = false
    },

    exportApi () {
      axios({
        url: '/api/fileApp/export',
        method: 'GET',
        responseType: 'blob',
        params: {
          mergeMethod: this.exportContent.mergeMethod,
          fileFormat: this.exportContent.fileFormat.toLowerCase(),
          wave: this.waveSelect
        }
      }).then((res) => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]))
        const fileLink = document.createElement('a')

        fileLink.href = fileURL
        this.exportContent.fileFormat === 'CSV'
          ? fileLink.setAttribute('download', 'output.zip') : fileLink.setAttribute('download', 'output.sav')
        document.body.appendChild(fileLink)

        fileLink.click()

        this.exportDialog = false
      })
    },

    exportFile () {
      if (!this.problemList.length) {
        this.$swal({
          title: '我的資料是空的，請選取資料',
          icon: 'warning'
        })
        return
      }
      if (this.exportContent.mergeMethod === '' || this.exportContent.fileFormat === '') {
        this.$swal({ title: '請選擇合併方式及匯出檔案格式', icon: 'warning' })
        return
      }
      if (this.exportContent.mergeMethod === 'left' && this.waveSelect === '') {
        this.$swal({ title: '請選擇合併主要波次', icon: 'warning' })
        return
      }
      this.exportDialog = true
      this.exportApi()
    },

    changeApiFormat () {
      this.problemsForStore = []

      for (let i = 0; i < this.problemList.length; i++) {
        const item = {
          problem_id: this.problemList[i].pid,
          survey_id: this.problemList[i].survey_id
        }
        this.problemsForStore.push(item)
      }
    }

    // preventNav (event) {
    //   if (this.problemList.length === this.shopcart.length) return
    //   event.preventDefault()
    //   // Chrome requires returnValue to be set.
    //   event.returnValue = ''
    // }
  },

  // beforeMount () {
  //   window.addEventListener('beforeunload', this.preventNav)
  //   this.$once('hook:beforeDestroy', () => {
  //     window.removeEventListener('beforeunload', this.preventNav)
  //   })
  // },

  mounted () {
    axios.get('/api/searchApp/getProblem').then((res) => {
      this.shopcart = res.data.data.problemList
      if (this.shopcart.length) {
        this.getSearchProblem()
      }
    })
  }

  // beforeDestroy () {
  //   if (!this.problemList.length) {
  //     axios.delete('/api/searchApp/delProblem')
  //       .catch((err) => { console.err(err) })
  //     return
  //   }
  //   this.changeApiFormat()
  //   axios.post('/api/searchApp/storeProblem', {
  //     problemList: this.problemsForStore
  //   })
  // }
}
</script>
