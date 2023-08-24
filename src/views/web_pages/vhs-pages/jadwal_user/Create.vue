<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Jadwal User 1VHS">
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <small>Jadwal 1VHS</small>
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
            <span class="text-danger text-sm" v-show="errors.has('user_id')">{{
              errors.first("user_id")
            }}</span>
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
        <!-- <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button @click="store">Save</vs-button>
          </div>
        </div> -->
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button color="dark" type="flat" :to="{ name: `jadwaluservhs` }"
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
import moment from 'moment'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data () {
    return {
      storeData: {
        id: this.$route.params.id,
        jadwal_id: null,
        company_id: null,
        user_id: null
      },
      jadwalArr: [],
      userArr: [],
      companyArr: []
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
      dispatchStore: 'jadwalUser/store',
      dispatchShow: 'jadwalUser/show',
      dispatchUpdate: 'jadwalUser/update',

      dispatchGetVhs: 'jadwalUser/getvhs',
      dispatchGetUser: 'jadwalUser/getuser',
      dispatchGetCompany: 'jadwalUser/getcompany'
    }),
    async cekBtn (id) {
      this.popupActivo = true
      const dt = await this.dispatchShow(id)
      this.storeData.id = dt.data.id
      this.storeData.jadwal_id = dt.data.jadwal_id
      this.storeData.user_id = dt.data.user_id
      this.storeData.company_id = dt.data.company_id
      // console.log(dt);
    },
    format_date (value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
    },
    async getJadwal () {
      const co = await this.dispatchGetVhs()
      this.jadwalArr = co.data
      this.jadwalArr.map(function (x) {
        return (x.item_data = `${x.name  } - ${  x.batch  } - ${  x.start}`)
      })
    },
    async getUser () {
      const co = await this.dispatchGetUser()
      this.userArr = co.data
      this.userArr.map(function (x) {
        return (x.user_data = `${x.name  } - ${  x.company.name}`)
      })
    },
    async getCompany () {
      const co = await this.dispatchGetCompany()
      this.companyArr = co.data
      this.companyArr.map(function (x) {
        return (x.company_data = x.nameCompany)
      })
    },

    convertToFormData () {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      ['id', 'jadwal_id', 'company_id', 'user_id', 'is_take'].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key])
      })

      if (this.$route.params.id) data.append('_method', 'PUT')
      return data
    },
    store () {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false
        const formData = this.convertToFormData()
        if (!formData) return false

        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0]}, ${pair[1]}`);
        // }
        this.$vs.loading({
          type: 'radius',
          color: 'blue',
          textAfter: true,
          text: 'Please Wait ...'
        })
        this.isLoading = true
        try {
          if (this.$route.params.id) {
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
          //   window.location.reload();
          this.$router.push({ name: 'jadwaluservhs' })
        } catch (error) {
          this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Oops!',
            text: 'Ada data sama, hubungi administrator',
            color: 'danger'
          })
        }
      })
    },

    async getDetail () {
      const success = await this.dispatchShow(this.$route.params.id)
      //   console.log(success.data);
      this.storeData.company_id = success.data.company_id
      this.storeData.user_id = success.data.user_id
      this.storeData.jadwal_id = success.data.jadwal_id
    }
  },
  mounted () {
    this.$vs.loading({
      type: 'radius',
      color: 'blue',
      textAfter: true,
      text: 'Please Wait ...'
    })
    if (this.$route.params.id) {
      this.getDetail()
    }
    this.getCompany()
    this.getJadwal()
    this.getUser()
      .then(() => {
        this.$vs.loading.close()
      })
      .catch(() => {
        this.$vs.loading.close()
      })
  }
}
</script>
