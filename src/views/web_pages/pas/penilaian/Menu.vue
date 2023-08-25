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
            <td style="width: 40%">Bulan Penilaian</td>
            <td style="width: 5%">:</td>
            <!-- <td>{{ date }}</td> -->
            <!-- <td>{{ showDate }}</td> -->
            <td>
              <vs-input
                type="month"
                v-model="showDate"
                :disabled="true"
                class="bold-input"
              />
            </td>
          </tr>
        </table>
      </vx-card>
      <hr />
      <vx-card
        title="
            Pilih Parameter
          "
      >
        <div class="row">
          <div v-if="datas3 && Array.isArray(datas3.data)" class="row">
            <div
              v-for="item in datas3.data"
              :key="item.id"
              class="col-md-4 mb-3"
            >
              <div class="card" v-if="item.id === 1">
                <div class="card-body">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <h6 class="card-text">
                    Nilai: {{ item.nilai ? item.nilai : 0 }}
                  </h6>
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    size="small"
                    :to="{
                      name: `peoplepenilaianpas`,
                      params: {
                        id3p: item.id,
                        name3p: item.name,
                        idUser: idUser,
                        idCompany: idCompany,
                        idDivisi: idDivisi,
                        date: date,
                      },
                    }"
                    >Nilai dimensi</vs-button
                  >
                </div>
              </div>
              <div class="card" v-if="item.id === 2">
                <div class="card-body">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <h6 class="card-text">
                    Nilai: {{ item.nilai ? item.nilai : 0 }}
                  </h6>
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    size="small"
                    :to="{
                      name: `processpenilaianpas`,
                      params: {
                        id3p: item.id,
                        name3p: item.name,
                        idUser: idUser,
                        idCompany: idCompany,
                        idDivisi: idDivisi,
                        date: date,
                      },
                    }"
                    >Nilai dimensi</vs-button
                  >
                </div>
              </div>
              <div class="card" v-if="item.id === 3">
                <div class="card-body">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <h6 class="card-text">
                    Nilai: {{ item.nilai ? item.nilai : 0 }}
                  </h6>
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    size="small"
                    :to="{
                      name: `performancepenilaianpas`,
                      params: {
                        id3p: item.id,
                        name3p: item.name,
                        idUser: idUser,
                        idCompany: idCompany,
                        idDivisi: idDivisi,
                        date: date,
                      },
                    }"
                    >Nilai dimensi</vs-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="total" class="flex justify-center">
          <vs-alert color="primary" title="SKOR AKHIR PAS" active="true">
            <div class="flex justify-center">
              {{ total }}
            </div>
          </vs-alert>
        </div>
        <br />
        <div class="flex justify-center">
          <vs-button
            color="primary"
            type="relief"
            icon="save"
            @click="finalSave"
            >Simpan Skor
          </vs-button>
        </div>
      </vx-card>
      <hr />
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isPeople: false,
      isProcess: false,
      isPerformance: false,
      idCompany: this.$route.params.idCompany,
      idDivisi: this.$route.params.idDivisi,
      idUser: this.$route.params.idUser,
      date: this.$route.params.date,
      showDate: null,
      datas3: [],
      total: null,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.masterpas.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchMasterDatas: "masterpas/index_datas",
      dispatchFinalSkor: "masterpas/finalsave",
    }),
    goBack() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Confirm",
        text: "Pastikan data sudah disimpan sebelum kembali. Apakah Anda yakin ingin kembali?",
        accept: this.acceptBack,
        acceptText: "ya",
        cancelText: "tutup",
      });
    },
    acceptBack() {
      this.$router.push({
        name: "detailpenilaianpas",
        params: {
          idCompany: this.idCompany,
          idDivisi: this.idDivisi,
          date: this.date,
        },
      });
    },
    async finalSave() {
      if (this.datas3.data.some((data) => data.nilai === 0)) {
        this.$vs.dialog({
          color: "warning",
          title: "warning",
          text: "Ada Nilai Parameter yang Bernilai 0",
          acceptText: "perbaiki",
        });
      } else if (
        confirm(
          "Pastikan data sudah Benar sebelum disimpan. Apakah Anda yakin ingin melanjutkan?"
        )
      ) {
        const final = {
          date: this.date,
          user_id: this.idUser,
          nilai: this.total,
        };
        try {
          const response = await this.dispatchFinalSkor(final);
          if (response.statusCode === 200) {
            this.$vs.notify({
              time: 4000,
              title: "Sukses",
              text: "Data berhasil disimpan",
              color: "primary",
              icon: "verified_user",
            });
          }
        } catch (error) {
          this.$vs.notify({
            time: 4000,
            title: "Error",
            text: error.data.message,
            color: "warning",
            icon: "error",
          });
        }
      }
    },

    async getDatas() {
      const send = new FormData();
      send.append("idCompany", this.idCompany);
      send.append("idDivisi", this.idDivisi);
      send.append("idUser", this.idUser);
      send.append("date", this.date);
      const datas3 = await this.dispatchMasterDatas(send);
      this.datas3 = datas3;
      datas3.data.forEach((e) => {
        e.nilai = e.nilai === null ? 0 : e.nilai;
        this.total += e.nilai;
      });

      this.total =
        this.total >= 69
          ? this.total
          : this.total >= 59
          ? 69
          : this.total >= 49
          ? 65
          : this.total >= 39
          ? 60
          : this.total >= 29
          ? 55
          : 50;
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
        const [year, month] = this.date.split("-");
        this.showDate = `${year}-${month}`;
        // console.log(this.showDate);
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
<style>
.bold-input input[type="month"] {
  font-weight: bold;
  background-color: white;
}
</style>
