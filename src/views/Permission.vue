<template>
  <v-row>
    <v-carousel
    :continuous="false"
    :show-arrows="false"
    hide-delimiters
    height="1100"
    v-model="shiftWindows"
    >
      <v-carousel-item>
        <v-row>
          <v-container>
            <v-card>
              <v-card-title>
                <span class="text-h4">
                  切結書
                </span>
              </v-card-title>
              <v-card-text class="font-weight-bold">
                <p>
                  本人同意遵守下列使用【幼兒發展調查資料庫建置計畫正式研究工具/資料】作為研究用途之條款：
                </p>
                <p>
                  1. 本工具/資料只作研究計畫書中指定的用途。
                </p>
                <p>
                  2. 與計畫執行之相關人員皆需簽立切結書，人員若有變動皆須告知幼兒發展調查資料庫建置計畫團隊，變動人員並須重新簽立切結書。
                </p>
                <p>
                  3. 未得到幼兒發展調查資料庫建置計畫團隊同意前，不得將本工具/資料轉提供予其他個人或機構使用。
                </p>
                <p>
                  4. 使用期限以一年為限或至計畫執行結束，期滿若需使用須再次申請。
                </p>
                <p>
                  5. KIT計畫資料未釋出前，不能在論文中公開題目。
                </p>
                <p>
                  6. 在研究完成後，須將指定研究中未使用的工具/資料檔案銷毀，不得以口頭、書面、電子等任何形式重製、複製或留存本工具/資料，或透過網路傳輸行為使之外流於第三方，且需保密10年。
                </p>
                <p>
                  7. 在所有使用到本工具/資料的出版中，使用下列中文及英文謝詞鳴謝幼兒發展調查資料庫建置計畫全體研究人員：本論著使用之部分/全部工具/資料/工具和資料係採自科技部補助之「幼兒發展資料庫先期研究」NSC100-2410-H-003-058-MY2、「幼兒發展調查資料庫建置計畫」MOST103-2420-H-003-032-MY3、「幼兒發展調查資料庫建置計畫第二期」MOST106-2420-H-003-014-SS3、及「幼兒發展調查資料庫建置計畫第三期」MOST 109-2740-H-003-001-SS3，上述計畫由國立臺灣師範大學教育研究與評鑑中心暨人類發展與家庭學系共同執行。作者感謝上述機構及人員提供相關協助，然本論文(著）內容由作者自行負責。This publication used tools/data/tools and data provided by “A Pilot Study of Taiwan Child Development Databank” (NSC100-2410-H-003-058-MY2), and “Kids in Taiwan: National Longitudinal Study of Child Development & Care (KIT)” (MOST103-2420-H-003-032-MY3, MOST106-2420-H-003-014-SS3, and MOST 109-2740-H-003-001-SS3).The above projects were sponsored by Ministry of Science and Technology, R.O.C., and conducted by Center for Educational Research and Evaluation, and Department of Human Development and Family Studies, National Taiwan Normal University. The author(s) appreciate the support of the institutes and individuals mentioned above. Responsibility for the information and views in this publication lies entirely with the author(s).
                </p>
                <p>
                  8. 期刊、會議論文發表必須至少有一位計畫團隊成員具名(須列入作者之一)。
                </p>
                <p>
                  9. 若使用幼兒發展調查資料庫計畫工具/資料所發表之期刊、會議論文不只一篇，皆須告知幼兒發展調查資料庫建置計畫團隊，且須將所有出版的一份副本(紙本、WORD、PDF)寄給幼兒發展調查資料庫建置計畫團隊。
                </p>
                <p>
                  10. 立切結書人如違反上述切結，除作為下次申請是否核准之參據，情節重大或屢次違反上述切結者，得停止該申請人之申請，並承擔所有民刑事及行政責任，及相關損害賠償。
                </p>
                <p>
                  11. 違反本切結書內容致發生訴訟時，同意以台灣台北地方法院為第一審管轄法院。
                </p>
              </v-card-text>
              <v-checkbox
                v-model="check"
                label="我以閱讀並同意以上切結書內容"
                :rules="[v => !!v || '申請權限需同意切結書內容']"
              >
              </v-checkbox>
            </v-card>
          </v-container>
        </v-row>
        <v-row
          align="center"
          justify="space-around"
        >
          <v-btn
            :disabled="true"
            x-large
          >
            返回
          </v-btn>
          <p class="font-weight-bold">
            1/3頁
          </p>
          <v-btn
            :disabled="!agree"
            x-large
            @click="shiftWindows++"
            color="primary"
          >
            下一步
          </v-btn>
        </v-row>
      </v-carousel-item>
      <v-carousel-item>
        <v-row>
          <v-container>
            <v-card>
              <v-card-title>
                <span class="text-h4">
                  研究計畫說明
                </span>
              </v-card-title>
              <v-text-field
                v-model="researchLabel"
                label="研究題目"
                outlined
              >
              </v-text-field>
              <v-select
                v-model="researchAim"
                :items="aim"
                item-text="aim"
                item-value="value"
                label="本次申請/使用之研究用途"
                outlined
              >
              </v-select>
              <v-text-field
                v-show="others"
                v-model="otherAim"
                label="其他研究用途"
                outlined
              >
              </v-text-field>
              <v-card-subtitle>
                請簡要說明研究目的、方法，將如何使用本工具/資料、以及如何保護個人資料(pdf檔)
              </v-card-subtitle>
              <v-file-input
                v-model="researchFile"
                label="研究計畫說明"
                counter
                show-size
                accept=".pdf"
                :clearable="false"
              >
              </v-file-input>
            </v-card>
          </v-container>
        </v-row>
        <v-row
          align="center"
          justify="space-around"
        >
          <v-btn
            color="default"
            x-large
            @click="shiftWindows--"
          >
            返回
          </v-btn>
          <p class="font-weight-bold">
            2/3頁
          </p>
          <v-btn
            :disabled="!research"
            color="primary"
            x-large
            @click="shiftWindows++"
          >
            下一步
          </v-btn>
        </v-row>
      </v-carousel-item>
      <v-carousel-item>
        <v-row>
        <v-container>
          <v-card>
            <v-card-title>
              <span class="text-h4">
               申請內容
             </span>
            </v-card-title>
            <v-card-title>
              申請波次：
            </v-card-title>
              <v-container fluid>
                <v-row>
                  <v-col  cols="4">
                    <v-checkbox
                      v-model="waveChoose"
                      label="3月齡組"
                      value="M03"
                    >
                    </v-checkbox>
                  </v-col>
                  <v-col cols="4">
                    <v-checkbox
                      v-model="waveChoose"
                      label="36月齡組"
                      value="M36"
                    >
                    </v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            <v-card-title>
              申請資料：
            </v-card-title>
            <v-container fluid>
              <v-row>
                <v-col>
                  <v-card-subtitle>
                    家長問卷資料：
                  </v-card-subtitle>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="父母基本資料"
                    value="class1"
                  >
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="孩子與家庭基本資料"
                    value="class2"
                  >
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="其他主要照顧者基本資料"
                    value="class3"
                  >
                  </v-checkbox>
                </v-col>
                  <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="健康問卷資料"
                    value="class4"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="認知問卷資料"
                    value="class5"
                  >
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="語言問卷資料"
                    value="class6"
                  >
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="社會情緒問卷資料"
                    value="class7"
                  >
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="身體動作問卷資料"
                    value="class8"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="家庭問卷資料_學習環境"
                    value="class9"
                  >
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="家庭問卷資料_教養"
                    value="class10"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-card-subtitle>
                    親友問卷資料：
                  </v-card-subtitle>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="照顧者基本資料"
                    value="class11"
                  >
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="家庭問卷資料_學習環境"
                    value="class12"
                  >
                  </v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="家庭問卷資料_教養"
                    value="class13"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-card-subtitle>
                    教保問卷資料：
                  </v-card-subtitle>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-checkbox
                    v-model="classChoose"
                    label="教保問卷資料"
                    value="class14"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
        </v-row>
        <v-row
          align="center"
          justify="space-around"
        >
          <v-btn
            color="default"
            x-large
            @click="shiftWindows--"
          >
            返回
          </v-btn>
          <p class="font-weight-bold">
            3/3頁
          </p>
          <v-btn
            :disabled="!choose"
            color="primary"
            x-large
            @click="sendPermission"
          >
            送出
          </v-btn>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-row>
</template>
<script>
export default {
  name: 'Permission',
  data () {
    return {
      waveChoose: [],
      classChoose: [],
      shiftWindows: 0,
      complete: false,
      check: false,
      researchLabel: '',
      researchAim: '',
      aim: [
        { aim: '個人研究', value: 1 },
        { aim: '國家補助計畫 (如國科會專題計畫)', value: 2 },
        { aim: '博士論文', value: 3 },
        { aim: '碩士論文', value: 4 },
        { aim: '其他', value: 5 }
      ],
      others: false,
      otherAim: '',
      researchFile: [],
      research: false,
      choose: false
    }
  },
  watch: {
    check () {
      if (this.check === false) {
        this.agree = false
      } else {
        this.agree = true
      }
    },
    researchAim () {
      if (this.researchAim === 5) {
        this.others = true
      } else {
        this.others = false
      }
      if (this.researchAim !== '' && this.researchLabel.length > 0 && this.researchFile.size > 0) {
        this.research = true
      } else {
        this.research = false
      }
    },
    researchFile () {
      if (this.researchAim !== '' && this.researchLabel.length > 0 && this.researchFile.size > 0) {
        this.research = true
      } else {
        this.research = false
      }
    },
    researchLabel () {
      if (this.researchAim !== '' && this.researchLabel.length > 0 && this.researchFile.size > 0) {
        this.research = true
      } else {
        this.research = false
      }
    },
    waveChoose () {
      if (this.waveChoose.length > 0 && this.classChoose.length > 0) {
        this.choose = true
      } else {
        this.choose = false
      }
    },
    classChoose () {
      if (this.waveChoose.length > 0 && this.classChoose.length > 0) {
        this.choose = true
      } else {
        this.choose = false
      }
    }
  },
  methods: {
    sendPermission () {
      this.shiftWindows = 0
      this.waveChoose = []
      this.classChoose = []
      this.researchFile = []
      this.researchLabel = ''
      this.researchAim = ''
      this.check = false
    }
  }
}
</script>
