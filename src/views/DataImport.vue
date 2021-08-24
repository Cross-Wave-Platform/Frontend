<template>
  <v-tabs vertical>
      <v-tab
        class="font-weight-bold"
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
      <v-tab
        class="font-weight-bold"
      >
        <v-icon left>
          mdi-file-document
        </v-icon>
        變項對照表
      </v-tab>

      <!-- <v-divider></v-divider> -->

      <v-tab-item
        transparent-body
      >
        <v-card
          tile
        >
          <v-card-title primary-title>
            波次選擇
          </v-card-title>
          <v-select
            :items="groupItems"
            v-model="group"
            label="選擇組別(大小月齡)"
            class="ml-8"
            dense
          ></v-select>
          <v-select
            :items="identityItems"
            v-model="identity"
            label="選擇身分"
            class="ml-8"
            dense
          ></v-select>
          <v-select
            :items="waveItems"
            v-model="wave"
            label="選擇波次"
            class="ml-8"
            dense
          ></v-select>
          <v-card-title primary-title>
            匯入SAV檔
          </v-card-title>
          <v-file-input
            v-model="savFile"
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
            <v-btn
              color="success"
            >
              add
            </v-btn>
            <v-btn
              color="error"
            >
              clear
            </v-btn>
            <v-icon
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
            ></v-progress-circular>
            <!-- <v-progress-circular
              indeterminate
              color="secondary"
              :size="20"
              class="ml-4"
            ></v-progress-circular> -->

          </v-card-actions>
          <v-alert
            border="left"
            colored-border
            dense
            elevation="2"
            dismissible
            type="error"
          >
            123
          </v-alert>
        </v-card>
      </v-tab-item>
      <!-- <v-tab-item>
        <v-card
          tile
        >
          <v-card-title primary-title>
            波次選擇
          </v-card-title>
          <v-select
            :items="groupItems"
            v-model="group"
            label="選擇組別(大小月齡)"
            class="ml-8"
            dense
          ></v-select>
          <v-select
            :items="waveItems"
            v-model="wave"
            label="選擇波次"
            class="ml-8"
            dense
          ></v-select>
          <v-select
            :items="identityItems"
            v-model="identity"
            label="選擇身分"
            class="ml-8"
            dense
          ></v-select>
          <v-card-title primary-title>
            匯入問卷編碼簿
          </v-card-title>
          <v-file-input
            v-model="codeFile"
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
          <v-card-title primary-title>
            匯入問卷答案
          </v-card-title>
          <v-file-input
            v-model="ansFile"
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
            <v-btn
              color="success"
            >
              add
            </v-btn>
            <v-btn
              color="error"
            >
              clear
            </v-btn>
            <v-icon
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
            ></v-progress-circular>

          </v-card-actions>
          <v-alert
            border="left"
            colored-border
            dense
            elevation="2"
            dismissible
            type="error"
          >
            123
          </v-alert>
        </v-card>
      </v-tab-item> -->
      <v-tab-item>
        <v-card
          tile
        >
          <v-card-title primary-title>
            匯入變項對照表
          </v-card-title>
          <v-file-input
            v-model="savFile"
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
            <v-btn
              color="success"
            >
              add
            </v-btn>
            <v-btn
              color="error"
            >
              clear
            </v-btn>
            <v-icon
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
          </v-card-actions>
          <v-alert
            border="left"
            colored-border
            dense
            elevation="2"
            dismissible
            type="error"
          >
            123
          </v-alert>
        </v-card>
      </v-tab-item>
    </v-tabs>
</template>

<script>
export default {
  name: 'DataImport',

  data: () => ({
    group: null,
    wave: null,
    identity: null,
    groupItems: [
      '大月齡組',
      '小月齡組'
    ],
    waveItems: [

    ],
    identityItems: [
      '家長',
      '親友',
      '教保/教師'
    ],
    savFile: null,
    codeFile: null,
    ansFile: null
  })
}
</script>
