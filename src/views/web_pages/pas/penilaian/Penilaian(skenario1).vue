<!-- {{ idCompany }}
    {{ idDivisi }}
    {{ idUser }} -->
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
      <vx-card
        title="
            Pilih Parameter
          "
      >
        <div class="row">
          <div
            v-if="datas3 && Array.isArray(datas3.data)"
            v-for="item in datas3.data"
            :key="item.id"
            class="col-md-4 mb-3"
          >
            <div class="card" v-if="item.id === 1">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <vs-button
                  class="mr-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="people"
                  >Nilai dimensi</vs-button
                >
              </div>
            </div>
            <div class="card" v-if="item.id === 2">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <vs-button
                  class="mr-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="process"
                  >Nilai dimensi</vs-button
                >
              </div>
            </div>
            <div class="card" v-if="item.id === 3">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <vs-button
                  class="mr-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="performance"
                  >Nilai dimensi</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <hr />
      <div v-if="isPeople">
        <vx-card title="Penilaian People">
          <div class="row">
            <vs-table
              pagination
              max-items="15"
              :data="listDimensiPeople"
              class="mb-2"
            >
              <template slot="thead">
                <vs-th sort-key="no">No </vs-th>
                <vs-th sort-key="type">Nama dimensi </vs-th>
                <vs-th></vs-th>
              </template>
              <template slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
                  <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                  <vs-td>
                    <div class="flex">
                      <vs-button
                        icon-pack="feather"
                        icon="icon-eye"
                        size="small"
                        title="beri nilai"
                        @click="ceknilai(tr.id)"
                      >
                      </vs-button>
                    </div>
                  </vs-td>

                  <template class="expand-user" slot="expand">
                    <vx-card>
                      <div class="vx-row">
                        <div class="w-full vx-col">
                          <!-- <vs-table :data="filterKpi" class="mb-2">
                            <template slot="thead">
                              <vs-th sort-key="no">No</vs-th>
                              <vs-th sort-key="kpi">KPI</vs-th>
                              <vs-th sort-key="max_nilai">Nilai Maksimal</vs-th>
                              <vs-th></vs-th>
                            </template>
                            <template slot-scope="{ data }">
                              <vs-tr
                                :key="indextr"
                                v-for="(tr, indextr) in data"
                              >
                                <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
                                <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                                <vs-td :data="tr.max_nilai">{{
                                  tr.max_nilai
                                }}</vs-td>
                                <vs-td>
                                  <div class="flex">
                                    <vs-button
                                      icon-pack="feather"
                                      icon="icon-eye"
                                      size="small"
                                    >
                                    </vs-button>
                                  </div>
                                </vs-td>
                              </vs-tr>
                            </template>
                          </vs-table> -->

                          <div
                            v-for="(item, index) in filterKpi"
                            :key="index"
                            class="vx-row mb-5"
                          >
                            <div class="vx-col w-full">
                              <vs-input
                                class="w-full"
                                v-model="storeData[item.name]"
                                :label="item.name"
                                :name="item.name"
                              ></vs-input>
                              <span
                                class="text-danger text-sm"
                                v-show="errors.has(item.name)"
                              >
                                {{ errors.first(item.name) }}
                              </span>
                            </div>
                          </div>
                          <div class="vx-row">
                            <div class="w-full text-right vx-col">
                              <vs-button @click="store">Save</vs-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </vx-card>
                  </template>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: flex-end;
            "
          >
            <vs-button
              class="mr-2"
              color="dark"
              type="border"
              icon-pack="feather"
              icon="icon-x"
              size="small"
              @click="close"
              >Tutup</vs-button
            >
          </div>
        </vx-card>
        <hr />
      </div>
      <div v-if="isProcess">
        <vx-card title="Penilaian Process">
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: flex-end;
            "
          >
            <vs-button
              class="mr-2"
              color="dark"
              type="border"
              icon-pack="feather"
              icon="icon-x"
              size="small"
              @click="close"
              >Tutup</vs-button
            >
          </div>
        </vx-card>
        <hr />
      </div>
      <div v-if="isPerformance">
        <vx-card title="Penilaian Performance">
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: flex-end;
            "
          >
            <vs-button
              class="mr-2"
              color="dark"
              type="border"
              icon-pack="feather"
              icon="icon-x"
              size="small"
              @click="close"
              >Tutup</vs-button
            >
          </div>
        </vx-card>
        <hr />
      </div>

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
      datas2: [],
      datas3: [],
      listDimensiPeople: [],
      listDimensiProcess: [],
      listDimensiPerformance: [],

      listAllDimensi: [],
      listAllKpi: [],
      filterKpi: [],
      listAllInd: [],

      //people
      id3p: null,
      iddimensi: null,
      idkpi: null,

      //storeData
      storeData: {},
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.masterpas.rows,
    }),
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
      dispatchDimensiPeople: "dimensi/index_per_3p",
      dispatchKpiPeople: "kpi/index",
    }),
    close() {
      this.isPeople = false;
      this.isPerformance = false;
      this.isProcess = false;
    },
    store() {
      console.log(this.storeData);
    },

    ceknilai(id) {
      const kpi = this.listAllKpi.filter((item) => item.dimensi_id === id);
      this.filterKpi = kpi;
      kpi.forEach((item) => {
        this.storeData[item.name] = null;
      });
      console.log(this.storeData);
    },

    async people() {
      const dimensi = await this.dispatchDimensiPeople(1);
      const allkpi = await this.dispatchMasterAllKpi();
      this.listDimensiPeople = dimensi.data;
      this.listAllKpi = allkpi.data;
      this.id3p = 1;
      this.isPeople = !this.isPeople;

      this.isPerformance = false;
      this.isProcess = false;
    },
    process() {
      this.isProcess = !this.isProcess;
      this.isPeople = false;
      this.isPerformance = false;
    },
    performance() {
      this.isPerformance = !this.isPerformance;
      this.isPeople = false;
      this.isProcess = false;
    },
    toPenilaian(id) {
      this.$router.push({
        name: "penilaianpenilaianpas",
        params: {
          idCompany: this.idCompany,
          idDivisi: this.idDivisi,
          idUser: id,
        },
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
