<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Daftar Admin">
        <vs-table search :data="datas" class="mb-2">
          <template slot="header">
            <vs-button
              size="small"
              icon-pack="feather"
              icon="icon-plus-circle"
              @click="addMore"
            >
              Tambah admin
            </vs-button>
          </template>

          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th style="width: 40%">Nama User</vs-th>
            <vs-th>
              <center>
                <div class="tooltips">
                  Super Admin
                  <span class="tooltiptext"
                    >Bisa mengakses semua fitur tetapi hanya user bernama "Super
                    Admin" yang bisa mengakses menu "Permission"</span
                  >
                </div>
              </center>
            </vs-th>
            <vs-th>
              <center>
                <div class="tooltips">
                  SOP
                  <span class="tooltiptext"
                    >User hanya bisa mengakses menu SOP</span
                  >
                </div>
              </center>
            </vs-th>
            <vs-th>
              <center>
                <div class="tooltips">
                  KMS
                  <span class="tooltiptext">
                    User hanya bisa mengakses menu KMS
                  </span>
                </div>
              </center>
            </vs-th>
            <vs-th>
              <center>
                <div class="tooltips">
                  1VHS
                  <span class="tooltiptext">
                    User hanya bisa mengakses menu 1VHS
                  </span>
                </div>
              </center>
            </vs-th>
            <vs-th>
              <center>
                <div class="tooltips">
                  PAS
                  <span class="tooltiptext">
                    User hanya bisa mengakses menu PAS
                  </span>
                </div>
              </center>
            </vs-th>
            <vs-th><center>Aksi</center></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.username">{{ tr.username }}</vs-td>
              <vs-td
                style="text-align: center"
                :data="tr.isSuperAdmin"
                v-if="tr.isSuperAdmin == 1"
              >
                <vs-icon icon="done" color="rgb(70, 150, 0)"></vs-icon>
              </vs-td>
              <vs-td style="text-align: center" :data="tr.isSuperAdmin" v-else>
                <vs-icon icon="close" color="red"></vs-icon>
              </vs-td>

              <vs-td
                style="text-align: center"
                :data="tr.isSOP"
                v-if="tr.isSOP == 1 || tr.isSuperAdmin"
              >
                <vs-icon icon="done" color="rgb(70, 150, 0)"></vs-icon>
              </vs-td>
              <vs-td style="text-align: center" :data="tr.isSOP" v-else>
                <vs-icon icon="close" color="red"></vs-icon>
              </vs-td>

              <vs-td
                style="text-align: center"
                :data="tr.isKMS"
                v-if="tr.isKMS == 1 || tr.isSuperAdmin"
              >
                <vs-icon icon="done" color="rgb(70, 150, 0)"></vs-icon>
              </vs-td>
              <vs-td style="text-align: center" :data="tr.isKMS" v-else>
                <vs-icon icon="close" color="red"></vs-icon>
              </vs-td>

              <vs-td
                style="text-align: center"
                :data="tr.is1VHS"
                v-if="tr.is1VHS == 1 || tr.isSuperAdmin"
              >
                <vs-icon icon="done" color="rgb(70, 150, 0)"></vs-icon>
              </vs-td>
              <vs-td style="text-align: center" :data="tr.is1VHS" v-else>
                <vs-icon icon="close" color="red"></vs-icon>
              </vs-td>

              <vs-td
                style="text-align: center"
                :data="tr.isPAS"
                v-if="tr.isPAS == 1 || tr.isSuperAdmin"
              >
                <vs-icon icon="done" color="rgb(70, 150, 0)"></vs-icon>
              </vs-td>
              <vs-td style="text-align: center" :data="tr.isPAS" v-else>
                <vs-icon icon="close" color="red"></vs-icon>
              </vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-edit"
                    title="edit permission"
                    @click="getSingleData(tr.id)"
                    size="small"
                  ></vs-button>
                  <vs-button
                    color="danger"
                    icon-pack="feather"
                    icon="icon-delete"
                    size="small"
                    title="hapus permission"
                    @click="hapus(tr.id, tr.username)"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>

      <vs-popup title="Tambah Data" fullscreen :active.sync="isAddPermission">
        <vx-card>
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Nama User</small>
              <v-select
                v-model="storeData.user_id"
                :options="users"
                v-validate="'required'"
                name="id"
                :reduce="(e) => e.id"
                label="name"
              ></v-select>
              <span
                class="text-sm text-danger"
                v-show="errors.has('user_id')"
                >{{ errors.first("user_id") }}</span
              >
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Super Admin</small>
              <v-select
                v-model="storeData.isSuperAdmin"
                :options="options"
                v-validate="'required'"
                name="isSuperAdmin"
                :reduce="(e) => e.value"
                label="text"
              ></v-select>
              <span
                class="text-sm text-danger"
                v-show="errors.has('isSuperAdmin')"
                >{{ errors.first("isSuperAdmin") }}</span
              >
            </div>
          </div>

          <div class="mb-5 vx-row" v-if="storeData.isSuperAdmin === 0">
            <div class="w-full vx-col">
              <small>admin SOP</small>
              <v-select
                v-model="storeData.isSOP"
                :options="options"
                v-validate="'required'"
                name="isSOP"
                :reduce="(e) => e.value"
                label="text"
              ></v-select>
              <span class="text-sm text-danger" v-show="errors.has('isSOP')">{{
                errors.first("isSOP")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row" v-if="storeData.isSuperAdmin === 0">
            <div class="w-full vx-col">
              <small>admin KMS</small>
              <v-select
                v-model="storeData.isKMS"
                :options="options"
                v-validate="'required'"
                name="isKMS"
                :reduce="(e) => e.value"
                label="text"
              ></v-select>
              <span class="text-sm text-danger" v-show="errors.has('isKMS')">{{
                errors.first("isKMS")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row" v-if="storeData.isSuperAdmin === 0">
            <div class="w-full vx-col">
              <small>admin 1VHS</small>
              <v-select
                v-model="storeData.is1VHS"
                :options="options"
                v-validate="'required'"
                name="is1VHS"
                :reduce="(e) => e.value"
                label="text"
              ></v-select>
              <span class="text-sm text-danger" v-show="errors.has('is1VHS')">{{
                errors.first("is1VHS")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row" v-if="storeData.isSuperAdmin === 0">
            <div class="w-full vx-col">
              <small>admin PAS</small>
              <v-select
                v-model="storeData.isPAS"
                :options="options"
                v-validate="'required'"
                name="isPAS"
                :reduce="(e) => e.value"
                label="text"
              ></v-select>
              <span class="text-sm text-danger" v-show="errors.has('isPAS')">{{
                errors.first("isPAS")
              }}</span>
            </div>
          </div>

          <div class="vx-row">
            <div class="w-full text-right vx-col">
              <vs-button @click="store" class="mr-5">Simpan</vs-button>
              <vs-button color="danger" @click="isAddPermission = false"
                >Tutup</vs-button
              >
            </div>
          </div>
        </vx-card>
      </vs-popup>

      <vs-popup
        title="Update Data"
        fullscreen
        :active.sync="isUpdatePermission"
      >
        <vx-card>
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Nama User</small>
              <v-select
                v-model="storeData.user_id"
                :options="users"
                v-validate="'required'"
                name="id"
                :reduce="(e) => e.id"
                label="name"
              ></v-select>
              <span
                class="text-sm text-danger"
                v-show="errors.has('user_id')"
                >{{ errors.first("user_id") }}</span
              >
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Super Admin</small>
              <v-select
                v-model="storeData.isSuperAdmin"
                :options="options"
                v-validate="'required'"
                name="isSuperAdmin"
                :reduce="(e) => e.value"
                label="text"
              ></v-select>
              <span
                class="text-sm text-danger"
                v-show="errors.has('isSuperAdmin')"
                >{{ errors.first("isSuperAdmin") }}</span
              >
            </div>
          </div>

          <div class="mb-5 vx-row" v-if="storeData.isSuperAdmin === 0">
            <div class="w-full vx-col">
              <small>admin SOP</small>
              <v-select
                v-model="storeData.isSOP"
                :options="options"
                v-validate="'required'"
                name="isSOP"
                :reduce="(e) => e.value"
                label="text"
              ></v-select>
              <span class="text-sm text-danger" v-show="errors.has('isSOP')">{{
                errors.first("isSOP")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row" v-if="storeData.isSuperAdmin === 0">
            <div class="w-full vx-col">
              <small>admin KMS</small>
              <v-select
                v-model="storeData.isKMS"
                :options="options"
                v-validate="'required'"
                name="isKMS"
                :reduce="(e) => e.value"
                label="text"
              ></v-select>
              <span class="text-sm text-danger" v-show="errors.has('isKMS')">{{
                errors.first("isKMS")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row" v-if="storeData.isSuperAdmin === 0">
            <div class="w-full vx-col">
              <small>admin 1VHS</small>
              <v-select
                v-model="storeData.is1VHS"
                :options="options"
                v-validate="'required'"
                name="is1VHS"
                :reduce="(e) => e.value"
                label="text"
              ></v-select>
              <span class="text-sm text-danger" v-show="errors.has('is1VHS')">{{
                errors.first("is1VHS")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row" v-if="storeData.isSuperAdmin === 0">
            <div class="w-full vx-col">
              <small>admin PAS</small>
              <v-select
                v-model="storeData.isPAS"
                :options="options"
                v-validate="'required'"
                name="isPAS"
                :reduce="(e) => e.value"
                label="text"
              ></v-select>
              <span class="text-sm text-danger" v-show="errors.has('isPAS')">{{
                errors.first("isPAS")
              }}</span>
            </div>
          </div>

          <div class="vx-row">
            <div class="w-full text-right vx-col">
              <vs-button class="mr-5" @click="update">Update</vs-button>
              <vs-button color="danger" @click="isAddPermission = false"
                >Tutup</vs-button
              >
            </div>
          </div>
        </vx-card>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vSelect from "vue-select";
// import moment from "moment";
export default {
  data() {
    return {
      isAddPermission: false,
      isUpdatePermission: false,
      idDelete: null,
      datas: [],
      users: [],
      options: [
        { value: 0, text: "Nonaktif" },
        { value: 1, text: "Aktif" },
      ],

      storeData: {
        id: null,
        user_id: null,
        isSuperAdmin: 0,
        isSOP: 0,
        isKMS: 0,
        is1VHS: 0,
        isPAS: 0,
      },
    };
  },
  components: {
    vSelect,
  },
  methods: {
    ...mapActions({
      dispatchIndex: "permission/index",
      dispatchStore: "permission/store",
      dispatchGetPeople: "permission/getPeople",
      dispatchShow: "permission/show",
      dispatchUpdate: "permission/update",
      dispatchDelete: "permission/destroy",
    }),
    async update() {
      try {
        if (
          this.storeData.is1VHS === 0 &&
          this.storeData.isKMS === 0 &&
          this.storeData.isPAS === 0 &&
          this.storeData.isSOP === 0 &&
          this.storeData.isSuperAdmin === 0
        ) {
          this.$vs.notify({
            time: 4000,
            title: "Oops!",
            text: "tidak ada izin yang diisi, Apakah anda ingin menghapusnya ?",
            color: "danger",
          });
        } else {
          if (this.storeData.isSuperAdmin === 1) {
            this.storeData.is1VHS = 0;
            this.storeData.isKMS = 0;
            this.storeData.isPAS = 0;
            this.storeData.isSOP = 0;
          }
          this.$vs.loading({
            type: "radius",
            color: "blue",
            textAfter: true,
            text: "Please Wait ...",
          });
          const data = new FormData();
          data.append("id", this.storeData.id);
          data.append("user_id", this.storeData.user_id);
          data.append("isSuperAdmin", this.storeData.isSuperAdmin);
          data.append("isSOP", this.storeData.isSOP);
          data.append("isKMS", this.storeData.isKMS);
          data.append("is1VHS", this.storeData.is1VHS);
          data.append("isPAS", this.storeData.isPAS);
          data.append("_method", "PUT");
          const response = await this.dispatchUpdate(data);
          if (response.statusCode === 200) {
            this.$vs.loading.close();
            this.$vs.notify({
              time: 2000,
              title: "Suksess",
              text: "Data sukses diupdate",
              color: "primary",
              icon: "verified_user",
            });

            setTimeout(() => {
              this.isUpdatePermission = false;
              this.netral();
              this.getDatas();
            }, 500);
          }
        }
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: error.data.message,
          color: "danger",
        });
      }
    },
    async getSingleData(id) {
      try {
        const response = await this.dispatchShow(id);
        this.storeData.id = response.data.id;
        this.storeData.user_id = response.data.user_id;
        this.storeData.isSuperAdmin = response.data.isSuperAdmin;
        this.storeData.isSOP = response.data.isSOP;
        this.storeData.isPAS = response.data.isPAS;
        this.storeData.isKMS = response.data.isKMS;
        this.storeData.is1VHS = response.data.is1VHS;

        const response2 = await this.dispatchGetPeople();
        this.users = response2.data.map((item) => ({
          id: item.id,
          nik: item.nik,
          username: item.username,
          name: item.name + " - " + item.company.name,
        }));

        this.isUpdatePermission = true;
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: error.data.message,
          color: "danger",
        });
      }
    },

    hapus(id, name) {
      this.idDelete = id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Confirm",
        text: "Apakah Anda ingin menghapus izin " + name + "?",
        accept: this.acceptHapus,
      });
    },
    async acceptHapus() {
      try {
        const response = await this.dispatchDelete(this.idDelete);
        if (response.statusCode === 200) {
          this.$vs.notify({
            title: "Success",
            text: response.message,
            color: "primary",
          });
          this.idDelete = null;
          this.getDatas();
        } else {
          this.$vs.notify({
            title: "Oops!",
            text: response.message,
            color: "danger",
          });
        }
      } catch (error) {
        console.log(error);
        this.$vs.notify({
          title: "Oops!",
          text: error.data.message,
          color: "danger",
        });
      }
    },
    async store() {
      try {
        if (
          this.storeData.is1VHS === 0 &&
          this.storeData.isKMS === 0 &&
          this.storeData.isPAS === 0 &&
          this.storeData.isSOP === 0 &&
          this.storeData.isSuperAdmin === 0
        ) {
          this.$vs.notify({
            title: "Oops!",
            text: "tidak ada izin yang diisi",
            color: "danger",
          });
        } else {
          this.$vs.loading({
            type: "radius",
            color: "blue",
            textAfter: true,
            text: "Please Wait ...",
          });
          const response = await this.dispatchStore(this.storeData);
          if (response.statusCode === 200) {
            this.$vs.loading.close();
            this.$vs.notify({
              time: 4000,
              title: "Suksess",
              text: "Data sukses disimpan",
              color: "primary",
              icon: "verified_user",
            });

            setTimeout(() => {
              this.isAddPermission = false;
              this.netral();
              this.getDatas();
            }, 500);
          }
        }
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: error.data.message,
          color: "danger",
        });
      }
    },

    async addMore() {
      try {
        const response = await this.dispatchGetPeople();
        this.users = response.data.map((item) => ({
          id: item.id,
          nik: item.nik,
          username: item.username,
          name: item.name + " - " + item.company.name,
        }));

        this.isAddPermission = true;
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: error.data.message,
          color: "danger",
        });
      }
    },

    async getDatas() {
      try {
        const response = await this.dispatchIndex();
        this.datas = response.data;
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: error.data.message,
          color: "danger",
        });
      }
    },

    netral() {
      this.storeData.id = null;
      this.storeData.user_id = null;
      this.storeData.isSuperAdmin = 0;
      this.storeData.isSOP = 0;
      this.storeData.isKMS = 0;
      this.storeData.is1VHS = 0;
      this.storeData.isPAS = 0;
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
<style>
.centered {
  text-align: center;
}
.tooltips {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltips .tooltiptext {
  visibility: hidden;
  width: 150px;
  background-color: rgb(1, 77, 177);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 105%;
  margin-left: 10px;
}

.tooltips:hover .tooltiptext {
  visibility: visible;
}
</style>
