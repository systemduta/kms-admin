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
      <vx-card title="KPI PAS">
        <table>
          <tr>
            <td>Nama Parameter</td>
            <td>&nbsp;:&nbsp;</td>
            <td>{{ listKpi.name3p }}</td>
          </tr>
          <tr>
            <td>Nama Dimensi</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              {{ listKpi.nameDimensi }}
            </td>
          </tr>
          <tr>
            <td>Nama Perusahaan</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              {{ listKpi.nameCompany }}
            </td>
          </tr>
          <tr>
            <td>Nama Divisi</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              {{ listKpi.nameDivisi }}
            </td>
          </tr>
        </table>
      </vx-card>
      <hr />

      <vx-card title="Daftar KPI">
        <vs-table
          search
          v-if="listKpi && Array.isArray(listKpi.data)"
          :data="listKpi.data"
          class="mb-2"
        >
          <template slot="header">
            <vs-button size="small" @click="isAdd = true">
              Tambah KPI
            </vs-button>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Nilai Maksimal</vs-th>
            <vs-th>Aksi</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.max_nilai">{{ tr.max_nilai }}</vs-td>
              <vs-td>
                <div class="flex">
                  <custom-tooltip-button
                    text-tooltip="Lihat Indikator"
                    :to="{
                      name: `processIndPas`,
                      params: {
                        id3p: id3p,
                        idDimensi: idDimensi,
                        idKpi: tr.id,
                        idCompany: idCompany,
                        idDivisi: idDivisi,
                      },
                    }"
                    icon="icon-eye"
                    color="primary"
                  />

                  <div @click="getUpdate(tr.id)">
                    <custom-tooltip-button
                      text-tooltip="Edit KPI"
                      icon="icon-edit"
                      color="warning"
                    />
                  </div>
                  <div @click="deletes(tr.id)">
                    <custom-tooltip-button
                      text-tooltip="Hapus KPI"
                      icon="icon-delete"
                      color="danger"
                    />
                  </div>

                  <!-- <vs-button
                    color="danger"
                    icon-pack="feather"
                    icon="icon-delete"
                    size="small"
                  ></vs-button> -->
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>

      <vs-popup :active.sync="isAdd" title="Tambah KPI">
        <vx-card>
          <div class="mb-5 vx-row">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="storeData.name"
                v-validate="'required'"
                name="name"
                label="Name KPI"
              ></vs-input>
              <span class="text-danger text-sm" v-show="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
          </div>
          <div class="mb-5 vx-row">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="storeData.max_nilai"
                v-validate="'required'"
                name="max_nilai"
                label="Nilai Maximal"
                type="number"
              ></vs-input>
              <span
                class="text-danger text-sm"
                v-show="errors.has('max_nilai')"
                >{{ errors.first("max_nilai") }}</span
              >
            </div>
          </div>
          <div class="vx-row">
            <div class="w-full text-right vx-col">
              <vs-button color="dark" type="flat" @click="isAdd = false"
                >Back</vs-button
              >
              &nbsp; &nbsp;
              <vs-button @click="store">Save</vs-button>
            </div>
          </div>
        </vx-card>
      </vs-popup>

      <vs-popup :active.sync="isUpdate" title="Edit KPI">
        <vx-card>
          <div class="mb-5 vx-row">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="updateData.name"
                v-validate="'required'"
                name="name"
                label="Name KPI"
              ></vs-input>
              <span class="text-danger text-sm" v-show="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
          </div>
          <div class="mb-5 vx-row">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="updateData.max_nilai"
                v-validate="'required'"
                name="max_nilai"
                label="Nilai Maximal"
                type="number"
              ></vs-input>
              <span
                class="text-danger text-sm"
                v-show="errors.has('max_nilai')"
                >{{ errors.first("max_nilai") }}</span
              >
            </div>
          </div>
          <div class="vx-row">
            <div class="w-full text-right vx-col">
              <vs-button color="dark" type="flat" @click="isUpdate = false"
                >Back</vs-button
              >
              &nbsp; &nbsp;
              <vs-button @click="update">Save</vs-button>
            </div>
          </div>
        </vx-card>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CustomTooltipButton from "@/views/components/CustomTooltipButton";
