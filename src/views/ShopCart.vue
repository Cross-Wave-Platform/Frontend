<template>
    <div id="shopcart">
      <v-row>
        <v-col cols=10>
          <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
              <v-card-title>我的資料</v-card-title>
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
                  <v-card>
                      <v-card-title class="text-h5">確定要刪除此變項?</v-card-title>
                      <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">確認</v-btn>
                      <v-spacer></v-spacer>
                      </v-card-actions>
                  </v-card>
              </v-dialog>
          </v-card>
        </v-col>
        <v-col cols=2>
          <v-navigation-drawer
            style="top:50px;background-color:rgba(255, 255, 255, 0.0);"
            absolute
            permanent
            right
          >
            <v-list dense>
              <v-list-item>
                <v-select
                  :items="OptionJoin"
                  item-text="method"
                  item-value="value"
                  v-model="exportContent.mergeMethod"
                  label="合併方式"
                ></v-select>
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
                  <v-btn dark color=primary @click="exportFile">匯出</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
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
      shopcart: [],
      select: false,
      deleteall: false,
      header: [
        { text: '', value: 'delAction', sortable: false },
        { text: '變項代碼', align: 'center', value: 'problem_id' },
        { text: '變項敘述', align: 'center', value: 'topic' },
        // { text: '回答選項', align: 'center', value: 'answerTag' },
        { text: '構面', align: 'center', value: 'class' },
        { text: '存有類型', value: 'typeAction' },
        { text: '存有波次', value: 'waveAction' }
      ],
      tableType: [],
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      exportContent: {
        mergeMethod: '',
        fileFormat: ''
      },
      OptionJoin: [
        {
          method: 'Inner Join',
          value: 'inner'
        },
        {
          method: 'Outer Join',
          value: 'outer'
        },
        {
          method: 'Union',
          value: 'union'
        }
      ],
      OptionExport: ['CSV', 'SAV'],

      searchResult: [],
      problemList: [],
      facetList: [],
      problemsForStore: []
    }
  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  methods: {
    deleteItem (item) {
      this.editedIndex = this.problemList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      if (this.deleteall) {
        this.problemList = []
      } else {
        this.problemList.splice(this.editedIndex, 1)
        for (let i = this.editedIndex; i < this.problemList.length; i++) { this.problemList[i].index-- }
      }
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.deleteall = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    delete_all () {
      this.deleteall = true
      this.dialogDelete = true

      axios.delete('/api/searchApp/delProblem')
        .catch((err) => { console.err(err) })
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
          // Facet
          for (let i = 0; i < this.problemList.length; i++) {
            for (let i = 0; i < this.searchResult.length; i++) {
              const keyword = this.searchResult[i].class
              if (!this.facetList.length || this.facetList.indexOf(keyword) === -1) {
                this.facetList.push(keyword)
              }
            }
            this.problemList[i].index = i
            this.tableType[i] = this.searchResult[i].exist[0].type
          }
        })
    },

    exportFile () {
      this.changeApiFormat()
      axios.post('/api/searchApp/storeProblem', {
        problemList: this.problemsForStore
      })
        .then(res => {
          axios({
            url: '/api/fileApp/export',
            method: 'GET',
            responseType: 'blob',
            params: {
              mergeMethod: this.exportContent.mergeMethod,
              fileFormat: this.exportContent.fileFormat.toLowerCase()
            }
          }).then((res) => {
            const fileURL = window.URL.createObjectURL(new Blob([res.data]))
            const fileLink = document.createElement('a')

            fileLink.href = fileURL
            this.exportContent.fileFormat === 'CSV'
              ? fileLink.setAttribute('download', 'output.zip') : fileLink.setAttribute('download', 'output.sav')
            document.body.appendChild(fileLink)

            fileLink.click()
          })
        })
    },

    changeApiFormat () {
      for (let i = 0; i < this.problemList.length; i++) {
        const item = {
          problem_id: this.problemList[i].pid,
          survey_id: this.problemList[i].survey_id
        }
        this.problemsForStore.push(item)
      }
    }
  },

  mounted () {
    axios.get('/api/searchApp/getProblem').then((res) => {
      this.shopcart = res.data.data.problemList
      if (this.shopcart.length) {
        this.getSearchProblem()
      }
    })
  },

  beforeDestroy () {
    this.changeApiFormat()
    axios.post('/api/searchApp/storeProblem', {
      problemList: this.problemsForStore
    })
  }
}
</script>
