<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base" v-if="listInd">
      <vx-card title="KPI PAS">
        <table>
          <tr>
            <td>Nama Parameter</td>
            <td>&nbsp;:&nbsp;</td>
            <td>{{ listInd.name3p }}</td>
          </tr>
          <tr>
            <td>Nama Dimensi</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              {{ listInd.nameDimensi }}
            </td>
          </tr>
          <tr>
            <td>Nama KPI</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              {{ listInd.nameKpi }}
            </td>
          </tr>
          <tr>
            <td>Nama Perusahaan</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              {{ listInd.nameCompany }}
            </td>
          </tr>
          <tr>
            <td>Nama Divisi</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              {{ listInd.nameDivisi }}
            </td>
          </tr>
        </table>
      </vx-card>
      <hr />

      <vx-card title="Daftar KPI">
        <vs-table
          search
          v-if="listInd && Array.isArray(listInd.data)"
          :data="listInd.data"
          class="mb-2"
        >
          <template slot="header">
            <vs-button size="small" @click="isAdd = true">
              Tambah Indikator Penilaian
            </vs-button>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Deskripsi</vs-th>
            <vs-th>Nilai</vs-th>
            <vs-th>Grade</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.desc">{{ tr.desc }}</vs-td>
              <vs-td :data="tr.nilai">{{ tr.nilai }}</vs-td>
              <vs-td :data="tr.grade">{{ tr.grade }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-edit"
                    color="warning"
                    size="small"
                    @click="getUpdate(tr.id)"
                  ></vs-button>
                  <vs-button
                    color="danger"
                    icon-pack="feather"
                    icon="icon-delete"
                    size="small"
                    @click="deletes(tr.id)"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>

      <vs-popup :active.sync="isAdd" title="Tambah Indikator">
        <vx-card title="Tambah Indikator">
          <div class="vx-row mb-5">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="storeData.nilai"
                v-validate="'required'"
                name="nilai"
                label="Nilai"
              ></vs-input>
              <span class="text-danger text-sm" v-show="errors.has('nilai')">{{
                errors.first("nilai")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <div class="relative">
                <span>Pilih Grade: </span>
                <select
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  v-model="storeData.grade"
                  v-validate="'required'"
                  name="grade"
                >
                  <option v-for="option in options" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
                <span
                  class="text-sm text-danger"
                  v-show="errors.has('grade')"
                  >{{ errors.first("grade") }}</span
                >
              </div>
            </div>
          </div>

          <div class="vx-row mb-5">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="storeData.desc"
                v-validate="'required'"
                name="desc"
                label="Deskripsi"
              ></vs-input>
              <span class="text-danger text-sm" v-show="errors.has('desc')">{{
                errors.first("desc")
              }}</span>
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

      <vs-popup :active.sync="isUpdate" title="Update Indikator PAS">
        <vx-card title="Edit Indikator">
          <div class="vx-row mb-5">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="updateData.nilai"
                v-validate="'required'"
                name="nilai"
                label="Nilai"
              ></vs-input>
              <span class="text-danger text-sm" v-show="errors.has('nilai')">{{
                errors.first("nilai")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <div class="relative">
                <span>Pilih Grade: </span>
                <select
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  v-model="updateData.grade"
                  v-validate="'required'"
                  name="grade"
                >
                  <option v-for="option in options" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
                <span
                  class="text-sm text-danger"
                  v-show="errors.has('grade')"
                  >{{ errors.first("grade") }}</span
                >
              </div>
            </div>
          </div>

          <div class="vx-row mb-5">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="updateData.desc"
                v-validate="'required'"
                name="desc"
                label="Deskripsi"
              ></vs-input>
              <span class="text-danger text-sm" v-show="errors.has('desc')">{{
                errors.first("desc")
              }}</span>
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

    <div class="w-full vx-col mb-base" v-else>Something wrong</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isAdd: false,
      isUpdate: false,
      idDelete: null,
      nama3p: "",
      namaDimensi: "",
      namaCompany: "",
      namaDivisi: "",
      listInd: [],
      options: [
        { value: "a", text: "a" },
        { value: "b", text: "b" },
        { value: "c", text: "c" },
      ],
      storeData: {
        id3p: this.$route.params.id3p,
        idKpi: this.$route.params.idKpi,
        idCompany: this.$route.params.idCompany,
        idDivisi: this.$route.params.idDivisi,
        nilai: null,
        grade: "",
        desc: "",
      },

      updateData: {
        id: null,
        id3p: this.$route.params.id3p,
        idKpi: this.$route.params.idKpi,
        idCompany: this.$route.params.idCompany,
        idDivisi: this.$route.params.idDivisi,
        nilai: null,
        grade: "",
        desc: "",
      },

      //dikirim ke page selanjutnya
      id3p: this.$route.params.id3p,
      idDimensi: this.$route.params.idDimensi,
      idKpi: this.$route.params.idKpi,
      idCompany: this.$route.params.idCompany,
      idDivisi: this.$route.params.idDivisi,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.processInd.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "performInd/index",
      dispatchStore: "performInd/store",
      dispatchDestroy: "performInd/destroy",
      dispatchShow: "performInd/show",
      dispatchUpdate: "performInd/update",

      dispatchCompany: "masterpas/index_company",
      dispatchDivisi: "masterpas/index_divisi",
    }),
    // goBack() {
    //   this.$router.push({
    //     name: "processDimensiPas",
    //     params: {
    //       id: this.id3p,
    //     },
    //   });
    // },

    // async getUpdate($id) {
    //   try {
    //     const kpiDatas = await this.dispatchShow($id);
    //     this.updateData.id = kpiDatas.data["id"];
    //     this.updateData.name = kpiDatas.data["name"];
    //     this.updateData.max_nilai = kpiDatas.data["max_nilai"];

    //     this.isUpdate = true;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async update() {
    //   const send = new FormData();
    //   send.append("id", this.updateData.id);
    //   send.append("id3p", this.updateData.id3p);
    //   send.append("idDimensi", this.updateData.idDimensi);
    //   send.append("idCompany", this.updateData.idCompany);
    //   send.append("idDivisi", this.updateData.idDivisi);
    //   send.append("name", this.updateData.name);
    //   send.append("max_nilai", this.updateData.max_nilai);
    //   send.append("_method", "PUT");

    //   this.$vs.loading({
    //     type: "radius",
    //     color: "blue",
    //     textAfter: true,
    //     text: "Please Wait ...",
    //   });

    //   try {
    //     await this.dispatchUpdate(send);
    //     this.$vs.loading.close();
    //     this.$vs.notify({
    //       title: "Success!",
    //       text: "Data was saved successfully!",
    //       color: "success",
    //     });
    //     this.getDatas();
    //     this.isUpdate = false;
    //   } catch (error) {
    //     this.$vs.loading.close();
    //     this.isLoading = false;
    //     this.$vs.notify({
    //       title: "Oops!",
    //       text: error.data.message,
    //       color: "danger",
    //     });
    //   }
    // },

    // async store() {
    //   const send = new FormData();
    //   send.append("id3p", this.storeData.id3p);
    //   send.append("idDimensi", this.storeData.idDimensi);
    //   send.append("idCompany", this.storeData.idCompany);
    //   send.append("idDivisi", this.storeData.idDivisi);
    //   send.append("name", this.storeData.name);
    //   send.append("max_nilai", this.storeData.max_nilai);

    //   this.$vs.loading({
    //     type: "radius",
    //     color: "blue",
    //     textAfter: true,
    //     text: "Please Wait ...",
    //   });

    //   try {
    //     await this.dispatchStore(send);
    //     this.$vs.loading.close();
    //     this.$vs.notify({
    //       title: "Success!",
    //       text: "Data was saved successfully!",
    //       color: "success",
    //     });
    //     this.getDatas();
    //     this.isAdd = false;
    //   } catch (error) {
    //     this.$vs.loading.close();
    //     this.isLoading = false;
    //     this.$vs.notify({
    //       title: "Oops!",
    //       text: error.data.error,
    //       color: "danger",
    //     });
    //   }
    // },
    async getDatas() {
      const send = new FormData();
      send.append("id3p", this.id3p);
      send.append("idDimensi", this.idDimensi);
      send.append("idKpi", this.idKpi);
      send.append("idCompany", this.idCompany);
      send.append("idDivisi", this.idDivisi);

      const datas = await this.dispatchIndex(send);
      this.listInd = datas;
    },

    async store() {
      const send = new FormData();
      send.append("id3p", this.storeData.id3p);
      send.append("idKpi", this.storeData.idKpi);
      send.append("idCompany", this.storeData.idCompany);
      send.append("idDivisi", this.storeData.idDivisi);
      send.append("nilai", this.storeData.nilai);
      send.append("grade", this.storeData.grade);
      send.append("desc", this.storeData.desc);

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
        this.storeData.nilai = null;
        this.storeData.grade = "";
        this.storeData.desc = "";
        this.isAdd = false;
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
          text: error.data.message,
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

    async getUpdate($id) {
      try {
        const indikator_data = await this.dispatchShow($id);
        this.updateData.id = indikator_data.data["id"];
        this.updateData.nilai = indikator_data.data["nilai"];
        this.updateData.grade = indikator_data.data["grade"];
        this.updateData.desc = indikator_data.data["desc"];

        this.isUpdate = true;
      } catch (error) {
        console.log(error);
      }
    },

    async update() {
      const send = new FormData();
      send.append("id", this.updateData.id);
      send.append("id3p", this.updateData.id3p);
      send.append("idKpi", this.updateData.idKpi);
      send.append("idCompany", this.updateData.idCompany);
      send.append("idDivisi", this.updateData.idDivisi);
      send.append("nilai", this.updateData.nilai);
      send.append("grade", this.updateData.grade);
      send.append("desc", this.updateData.desc);
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
          text: "Data was updated successfully!",
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
