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
      <vx-card title="Lihat Penilaian PAS">
        <table>
          <tr>
            <td style="width: 40%">Nama Perusahaan</td>
            <td style="width: 5%">:</td>
            <td class="mr-3" v-if="nameCompany">
              {{ nameCompany }}
            </td>
          </tr>
          <tr>
            <td style="width: 40%">Nama Divisi</td>
            <td style="width: 5%">:</td>
            <td v-if="nameDivisi">{{ nameDivisi }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Nama Karyawan</td>
            <td style="width: 5%">:</td>
            <td v-if="nameUser">{{ nameUser }}</td>
          </tr>
        </table>
      </vx-card>
      <hr />
      <vx-card title="Bulan PAS">
        <div
          class="row"
          v-if="datas && datas.dataBulan && datas.dataBulan.length > 0"
        >
          <div
            class="col-md-3"
            v-for="bulan in datas.dataBulan"
            :key="bulan.id"
          >
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ getBulanTahun(bulan.date) }}</h5>
                <p class="card-text">Nilai: {{ bulan.nilai }}</p>
                <button class="btn btn-primary" @click="showDetail(bulan.date)">
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <center>Data Kosong</center>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      idCompany: this.$route.params.idCompany,
      nameCompany: this.$route.params.nameCompany,
      idDivisi: this.$route.params.idDivisi,
      nameDivisi: this.$route.params.nameDivisi,
      idUser: this.$route.params.idUser,
      nameUser: "",
      datas: [],
      date: null,
    };
  },
  methods: {
    ...mapActions({
      dispatchIndex: "masterpas/index_company",
      dispatchDivisi: "masterpas/index_divisi",
      dispatchEmployee: "masterpas/index_employee",

      dispatchShow: "showedit/month",
    }),
    showDetail(date) {
      this.$router.push({
        name: "shownilaipas",
        params: {
          idCompany: this.idCompany,
          idDivisi: this.idDivisi,
          idUser: this.idUser,
          date: date,
        },
      });
    },
    goBack() {
      this.$router.push({
        name: `nilaidetailpas`,
        params: {
          idCompany: this.idCompany,
          idDivisi: this.idDivisi,
        },
      });
    },
    getBulanTahun(date) {
      const options = { year: "numeric", month: "long" };
      const tanggal = new Date(date);
      return tanggal.toLocaleDateString("en-US", options);
    },
    async getEmployee() {
      const send = new FormData();
      send.append("idUser", this.idUser);
      const data = await this.dispatchShow(send);
      this.datas = data;
      this.nameUser = data.dataUser.name;
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.getEmployee()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
