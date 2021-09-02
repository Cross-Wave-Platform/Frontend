<template>
    <div id="shopcart">
        <v-card>
            <v-card-title>我的資料</v-card-title>
            <v-data-table
                :headers="header"
                :items="shopcart"
                item-key="pid"
                sort-by="pid"
            >
                <template v-slot:header.delAction>
                    <v-icon
                        small
                         @click="delete_all"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:item.delAction="{ item }">
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
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
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {}
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
    }
  },
  mounted () {
    axios.get('http://localhost:8000/ShopCart').then((res) => {
      this.shopcart = res.data
    })
  }
}
</script>
