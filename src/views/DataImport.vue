<template>
  <v-tabs vertical>
      <v-tab
        class="font-weight-bold"
        style="width: 200px"
      >
        <v-icon left>
          mdi-file-document
        </v-icon>
        變項對照表
      </v-tab>
      <v-tab
        class="font-weight-bold"
        style="width: 200px"
      >
        <v-icon left>
          mdi-file-delimited
        </v-icon>
        匯入SAV檔
      </v-tab>
      <!-- <v-divider></v-divider> -->
      <!-- <v-tab
        class="font-weight-bold"
      >
        <v-icon left>
          mdi-file-delimited
        </v-icon>
        匯入CSV檔
      </v-tab> -->
      <!-- <v-divider></v-divider> -->

      <!-- <v-divider></v-divider> -->
      <v-tab-item
        transition="fade-transition" reverse-transition="fade-transition"
      >
        <v-card
          tile
          elevation="0"
          class="pb-2"
          color="rgba(255, 255, 255, 0.0)"
        >
          <v-card-title primary-title
            class="font-weight-bold mb-2"
          >
            匯入變項對照表
          </v-card-title>
          <v-file-input
            v-model="surveyFile"
            label="File input"
            class="ml-8"
            counter
            show-size
            truncate-length="30"
          >
          <template v-slot:selection="{ text }">
            <v-chip
              small
              label
              color="primary"
            >
              {{ text }}
            </v-chip>
          </template>
          </v-file-input>
          <v-card-actions>
            <v-dialog
              v-model="surveyDialog"
              persistent
              max-width="350"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  class="ml-8"
                  v-bind="attrs"
                  v-on="on"
                  @click="uploadSurveyProblem"
                >
                  add
                </v-btn>
              </template>
              <!-- <v-container fluid> -->
                <v-card class="pb-5">
                  <!-- <v-card-title class="text-h5 font-weight-bold">
                    上傳中，請勿離開這個頁面
                  </v-card-title> -->
                  <v-container
                    fluid
                  >
                    <v-row justify="center">
                      <h2 class="font-weight-bold mt-5 mb-7">
                        上傳中，請勿離開這個頁面
                      </h2>
                    </v-row>
                    <v-row justify="center" class="my-5">
                      <v-progress-circular
                        indeterminate
                        color="secondary"
                        :size="48"
                      ></v-progress-circular>
                    </v-row>
                  </v-container>
                </v-card>
            </v-dialog>
            <!-- <v-btn
              color="success"
              class="ml-8"
            >
              add
            </v-btn> -->
            <v-btn
              color="error"
              @click="surveyFile=null"
              class="ml-2"
            >
              clear
            </v-btn>
            <!-- <span
              v-if="savStatus!=null"
            >
              <span
                v-for="(item, index) in varStatus"
                :key="index"
              >
                <v-icon
                  color="secondary"
                  class="ml-4"
                  v-if="item=='done'"
                >
                  mdi-checkbox-marked-circle
                </v-icon>
                <v-progress-circular
                  indeterminate
                  color="secondary"
                  :size="21"
                  class="ml-4"
                  v-if="item=='loading'"
                ></v-progress-circular>
              </span>
            </span> -->
          </v-card-actions>
          <v-alert
            :value="alertPlace == 'survey'"
            :type="alertType"
            dense
            outlined
            class="mt-3 ml-4"
          >
            {{alertMsg}}
          </v-alert>
          <!-- <v-alert
            border="left"
            colored-border
            dense
            elevation="2"
            dismissible
            class="mt-4"
            type="error"
          >
            123
          </v-alert> -->
        </v-card>
      </v-tab-item>
      <v-tab-item
        transparent-body
        transition="fade-transition" reverse-transition="fade-transition"
      >
        <v-card
          tile
          elevation="0"
          color="rgba(255, 255, 255, 0.0)"
        >
          <v-card-title primary-title
            class="font-weight-bold mb-2"
          >
            波次選擇
          </v-card-title>
          <v-select
            :items="groupItems"
            v-model="group"
            label="選擇組別(大小月齡)"
            class="mx-8"
            item-text="state"
            item-value="value"
            dense
          ></v-select>
          <v-select
            :items="identityItems"
            v-model="identity"
            label="選擇身分"
            class="mx-8"
            item-text="state"
            item-value="value"
            dense
          ></v-select>
          <v-select
            :items="waveItems"
            v-model="wave"
            label="選擇波次"
            class="mx-8"
            item-text="wave"
            item-value="wave"
            dense
          ></v-select>
          <v-card-title primary-title
            class="font-weight-bold mb-2"
          >
            匯入SAV檔
          </v-card-title>
          <v-file-input
            v-model="savFile"
            label="File input"
            class="mx-8"
            counter
            show-size
            truncate-length="30"
          >
          <template v-slot:selection="{ text }">
            <v-chip
              small
              label
              color="primary"
            >
              {{ text }}
            </v-chip>
          </template>
          </v-file-input>
          <v-card-actions>
            <v-dialog
              v-model="savDialog"
              persistent
              max-width="350"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  class="ml-8"
                  v-bind="attrs"
                  v-on="on"
                  @click="uploadSAV"
                >
                  add
                </v-btn>
              </template>
              <!-- <v-container fluid> -->
                <v-card class="pb-5">
                  <!-- <v-card-title class="text-h5 font-weight-bold">
                    上傳中，請勿離開這個頁面
                  </v-card-title> -->
                  <v-container
                    fluid
                  >
                    <v-row justify="center">
                      <h2 class="font-weight-bold mt-5 mb-7">
                        上傳中，請勿離開這個頁面
                      </h2>
                    </v-row>
                    <v-row justify="center" class="my-5">
                      <v-progress-circular
                        indeterminate
                        color="secondary"
                        :size="48"
                      ></v-progress-circular>
                    </v-row>
                  </v-container>
                </v-card>
            </v-dialog>
            <v-btn
              color="error"
              @click="group=null;wave=null;identity=null;savFile=null"
              class="ml-2"
            >
              clear
            </v-btn>
            <!-- <span
              v-if="savStatus!=null"
            >
              <span
                v-for="(item, index) in savStatus"
                :key="index"
              >
                <v-icon
                  color="secondary"
                  class="ml-4"
                  v-if="item=='done'"
                >
                  mdi-checkbox-marked-circle
                </v-icon>
                <v-progress-circular
                  indeterminate
                  color="secondary"
                  :size="21"
                  class="ml-4"
                  v-if="item=='loading'"
                ></v-progress-circular>
              </span>
            </span> -->
            <!-- <v-icon
              color="secondary"
              class="ml-4"
            >
              mdi-checkbox-marked-circle
            </v-icon>
            <v-progress-circular
              indeterminate
              color="secondary"
              :size="21"
              class="ml-4"
            ></v-progress-circular>
            <v-progress-circular
              indeterminate
              color="secondary"
              :size="21"
              class="ml-4"
            ></v-progress-circular> -->
            <!-- <v-progress-circular
              indeterminate
              color="secondary"
              :size="20"
              class="ml-4"
            ></v-progress-circular> -->
            <!-- <v-btn color="success" @click="fileWave">fileWave</v-btn> -->
          </v-card-actions>
          <v-alert
            :value="alertPlace == 'sav'"
            :type="alertType"
            dense
            outlined
            class="mt-3 ml-4"
          >
            {{alertMsg}}
          </v-alert>
        </v-card>
      </v-tab-item>
    </v-tabs>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DataImport',

  data: () => ({
    group: null,
    wave: null,
    identity: null,

    alertPlace: '',
    alertType: null,
    alertMsg: '',

    groupItems: [
      {
        state: '大月齡組',
        value: 2
      },
      {
        state: '小月齡組',
        value: 1
      }
    ],
    identityItems: [
      {
        state: '家長',
        value: 2
      },
      {
        state: '親友',
        value: 3
      },
      {
        state: '教保/教師',
        value: 1
      }
    ],
    allWaves: null,
    savFile: null,
    surveyFile: null,
    // ansFile: null,

    savDialog: false,
    surveyDialog: false,
    savStatus: [
      'done',
      'loading',
      'loading'
    ],
    varStatus: null
  }),
  beforeMount () {
    this.fileWave()
  },
  computed: {
    waveItems: function () {
      if (this.allWaves != null) { return this.allWaves.filter(wave => wave.age_type === this.group && wave.survey_type === this.identity) }
      return []
    }
  },
  methods: {
    fileWave () {
      const config = {
        url: '/api/fileApp/fileWave',
        method: 'get'
      }
      axios(config)
        .then((res) => {
          // console.log(res.data.data.wave)
          this.allWaves = res.data.data.wave
        })
    },
    uploadSAV () {
      // console.log('upload!!')
      var bodyFormData = new FormData()
      bodyFormData.append('file', this.savFile)
      bodyFormData.append('ageType', this.group)
      bodyFormData.append('wave', this.wave)
      bodyFormData.append('surveyType', this.identity)
      const config = {
        url: '/api/fileApp/upload/sav',
        method: 'post',

        data: bodyFormData
      }
      // console.log(bodyFormData)
      axios(config)
        .then((res) => {
          // console.log(res)
          this.alertPlace = 'sav'
          this.alertType = 'success'
          this.alertMsg = res.data.message
          this.savDialog = false
        })
        .catch((err) => {
          // console.log(err)
          // console.log(err.response)
          this.alertPlace = 'sav'
          this.alertType = 'error'
          this.alertMsg = err.response.data.message
          this.savDialog = false
        })
    },
    uploadSurveyProblem () {
      // console.log('upload!!')
      var bodyFormData = new FormData()
      bodyFormData.append('file', this.surveyFile)
      const config = {
        url: '/api/fileApp/upload/surveyProblem',
        method: 'post',

        data: bodyFormData
      }
      // console.log(this.surveyFile)
      axios(config)
        .then((res) => {
          // console.log(res)
          this.alertPlace = 'survey'
          this.alertType = 'success'
          this.alertMsg = res.data.message
          this.surveyDialog = false
          this.fileWave()
        })
        .catch((err) => {
          // console.log(err)
          // console.log(err.response)
          this.alertPlace = 'survey'
          this.alertType = 'error'
          this.alertMsg = err.response.data.message
          this.surveyDialog = false
        })
    }
  }
}
</script>

<style scoped>
>>> .v-item-group {
  background-color:rgba(255, 255, 255, 0.0);
}
/* >>> .v-window__container {
  background-color:rgba(255, 255, 255, 0.0);
} */
/* >>>.v-tabs--vertical {
  background-color:rgba(255, 255, 255, 0.0);
} */
#transparent-body {
  background-color:rgba(255, 255, 255, 0.4);
}
#v-tabs {
  background-color:rgba(255, 255, 255, 0.4);
}
</style>
