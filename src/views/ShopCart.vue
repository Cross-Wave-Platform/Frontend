<template>
    <div id="shopcart">
      <v-row>
        <v-col cols=10>
          <v-card flat style="background-color:rgba(255, 255, 255, 0.0);">
              <v-card-title>我的資料</v-card-title>
              <v-data-table
                  :headers="header"
                  :items="shopcart"
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
                      <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                      <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
                    v-model="input.join"
                    label="合併方式"
                ></v-select>
              </v-list-item>
              <v-list-item>
                <v-radio-group
                    v-model="input.export"
                    column
                    label="匯出方式"
                >
                    <v-radio v-for="item in OptionExport" :key="item" :label="item" :value="item"></v-radio>
                </v-radio-group>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-btn dark color=primary>匯出</v-btn>
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
      tableType: ['none'],
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      input: {
        join: null,
        export: null
      },
      OptionJoin: ['Full Join', 'Inner Join', 'Union'],
      OptionExport: ['CSV', 'SAV']
    }
  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  methods: {
    deleteItem (item) {
      this.editedIndex = this.shopcart.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      if (this.deleteall) {
        this.shopcart = []
      } else {
        this.shopcart.splice(this.editedIndex, 1)
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
    },
    TableWave (index) {
      return this.shopcart[index].exist.filter(item => {
        const target = this.tableType[index].toLowerCase()
        const type = item.type.toLowerCase()
        return target === type
      })
    }
  },
  mounted () {
    axios.get('http://localhost:8000/ShopCart').then((res) => {
      this.shopcart = res.data
      for (let i = 0; i < this.shopcart.length; i++) {
        this.tableType[i + 1] = this.shopcart[i].exist[0].type
        this.shopcart[i].index = i + 1
      }
    })
  }
}
</script>
