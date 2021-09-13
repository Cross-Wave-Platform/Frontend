<template>
  <v-tabs vertical>
    <v-tab
        class="font-weight-bold"
        style="width: 200px"
    >
      <v-icon left>
        mdi-comment-question
      </v-icon>
      常見問題
    </v-tab>
    <v-tab
      class="font-weight-bold"
    >
      <v-icon left>
        mdi-account-question
      </v-icon>
      快速回報
    </v-tab>
    <v-tab-item
      transparent
      transition="fade-transition" reverse-transition="fade-transition"
    >
      <v-tabs
        vertical
        v-model="questionCategory"
      >
        <v-tab
          v-for="item in commonQuestion"
          :key="item.category"
          style="width: 150px"
        >
          {{item.category}}
        </v-tab>
      <v-tabs-items
        v-model="questionCategory"
      >
        <v-tab-item
          v-for="item in commonQuestion"
          transition="fade-transition" reverse-transition="fade-transition"
          :key="item.category"
        >
          <v-expansion-panels
            v-for="problem in item.problem"
            :key="problem.question"
            focusable
            tile
            class="px-4"
          >
            <v-expansion-panel
              accordion
            >
              <v-expansion-panel-header
              >
                {{problem.question}}
              </v-expansion-panel-header>
              <v-expansion-panel-content
                class="mt-3"
              >
                {{problem.answer}}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>
      </v-tabs-items>
      </v-tabs>

      <!-- <v-container>
        <v-row>
          <v-col>

          </v-col>
        </v-row>
      </v-container> -->
      <!-- <v-card
        tile
      >

      </v-card> -->
    </v-tab-item>
    <v-tab-item
      transition="fade-transition" reverse-transition="fade-transition"
    >
      <v-card
        tile
        elevation="0"
        class="mx-12"
        color="rgba(255, 255, 255, 0.0)"
      >
        <v-form
          ref="reportForm"
          v-model="reportForm"
          lazy-validation
        >
          <v-text-field
            v-model="report.title"
            label="Title"
            :rules="[v => !!v || !!report.content || 'You have to write at least title or content.']"
          >
          </v-text-field>
          <v-textarea
            v-model="report.content"
            label="Content"
            :rules="[v => !!v || !!report.title || 'You have to write at least title or content.']"
          >
          </v-textarea>
          <v-file-input
            v-model="report.file"
            label="File input"
            counter
            show-size
            truncate-length="30"
            :rules="[v => !v || v.size < 25 * 1024 * 1024 || 'File size should be less than 25 MB!']"
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
        </v-form>
        <v-btn
          dark
          block
          color="primary"
          :loading="loadReport"
          @click="quickReport"
        >
          Send
          <v-icon right>
            mdi-send
          </v-icon>
        </v-btn>
        <v-alert
          :value="alertPlace == 'quickReport'"
          :type="alertType"
          dense
          outlined
          class="mt-3"
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
  name: 'ProblemReport',

  data: () => ({
    alertPlace: '',
    alertType: null,
    alertMsg: '',

    reportForm: false,

    loadReport: false,

    questionCategory: null,
    commonQuestion: [
      {
        category: '帳號問題',
        problem:
        [
          {
            question: 'asdf',
            answer: 'qwer'
          },
          {
            question: 'qwer',
            answer: 'qwer'
          }
        ]
      },
      {
        category: '介面問題',
        problem:
        [
          {
            question: 'asdf',
            answer: 'qwer'
          },
          {
            question: 'qwer',
            answer: 'qwer'
          }
        ]
      }
    ],
    report: {
      title: '',
      content: '',
      file: null
    }
  }),
  methods: {
    quickReport () {
      if (this.$refs.reportForm.validate()) {
        this.loadReport = true
        console.log('report!!')
        var bodyFormData = new FormData()
        bodyFormData.append('file', this.report.file)
        bodyFormData.append('title', this.report.title)
        bodyFormData.append('content', this.report.content)
        const config = {
          url: '/api/reportApp/quickReport',
          method: 'post',

          data: bodyFormData
        }
        axios(config)
          .then((res) => {
            console.log(res)
            this.alertPlace = 'quickReport'
            this.alertType = 'success'
            this.alertMsg = res.data.message
            this.savDialog = false
          })
          .catch((err) => {
            console.log(err)
            console.log(err.response)
            this.alertPlace = 'quickReport'
            this.alertType = 'error'
            this.alertMsg = err.response.data.message
            this.savDialog = false
          })
          .finally(() => {
            this.loadReport = false
          })
      }
    }
  }
}
</script>

<style scoped>
  /* >>>.v-tabs--vertical {
    background-color:rgba(255, 255, 255, 0.0);
  } */
  >>> .v-item-group {
    background-color:rgba(255, 255, 255, 0.0);
  }
  /* >>> .v-window__container {
    background-color:rgba(255, 255, 255, 0.0);
  } */
  /* >>> .v-tabs-bar {
    background-color:rgba(255, 255, 255, 0.0);
  }
  >>> .v-slide-group__wrapper {
    background-color:rgba(255, 255, 255, 0.0);
  } */
</style>
