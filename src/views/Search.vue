<template>
    <div id="search">
        <v-row>
            <v-col cols=2 id="Combo">
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>
                                <h3>欲合併之問卷組合</h3>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                        <v-list-item-content>
                            月齡組:
                            <v-btn-toggle multiple dense v-model="selectedMonthOld">
                                <v-btn v-for="monthOld in monthOldList" :key="monthOld.monthOld"
                                    rounded
                                    depressed
                                    :value="monthOld.value"
                                    :disabled="lockCombo"
                                >
                                    {{monthOld.monthOld}}
                                </v-btn>
                            </v-btn-toggle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            問卷類型:
                            <v-btn-toggle multiple dense v-model="selectedQuestionnaireType">
                                <v-btn v-for="type in questionnaireTypeList" :key="type.type"
                                    rounded
                                    depressed
                                    :value="type.value"
                                    :disabled="lockCombo"
                                >
                                    {{type.type}}
                                </v-btn>
                            </v-btn-toggle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-btn
                            @click="getWaveList"
                            :disabled="lockCombo"
                            color="primary">
                            搜尋存有波次
                        </v-btn>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            波次:
                            <v-select
                                dense
                                v-model="selectedWave"
                                :items="waveList"
                                :disabled="lockCombo || omitConditions"
                                item-text="wave"
                                chips
                                label="請先選擇月齡組以及問卷類型"
                                multiple
                                outlined
                            ></v-select>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-btn rounded @click="getColList" v-if="!lockCombo">綁定</v-btn>
                        <v-btn rounded @click="unlockCombination" v-else>解除綁定</v-btn>
                        <!-- <v-spacer></v-spacer>
                        <v-btn rounded @click="reset">恢復預設</v-btn> -->
                    </v-list-item>
                </v-list>
            </v-col>

            <v-divider vertical ></v-divider>

            <v-col cols=10 no-gutters>

                <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
                    <template id="facetFilter" v-if="facetList.length">
                      <v-card-title class="font-weight-bold">構面篩選</v-card-title>
                      <v-chip-group
                          v-model="selectedFacet"
                          column
                          multiple
                      >
                          <v-chip v-for="facet in facetList" :key="facet" :value="facet" filter outlined>
                              {{ facet }}
                          </v-chip>
                      </v-chip-group>
                    </template>

                    <v-card-title>
                        <span class="font-weight-bold">搜尋結果</span>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="searchKeyword"
                            prepend-inner-icon="mdi-magnify"
                            label="請輸入變項編碼或變項敘述"
                            single-line
                            hide-details
                        ></v-text-field>

                        <v-tooltip bottom>
                          <template v-slot:activator="{on, attrs}">
                            <v-btn
                              text
                              v-bind="attrs"
                              v-on="on"
                              @click="StoreProblem"
                            >
                              <v-icon>mdi-plus-thick</v-icon>
                            </v-btn>
                          </template>
                          <span>加入我的資料</span>
                        </v-tooltip>

                        <!-- <v-tooltip bottom v-model="addBtnTTip">
                          加入我的資料
                        </v-tooltip>

                        <v-btn
                          icon
                          @click="StoreProblem"
                          @mouseover="addBtnTTip = true"
                          @mouseleave="addBtnTTip = false"
                        >
                          <v-icon>mdi-plus-thick</v-icon>
                        </v-btn> -->

                        <!-- <v-btn rounded @click="StoreProblem">
                          <v-icon>mdi-plus-thick</v-icon>
                          加入我的資料
                        </v-btn> -->

                    </v-card-title>
                    <v-card-text>顯示{{facetMenu.length}}筆</v-card-text>
                    <v-data-table
                        v-model="selectedCol"
                        :headers="header"
                        :search="searchKeyword"
                        :items="facetMenu"
                        :items-per-page="5"
                        item-key="pid"
                        show-select
                        style="background-color:rgba(255, 255, 255, 0.4);"
                    >
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
                </v-card>
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
      monthOldList: [
        {
          monthOld: '小/3月齡組',
          value: 1
        },
        {
          monthOld: '大/36月齡組',
          value: 2
        }
      ],
      questionnaireTypeList: [
        {
          type: '家長',
          value: 2
        },
        {
          type: '親友',
          value: 3
        },
        {
          type: '教保/教師',
          value: 1
        }
      ],
      waveList: [],
      facetList: [],

      searchResult: [],

      omitConditions: true,
      lockCombo: false,

      selectedFacet: [],
      selectedMonthOld: [],
      selectedQuestionnaireType: [],
      selectedWave: [],
      selectedCol: [],
      problemsForStore: [],
      shopcart: [],
      searchKeyword: '',
      showWave: false,

      tableType: ['none'],

      header: [
        { text: '變項代碼', align: 'center', value: 'problem_id' },
        { text: '變項敘述', align: 'center', value: 'topic' },
        // { text: '回答選項', align: 'center', value: 'answerTag' },
        { text: '構面', align: 'center', value: 'class' },
        { text: '存有類型', value: 'typeAction' },
        { text: '存有波次', value: 'waveAction', sortable: false }
      ],

      color: '#673AB7',
      addBtnTTip: false,
      dialogUnlock: false,
      checkArray: [],
      unsaveProblem: false,
      drawer: false
    }
  },

  computed: {
    facetMenu () {
      if (this.selectedFacet.length > 0) {
        return this.searchResult.filter(item => {
          return this.selectedFacet.indexOf(item.class) !== -1
        })
      } else {
        return this.searchResult
      }
    }
  },

  watch: {
    selectedMonthOld: function () {
      if (this.selectedMonthOld.length > 1 && this.selectedQuestionnaireType.length > 1) {
        this.showWarning('跨問卷類型僅限同月齡組！')
        const tempelement = this.selectedMonthOld[this.selectedMonthOld.length - 1]
        this.selectedMonthOld = []
        this.selectedMonthOld.push(tempelement)
      }
      if (!this.omitConditions) {
        this.omitConditions = true
        this.waveList = []
        this.selectedWave = []
      }
    },
    selectedQuestionnaireType: function () {
      if (this.selectedMonthOld.length > 1 && this.selectedQuestionnaireType.length > 1) {
        this.showWarning('跨月齡組僅限同問卷類型!')
        const tempelement = this.selectedQuestionnaireType[this.selectedQuestionnaireType.length - 1]
        this.selectedQuestionnaireType = []
        this.selectedQuestionnaireType.push(tempelement)
      }
      if (!this.omitConditions) {
        this.omitConditions = true
        this.waveList = []
        this.selectedWave = []
      }
    },

    selectedWave: function () {
      if (this.selectedWave.length > 1) {
        if (this.selectedMonthOld.length > 1) {
          this.showWarning('跨月齡組僅限同波次!')
          const tempelement = this.selectedWave[this.selectedWave.length - 1]
          this.selectedWave = []
          this.selectedWave.push(tempelement)
        }
        if (this.selectedQuestionnaireType.length > 1) {
          this.showWarning('跨問卷類型僅限同波次!')
          const tempelement = this.selectedWave[this.selectedWave.length - 1]
          this.selectedWave = []
          this.selectedWave.push(tempelement)
        }
      }
    },

    selectedCol: function () {
      if (this.selectedCol.length !== this.shopcart.length) {
        this.unsaveProblem = true
      } else if (this.shopcart.length === 0 && this.selectedCol.length === 0) {
        this.unsaveProblem = false
      } else {
        this.checkArray = this.selectedCol.filter(item => {
          return this.shopcart.findIndex(problem => {
            return problem.problem_id === item.pid && this.arrayEquality(problem.survey_id, item.survey_id)
          }) !== -1
        })
        this.unsaveProblem = (this.checkArray.length !== this.shopcart.length)
      }
    }
  },

  methods: {
    showWarning (warning) {
      this.$swal({
        title: warning,
        text: '2秒後自動關閉。',
        icon: 'warning',
        timer: 2000
      }).then(
        function (dismiss) {
          if (dismiss === 'timer') {
            // console.log('I was closed by the timer')
          }
        }
      )
    },

    getWaveList () {
      if (!this.selectedMonthOld.length || !this.selectedQuestionnaireType.length) {
        this.$swal({ title: '請選擇月齡組及問卷類型', icon: 'warning' })
        return
      }
      this.omitConditions = false
      // Search Wave
      axios.get('/api/searchApp/searchWave',
        {
          params: { ageType: this.selectedMonthOld, surveyType: this.selectedQuestionnaireType }
        })
        .then((res) => {
          this.waveList = res.data.data.wave
          this.selectedWave = []
        })
    },
    getColList () {
      // lockCombo
      if (this.selectedWave.length) {
        axios.post('/api/searchApp/storeCombo', {
          info: {
            age_type: this.selectedMonthOld,
            survey_type: this.selectedQuestionnaireType,
            wave: this.selectedWave
          }
        })
        // .catch((err) => {
        //   // console.error(err)
        // })
        this.getSearchProblem()
      } else {
        this.$swal({
          title: '選項不能為空!',
          text: '請檢查所有選項',
          icon: 'warning'
        })
      }
    },

    getSearchProblem () {
      axios.get('/api/searchApp/searchProblem')
        .then((res) => {
          this.searchResult = res.data.data.info
          for (let i = 0; i < this.searchResult.length; i++) {
            const keyword = this.searchResult[i].class
            if (!this.facetList.length || this.facetList.indexOf(keyword) === -1) {
              this.facetList.push(keyword)
            }
            this.tableType[i] = this.searchResult[i].exist[0].type
            this.searchResult[i].index = i
          }
          this.lockCombo = true
          this.showWave = true
        })
        // .catch((err) => { console.err(err) })
    },

    unlockCombination () {
      this.$swal({
        title: '確定解除綁定嗎',
        text: '解除綁定將會清空我的資料!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消',
        confirmButtonText: '解除綁定！'
      }).then((result) => {
        if (result.value) {
          this.$swal(
            '解除綁定！',
            '我的資料已被清空',
            'success'
          )
          this.lockCombo = false
          axios.delete('/api/searchApp/delCombo')
          // .catch((err) => { console.err(err) })
          axios.delete('/api/searchApp/delProblem')
          // .catch((err) => { console.err(err) })

          this.omitConditions = true
          this.selectedWave = []
          this.selectedFacet = []
          this.waveList = []
          this.searchResult = []
          this.facetList = []
        }
      })
    },

    TableWave (index) {
      return this.searchResult[index].exist.filter(item => {
        const target = this.tableType[index].toLowerCase()
        const type = item.type.toLowerCase()
        return target === type
      })
    },

    StoreProblem () {
      if (!this.selectedCol.length) {
        this.$swal({
          title: '請選取資料',
          icon: 'warning'
        })
        return
      }

      this.problemsForStore = []
      for (let i = 0; i < this.selectedCol.length; i++) {
        const item = {
          problem_id: this.selectedCol[i].pid,
          survey_id: this.selectedCol[i].survey_id
        }
        this.problemsForStore.push(item)
      }
      axios.post('/api/searchApp/storeProblem', {
        problemList: this.problemsForStore
      })

      this.$swal({
        title: '已成功加入我的資料!',
        icon: 'success'
      })
      this.shopcart = this.problemsForStore
      this.unsaveProblem = false
    },

    arrayEquality (arr1, arr2) {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1) return false
      }
      return true
    },

    preventNav (event) {
      if (!this.unsaveProblem) return
      event.preventDefault()
      // Chrome requires returnValue to be set.
      event.returnValue = ''
    }
  },

  beforeMount () {
    window.addEventListener('beforeunload', this.preventNav)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('beforeunload', this.preventNav)
    })
  },

  beforeRouteLeave (to, from, next) {
    if (this.unsaveProblem) {
      if (!window.confirm('資料尚未加入我的資料，請問是否離開頁面')) {
        return
      }
    }
    next()
  },
  mounted () {
    // getCombo
    axios.get('/api/searchApp/getCombo').then((res) => {
      this.selectedMonthOld = res.data.data.info.age_type
      this.selectedQuestionnaireType = res.data.data.info.survey_type
      this.waveList = res.data.data.info.wave
      this.selectedWave = res.data.data.info.wave

      if (this.selectedMonthOld.length || this.selectedQuestionnaireType.length || this.selectedWave.length) {
        // Get Search Problem
        this.getSearchProblem()
        axios.get('/api/searchApp/searchProblem')
          .then((res) => {
            this.searchResult = res.data.data.info
            for (let i = 0; i < this.searchResult.length; i++) {
              const keyword = this.searchResult[i].class
              if (!this.facetList.length || this.facetList.indexOf(keyword) === -1) {
                this.facetList.push(keyword)
              }
              this.tableType[i] = this.searchResult[i].exist[0].type
              this.searchResult[i].index = i
            }
            this.lockCombo = true
            this.showWave = true

            // Get Problem
            axios.get('/api/searchApp/getProblem').then((res) => {
              this.shopcart = res.data.data.problemList
              if (this.shopcart.length) {
                this.selectedCol = this.searchResult.filter(item => {
                  return this.shopcart.findIndex(problem => problem.problem_id === item.pid) !== -1
                })
              }
            })
          })
          // .catch((err) => { console.err(err) })
      }
    })
  }
}
</script>

<style scoped>
#Combo {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
