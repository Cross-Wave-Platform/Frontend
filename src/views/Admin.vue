<template>
  <div class="admin">
      <v-row no-gutters>
        <v-col cols=2>
          <div style="position: sticky; top: 76px">
            <v-tabs vertical>
                <v-tab class="font-weight-bold" to="/admin/usermanage">
                    <v-icon left>mdi-account</v-icon>
                    使用者權限管理
                </v-tab>
                <v-tab class="font-weight-bold" to="/admin/datamanage">
                    <v-icon left>mdi-clipboard-text-multiple</v-icon>
                    資料權限管理
                </v-tab>
            </v-tabs>
          </div>
        </v-col>
        <v-col  cols=10><router-view></router-view></v-col>
      </v-row>
  </div>
</template>
<script>

export default {
  name: 'Admin'
}
</script>
