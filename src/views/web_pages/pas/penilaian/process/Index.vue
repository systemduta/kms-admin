<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vs-button
        color="primary"
        type="flat"
        icon="arrow_back_ios"
        @click="goBack"
        >Kembali</vs-button
      >
      <vx-card title="Penilaian KPI PAS">
        <table>
          <tr>
            <td style="width: 40%">Nama Perusahaan</td>
            <td style="width: 5%">:</td>
            <td class="mr-3">
              {{ datas3 && datas3.dataCompany && datas3.dataCompany.name }}
            </td>
          </tr>
          <tr>
            <td style="width: 40%">Nama Divisi</td>
            <td style="width: 5%">:</td>
            <td>{{ datas3 && datas3.dataOrg && datas3.dataOrg.name }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Nama Karyawan</td>
            <td style="width: 5%">:</td>
            <td>{{ datas3 && datas3.dataUser && datas3.dataUser.name }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Tanggal Penilaian</td>
            <td style="width: 5%">:</td>
            <td>{{ date }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Parameter</td>
            <td style="width: 5%">:</td>
            <td>{{ name3p }}</td>
          </tr>
        </table>
      </vx-card>
      <hr />
      <vx-card :title="name3p"> </vx-card>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      idCompany: this.$route.params.idCompany,
      idDivisi: this.$route.params.idDivisi,
      idUser: this.$route.params.idUser,
      id3p: this.$route.params.id3p,
      name3p: this.$route.params.name3p,
      date: this.$route.params.date,
      datas3: [],
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      dispatchIndex: "masterpas/index_company",
      dispatchDivisi: "masterpas/index_divisi",
      dispatchEmployee: "masterpas/index_employee",

      dispatchMaster: "masterpas/index",
      dispatchMasterDatas: "masterpas/index_datas",
      dispatchMasterAllDimensi: "masterpas/all_dimensi",
      dispatchMasterAllKpi: "masterpas/all_kpi",
      dispatchMasterAllInd: "masterpas/all_ind",

      //people
      dispatchPeople: "pen_people/index",
      dispatchPeopleInd: "pen_people/getInd",
    }),
    goBack() {
      if (
        confirm(
          "Pastikan data sudah disimpan sebelum kembali. Apakah Anda yakin ingin kembali?"
        )
      ) {
        this.$router.push({
          name: "penilaianpenilaianpas",
          params: {
            idCompany: this.idCompany,
            idDivisi: this.idDivisi,
            idUser: this.idUser,
            date: this.date,
          },
        });
      }
    },
    async getDatas() {
      const send = new FormData();
      send.append("idCompany", this.idCompany);
      send.append("idDivisi", this.idDivisi);
      send.append("idUser", this.idUser);
      const datas3 = await this.dispatchMasterDatas(send);
      this.datas3 = datas3;
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.getDatas()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
