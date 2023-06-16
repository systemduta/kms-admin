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
            <td>{{ showDate }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Parameter</td>
            <td style="width: 5%">:</td>
            <td>{{ name3p }}</td>
          </tr>
        </table>
      </vx-card>
      <hr />
      <vx-card :title="name3p">
        <div class="row">
          <div
            v-if="itemArrays && Array.isArray(itemArrays)"
            v-for="item in itemArrays"
            :key="item.id"
            class="col-md-4 mb-3"
          >
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <vs-button
                  class="mr-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="breaking(item.id)"
                  >Beri Nilai</vs-button
                >
              </div>
            </div>
          </div>

          <hr />
          <hr />
          <center>
            <vs-button color="dark" type="line" icon="print" @click="cekBefore">
              Cek Data
            </vs-button>
          </center>
        </div>
      </vx-card>
      <div class="mt-3" v-if="isOthers && tempArray.length > 0">
        <vx-card :title="tempIdDimensi[0].name">
          <div>
            <div class="row mb-2" style="border: 3px solid black">
              <div class="col-sm-5">KPI</div>
              <div class="col-sm-4">Nilai</div>
              <div class="col-sm-3">Nilai Max</div>
            </div>
          </div>
          <div>
            <div>
              <div class="row mb-2" v-for="(i, index) in tempArray">
                <div class="col-sm-5">{{ tempArray[index].name }}</div>
                <div
                  class="col-sm-4"
                  style="display: flex; align-items: center"
                >
                  {{ tempArray[index].value }} -
                  <vs-button
                    class="ml-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    size="small"
                    @click="
                      getInd(tempIdDimensi[0]['3p_id'], tempArray[index].kpi_id)
                    "
                  ></vs-button>
                </div>
                <div class="col-sm-3">{{ tempArray[index].max_nilai }}</div>
              </div>

              <vs-button
                icon-pack="feather"
                icon="icon-eye"
                size="small"
                title="Simpan dan lanjutkan"
                @click="simpanOthers"
              >
                Simpan dan lanjutkan
              </vs-button>
            </div>
          </div>
        </vx-card>
      </div>

      <vs-popup title="Pilih Indikator" :active.sync="isInd">
        <vs-card>
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Nilai A:</small>
              <select
                class="ml-3 px-4 py-2 border rounded-lg w-80"
                v-model="tempValueA"
              >
                <option disabled selected>nilai - deskripsi</option>
                <option
                  v-for="item in nilaiA"
                  :key="item.id"
                  :value="item.nilai"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Nilai B:</small>
              <select
                class="ml-3 px-4 py-2 border rounded-lg w-80"
                v-model="tempValueB"
              >
                <option disabled selected>nilai - deskripsi</option>
                <option
                  v-for="item in nilaiB"
                  :key="item.id"
                  :value="item.nilai"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Nilai C:</small>
              <select
                class="ml-3 px-4 py-2 border rounded-lg w-80"
                v-model="tempValueC"
              >
                <option disabled selected>nilai - deskripsi</option>
                <option
                  v-for="item in nilaiC"
                  :key="item.id"
                  :value="item.nilai"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <hr />
          <div class="mb-5 vx-col">
            <!-- <div class="row">
              <div class="col-md-4">Nilai Asli:</div>
              <div class="col-md-4">: {{ perasli }}</div>
            </div> -->
            <div class="row">
              <!-- <div class="col-md-4">Nilai Akhir (Pembulatan):</div> -->
              <div class="col-md-4">Nilai Akhir :</div>
              <div class="col-md-4">: {{ perata }}</div>
            </div>
          </div>

          <div class="vx-row">
            <div class="w-full text-right vx-col">
              <vs-button color="dark" type="flat" @click="isInd = false"
                >Back</vs-button
              >
              &nbsp; &nbsp;
              <vs-button @click="hitung">Save</vs-button>
            </div>
          </div>
        </vs-card>
      </vs-popup>

      <!-- popup cek data -->
      <vs-popup fullscreen title="Form cek data" :active.sync="isFinal">
        <div class="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg mb-4">
          <p class="text-center">
            <b>Data Belum di simpan di database dan Hanya Untuk Preview</b> -
            Jika terdapat kesalahan nilai, silakan tutup pop-up ini dan isi
            ulang data.
          </p>
        </div>
        <vx-card>
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
        <div v-for="item in arrayBantuan" :key="item" v-if="item !== 'Absen'">
          <div v-if="storeData[item]" class="w-400 bg-white rounded shadow p-4">
            <h2 class="text-lg font-bold mb-2" contenteditable="true">
              {{ item }}
            </h2>
            <div
              class="row mb-2 text-gray-600"
              style="
                border-bottom: 3px solid black;
                border-top: 3px solid black;
              "
            >
              <div class="col-sm-5">KPI</div>
              <div class="col-sm-4">Nilai</div>
              <div class="col-sm-3">Nilai Max</div>
            </div>

            <div
              class="text-gray-600"
              v-if="storeData[item] && storeData[item].length > 0"
            >
              <div
                class="row mb-2"
                v-for="i in storeData[item]"
                :key="i.kpi_id"
              >
                <div class="col-sm-5">{{ i.name }}</div>
                <div class="col-sm-4">{{ i.value }}</div>
                <div class="col-sm-3">{{ i.max_nilai }}</div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div class="mt-2 text-center">
          <p class="font-bold">Nilai Akhir: {{ finalPerformance }}</p>
          <div class="flex justify-center">
            <vs-button
              color="primary"
              type="border"
              icon="functions"
              @click="hitungNilaiAkhir"
            >
              Hitung nilai Akhir
            </vs-button>
          </div>
        </div>
        <div>
          <hr />
          <div class="mt-2 text-center">
            <div class="flex justify-center">
              <vs-button
                color="primary"
                type="filled"
                icon="save"
                @click="finalSend"
              >
                Simpan Nilai
              </vs-button>
            </div>
          </div>
        </div>
      </vs-popup>
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
      showDate: null,
      datas3: [],
      datas4: [],
      data3p: {},

      //final
      itemArrays: [], ///dimensi
      itemArraysKpi: [], //kpi
      storeData: {}, /////untuk dikirim
      isFinal: false,

      //bantuan
      active1: true,
      isOthers: false,
      choosenArray: null,
      tempIdDimensi: {}, //untuk menyimpan sementara nilai dari array dimensi yang di klik
      tempArray: [], //menyimpan sementara nilai kpi lebih dari satu
      tempFilter: [], //menyimpan sementara nilai filter
      storeOthers: [],
      arrayBantuan: [], //untuk looping di form pengecekan
      finalPerformance: null,

      //untuk dropdown
      isInd: false,
      tempIdKpi: null,
      tempValueC: null,
      tempValueB: null,
      tempValueA: null,
      nilaiC: [],
      nilaiB: [],
      nilaiA: [],
    };
  },
  computed: {
    perasli() {
      const total =
        (Number(this.tempValueC) || 0) +
        (Number(this.tempValueB) || 0) +
        (Number(this.tempValueA) || 0);
      const count = 3; //ganti ini jika umlah A,B,C berubah
      const avg = total / count;

      if (avg < 1) {
        return 1;
      } else if (avg > 4) {
        return 4;
      } else {
        return avg;
      }
    },
    perata() {
      const total =
        (Number(this.tempValueC) || 0) +
        (Number(this.tempValueB) || 0) +
        (Number(this.tempValueA) || 0);
      const count = 3; //ganti ini jika umlah A,B,C berubah
      const avg = total / count;

      if (avg < 1) {
        return 1;
      } else if (avg > 4) {
        return 4;
      } else {
        // return Math.round(avg);
        return avg.toFixed(1);
      }
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

      //process
      dispatchProcess: "pen_performance/index",
      dispatchPeopleInd: "pen_people/getInd", //untuk semua gpp
      dispatchStore: "pen_performance/store",
    }),
    goBack() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: "Pastikan data sudah disimpan sebelum kembali. Apakah Anda yakin ingin kembali?",
        accept: this.acceptBack,
        acceptText: "ya",
        cancelText: "tutup",
      });
    },
    acceptBack() {
      this.$router.push({
        name: "penilaianpenilaianpas",
        params: {
          idCompany: this.idCompany,
          idDivisi: this.idDivisi,
          idUser: this.idUser,
          date: this.date,
        },
      });
    },
    async getDatas() {
      const send = new FormData();
      send.append("idCompany", this.idCompany);
      send.append("idDivisi", this.idDivisi);
      send.append("idUser", this.idUser);
      send.append("id3p", this.id3p);
      send.append("date", this.date);
      const datas3 = await this.dispatchMasterDatas(send);
      this.datas3 = datas3;

      //process
      const datas4 = await this.dispatchProcess(send);
      this.data3p = datas4.p3;
      this.datas4 = datas4;
      this.itemArrays = datas4.dimensi;
      this.itemArraysKpi = datas4.kpi;

      this.itemArrays.forEach((item) => {
        this.storeData = { ...this.storeData, [item.name]: {} };
      });

      this.arrayBantuan = this.itemArrays.map((item) => item.name);
    },

    breaking(id) {
      this.tempIdDimensi = this.itemArrays.filter((i) => i.id === id);
      const arrayBaru = this.itemArraysKpi
        .filter((itemArraysKpi) => itemArraysKpi.dimensi_id === id)
        .map((itemArraysKpi) => ({
          kpi_id: itemArraysKpi.id,
          name: itemArraysKpi.name,
          value: null,
          max_nilai: itemArraysKpi.max_nilai,
        }));
      this.tempArray = arrayBaru;
      if (this.tempArray.length > 0) {
        this.isOthers = !this.isOthers;
      } else {
        alert("KPI kosong, mohon di dikonfigurasi ulang");
      }
    },

    async getInd(id3p, idkpi) {
      this.tempIdKpi = idkpi;
      const send = new FormData();
      send.append("id3p", id3p);
      send.append("kpi_id", idkpi);

      try {
        const Ind = await this.dispatchPeopleInd(send);
        (this.nilaiC = Ind.nilaiC.map((item) => ({
          id: item.id,
          "3p_id": item["3p_id"],
          kpi_id: item.kpi_id,
          company_id: item.company_id,
          division_id: item.division_id,
          nilai: item.nilai,
          name: item.nilai + " - " + item.desc,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }))),
          (this.nilaiB = Ind.nilaiB.map((item) => ({
            id: item.id,
            "3p_id": item["3p_id"],
            kpi_id: item.kpi_id,
            company_id: item.company_id,
            division_id: item.division_id,
            nilai: item.nilai,
            name: item.nilai + " - " + item.desc,
            created_at: item.created_at,
            updated_at: item.updated_at,
          }))),
          (this.nilaiA = Ind.nilaiA.map((item) => ({
            id: item.id,
            "3p_id": item["3p_id"],
            kpi_id: item.kpi_id,
            company_id: item.company_id,
            division_id: item.division_id,
            nilai: item.nilai,
            name: item.nilai + " - " + item.desc,
            created_at: item.created_at,
            updated_at: item.updated_at,
          }))),
          (this.isInd = true);
        // console.log(this.nilai4);

        this.tempFilter = this.tempArray.filter(
          (item) => item.kpi_id === idkpi
        );
      } catch (error) {
        console.log(error);
      }
    },

    hitung() {
      this.tempArray = this.tempArray.map((item) => {
        if (item.kpi_id === this.tempFilter[0].kpi_id) {
          return {
            date: this.date,
            user_id: this.idUser,
            dimensi_id: this.tempIdDimensi[0].id,
            ...item,
            value: this.perata,
          };
        }
        return item;
      });
      setTimeout(() => {
        this.isInd = false;
      }, 100);

      if (this.storeData[this.tempIdDimensi[0].name]) {
        this.storeData[this.tempIdDimensi[0].name] = this.tempArray;
      } else {
        this.storeData = {
          ...this.storeData,
          [this.tempIdDimensi[0].name]: this.tempArray,
        };
      }

      this.tempValueA = null;
      this.tempValueB = null;
      this.tempValueC = null;
    },
    simpanOthers() {
      // console.log(this.storeData);
      this.isOthers = false;
    },
    cekBefore() {
      this.isOthers = false;
      this.isPopAbsen = false;
      this.isInd = false;
      this.isFinal = true;
    },

    hitungNilaiAkhir() {
      try {
        this.finalPerformance = 0;
        let sum_max_nilai = 0;
        let sum_value = 0;
        for (const category in this.storeData) {
          const items = this.storeData[category];
          if (items.length > 0) {
            for (const item of items) {
              sum_value += parseFloat(item.value);
              sum_max_nilai += item.max_nilai;
            }
          }
        }

        sum_value = (sum_value / sum_max_nilai) * 100;
        let finalAkhir = Math.round((sum_value * this.data3p.persentase) / 100);
        this.finalPerformance = parseInt(finalAkhir.toFixed(0));
      } catch (error) {
        // console.log(error);
        this.$vs.notify({
          time: 4000,
          title: "Error",
          text: "Unknow Error, Please report" + error,
          color: "warning",
          icon: "error",
        });
      }
    },

    async finalSend() {
      this.isFinal = false;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: "Pastikan data sudah disimpan sebelum kembali. Apakah Anda yakin ingin kembali?",
        accept: this.acceptSend,
        acceptText: "Kirim",
        cancelText: "Tutup",
      });
    },
    async acceptSend() {
      if (
        isNaN(this.finalPerformance) ||
        this.finalPerformance == null ||
        this.final_people === 0
      ) {
        // alert("Nilai Akhir adalah bernilai 'null', data tidak bisa dikirim");
        this.$vs.dialog({
          color: "warning",
          title: "warning",
          acceptText: "perbaiki",
          text: "Nilai Akhir bernilai 'null', data tidak bisa dikirim",
        });
        setTimeout(() => {
          this.isFinal = true;
        }, 2000);
      } else {
        this.storeData = {
          ...this.storeData,
          final_record: {
            date: this.date,
            user_id: this.idUser,
            id_3p: this.id3p,
            nilai: this.finalPerformance,
          },
        };
        try {
          const response = await this.dispatchStore(this.storeData);
          if (response.statusCode === 200) {
            this.$vs.notify({
              time: 4000,
              title: "Suksess",
              text: "Data sukses disimpan",
              color: "primary",
              icon: "verified_user",
            });

            setTimeout(() => {
              this.isFinal = false;
              setTimeout(() => {
                this.$router.push({
                  name: "penilaianpenilaianpas",
                  params: {
                    idCompany: this.idCompany,
                    idDivisi: this.idDivisi,
                    idUser: this.idUser,
                    date: this.date,
                  },
                });
              }, 500);
            }, 500);
          } else {
            this.$vs.notify({
              time: 4000,
              title: "Error",
              text: response.message,
              color: "warning",
              icon: "error",
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
        const [year, month, day] = this.date.split("-");
        this.showDate = `${month} - ${year}`;
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
