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
      <vx-card title="Indikator Penilaian PAS">
        <table>
          <tr>
            <td>Nama Parameter</td>
            <td>&nbsp;:&nbsp;</td>
            <td>{{ nama3p }}</td>
          </tr>
          <tr>
            <td>Nama Dimensi</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              {{ namaDimensi }}
            </td>
          </tr>
          <tr>
            <td>Nama KPI</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              {{ namaKpi }}
            </td>
          </tr>
        </table>
      </vx-card>

      <hr />
      <vx-card>
        <vs-table
          pagination
          max-items="15"
          search
          :data="listIndikator"
          class="mb-2"
        >
          <template slot="header">
            <vs-button size="small" @click="isAdd = true">
              Tambah Indikator
            </vs-button>
          </template>
          <template slot="thead">
            <vs-th sort-key="no">No</vs-th>
            <vs-th sort-key="desc">Desc</vs-th>
            <vs-th sort-key="nilai">Nilai</vs-th>
            <vs-th sort-key="grade">Grade</vs-th>
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
                  <vs-button icon-pack="feather" icon="icon-eye" size="small">
                  </vs-button>
                  &nbsp;
                  <vs-button
                    icon-pack="feather"
                    icon="icon-edit"
                    color="warning"
                    size="small"
                    @click="getUpdate(tr.id)"
                  >
                  </vs-button>
                  &nbsp;
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

      <vs-popup :active.sync="isAdd" title="Tambah Indikator PAS">
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
                  v-show="errors.has('isPreTest')"
                  >{{ errors.first("isPreTest") }}</span
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
                  v-show="errors.has('isPreTest')"
                  >{{ errors.first("isPreTest") }}</span
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
      id3p: this.$route.params.id3p,
      idKpi: this.$route.params.idKpi,
      idDimensi: this.$route.params.idDimensi,
      nama3p: this.$route.params.name3p,
      namaDimensi: this.$route.params.nameDimensi,
      namaKpi: this.$route.params.nameKpi,
      listIndikator: [],
      options: [
        { value: "a", text: "a" },
        { value: "b", text: "b" },
        { value: "c", text: "c" },
      ],
      storeData: {
        id_3p: this.$route.params.id3p,
        kpi_id: this.$route.params.idKpi,
        nilai: null,
        grade: "",
        desc: "",
      },

      updateData: {
        id: null,
        id_3p: this.$route.params.id3p,
        kpi_id: this.$route.params.idKpi,
        nilai: null,
        grade: "",
        desc: "",
      },
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.indPenilaian.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "indPenilaian/index_per_kpi",
      dispatchStore: "indPenilaian/store",
      dispatchDestroy: "indPenilaian/destroy",
      dispatchShow: "indPenilaian/show",
      dispatchUpdate: "indPenilaian/update",
    }),
    goBack() {
      this.$router.go(-2);
    },
    async datas(id) {
      try {
        const datas = await this.dispatchIndex(id);
        this.listIndikator = datas.data;
      } catch (error) {
        console.log(error);
      }
    },
    async confirmDelete() {
      try {
        await this.dispatchDestroy(this.idDelete);
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });

        this.datas(this.$route.params.idKpi);
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

    async store() {
      const send = new FormData();
      send.append("id_3p", this.storeData.id_3p);
      send.append("kpi_id", this.storeData.kpi_id);
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
        this.datas(this.$route.params.idKpi);
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
      send.append("id_3p", this.updateData.id_3p);
      send.append("kpi_id", this.updateData.kpi_id);
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
        this.datas(this.$route.params.idKpi);
        this.isUpdate = false;
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
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.datas(this.$route.params.idKpi)
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
