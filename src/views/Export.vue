<template>
  <div class="export">
      <v-row no-gutters>
        <v-col cols=2>
            <div>
                <v-tabs vertical>
                    <v-tab class="font-weight-bold" to="/export/join">合併</v-tab>
                    <v-tab class="font-weight-bold" to="/export/analysis">分析</v-tab>
                </v-tabs>
            </div>
        </v-col>
        <v-col  cols=10><router-view></router-view></v-col>
      </v-row>
  </div>
</template>
<script>

export default {
  name: 'Export'
}
</script>
