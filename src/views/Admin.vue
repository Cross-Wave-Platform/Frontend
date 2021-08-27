<template>
  <div class="admin">
    <v-app>
      <v-row no-gutters>
        <v-col cols=2>
          <div style="position: sticky; top: 76px">
          <v-list shaped>
            <v-list-item-group color="primary">
              <v-list-item to="/admin/usermanage">
                <v-list-item-icon>
                  <v-icon left>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>使用者權限管理</v-list-item-content>
              </v-list-item>
              <v-list-item to="/admin/datamanage">
                <v-list-item-icon>
                  <v-icon left>mdi-lock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>資料權限管理</v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          </div>
        </v-col>
        <v-col  cols=10><router-view></router-view></v-col>
      </v-row>
    </v-app>
  </div>
</template>
<script>

export default {
  name: 'Admin'
}
</script>
