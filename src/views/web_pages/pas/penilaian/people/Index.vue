<!-- nilai yang harus dikirim 
{
  user_id
  dimensi_id
  kpi_id
} jika ingin menghapus maka harus membawa 
date, user_id, id_3p,dimensi_id

-->
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
          <tr>
            <td style="width: 40%">Parameter</td>
            <td style="width: 5%">:</td>
            <td>{{ name3p }}</td>
          </tr>
        </table>
      </vx-card>
      <hr />
      <vx-card title="People ">
        <div class="row" v-if="itemArrays && Array.isArray(itemArrays)">
          <div v-for="item in itemArrays" :key="item.id" class="col-md-4 mb-3">
            <div class="card" v-if="item.id === 1">
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
            <div class="card" v-else>
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
      <hr />
      <div v-if="isPopAbsen">
        <vx-card title="Absen">
          <div>
            <div class="row mb-2" style="border: 3px solid black">
              <div class="col-sm-3">Keterangan</div>
              <div class="col-sm-3">Hari</div>
              <div class="col-sm-3">%</div>
              <div class="col-sm-3">Skor</div>
            </div>
            <div
              class="row mb-3"
              v-for="(i, index) in storeKhususAbsen"
              :key="index"
            >
              <div class="col-sm-3">
                {{ i.name }}
              </div>
              <div
                class="col-sm-3"
                v-if="storeKhususAbsen[index].kpi_id == i.kpi_id"
              >
                <vs-input
                  v-model="storeKhususAbsen[index].value"
                  type="number"
                  v-validate="'required'"
                />
              </div>

              <div class="col-sm-3" v-if="i.kpi_id === 10">
                {{ perSakit }}
              </div>
              <div class="col-sm-3" v-if="i.kpi_id === 11">
                {{ perIzin }}
              </div>
              <div class="col-sm-3" v-if="i.kpi_id === 12">
                {{ perTerlambat }}
              </div>
              <div class="col-sm-3" v-if="i.kpi_id === 13">
                {{ perAlpha }}
              </div>

              <div class="col-sm-3" v-if="i.kpi_id === 14">
                {{ perHKA }}
              </div>

              <div class="col-sm-3" v-if="i.kpi_id === 14">
                {{ skorabsen }}
              </div>
            </div>
            <hr />
            <table class="table" v-if="storeKhususAbsen.length > 0">
              <tr>
                <td style="width: 20%">Nilai Maximal</td>
                <td style="width: 5%">:</td>
                <td>{{ storeKhususAbsen[0].max_nilai }}</td>
              </tr>
              <tr>
                <td style="width: 20%">Nilai Akhir</td>
                <td style="width: 5%">:</td>
                <td>{{ nilaiabsen }}</td>
              </tr>
            </table>
            <vs-button
              icon-pack="feather"
              icon="icon-eye"
              size="small"
              title="Simpan dan lanjutkan"
              @click="simpanAbsen"
            >
              Simpan dan lanjutkan
            </vs-button>
          </div>
        </vx-card>
        <hr />
      </div>
      <div v-if="isOthers && tempArray.length > 0">
        <vx-card :title="tempIdDimensi.name">
          <div>
            <div class="row mb-2" style="border: 3px solid black">
              <div class="col-sm-5">KPI</div>
              <div class="col-sm-4">Nilai</div>
              <div class="col-sm-3">Nilai Max</div>
            </div>
          </div>
          <div v-if="tempArray.length < 2">
            <div class="row mb-2">
              <div class="col-sm-5">{{ tempArray[0].name }}</div>
              <div class="col-sm-4" style="display: flex; align-items: center">
                {{ tempArray[0].value }} -
                <vs-button
                  class="ml-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="getInd(tempIdDimensi['3p_id'], tempArray[0].kpi_id)"
                ></vs-button>
              </div>
              <div class="col-sm-3">{{ tempArray[0].max_nilai }}</div>
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
          <div v-else>
            <div class="row mb-2" v-for="(i, index) in tempArray" :key="index">
              <div class="col-sm-5">{{ tempArray[index].name }}</div>
              <div class="col-sm-4" style="display: flex; align-items: center">
                {{ tempArray[index].value }} -
                <vs-button
                  class="ml-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getInd(tempIdDimensi['3p_id'], tempArray[index].kpi_id)
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
        </vx-card>
      </div>
      <vs-popup title="Pilih Indikator" :active.sync="isInd">
        <vs-card>
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Indikator:</small>
              <select
                class="ml-3 px-4 py-2 border rounded-lg w-80"
                v-model="tempIndFinal"
              >
                <option disabled selected>nilai - deskripsi</option>
                <option
                  v-for="item in tempInd"
                  :key="item.id"
                  :value="item.nilai"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- <div class="mb-5 vx-row">
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
          </div> -->
          <hr />
          <div class="mb-5 vx-col">
            <!-- <div class="row">
              <div class="col-md-4">Nilai Asli:</div>
              <div class="col-md-4">: {{ perasli }}</div>
            </div> -->
            <div class="row">
              <!-- <div class="col-md-4">Nilai Akhir (Pembulatan):</div> -->
              <div class="col-md-4">Nilai Akhir:</div>
              <!-- <div class="col-md-4">: {{ perata }}</div> -->
              <div class="col-md-4">: {{ tempIndFinal }}</div>
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
          </table>
        </vx-card>
        <hr />
        <div>
          <vx-card title="Absen">
            <div v-if="storeData.Absen">
              <div class="row mb-2" style="border: 3px solid black">
                <div class="col-sm-3">Keterangan</div>
                <div class="col-sm-3">Hari</div>
                <div class="col-sm-3">%</div>
                <div class="col-sm-3">Skor</div>
              </div>
              <div v-for="(i, index) in storeData.Absen.detail" :key="index">
                <div
                  class="row mb-3"
                  v-if="
                    storeData.Absen &&
                    storeData.Absen.detail &&
                    storeData.Absen.detail.length > 0
                  "
                >
                  <div class="col-sm-3">
                    {{ i.name }}
                  </div>
                  <div class="col-sm-3">
                    <vs-input
                      v-model="storeData.Absen.detail[index].value"
                      type="number"
                      disabled
                    />
                  </div>

                  <div class="col-sm-3" v-if="i.kpi_id === 10">
                    {{ perSakit }}
                  </div>
                  <div class="col-sm-3" v-if="i.kpi_id === 11">
                    {{ perIzin }}
                  </div>
                  <div class="col-sm-3" v-if="i.kpi_id === 12">
                    {{ perTerlambat }}
                  </div>
                  <div class="col-sm-3" v-if="i.kpi_id === 13">
                    {{ perAlpha }}
                  </div>

                  <div class="col-sm-3" v-if="i.kpi_id === 14">
                    {{ perHKA }}
                  </div>

                  <div class="col-sm-3" v-if="i.kpi_id === 14">
                    {{ skorabsen }}
                  </div>
                </div>
                <div v-else>
                  <p>Belum ada data detail Absen.</p>
                </div>
              </div>

              <hr />
              <table
                class="table"
                v-if="
                  storeData.Absen &&
                  storeData.Absen.detail &&
                  storeData.Absen.detail.length > 0
                "
              >
                <tr>
                  <td style="width: 20%">Nilai Maximal</td>
                  <td style="width: 5%">:</td>
                  <td>{{ storeData.Absen.detail[0].max_nilai }}</td>
                </tr>
                <tr>
                  <td style="width: 20%">Nilai Akhir</td>
                  <td style="width: 5%">:</td>
                  <td>{{ storeData.Absen.nilaiAkhir }}</td>
                </tr>
              </table>
            </div>
          </vx-card>
          <hr />
          <div v-for="item in arrayBantuan" :key="item">
            <div v-if="item !== 'Absen'">
              <div
                v-if="storeData[item]"
                class="w-400 bg-white rounded shadow p-4"
              >
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
            </div>

            <hr />
          </div>
          <div class="mt-2 text-center">
            <div class="flex justify-center">
              <vs-button
                color="primary"
                type="border"
                icon="functions"
                size="small"
                class="mb-5"
                @click="hitungNilaiAkhir"
              >
                Hitung nilai Akhir
              </vs-button>
            </div>
            <p class="font-bold">Nilai Akhir: {{ final_people }}</p>
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
                :disabled="final_people ? false : true"
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
      // listDimensiPeople: [],
      // listDimensiProcess: [],
      // listDimensiPerformance: [],

      // listAllDimensi: [],
      // listAllKpi: [],
      // filterKpi: [],
      // listAllInd: [],
      // kpiskorarray: [],

      //dinamis

      //final
      itemArrays: [], ///dimensi
      itemArraysKpi: [], //kpi
      storeData: {}, /////untuk dikirim
      isFinal: false,

      ///persentase
      perSakit: 0.5,
      perIzin: 0.5,
      perTerlambat: 0.125,
      perAlpha: 1,

      //pengkhusussan
      isPopAbsen: false,
      storeKhususAbsen: [], //dikumpulkan
      nilaiakhirabsen: 0,
      storeKhususAbsen2: [], //dikirim ke backend

      //yg lain (unity,1visi,1hati,1semangat,dll)
      active1: true,
      isOthers: false,
      choosenArray: null,
      tempIdDimensi: [], //untuk menyimpan sementara nilai dari array dimensi yang di klik
      tempArray: [], //menyimpan sementara nilai kpi lebih dari satu
      tempFilter: [], //menyimpan sementara nilai filter
      storeOthers: [],
      arrayBantuan: [], //untuk looping di form pengecekan
      final_people: null,

      //untuk dropdown
      isInd: false,
      tempIdKpi: null,
      tempValueC: null,
      tempValueB: null,
      tempValueA: null,

      tempInd: [],
      tempIndFinal: null,
      nilaiC: [],
      nilaiB: [],
      nilaiA: [],
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
        Number(this.storeKhususAbsen[0].value) * perSakit +
        Number(this.storeKhususAbsen[1].value) * perIzin +
        Number(this.storeKhususAbsen[2].value) * perTerlambat +
        Number(this.storeKhususAbsen[3].value) * perAlpha;
      return -1 * hka;
    },
    skorabsen() {
      const perHKA = this.perHKA;
      const skorAbsen = Number(perHKA) + Number(this.storeKhususAbsen[4].value);

      return skorAbsen;
    },
    nilaiabsen() {
      const HKA = Number(this.storeKhususAbsen[4].value);
      const result =
        (this.skorabsen / HKA) * Number(this.storeKhususAbsen[0].max_nilai);

      if (result < 1) {
        return 1;
      } else if (result > 4) {
        return 4;
      }
      this.nilaiakhirabsen = result.toFixed(1);
      return result.toFixed(1);
    },
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
    newfinal() {
      if (this.tempIndFinal) {
        return this.tempIndFinal;
      } else {
        return (this.tempIndFinal = 1);
      }
    },
  },
  methods: {
    ...mapActions({
      dispatchMaster: "masterpas/index",
      dispatchMasterDatas: "masterpas/index_datas",

      //people
      dispatchPeople: "pen_people/index",
      dispatchPeopleInd: "pen_people/getInd",
      dispatchStore: "pen_people/store",
    }),
    breaking(id) {
      //memecah array
      if (id === 1) {
        const arrayBaru = this.itemArraysKpi
          .filter((itemArraysKpi) => itemArraysKpi.dimensi_id === 1)
          .map((itemArraysKpi) => ({
            kpi_id: itemArraysKpi.id,
            name: itemArraysKpi.name,
            value: 0,
            max_nilai: itemArraysKpi.max_nilai,
          }));
        this.storeKhususAbsen = arrayBaru;

        const idArrays = Number(id) - 1;
        this.tempIdDimensi = this.itemArrays[idArrays]; //menyimpan data dimensi yg diklik

        this.isPopAbsen = !this.isPopAbsen;
      } else {
        const idArrays = Number(id) - 1;
        this.tempIdDimensi = this.itemArrays[idArrays];
        // console.log(this.tempIdDimensi);
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
      }
    },
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
      send.append("date", this.date);
      const datas3 = await this.dispatchMasterDatas(send);
      this.datas3 = datas3;

      ///people
      const datas4 = await this.dispatchPeople();
      this.data3p = datas4.p3;
      this.datas4 = datas4;
      this.itemArrays = datas4.dimensi;
      this.itemArraysKpi = datas4.kpi;

      this.itemArrays.forEach((item) => {
        this.storeData = { ...this.storeData, [item.name]: {} };
      });

      this.arrayBantuan = this.itemArrays.map((item) => item.name);
    },

    async getInd(id3p, idkpi) {
      this.tempIdKpi = idkpi;
      const send = new FormData();
      send.append("id3p", id3p);
      send.append("kpi_id", idkpi);

      try {
        const Ind = await this.dispatchPeopleInd(send);
        // (this.nilaiC = Ind.nilaiC.map((item) => ({
        //   id: item.id,
        //   "3p_id": item["3p_id"],
        //   kpi_id: item.kpi_id,
        //   company_id: item.company_id,
        //   division_id: item.division_id,
        //   nilai: item.nilai,
        //   name: item.nilai + " - " + item.desc,
        //   created_at: item.created_at,
        //   updated_at: item.updated_at,
        // }))),
        //   (this.nilaiB = Ind.nilaiB.map((item) => ({
        //     id: item.id,
        //     "3p_id": item["3p_id"],
        //     kpi_id: item.kpi_id,
        //     company_id: item.company_id,
        //     division_id: item.division_id,
        //     nilai: item.nilai,
        //     name: item.nilai + " - " + item.desc,
        //     created_at: item.created_at,
        //     updated_at: item.updated_at,
        //   }))),
        //   (this.nilaiA = Ind.nilaiA.map((item) => ({
        //     id: item.id,
        //     "3p_id": item["3p_id"],
        //     kpi_id: item.kpi_id,
        //     company_id: item.company_id,
        //     division_id: item.division_id,
        //     nilai: item.nilai,
        //     name: item.nilai + " - " + item.desc,
        //     created_at: item.created_at,
        //     updated_at: item.updated_at,
        //   }))),

        this.tempInd = Ind.nilai.map((item) => ({
          id: item.id,
          "3p_id": item["3p_id"],
          kpi_id: item.kpi_id,
          company_id: item.company_id,
          division_id: item.division_id,
          nilai: item.nilai,
          name: `${item.nilai} - ${item.desc}`,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));
        this.isInd = true;
        // console.log(this.nilai4);

        this.tempFilter = this.tempArray.filter(
          (item) => item.kpi_id === idkpi
        );
      } catch (error) {
        console.log(error);
      }
    },

    // countInd() {
    //   const total =
    //     (Number(this.tempValue4) || 0) +
    //     (Number(this.tempValue3) || 0) +
    //     (Number(this.tempValue2) || 0) +
    //     (Number(this.tempValue1) || 0);
    //   // const count = 4;
    //   // const avg = total / count;
    //   console.log(total);
    // },
    simpanAbsen() {
      if (
        isNaN(this.nilaiabsen) ||
        this.nilaiabsen == null ||
        this.nilaiabsen === 0
      ) {
        this.$vs.notify({
          time: 4000,
          title: "Error",
          text: "Nilai Akhir null",
          color: "warning",
          icon: "error",
        });
      } else {
        this.storeKhususAbsen2 = {
          date: this.date,
          user_id: this.idUser,
          dimensi_id: this.tempIdDimensi.id,
          nilaiAkhir: this.nilaiakhirabsen,
          max_nilai: this.storeKhususAbsen[0].max_nilai,
          detail: this.storeKhususAbsen,
        };
        if (this.storeData[this.tempIdDimensi.name]) {
          this.storeData[this.tempIdDimensi.name] = this.storeKhususAbsen2;
        } else {
          this.storeData = {
            ...this.storeData,
            [this.tempIdDimensi.name]: this.storeKhususAbsen2,
          };
        }

        setTimeout(() => {
          this.isPopAbsen = false;
        }, 100);
      }
    },

    hitung() {
      this.tempArray = this.tempArray.map((item) => {
        if (item.kpi_id === this.tempFilter[0].kpi_id) {
          return {
            date: this.date,
            user_id: this.idUser,
            dimensi_id: this.tempIdDimensi.id,
            ...item,
            // value: this.perata,
            value: this.newfinal,
          };
        }
        return item;
      });
      setTimeout(() => {
        this.isInd = false;
      }, 100);

      if (this.storeData[this.tempIdDimensi.name]) {
        this.storeData[this.tempIdDimensi.name] = this.tempArray;
      } else {
        this.storeData = {
          ...this.storeData,
          [this.tempIdDimensi.name]: this.tempArray,
        };
      }

      this.tempValueA = null;
      this.tempValueB = null;
      this.tempValueC = null;
      this.tempIndFinal = null;
    },
    simpanOthers() {
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
        this.final_people = 0;
        let sum_max_nilai = 0;
        Object.values(this.storeData).forEach((item) => {
          if (Array.isArray(item)) {
            item.forEach((subItem) => {
              sum_max_nilai += subItem.max_nilai;
            });
          } else {
            sum_max_nilai += item.max_nilai;
          }
        });

        let sum_value = 0;
        Object.values(this.storeData).forEach((item) => {
          if (Array.isArray(item)) {
            item.forEach((subItem) => {
              if (subItem.name !== "Absen") {
                sum_value += parseFloat(subItem.value);
              }
            });
          } else {
            sum_value += parseFloat(item.nilaiAkhir);
          }
        });
        sum_value = (sum_value / sum_max_nilai) * 100;
        const final_people2 = Math.round(
          (sum_value * this.data3p.persentase) / 100
        );
        this.final_people = parseInt(final_people2.toFixed(0));
      } catch (error) {
        // console.log(error);
        this.$vs.notify({
          time: 4000,
          title: "Error",
          text: `Unknow Error, Please report${error}`,
          color: "warning",
          icon: "error",
        });
      }
    },

    async finalSend() {
      this.isFinal = false;
      this.$vs.dialog({
        type: "confirm",
        color: "primary",
        title: "Confirm",
        text: "Pastikan data sudah benar. Apakah Anda ingin melanjutkan ?",
        accept: this.acceptSend,
        acceptText: "Kirim",
        cancelText: "Tutup",
      });
    },
    async acceptSend() {
      if (
        isNaN(this.final_people) ||
        this.final_people == null ||
        this.final_people === 0
      ) {
        // alert("Nilai Akhir bernilai 'null', data tidak bisa dikirim");
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
            nilai: this.final_people,
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
          // console.log(error);
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
        this.showDate = `${year}-${month}`;
        console.log(this.showDate);
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
<!--tempArray: [
    {
        "kpi_id": 8,
        "user_id": 728,
        "name": "Kasih",
        "date": "",
        "value": null,
        "max_nilai": 4
    }
] -->

<!-- { "date": "2023-05-17", "user_id": 728, "dimensi_id": 1, "nilaiAkhir": "3.0", "detail": [ { "kpi_id": 10, "name": "Sakit", "value": "1", "max_nilai": 4 }, { "kpi_id": 11, "name": "Izin", "value": "2", "max_nilai": 4 }, { "kpi_id": 12, "name": "Terlambat", "value": "4", "max_nilai": 4 }, { "kpi_id": 13, "name": "Alpha", "value": "3", "max_nilai": 4 }, { "kpi_id": 14, "name": "HKA", "value": "21", "max_nilai": 4 } ], "max_nilai": 4 } [ { "date": "2023-05-17", "user_id": 728, "dimensi_id": 2, "kpi_id": 8, "name": "Kasih", "value": 1.75, "max_nilai": 4 } ] [ { "date": "2023-05-17", "user_id": 728, "dimensi_id": 3, "kpi_id": 25, "name": "Komitmen dengan tujuan", "value": 0, "max_nilai": 4 } ] [ { "date": "2023-05-17", "user_id": 728, "dimensi_id": 4, "kpi_id": 15, "name": "Kejujuran", "value": 0, "max_nilai": 4 }, { "date": "2023-05-17", "user_id": 728, "dimensi_id": 4, "kpi_id": 16, "name": "Responsif", "value": 0, "max_nilai": 4 }, { "date": "2023-05-17", "user_id": 728, "dimensi_id": 4, "kpi_id": 17, "name": "Rendah Hati", "value": 0, "max_nilai": 4 }, { "date": "2023-05-17", "user_id": 728, "dimensi_id": 4, "kpi_id": 18, "name": "Bertanggung Jawab", "value": 0, "max_nilai": 4 }, { "date": "2023-05-17", "user_id": 728, "dimensi_id": 4, "kpi_id": 19, "name": "Kepatuhan Kepada Perusahaan", "value": 0, "max_nilai": 4 } ] [ { "date": "2023-05-17", "user_id": 728, "dimensi_id": 5, "kpi_id": 20, "name": "Disiplin", "value": 2.25, "max_nilai": 4 }, { "date": "2023-05-17", "user_id": 728, "dimensi_id": 5, "kpi_id": 21, "name": "Inovatif", "value": 0, "max_nilai": 4 }, { "date": "2023-05-17", "user_id": 728, "dimensi_id": 5, "kpi_id": 22, "name": "Ketahanan", "value": 0, "max_nilai": 4 }, { "date": "2023-05-17", "user_id": 728, "dimensi_id": 5, "kpi_id": 23, "name": "Mindset Berkembang", "value": 0, "max_nilai": 4 }, { "date": "2023-05-17", "user_id": 728, "dimensi_id": 5, "kpi_id": 24, "name": "Berani Mengambil Keputusan", "value": 0, "max_nilai": 4 } ] -->
