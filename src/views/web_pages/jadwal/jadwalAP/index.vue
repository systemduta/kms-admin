<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <!-- {{ data }} -->
      <vx-card title="Jadwal 1VHS Perusahaan">
        <vs-table search pagination max-items="10" :data="data" class="mb-2">
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama</vs-th>
            <vs-th>Batch</vs-th>
            <vs-th>Type</vs-th>
            <vs-th>Start</vs-th>
            <vs-th>End</vs-th>
            <vs-th>Quota Batch</vs-th>
            <vs-th>Quota Perusahaan ini</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.batch">{{ tr.batch }}</vs-td>
              <vs-td :data="tr.type">{{ tr.type }}</vs-td>
              <vs-td :data="tr.start">{{ format_date(tr.start) }}</vs-td>
              <vs-td :data="tr.end">{{ format_date(tr.end) }}</vs-td>
              <vs-td :data="tr.quotautama">
                <span
                  v-if="
                    tr.quotautama == 'null' ||
                    tr.quotautama == '0' ||
                    tr.quotautama == null
                  "
                >
                  Tidak ditentukan
                </span>
                <span v-else>{{ tr.quotautama }}</span>
              </vs-td>
              <vs-td :data="tr.quota">
                <span
                  v-if="
                    tr.quota == 'null' || tr.quota == '0' || tr.quota == null
                  "
                >
                  Segera Mendaftar
                </span>
                <span v-else>{{ tr.quota }}</span>
              </vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                    @click="
                      (storeData.jadwal_id = ''),
                        (storeData.user_id = ''),
                        (storeData.jadwal_id = tr.jadwalid),
                        (popUpInsert = true)
                    "
                    >Tambah Peserta </vs-button
                  >&nbsp;
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    @click="getShow(tr.jadwalid)"
                    size="small"
                    >Lihat Peserta
                  </vs-button>
                  &nbsp;
                  <!-- <vs-button size="small" @click="">
                  </vs-button> -->
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>
    <vs-popup title="Pendaftaran Peserta" :active.sync="popUpInsert">
      <div class="mb-5 vx-row">
        <div class="ml-5 w-full vx-col">
          <label>Nama : </label>
          <select
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            v-model="storeData.user_id"
          >
            <option v-for="option in resUser" :value="option.user_id">
              {{ option.user_name }} - {{ option.user_pos }}
            </option>
          </select>
          <div class="vx-row mt-3">
            <div class="w-full text-right vx-col">
              <vs-button color="dark" type="flat" @click="popUpInsert = false">
                Back
              </vs-button>
              &nbsp; &nbsp;
              <vs-button @click="store">Save</vs-button>
            </div>
          </div>
        </div>
      </div>
    </vs-popup>
    <!-- 6UXV3PzDyzcr -->

    <vs-popup title="Status Peserta" :active.sync="popUpShow" fullscreen>
      <table class="table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Jadwal 1VHS</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in resSchUser" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.jadwalVhsName }} - {{ user.jadwalVhsBatch }}</td>
            <td>
              <span
                v-if="user.isAllow == 1"
                style="background-color: darkgreen; color: white; padding: 5px"
                >Disetujui</span
              >
              <span
                v-else
                style="background-color: red; color: white; padding: 5px"
                >Ditolak</span
              >
            </td>
            <td>
              <vs-button
                color="danger"
                @click="deletes(user.id)"
                icon-pack="feather"
                icon="icon-delete"
                size="small"
              ></vs-button>
            </td>
          </tr>
        </tbody>
      </table>
    </vs-popup>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      popUpInsert: false,
      popUpShow: false,
      idDelete: null,
      resUser: [],
      resSchUser: [],
      storeData: {
        jadwal_id: "",
        user_id: "",
      },
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.jadwalap.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "jadwalap/index",
      dispatchUser: "employee/index",
      dispatchStore: "jadwalap/store",
      dispatchShow: "jadwalap/show",
      dispatchDestroy: "jadwalap/destroy",
    }),
    cek(start, end) {
      return moment().isBetween(this.cek_date(start), this.cek_date(end));
    },
    cek_date(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
    async getDetail() {
      const response = await this.dispatchUser();
      this.resUser = response.data.map((i) => {
        return {
          user_id: i.id,
          user_name: i.name,
          user_pos: i.organization["name"],
        };
      });
    },
    async getShow(id) {
      const response = await this.dispatchShow(id);
      this.resSchUser = response.success.map((i) => {
        return {
          id: i.id,
          username: i.username,
          jadwalVhsName: i.jadwalVhsName,
          jadwalVhsBatch: i.jadwalVhsBatch,
          isAllow: i.isAllow,
        };
      });
      this.popUpShow = true;
    },
    convertToFormData() {
      const data = new FormData();
      data.append("user_id", this.storeData.user_id);
      data.append("jadwal_id", this.storeData.jadwal_id);
      return data;
    },
    store() {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false;
        const formData = this.convertToFormData();
        if (!formData) return false;

        try {
          await this.dispatchStore(formData);
          this.$vs.loading.close();
          this.isLoading = false;
          this.$vs.notify({
            title: "Success!",
            text: "Data was saved successfully!",
            color: "success",
          });
          this.popUpInsert = false;
        } catch (error) {
          const resError = error.data.error;
          for (const key in resError) {
            if (resError.hasOwnProperty(key)) {
              const error = resError[key];
              this.$vs.loading.close();
              this.isLoading = false;
              this.$vs.notify({
                title: "Gagal Daftar",
                text: error,
                color: "danger",
                time: 10000,
              });
            }
          }
          // this.$vs.loading.close();
          // this.isLoading = false;
          // this.$vs.notify({
          //   title: "Oops!",
          //   text: error.data.error,
          //   color: "danger",
          // });
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
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: "danger",
        });
      }
    },
    deletes(id) {
      this.popUpShow = false;
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
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
    this.getDetail();
  },
};
</script>
<style>
.popup-background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
