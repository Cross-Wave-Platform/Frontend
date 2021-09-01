<template>
    <div id="search">
        <div>
            <v-container id="combination" fluid>
                <v-row>
                    <v-col>
                        <v-container fluid>
                            <h3>請先綁定欲合併的問卷組合</h3>
                            <v-row align="center">
                                <v-col cols=3>
                                    月齡組:
                                </v-col>
                                <v-col cols=9>
                                    <v-btn-toggle multiple v-model="selectedMonthOld">
                                        <v-btn v-for="monthOld in monthOldList" :key="monthOld.monthOld"
                                            rounded
                                            depressed
                                            :value="monthOld.value"
                                            :disabled="lockCombo"
                                            @click="monthOldIsLegal"

                                        >
                                            {{monthOld.monthOld}}
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                            <v-row align="center">
                                <v-col cols=3>
                                    問卷類型:
                                </v-col>
                                <v-col cols=9>
                                    <v-btn-toggle multiple v-model="selectedQuestionnaireType">
                                        <v-btn v-for="type in questionnaireTypeList" :key="type.type"
                                            rounded
                                            depressed
                                            :value="type.value"
                                            :disabled="lockCombo"
                                            @click="typeIsLegal"
                                        >
                                            {{type.type}}
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-btn @click="getWaveList" :disabled="lockCombo">搜尋存有波次</v-btn>
                            </v-row>
                            <v-row align="center">
                                <v-col cols=3>
                                    波次:
                                    <!-- <span v-show="omitConditions"></span> -->
                                </v-col>
                                <v-col cols=9>
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
                                </v-col>
                                <!-- <v-col cols=10>
                                    <v-btn-toggle multiple v-model="selectedWave">
                                        <v-btn v-for="wave in waveList" :key="wave.wave"
                                            rounded
                                            depressed
                                            :value="wave.value"
                                            :disabled="lockCombo"
                                            @click="waveIsLegal"
                                        >
                                            {{wave.wave}}
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col> -->
                            </v-row>
                            <v-row>
                                <v-col cols=3>
                                    <v-btn rounded @click="getColList" :disabled="lockCombo">綁定</v-btn>
                                </v-col>
                                <v-col cols=3>
                                    <v-btn rounded @click="unlockCombination">解除綁定</v-btn>
                                </v-col>
                                <v-col cols=3>
                                    <v-btn rounded @click="reset">恢復預設</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-col>
                        <h3>資料篩選</h3>

                        <label>構面:</label>
                        <v-chip-group
                            v-model="selectedFacet"
                            column
                            multiple
                        >
                            <v-chip v-for="facet in facetList" :key="facet" :value="facet" filter outlined>
                                {{ facet }}
                            </v-chip>
                        </v-chip-group>
                        <label>關鍵字搜尋: </label>
                        <v-text-field label="請輸入變項代碼/變項敘述" v-model="searchKeyword"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div id="searchResult">
            <v-card>
                <v-card-title>搜尋結果</v-card-title>
                <v-card-text>顯示{{ColMenu.length}}筆</v-card-text>
                <v-data-table
                    v-model="selectedCol"
                    :headers="header"
                    :items="ColMenu"
                    :items-per-page="5"
                    item-key="pid"
                    show-select
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
        </div>

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
          value: 'young'
        },
        {
          monthOld: '大/36月齡組',
          value: 'old'
        }
      ],
      questionnaireTypeList: [
        {
          type: '家長',
          value: 'parent'
        },
        {
          type: '親友',
          value: 'relative'
        },
        {
          type: '教保/教師',
          value: 'instructor'
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
        { text: '存有波次', value: 'waveAction' }
      ]
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
    },

    ColMenu () {
      if (this.searchKeyword) {
        return this.facetMenu.filter(item => {
          const keyword = this.searchKeyword.toLowerCase()
          const des = item.topic.toLowerCase()
          const pid = item.problem_id.toLowerCase()
          return des.indexOf(keyword) !== -1 || pid.indexOf(keyword) !== -1
        })
      } else {
        return this.facetMenu
      }
    }

  },

  methods: {
    test (item) {
      console.log(item)
    },
    monthOldIsLegal () {
      if (this.selectedMonthOld.length > 1 && this.selectedQuestionnaireType.length > 1) {
        alert('跨問卷類型僅限同月齡組!')
        const tempelement = this.selectedMonthOld[this.selectedMonthOld.length - 1]
        this.selectedMonthOld = []
        this.selectedMonthOld.push(tempelement)
      }
    },
    typeIsLegal () {
      if (this.selectedMonthOld.length > 1 && this.selectedQuestionnaireType.length > 1) {
        alert('跨月齡組僅限同問卷類型!')
        const tempelement = this.selectedQuestionnaireType[this.selectedQuestionnaireType.length - 1]
        this.selectedQuestionnaireType = []
        this.selectedQuestionnaireType.push(tempelement)
      }
    },
    getWaveList () {
      this.omitConditions = false
      this.waveList = [
        {
          wave: 'M36',
          value: 'M36'
        },
        {
          wave: 'M48',
          value: 'M48'
        },
        {
          wave: 'M60',
          value: 'M60'
        }
      ]
    },
    waveIsLegal: function () {
      if (this.selectedWave.length > 1) {
        let change = false
        if (this.selectedMonthOld.length > 1) { alert('跨月齡組僅限同波次!'); change = true }
        if (this.selectedQuestionnaireType.length > 1) { alert('跨問卷類型僅限同波次!'); change = true }
        if (change) {
          const tempelement = this.selectedWave[this.selectedWave.length - 1]
          this.selectedWave = []
          this.selectedWave.push(tempelement)
        }
      }
    },
    getColList () {
      axios.get('http://localhost:8000/SearchResult').then((res) => {
        this.searchResult = res.data
        for (let i = 0; i < this.searchResult.length; i++) {
          const keyword = this.searchResult[i].class
          if (!this.facetList.length || this.facetList.indexOf(keyword) === -1) {
            this.facetList.push(keyword)
          }
          this.tableType[i + 1] = this.searchResult[i].exist[0].type
          this.searchResult[i].index = i + 1
          console.log(this.searchResult[i].exist[0].type)
        }
        this.lockCombo = true
        this.showWave = true
      })
    },

    unlockCombination () {
      this.lockCombo = false
    },

    reset () {
      this.selectedMonthOld = []
      this.selectedQuestionnaireType = []
      this.selectedWave = []
      this.selectedFacet = []
      this.waveList = []
      this.omitConditions = true
      this.lockCombo = false
    },

    TableWave (index) {
      return this.searchResult[index].exist.filter(item => {
        const target = this.tableType[index].toLowerCase()
        const type = item.type.toLowerCase()
        return target === type
      })
    }

  }
}
</script>
