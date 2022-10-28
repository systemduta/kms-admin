<template>
  <div class="centerx">
    <vx-card title="Jadwal User VHS">
      <vs-button @click="popupActivo = true" color="primary" type="border"
        >Buat Jadwal User</vs-button
      >
      <vs-table search :data="data" class="mb-2">
        <template slot="thead">
          <vs-th>No</vs-th>
          <vs-th sort-key="namauser">Nama </vs-th>
          <vs-th sort-key="jadwalvhsname">Jadwal VHS</vs-th>
          <vs-th sort-key="start">Jadwal Mulai</vs-th>
          <vs-th sort-key="companyname">Nama Perusahaan</vs-th>
          <vs-th sort-key="is_take">Status</vs-th>
          <vs-th></vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
            <vs-td :data="tr.namauser">{{ tr.namauser }}</vs-td>
            <vs-td :data="tr.jadwalvhsname">{{ tr.jadwalvhsname }}</vs-td>
            <vs-td :data="tr.start">{{ format_date(tr.start) }}</vs-td>
            <vs-td :data="tr.companyname">{{ tr.companyname }}</vs-td>
            <vs-td v-if="tr.is_take == 0" :data="tr.is_take" style="color: red"
              >Belum Di Kerjakan</vs-td
            >
            <vs-td v-if="tr.is_take == 1" :data="tr.is_take" style="color: blue"
              >Sedang Di Kerjakan</vs-td
            >
            <vs-td
              v-if="tr.is_take == 2"
              :data="tr.is_take"
              style="color: green"
              >Sudah Selesai dikerjakan</vs-td
            >
            <vs-td>
              <div class="flex">
                <vs-button
                  class="mr-2"
                  icon-pack="feather"
                  @click="cekBtn(tr.id)"
                  icon="icon-edit"
                  size="small"
                ></vs-button>
                <vs-button
                  color="danger"
                  icon-pack="feather"
                  @click="deletes(tr.id)"
                  icon="icon-delete"
                  size="small"
                ></vs-button>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-popup
        class="holamundo"
        title="Buat Jadwal User"
        :active.sync="popupActivo"
      >
        <template>
          <div class="vx-row">
            <div class="w-full vx-col mb-base">
              <vx-card>
                <div class="vx-row mb-5">
                  <div class="vx-col w-full">
                    <small>Jadwal VHS</small>
                    <v-select
                      v-model="storeData.jadwal_id"
                      :options="jadwalArr"
                      v-validate="'required'"
                      name="jadwal_id"
                      :reduce="(e) => e.id"
                      label="item_data"
                    ></v-select>
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('jadwal_id')"
                      >{{ errors.first("jadwal_id") }}</span
                    >
                  </div>
                </div>

                <div class="vx-row mb-5">
                  <div class="vx-col w-full">
                    <small>Pilih User</small>
                    <v-select
                      v-model="storeData.user_id"
                      :options="userArr"
                      v-validate="'required'"
                      name="user_id"
                      :reduce="(e) => e.id"
                      label="user_data"
                    ></v-select>
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('user_id')"
                      >{{ errors.first("user_id") }}</span
                    >
                  </div>
                </div>

                <div class="vx-row mb-5">
                  <div class="vx-col w-full">
                    <small>Pilih company</small>
                    <v-select
                      v-model="storeData.company_id"
                      :options="companyArr"
                      v-validate="'required'"
                      name="company_id"
                      :reduce="(e) => e.idCompany"
                      label="company_data"
                    ></v-select>
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('company_id')"
                      >{{ errors.first("company_id") }}</span
                    >
                  </div>
                </div>
                <div class="vx-row">
                  <div class="w-full text-right vx-col">
                    <vs-button @click="store">Save</vs-button>
                  </div>
                </div>
              </vx-card>
            </div>
          </div>
        </template>
      </vs-popup>
    </vx-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import vSelect from "vue-select";
import moment from "moment";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      idDelete: null,
      popupActivo: false,
      popupEdit: false,
      value: "uji",
      storeData: {
        id: null,
        jadwal_id: null,
        company_id: null,
        user_id: null,
      },
      jadwalArr: [],
      userArr: [],
      companyArr: [],
    };
  },
  components: {
    vSelect,
  },
  computed: {
    ...mapState({
      data: (state) => state.jadwalUser.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "jadwalUser/index",
      dispatchDestroy: "jadwalUser/destroy",
      dispatchStore: "jadwalUser/store",
      dispatchShow: "jadwalUser/show",
      dispatchUpdate: "jadwalUser/update",

      dispatchGetVhs: "jadwalUser/getvhs",
      dispatchGetUser: "jadwalUser/getuser",
      dispatchGetCompany: "jadwalUser/getcompany",
    }),
    async cekBtn(id) {
      this.popupActivo = true;
      const dt = await this.dispatchShow(id);
      this.storeData.id = dt.data.id;
      this.storeData.jadwal_id = dt.data.jadwal_id;
      this.storeData.user_id = dt.data.user_id;
      this.storeData.company_id = dt.data.company_id;
      // console.log(dt);
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY");
      }
    },
    async getJadwal() {
      const co = await this.dispatchGetVhs();
      this.jadwalArr = co.data;
      this.jadwalArr.map(function (x) {
        return (x.item_data = x.name + " - " + x.batch + " - " + x.start);
      });
    },
    async getUser() {
      const co = await this.dispatchGetUser();
      this.userArr = co.data;
      this.userArr.map(function (x) {
        return (x.user_data = x.name + " - " + x.company.name);
      });
    },
    async getCompany() {
      const co = await this.dispatchGetCompany();
      this.companyArr = co.data;
      this.companyArr.map(function (x) {
        return (x.company_data = x.nameCompany);
      });
    },
    convertToFormData() {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      ["id", "jadwal_id", "company_id", "user_id", "is_take"].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key]);
      });

      if (this.storeData.id) data.append("_method", "PUT");
      return data;
    },
    store() {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false;
        const formData = this.convertToFormData();
        if (!formData) return false;

        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0]}, ${pair[1]}`);
        // }
        this.$vs.loading();
        this.isLoading = true;
        try {
          if (this.storeData.id) {
            await this.dispatchUpdate(formData);
          } else {
            await this.dispatchStore(formData);
          }
          this.$vs.loading.close();
          this.isLoading = false;
          this.$vs.notify({
            title: "Success!",
            text: "Data was saved successfully!",
            color: "success",
          });
          window.location.reload();
        } catch (error) {
          this.$vs.loading.close();
          this.isLoading = false;
          console.log(error);
          this.$vs.notify({
            title: "Oops!",
            text: error,
            color: "danger",
          });
        }
      });
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

        window.location.reload();
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
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
    this.$vs.loading();
    this.getJadwal();
    this.getUser();
    this.getCompany();
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
