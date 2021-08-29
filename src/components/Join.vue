<template>
  <div class="join">
    <v-col cols=4>
        <v-select
            :items="OptionJoin"
            v-model="input.join"
            label="合併方式"
        ></v-select>
        <v-radio-group
            v-model="input.export"
            column
            label="匯出方式"
        >
            <v-radio v-for="item in OptionExport" :key="item" :label="item" :value="item"></v-radio>
        </v-radio-group>
        <v-btn>匯出</v-btn>
    </v-col>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
<script>
export default {
    name: 'Join',
    data() {
        return {
            input: {
                join: null,
                export: null
            },
            OptionJoin: ['Full Join','Inner Join','Union'],
            OptionExport: ['CSV','SAV']
        }
    }
}
</script>
