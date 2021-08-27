<template>
  <v-tabs vertical>
    <v-tab
      class="font-weight-bold"
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
    >
      <v-tabs
        vertical
        v-model="questionCategory"
      >
        <v-tab
          v-for="item in commonQuestion"
          :key="item.category"
        >
          {{item.category}}
        </v-tab>
      <v-tabs-items
        v-model="questionCategory"
      >
        <v-tab-item
          v-for="item in commonQuestion"
          :key="item.category"
        >
          <v-expansion-panels
            v-for="problem in item.problem"
            :key="problem.question"
            focusable
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                {{problem.question}}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
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
    <v-tab-item>
      <v-card
        tile
        elevation="0"
      >
        <v-form
          ref="reportForm"
          v-model="reportValid"
          lazy-validation
        >
          <v-text-field
            v-model="report.title"
            label="Title"
            :rules="[v => !!v || report.content != '' || 'You have to write at least title or content.']"
          >
          </v-text-field>
          <v-textarea
            v-model="report.content"
            label="Content"
            :rules="[v => !!v || report.title != '' || 'You have to write at least title or content.']"
          >
          </v-textarea>
          <v-file-input
            v-model="report.file"
            label="File input"
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
        </v-form>
        <v-btn
          dark
          block
          color="primary"
        >
          Send
          <v-icon right>
            mdi-send
          </v-icon>
        </v-btn>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  name: 'ProblemReport',

  data: () => ({
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
  })
}
</script>
