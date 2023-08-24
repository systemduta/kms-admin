<template>
  <div class="centerx">
    <div class="conatiner" style="display: flex">
      <div class="col-1">
        <vs-button
          :to="{ name: 'jadwaluservhs' }"
          icon-pack="feather"
          icon="icon-arrow-left-circle"
          size="small"
        >
        </vs-button>
      </div>
      <div class="col-11">
        <vx-card title="Jadwal User 1VHS">
          <div class="back-button"></div>
          <vs-table
            pagination
            search
            max-items="10"
            :data="resData"
            class="mb-2"
          >
            <template slot="thead">
              <vs-th sort-key="no">No </vs-th>
              <vs-th sort-key="namauser">Nama 1VHS</vs-th>
              <vs-th sort-key="type">Type 1VHS</vs-th>
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
                <vs-td :data="tr.typevhs">{{ tr.typevhs }}</vs-td>
                <vs-td :data="tr.start">{{ format_date(tr.start) }}</vs-td>
                <vs-td :data="tr.companyname">{{ tr.companyname }}</vs-td>
                <vs-td
                  v-if="tr.is_take == 0"
                  :data="tr.is_take"
                  style="color: red"
                  >Belum Di Kerjakan</vs-td
                >
                <vs-td
                  v-if="tr.is_take == 1"
                  :data="tr.is_take"
                  style="color: blue"
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
                      color="warning"
                      icon-pack="feather"
                      icon="icon-edit"
                      @click="clickData(tr.user_id, tr.typevhs, tr.jadwal_id)"
                      size="small"
                    ></vs-button
                    >&nbsp;
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

          <vs-popup
            class="holamundo"
            title="Edit Status 1VHS"
            :active.sync="popupEdit"
          >
            <table class="table-borderless ml-3">
              <tr>
                <td style="width: 20%; font-weight: bold">Nama</td>
                <td>:</td>
                <td>&nbsp; {{ editData["user_name"] }}</td>
              </tr>
              <tr>
                <td style="width: 20%; font-weight: bold">Type</td>
                <td>:</td>
                <td>&nbsp; {{ editData["type"] }}</td>
              </tr>
            </table>
            <vx-card>
              <div class="relative" v-if="editData.type == '1VHS Basic'">
                <span>Status 1VHS Basic : </span>
                <select
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  v-model="editData.isBasic"
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
              </div>
              <div class="relative" v-if="editData.type == '1VHS Class'">
                <span>Status 1VHS Class : </span>
                <select
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  v-model="editData.isClass"
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
              </div>
              <div class="relative" v-if="editData.type == '1VHS Camp'">
                <span>Status 1VHS Camp : </span>
                <select
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  v-model="editData.isCamp"
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
              </div>
              <div class="relative" v-if="editData.type == '1VHS Academy'">
                <span>Status 1VHS Academy : </span>
                <select
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  v-model="editData.isAcademy"
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
              </div>
              &nbsp;
              <div class="vx-row">
                <div class="w-full text-right vx-col">
                  <vs-button @click="update" size="small">Update</vs-button>
                </div>
              </div>
            </vx-card>
          </vs-popup>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import vSelect from 'vue-select'
import moment from 'moment'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data () {
    return {
      idDelete: null,
      popupActivo: false,
      popupEdit: false,
      value: 'uji',
      storeData: {
        id: null,
        jadwal_id: null,
        company_id: null,
        user_id: null
      },
      editData: {
        user_id: null,
        user_name: '',
        type: '',
        jadwal_id: null,
        isBasic: null,
        isClass: null,
        isCamp: null,
        isAcademy: null
      },
      jadwalArr: [],
      userArr: [],
      companyArr: [],
      resData: [],
      options: [
        { value: 0, text: 'Tidak Pernah' },
        { value: 1, text: 'Lolos' }
      ]
    }
  },
  components: {
    vSelect
  },
  computed: {
    ...mapState({
      data: (state) => state.jadwalUser.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'jadwalUser/indexDetail',
      dispatchDestroy: 'jadwalUser/destroy',
      dispatchShow: 'jadwalUser/showdetail',
      dispatchUpdate: 'jadwalUser/updateUser'
    }),
    async clickData (user_id, type, jadwal_id) {
      try {
        const res = await this.dispatchShow(user_id)
        this.editData.user_id = res.data['id']
        this.editData.user_name = res.data['name']
        this.editData.type = type
        this.editData.jadwal_id = jadwal_id
        this.editData.isBasic = res.data['isBasic']
        this.editData.isClass = res.data['isClass']
        this.editData.isCamp = res.data['isCamp']
        this.editData.isAcademy = res.data['isAcademy']
        this.popupEdit = true
      } catch (error) {
        console.log(error)
      }
    },
    format_date (value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
    },
    convertToFormData () {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      ['id', 'jadwal_id', 'company_id', 'user_id', 'is_take'].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key])
      })

      if (this.storeData.id) data.append('_method', 'PUT')
      return data
    },
    store () {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false
        const formData = this.convertToFormData()
        if (!formData) return false
        this.$vs.loading({
          type: 'radius',
          color: 'blue',
          textAfter: true,
          text: 'Please Wait ...'
        })
        this.isLoading = true
        try {
          if (this.storeData.id) {
            await this.dispatchUpdate(formData)
          } else {
            await this.dispatchStore(formData)
          }
          this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Success!',
            text: 'Data was saved successfully!',
            color: 'success'
          })
          window.location.reload()
        } catch (error) {
          this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Oops!',
            text: error,
            color: 'danger'
          })
        }
      })
    },

    async confirmDelete () {
      try {
        await this.dispatchDestroy(this.idDelete)
        this.dispatchIndex()
        this.$vs.notify({
          title: 'Success',
          text: 'Your data has been deleted successfully',
          color: 'primary'
        })

        // window.location.reload();

        this.$router.push({ name: 'jadwaluservhs' })
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: 'danger'
        })
      }
    },
    deletes (id) {
      this.idDelete = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Are you sure ?',
        text: 'Deleted data can no longer be restored',
        accept: this.confirmDelete
      })
    },

    async getDetail () {
      const res = await this.dispatchIndex(this.$route.params.id)
      this.resData = res.data
      this.$vs.loading.close()
    },

    async update () {
      const data = new FormData()
      data.append('user_id', this.editData.user_id)
      data.append('user_name', this.editData.user_name)
      data.append('type', this.editData.type)
      data.append('jadwal_id', this.editData.jadwal_id)
      data.append('isBasic', this.editData.isBasic)
      data.append('isClass', this.editData.isClass)
      data.append('isCamp', this.editData.isCamp)
      data.append('isAcademy', this.editData.isAcademy)
      data.append('_method', 'PUT')
      const formData = data
      if (!formData) return false

      try {
        await this.dispatchUpdate(formData)
        this.$vs.notify({
          title: 'Success!',
          text: 'Data was updated successfully!',
          color: 'success'
        })
        this.popupEdit = false
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: error.data.error,
          color: 'danger'
        })
      }
    }
  },
  mounted () {
    this.$vs.loading({
      type: 'radius',
      color: 'blue',
      textAfter: true,
      text: 'Please Wait ...'
    })
    this.getDetail()
    // this.dispatchIndex(this.$route.params.id)
    //   .then(() => {
    //     this.$vs.loading.close();
    //   })
    //   .catch(() => {
    //     this.$vs.loading.close();
    //   });
  }
}
</script>

<style>
.col-1 {
  width: 3%;
}
.col-11 {
  width: 97%;
}
</style>