export default {
  components: {
    CustomTooltipButton,
  },
  data() {
    return {
      isAdd: false,
      isUpdate: false,
      idDelete: null,
      nama3p: "",
      namaDimensi: "",
      namaCompany: "",
      namaDivisi: "",
      listKpi: [],
      storeData: {
        id3p: this.$route.params.id3p,
        idDimensi: this.$route.params.idDimensi,
        idCompany: this.$route.params.idCompany,
        idDivisi: this.$route.params.idDivisi,
        name: "",
        max_nilai: null,
      },

      updateData: {
        id: null,
        id3p: this.$route.params.id3p,
        idDimensi: this.$route.params.idDimensi,
        idCompany: this.$route.params.idCompany,
        idDivisi: this.$route.params.idDivisi,
        name: "",
        max_nilai: null,
      },

      //dikirim ke page selanjutnya
      id3p: this.$route.params.id3p,
      idDimensi: this.$route.params.idDimensi,
      idCompany: this.$route.params.idCompany,
      idDivisi: this.$route.params.idDivisi,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.processKpi.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "performKpi/index",
      dispatchStore: "performKpi/store",
      dispatchDestroy: "performKpi/destroy",
      dispatchShow: "performKpi/show",
      dispatchUpdate: "performKpi/update",

      dispatchCompany: "masterpas/index_company",
      dispatchDivisi: "masterpas/index_divisi",
    }),
    goBack() {
      this.$router.push({
        name: "performDimensiPas",
        params: {
          id: this.id3p,
        },
      });
    },

    async getUpdate($id) {
      try {
        const kpiDatas = await this.dispatchShow($id);
        this.updateData.id = kpiDatas.data["id"];
        this.updateData.name = kpiDatas.data["name"];
        this.updateData.max_nilai = kpiDatas.data["max_nilai"];

        this.isUpdate = true;
      } catch (error) {
        console.log(error);
      }
    },
    async update() {
      const send = new FormData();
      send.append("id", this.updateData.id);
      send.append("id3p", this.updateData.id3p);
      send.append("idDimensi", this.updateData.idDimensi);
      send.append("idCompany", this.updateData.idCompany);
      send.append("idDivisi", this.updateData.idDivisi);
      send.append("name", this.updateData.name);
      send.append("max_nilai", this.updateData.max_nilai);
      send.append("_method", "PUT");

      this.$vs.loading({
        type: "radius",
        color: "blue",
        textAfter: true,
        text: "Please Wait ...",
      });

      try {
        await this.dispatchUpdate(send);
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Success!",
          text: "Data was saved successfully!",
          color: "success",
        });
        this.getDatas();
        this.isUpdate = false;
      } catch (error) {
        this.$vs.loading.close();
        this.isLoading = false;
        this.$vs.notify({
          title: "Oops!",
          text: error.data.message,
          color: "danger",
        });
      }
    },

    async store() {
      const send = new FormData();
      send.append("id3p", this.storeData.id3p);
      send.append("idDimensi", this.storeData.idDimensi);
      send.append("idCompany", this.storeData.idCompany);
      send.append("idDivisi", this.storeData.idDivisi);
      send.append("name", this.storeData.name);
      send.append("max_nilai", this.storeData.max_nilai);

      this.$vs.loading({
        type: "radius",
        color: "blue",
        textAfter: true,
        text: "Please Wait ...",
      });

      try {
        await this.dispatchStore(send);
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Success!",
          text: "Data was saved successfully!",
          color: "success",
        });
        this.getDatas();
        this.isAdd = false;
      } catch (error) {
        this.$vs.loading.close();
        this.isLoading = false;
        this.$vs.notify({
          title: "Oops!",
          text: error.data.error,
          color: "danger",
        });
      }
    },
    async getDatas() {
      const send = new FormData();
      send.append("id3p", this.id3p);
      send.append("idDimensi", this.idDimensi);
      send.append("idCompany", this.idCompany);
      send.append("idDivisi", this.idDivisi);

      const datas = await this.dispatchIndex(send);
      this.listKpi = datas;
    },

    async confirmDelete() {
      try {
        await this.dispatchDestroy(this.idDelete);
        this.dispatchIndex();
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });

        this.getDatas();
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: "Maaf, Materi sudah di jadwalkan ke user atau sudah ada data jawaban user",
          color: "danger",
        });
      }
    },

    deletes(id) {
      this.idDelete = id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Are you sure ?",
        text: "Deleted data can no longer be restored",
        accept: this.confirmDelete,
      });
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
