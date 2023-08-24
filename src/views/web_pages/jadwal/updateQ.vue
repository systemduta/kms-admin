<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Update Quota 1VHS Perusahaan">
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
        </div>

        <div class="mb-5 vx-row">
          <div class="ml-5 w-full vx-col">
            <div v-for="(item, index) in storeData.quotaAP" :key="index">
              <label>Perusahaan {{ index + 1 }}: </label>
              <select
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                v-model="item.id"
              >
                <option v-for="option in resCompany" :value="option.id">
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
                v-model="item.quota"
              ></vs-input>
              <span class="text-sm text-danger" v-show="errors.has('quota')">{{
                errors.first("quota")
              }}</span>
              <br />
            </div>
            <vs-button @click="addItem">Add Quota</vs-button> &nbsp; &nbsp;
            <vs-button @click="deleteItem">Delete Quota</vs-button>
          </div>
        </div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button color="dark" type="flat" :to="{ name: 'jadwal' }"
              >Back</vs-button
            >
            &nbsp; &nbsp;
            <vs-button @click="store">Save</vs-button>
          </div>
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
      resJadwal: [],
      maxQuota: null,
      resCompany: [{ id: '', name: '' }],
      storeData: {
        id: '',
        quotaAP: []
      }
    }
  },
  components: {
    vSelect
  },
  computed: {
    ...mapState({
      uploadProgress: (state) => state.quotaap.upload_progress
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'quotaap/index',
      dispatchCompany: 'company/index',
      dispatchJadwal: 'quotaap/getJadwal',
      dispatchQuotaap: 'quotaap/showquotaap',
      dispatchUpdate: 'quotaap/updatequota'
    }),
    async getDetail () {
      const { data } = await this.dispatchCompany()
      this.resCompany = data.map((item) => {
        return { id: item.id, name: item.name }
      })

      const resJadwal = await this.dispatchJadwal(this.$route.params.id)
      this.resJadwal = resJadwal.success
      this.maxQuota = this.resJadwal['quota']

      const resquota = await this.dispatchQuotaap(this.$route.params.id)
      this.storeData.quotaAP = resquota.success.map((i) => {
        return { id: i.company_id, quota: i.quota }
      })
      console.log(this.storeData.quotaAP)
      this.storeData.id = this.$route.params.id
    },
    addItem () {
      const sum = this.storeData.quotaAP.reduce(
        (n, { quota }) => n + parseInt(quota),
        0
      )
      if (sum > this.maxQuota) {
        alert('Total Quota AP lebih besar dari Maximal Kuota')
      } else {
        this.storeData.quotaAP.push({ id: null, quota: '' })
      }
    },
    deleteItem () {
      this.storeData.quotaAP.pop({ id: null, quota: '' })
    },
    convertToFormData () {
      const data = new FormData()
      data.append('id', this.storeData.id)
      data.append('quotaAp', JSON.stringify(this.storeData.quotaAP))

      if (this.$route.params.id) data.append('_method', 'PUT')
      return data
    },

    store () {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false
        const formData = this.convertToFormData()
        if (!formData) return false

        const sum = this.storeData.quotaAP.reduce(
          (n, { quota }) => n + parseInt(quota),
          0
        )

        if (sum > this.maxQuota) {
          alert('Quota AP lebih besar dari quota utama')
        } else if (sum < this.maxQuota) {
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
              await this.dispatchUpdate(formData)
              this.$vs.loading.close()
              this.isLoading = false
              this.$vs.notify({
                title: 'Success!',
                text: 'Data was saved successfully!',
                color: 'success'
              })

              this.$router.push({ name: 'jadwal' })
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
      })
    }
  },

  async mounted () {
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
.preview {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  cursor: pointer;
  border-radius: 5px;
}
.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
  text-align: center;
  margin-bottom: 5px;
}
.text-small {
  font-size: 12px;
  padding-left: 5px;
}
</style>
