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
        </table>
      </vx-card>
      <hr />
      <vx-card title="People ">
        <!-- <vs-alert title="Danger" active="true" color="danger">
          Isi secara berurutan dari atas ke bawah
        </vs-alert> -->
        <div>
          <vs-collapse type="margin">
            <vs-collapse-item
              v-if="itemArrays.length > 0 && item.isVisible"
              v-for="(item, index) in itemArrays"
            >
              <div @click="breaking(item.id)" slot="header" style="color: blue">
                {{ item.name || item["name"] }}
              </div>
              <div class="row mb-2" style="border: 3px solid black">
                <div class="col-sm-3">Keterangan</div>
                <div class="col-sm-3">Hari</div>
                <div class="col-sm-3" v-if="item.id === 1">%</div>
                <div class="col-sm-3">Skor</div>
              </div>
              <div
                class="row mb-3"
                v-if="item.id === i.dimensi_id"
                v-for="(i, index) in storeData"
              >
                <div class="col-sm-3">
                  {{ i.name }}
                </div>
                <div class="col-sm-3" v-if="storeData[index].id == i.id">
                  <vs-input
                    placeholder="..."
                    v-model="storeData[index].value"
                  />
                </div>

                <div
                  class="col-sm-3"
                  v-if="i.name === 'Sakit' && item.id === 1"
                >
                  {{ perSakit }}
                </div>
                <div class="col-sm-3" v-if="i.name === 'Izin' && item.id === 1">
                  {{ perIzin }}
                </div>
                <div
                  class="col-sm-3"
                  v-if="i.name === 'Terlambat' && item.id === 1"
                >
                  {{ perTerlambat }}
                </div>
                <div
                  class="col-sm-3"
                  v-if="i.name === 'Alpha' && item.id === 1"
                >
                  {{ perAlpha }}
                </div>

                <div class="col-sm-3" v-if="i.name === 'HKA'">
                  {{ perHKA }}
                </div>

                <div class="col-sm-3" v-if="i.name === 'HKA'">
                  {{ skorabsen }}
                </div>
              </div>
              <hr />
              <table class="table" v-if="storeData.length > 0 && item.id === 1">
                <tr>
                  <td style="width: 20%">Nilai Maximal</td>
                  <td style="width: 5%">:</td>
                  <td>{{ storeData[0].max_nilai }}</td>
                </tr>
                <tr>
                  <td style="width: 20%">Nilai Akhir</td>
                  <td style="width: 5%">:</td>
                  <td>{{ nilaiabsen }}</td>
                </tr>
              </table>
              <center>
                <vs-button
                  class="my-3"
                  color="primary"
                  type="filled"
                  @click="process(item.id)"
                  >Simpan dan lanjutkan</vs-button
                >
              </center>
            </vs-collapse-item>
          </vs-collapse>
        </div>
      </vx-card>

      <vx-card v-if="isProcess" title="Process"> </vx-card>
      <hr />
      <vx-card v-if="isPerformance" title="Performance"> </vx-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isProcess: false,
      isPerformance: false,
      idCompany: this.$route.params.idCompany,
      idDivisi: this.$route.params.idDivisi,
      idUser: this.$route.params.idUser,
      datas3: [],
      datas4: [],
      listDimensiPeople: [],
      listDimensiProcess: [],
      listDimensiPerformance: [],

      listAllDimensi: [],
      listAllKpi: [],
      filterKpi: [],
      listAllInd: [],
      kpiskorarray: [],

      // absenKpi: [],

      //dinamis
      itemArrays: [], ///dimensi
      itemArraysKpi: [], //kpi
      storeData: [], /////untuk dikirim
      nilaiakhirabsen: 0,

      ///persentase
      perSakit: 0.5,
      perIzin: 0.5,
      perTerlambat: 0.125,
      perAlpha: 1,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.masterpas.rows,
    }),
    perHKA() {
      const perSakit = this.perSakit;
      const perIzin = this.perIzin;
      const perTerlambat = this.perTerlambat;
      const perAlpha = this.perAlpha;

      const hka =
        this.storeData[0].value * perSakit +
        this.storeData[1].value * perIzin +
        this.storeData[2].value * perTerlambat +
        this.storeData[3].value * perAlpha;
      return -1 * hka;
    },
    skorabsen() {
      const perHKA = this.perHKA;
      const skorAbsen = Number(perHKA) + Number(this.storeData[4].value);

      return skorAbsen;
    },
    nilaiabsen() {
      const HKA = Number(this.storeData[4].value);
      const result =
        (this.skorabsen / HKA) * Number(this.storeData[0].max_nilai);
      return result.toFixed(1);
    },
  },
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
    }),
    process() {
      // this.isProcess = !this.isProcess;
      this.nilaiakhirabsen = this.nilaiabsen;
      const newData = {
        Absen: [{ nilaiAkhir: this.nilaiakhirabsen }, ...this.storeData],
      };

      this.itemArrays[0].isVisible = false;
      this.itemArrays[1].isVisible = true;
    },
    breaking(id) {
      const newData = this.itemArraysKpi.filter((i) => i.dimensi_id === id);
      const newDataIds = newData.map((data) => data.id);
      const existingDataIds = this.storeData.map((data) => data.id);

      const uniqueDataIds = [...new Set([...existingDataIds, ...newDataIds])];

      this.storeData = uniqueDataIds.map((id) => {
        const existingData = this.storeData.find((data) => data.id === id);
        const newDataItem = newData.find((data) => data.id === id);

        return existingData
          ? existingData
          : {
              id: id,
              "3p_id": newDataItem["3p_id"],
              dimensi_id: newDataItem["dimensi_id"],
              name: newDataItem.name,
              value: null,
              max_nilai: newDataItem.max_nilai,
            };
      });
    },

    goBack() {
      this.$router.push({
        name: `detailpenilaianpas`,
        params: {
          idCompany: this.idCompany,
          idDivisi: this.idDivisi,
        },
      });
    },
    async getDatas() {
      const send = new FormData();
      send.append("idCompany", this.idCompany);
      send.append("idDivisi", this.idDivisi);
      send.append("idUser", this.idUser);
      const datas3 = await this.dispatchMasterDatas(send);
      this.datas3 = datas3;

      ///people
      const datas4 = await this.dispatchPeople();
      this.datas4 = datas4;
      this.itemArrays = datas4.dimensi.map((dimensi, index) => {
        if (index === 0) {
          return {
            ...dimensi,
            isVisible: true,
          };
        } else {
          return {
            ...dimensi,
            isVisible: false,
          };
        }
      });
      this.itemArraysKpi = datas4.kpi;
      //absen
      // const filteredKpiAbsen = datas4.kpi.filter(
      //   (item) => item.dimensi_id === 1
      // );
      // this.absenKpi = filteredKpiAbsen;

      // // 2. Buat array baru dari hasil pemecahan dengan ketentuan
      // const newArray = filteredKpiAbsen.map((item) => {
      //   return {
      //     id: item.id,
      //     hari: null,
      //   };
      // });
      // this.storeKpiAbsen = newArray;
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
