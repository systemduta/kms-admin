<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Daftar User">
        <vs-alert
          color="warning"
          icon="new_releases"
          :active.sync="close"
          closable
          close-icon="close"
        >
          <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Harap Perhatikan Sudah Input (sebelum menyetujui):
          </h2>
          <ul
            class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
          >
            <li>1. Materi</li>
            <li>2. Question</li>
            <li>3. Zoom (bila ada)</li>
          </ul>
        </vs-alert>
        <div v-if="resData.jadwal" class="row">
          <table class="table-borderless ml-3">
            <tr>
              <td style="width: 20%; font-weight: bold">Nama Batch</td>
              <td>:</td>
              <td>
                {{ resData.jadwal["name"] }} - {{ resData.jadwal["batch"] }}
              </td>
            </tr>
            <tr>
              <td style="font-weight: bold">Maksimal Kuota</td>
              <td>:</td>
              <td v-if="resData.jadwal['quota'] === null">Tidak ada</td>
              <td v-else>{{ resData.jadwal["quota"] }}</td>
            </tr>
            <tr>
              <td style="font-weight: bold">Daftar User</td>
              <td>:</td>
              <td></td>
            </tr>
          </table>
        </div>
        <div v-if="resData.data">
          <table class="table-auto text-center w-full">
            <thead>
              <tr class="bg-gray-300">
                <th>Perusahaan</th>
                <th>Kuota Pembagian</th>
                <!-- <th>Jumlah User</th>
                <th>Terdaftar</th>
                <th>Belum Tedaftar</th> -->
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in resData.data" :key="user.id">
                <td class="px-4 py-2">{{ user.name }}</td>
                <td class="px-4 py-2" v-if="user.quotaap == null">
                  Tidak ada kuota
                </td>
                <td class="px-4 py-2" v-else>{{ user.quotaap }}</td>
                <!-- <td class="px-4 py-2">{{ user.jmluser }}</td>
                <td class="px-4 py-2">{{ user.isAllow }}</td>
                <td class="px-4 py-2">{{ user.notAllow }}</td> -->
                <td class="px-4 py-2">
                  <div class="flex">
                    <vs-button
                      class="mr-2"
                      icon-pack="feather"
                      icon="icon-eye"
                      @click="store(user.comid, user.id)"
                      size="small"
                    >
                    </vs-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <vs-popup title="Lihat User" :active.sync="showPopup">
          <table class="table-auto w-full">
            <thead>
              <tr class="bg-gray-300">
                <th>Nama</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="x in resUser" :key="x.id">
                <td class="px-4 py-2">{{ x.name }}</td>
                <td
                  class="px-4 py-2"
                  v-if="x.isAllow == '0'"
                  style="color: red"
                >
                  Ditolak
                </td>
                <td class="px-4 py-2" v-else style="color: green">Disetujui</td>
                <td class="px-4 py-2">
                  <div class="row">
                    <vs-button
                      class="mr-2"
                      icon-pack="feather"
                      icon="icon-edit"
                      size="small"
                      @click="
                        handleChange(
                          x.company_id,
                          x.jadwal_id,
                          x.id,
                          x.jadwalvhs_id,
                          x.isAllow
                        )
                      "
                    >
                    </vs-button>
                    <vs-button
                      color="danger"
                      @click="deletes(x.jadwalvhs_id)"
                      icon-pack="feather"
                      icon="icon-delete"
                      size="small"
                    ></vs-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </vs-popup>
        <vs-popup title="Edit User" :active.sync="showEdit">
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <span>Pilih Status : </span>
              <select
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                v-model="updateData.isAllow"
              >
                <option v-for="option in options" :value="option.value">
                  {{ option.text }}
                </option>
              </select>

              <span class="text-sm text-danger" v-show="errors.has('type')">{{
                errors.first("type")
              }}</span>
            </div>
            &nbsp;
            <!-- <div class="vx-row"> -->
            <div class="w-full text-right vx-col">
              <vs-button
                color="dark"
                type="flat"
                @click="(showEdit = false), (showPopup = true)"
                >Back</vs-button
              >
              &nbsp; &nbsp;
              <vs-button @click="update">Save</vs-button>
            </div>
            <!-- </div> -->
          </div>
        </vs-popup>
      </vx-card>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      close: true,
      showPopup: false,
      showEdit: false,
      idDelete: null,
      resData: [],
      resUser: [],
      options: [
        { value: 0, text: "Ditolak" },
        { value: 1, text: "Disetujui" },
      ],
      updateData: {
        id: "",
        company_id: "",
        jadwal_id: "",
        user_id: "",
        isAllow: "",
      },
      storeData: {
        company_id: "",
        jadwal_id: "",
      },
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.quotaap.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "quotaap/indexpermit",
      dispatchshowuser: "quotaap/getUser",
      dispatchsetuser: "quotaap/setUser",
      dispatchDestroy: "jadwalap/destroy",
    }),
    async getDetail() {
      const res = await this.dispatchIndex(this.$route.params.id);
      this.resData = res;
      // console.log(res);
    },
    handleChange(company_id, jadwal_id, user_id, id, isAllow) {
      this.updateData.company_id = company_id;
      this.updateData.jadwal_id = jadwal_id;
      this.updateData.user_id = user_id;
      this.updateData.id = id;
      this.updateData.isAllow = isAllow;
      this.showPopup = false;
      this.showEdit = true;
    },
    async update() {
      const data = new FormData();
      data.append("company_id", this.updateData.company_id);
      data.append("jadwal_id", this.updateData.jadwal_id);
      data.append("user_id", this.updateData.user_id);
      data.append("isAllow", this.updateData.isAllow);
      data.append("id", this.updateData.id);

      const fromUpdate = data;
      try {
        await this.dispatchsetuser(fromUpdate);
        this.$vs.notify({
          title: "Success!",
          text: "Data was saved successfully!",
          color: "success",
        });
        const formData = this.convertToFormData();
        if (!formData) return false;
        const response = await this.dispatchshowuser(formData);
        this.resUser = response.data.map((i) => {
          return {
            id: i.user_id,
            name: i.namauser,
            isAllow: i.isAllow,
            jadwal_id: i.jadwal_id,
            company_id: i.company_id,
            jadwalvhs_id: i.id,
          };
        });
        this.showEdit = false;
        this.showPopup = true;
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: error.data.error,
          color: "danger",
        });
      }
    },

    convertToFormData() {
      const data = new FormData();
      data.append("company_id", this.storeData.company_id);
      data.append("jadwal_id", this.storeData.jadwal_id);
      return data;
    },
    async store(comid, jadwal_id) {
      this.storeData.company_id = comid;
      this.storeData.jadwal_id = jadwal_id;
      const formData = this.convertToFormData();
      if (!formData) return false;
      try {
        const response = await this.dispatchshowuser(formData);
        this.resUser = response.data.map((i) => {
          return {
            id: i.user_id,
            name: i.namauser,
            isAllow: i.isAllow,
            jadwal_id: i.jadwal_id,
            company_id: i.company_id,
            jadwalvhs_id: i.id,
          };
        });
        this.showPopup = true;
      } catch (error) {
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
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: "danger",
        });
      }
    },
    deletes(id) {
      this.showPopup = false;
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
    this.getDetail()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
