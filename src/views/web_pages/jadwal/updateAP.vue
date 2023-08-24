<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Update Quota 1VHS per Perusahaan">
        <vs-alert
          color="warning"
          icon="new_releases"
          :active.sync="close"
          closable
          close-icon="close"
        >
          <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Harap Perhatikan :
          </h2>
          <ul
            class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
          >
            <li>1. Maksimal Kuota</li>
            <li>2. Kuota Pembagian per Perusahaan</li>
            <li>3. Pastikan tidak ada nama perusahaan yang sama</li>
          </ul>
        </vs-alert>
        <div v-if="resJadwal" class="row">
          <table class="table-borderless ml-3">
            <tr>
              <td style="width: 20%; font-weight: bold">Nama Batch</td>
              <td>:</td>
              <td>{{ resJadwal["batch"] }} - {{ resJadwal["type"] }}</td>
            </tr>
            <tr>
              <td style="font-weight: bold">Maksimal Kuota</td>
              <td>:</td>
              <td>{{ resJadwal["quota"] }}</td>
            </tr>
            <tr>
              <td style="font-weight: bold">Daftar Perusahaan</td>
              <td>:</td>
              <td></td>
            </tr>
          </table>
          <vx-card>
            <vs-table search :data="datas" class="mb-2">
              <template slot="header">
                <vs-button @click="popUpCreate = true"
                  >Tambah quota perusahaan</vs-button
                >
              </template>
              <template slot="thead">
                <vs-th>No</vs-th>
                <vs-th>Perusahaan</vs-th>
                <vs-th>Batch / Jadwal</vs-th>
                <vs-th>Quota</vs-th>
                <vs-th></vs-th>
              </template>
              <template slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in datas">
                  <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
                  <vs-td :data="tr.comname">{{ tr.comname }}</vs-td>
                  <vs-td :data="tr.name">{{ tr.name }} / {{ tr.batch }}</vs-td>
                  <vs-td :data="tr.quota">
                    <span v-if="tr.quota == 'null' || tr.quota == '0'">
                      non-quota
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
                        @click="popUp(tr.id, tr.comid, tr.jadwalid, tr.quota)"
                      ></vs-button>
                      &nbsp;
                      <vs-button
                        color="danger"
                        @click="deletes(tr.id)"
                        icon-pack="feather"
                        icon="icon-delete"
                        size="small"
                      ></vs-button>
                    </div>
                    <vs-popup
                      class="holamundo"
                      title="Edit Quota Perusahaan"
                      :active.sync="popupEdit"
                    >
                      <div class="mb-5 vx-row">
                        <div class="ml-5 w-full vx-col">
                          <vs-input
                            type="hidden"
                            class="w-full"
                            name="quota2"
                            v-model="editData.id"
                          ></vs-input>
                          <label>Perusahaan : </label>
                          <select
                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                            v-model="editData.company_id"
                          >
                            <option
                              v-for="option in resCompany"
                              :value="option.id"
                              :key="option.id"
                            >
                              {{ option.name }}
                            </option>
                          </select>
                          <br />
                          <label>Masukkan Quota:</label>
                          <vs-input
                            type="number"
                            class="w-full"
                            name="quota2"
                            v-model="editData.quota"
                          ></vs-input>
                          <span
                            class="text-sm text-danger"
                            v-show="errors.has('quota2')"
                            >{{ errors.first("quota2") }}</span
                          >
                          <div class="vx-row mt-3">
                            <div class="w-full text-right vx-col">
                              <vs-button
                                color="dark"
                                type="flat"
                                @click="popupEdit = false"
                                >Back</vs-button
                              >
                              &nbsp; &nbsp;
                              <vs-button @click="update">Save</vs-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </vs-popup>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </vx-card>
          <vs-popup
            class="holamundo"
            title="Tambah Quota Perusahaan"
            :active.sync="popUpCreate"
          >
            <div class="mb-5 vx-row">
              <div class="ml-5 w-full vx-col">
                <label>Perusahaan : </label>
                <select
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  v-model="storeData.company_id"
                >
                  <option
                    v-for="option in resCompany"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.name }}
                  </option>
                </select>
                <br />
                <label>Masukkan Quota:</label>
                <vs-input
                  type="number"
                  class="w-full"
                  v-validate="'required'"
                  name="quota"
                  v-model="storeData.quota"
                ></vs-input>
                <span
                  class="text-sm text-danger"
                  v-show="errors.has('quota')"
                  >{{ errors.first("quota") }}</span
                >
                <div class="vx-row mt-3">
                  <div class="w-full text-right vx-col">
                    <vs-button
                      color="dark"
                      type="flat"
                      @click="popUpCreate = false"
                      >Back</vs-button
                    >
                    &nbsp; &nbsp;
                    <vs-button @click="store">Save</vs-button>
                  </div>
                </div>
              </div>
            </div>
          </vs-popup>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import vSelect from 'vue-select'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data () {
    return {
      close: true,
      popUpCreate: false,
      popupEdit: false,
      resJadwal: [],
      datas: [],
      resCompany: [],
      maxQuota: null,
      storeData: {
        jadwal_id: this.$route.params.id,
        company_id: '',
        quota: ''
      },
      tempData: {
        id: '',
        jadwal_id: this.$route.params.id,
        company_id: '',
        quota: ''
      },
      editData: {
        id: '',
        jadwal_id: this.$route.params.id,
        company_id: '',
        quota: ''
      }
    }
  },
  components: {
    vSelect
  },
  computed: {
    ...mapState({
      data: (state) => state.quotaap.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'quotaap/getAll',
      dispatchCompany: 'company/index',
      dispatchJadwal: 'quotaap/getJadwal',
      dispatchDestroy: 'quotaap/destroy',
      dispatchStore: 'quotaap/store',
      dispatchUpdate: 'quotaap/updateSingle'
    }),
    async getDetail () {
      const resJadwal = await this.dispatchJadwal(this.$route.params.id)
      this.resJadwal = resJadwal.success
      this.maxQuota = this.resJadwal['quota']

      const resQuota = await this.dispatchIndex(this.$route.params.id)
      this.datas = resQuota.data

      const { data } = await this.dispatchCompany()
      this.resCompany = data.map((item) => {
        return { id: item.id, name: item.name }
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

        this.dispatchIndex(this.$route.params.id)
        // window.location.reload();
        this.getDetail()
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: error.data.error,
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
    convertToFormData () {
      const data = new FormData()
      data.append('jadwal_id', this.storeData.jadwal_id)
      data.append('company_id', this.storeData.company_id)
      data.append('quota', this.storeData.quota)
      return data
    },
    store () {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false
        const formData = this.convertToFormData()
        if (!formData) return false

        let sum = this.datas.reduce((n, { quota }) => n + parseInt(quota), 0)
        sum = parseInt(sum) + parseInt(this.storeData.quota)
        // console.log(sum);
        if (sum > this.resJadwal['quota']) {
          alert('Quota AP lebih besar dari quota utama')
        } else {
          for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`)
          }
          // this.$vs.loading({
          //   type: "radius",
          //   color: "blue",
          //   textAfter: true,
          //   text: "Please Wait ...",
          // });
          // try {
          //   await this.dispatchStore(formData);
          //   this.$vs.loading.close();
          //   this.isLoading = false;
          //   this.$vs.notify({
          //     title: "Success!",
          //     text: "Data was saved successfully!",
          //     color: "success",
          //   });

          //   this.popUpCreate = false;
          //   // window.location.reload();
          //   this.getDetail();
          // } catch (error) {
          //   this.$vs.loading.close();
          //   this.$vs.notify({
          //     title: "Oops!",
          //     text: error.data.message,
          //     color: "danger",
          //   });
          // }
        }
      })
    },

    popUp (id, comid, jadwal_id, quota) {
      this.tempData.id = id
      this.tempData.company_id = comid
      this.tempData.jadwal_id = jadwal_id
      this.tempData.quota = quota

      this.editData.id = id
      this.editData.company_id = comid
      this.editData.jadwal_id = jadwal_id
      this.editData.quota = quota

      this.popupEdit = true
    },

    convertToFormDataUpdate () {
      const data = new FormData()
      data.append('id', this.editData.id)
      data.append('jadwal_id', this.editData.jadwal_id)
      data.append('company_id', this.editData.company_id)
      data.append('quota', this.editData.quota)

      data.append('id_lama', this.tempData.id)
      data.append('jadwal_id_lama', this.tempData.jadwal_id)
      data.append('company_id_lama', this.tempData.company_id)
      data.append('quota_lama', this.tempData.quota)
      data.append('_method', 'PUT')
      return data
    },
    async update () {
      const formDataEdit = this.convertToFormDataUpdate()
      if (!formDataEdit) return false
      let tempData = this.datas
      tempData = tempData.filter(
        (data) => data.jadwalid !== this.tempData.jadwal_id ||
          data.comid !== this.tempData.company_id
      )
      let sum = tempData.reduce((n, { quota }) => n + parseInt(quota), 0)
      sum = parseInt(sum) + parseInt(this.editData.quota)
      if (sum > this.resJadwal['quota']) {
        alert('Quota AP lebih besar dari quota utama')
      } else if (sum < this.resJadwal['quota']) {
        alert('Quota AP lebih kecil dari quota utama')
      } else {
        this.$vs.loading({
          type: 'radius',
          color: 'blue',
          textAfter: true,
          text: 'Please Wait ...'
        })
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formDataEdit)
            this.$vs.loading.close()
            this.isLoading = false
            this.$vs.notify({
              title: 'Success!',
              text: 'Data was saved successfully!',
              color: 'success'
            })

            this.popupEdit = false
            // window.location.reload();
            await this.getDetail()
          }
        } catch (error) {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Oops!',
            text: error.data.message,
            color: 'danger'
          })
        }
      }
    }
  },
  async mounted () {
    this.getDetail()
  }
}
</script>
