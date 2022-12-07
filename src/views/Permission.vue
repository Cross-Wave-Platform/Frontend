<template>
  <v-tabs vertical>
    <v-tab
        class="font-weight-bold"
        style="width: 350px"
    >
      企劃切結書
    </v-tab>
    <v-tab
      class="font-weight-bold"
      style="width: 350px"
    >
      申請人資料
    </v-tab>
    <v-tab
      class="font-weight-bold"
      style="width: 350px"
    >
      研究計畫
    </v-tab>
    <v-tab
      class="font-weight-bold"
      style="width: 350px"
    >
      申請內容
    </v-tab>

    <v-tab-item>
      <v-card max-width="1000">
        <v-card-title>
          <span style="text-align: center;display: block;" class="text-h4">
            切結書
          </span>
        </v-card-title>
        <v-card-text class="font-weight-bold">
          <p>
            本人同意遵守下列使用【幼兒發展調查資料庫建置計畫正式研究工具/資料】作為研究用途之條款：
          </p>
          <p>
            1. 本工具/資料只作研究計畫書中指定的用途。
          </p>
          <p>
            2. 與計畫執行之相關人員皆需簽立切結書，人員若有變動皆須告知幼兒發展調查資料庫建置計畫團隊，變動人員並須重新簽立切結書。
          </p>
          <p>
            3. 未得到幼兒發展調查資料庫建置計畫團隊同意前，不得將本工具/資料轉提供予其他個人或機構使用。
          </p>
          <p>
            4. 使用期限以一年為限或至計畫執行結束，期滿若需使用須再次申請。
          </p>
          <p>
            5. KIT計畫資料未釋出前，不能在論文中公開題目。
          </p>
          <p>
            6. 在研究完成後，須將指定研究中未使用的工具/資料檔案銷毀，不得以口頭、書面、電子等任何形式重製、複製或留存本工具/資料，或透過網路傳輸行為使之外流於第三方，且需保密10年。
          </p>
          <p>
            7. 在所有使用到本工具/資料的出版中，使用下列中文及英文謝詞鳴謝幼兒發展調查資料庫建置計畫全體研究人員：本論著使用之部分/全部工具/資料/工具和資料係採自科技部補助之「幼兒發展資料庫先期研究」NSC100-2410-H-003-058-MY2、「幼兒發展調查資料庫建置計畫」MOST103-2420-H-003-032-MY3、「幼兒發展調查資料庫建置計畫第二期」MOST106-2420-H-003-014-SS3、及「幼兒發展調查資料庫建置計畫第三期」MOST 109-2740-H-003-001-SS3，上述計畫由國立臺灣師範大學教育研究與評鑑中心暨人類發展與家庭學系共同執行。作者感謝上述機構及人員提供相關協助，然本論文(著）內容由作者自行負責。This publication used tools/data/tools and data provided by “A Pilot Study of Taiwan Child Development Databank” (NSC100-2410-H-003-058-MY2), and “Kids in Taiwan: National Longitudinal Study of Child Development & Care (KIT)” (MOST103-2420-H-003-032-MY3, MOST106-2420-H-003-014-SS3, and MOST 109-2740-H-003-001-SS3).The above projects were sponsored by Ministry of Science and Technology, R.O.C., and conducted by Center for Educational Research and Evaluation, and Department of Human Development and Family Studies, National Taiwan Normal University. The author(s) appreciate the support of the institutes and individuals mentioned above. Responsibility for the information and views in this publication lies entirely with the author(s).
          </p>
          <p>
            8. 期刊、會議論文發表必須至少有一位計畫團隊成員具名(須列入作者之一)。
          </p>
          <p>
            9. 若使用幼兒發展調查資料庫計畫工具/資料所發表之期刊、會議論文不只一篇，皆須告知幼兒發展調查資料庫建置計畫團隊，且須將所有出版的一份副本(紙本、WORD、PDF)寄給幼兒發展調查資料庫建置計畫團隊。
          </p>
          <p>
            10. 立切結書人如違反上述切結，除作為下次申請是否核准之參據，情節重大或屢次違反上述切結者，得停止該申請人之申請，並承擔所有民刑事及行政責任，及相關損害賠償。
          </p>
          <p>
            11. 違反本切結書內容致發生訴訟時，同意以台灣台北地方法院為第一審管轄法院。
          </p>
        </v-card-text>
      </v-card>
      <v-div>
        <v-checkbox
          v-model="check"
          label="我以閱讀並同意切結書內容"
        >
        </v-checkbox>
      </v-div>
    </v-tab-item>
  </v-tabs>
</template>
<script>
export default {
  name: 'Permission',

  data: () => ({

  })
}

</script>
