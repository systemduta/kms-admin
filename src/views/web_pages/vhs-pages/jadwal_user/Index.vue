<template>
  <div class="centerx">
    <vx-card title="Jadwal User 1VHS">
      <vs-table pagination max-items="10" search :data="data" class="mb-2">
        <template slot="thead">
          <vs-th sort-key="no">No </vs-th>
          <vs-th sort-key="namauser">Nama </vs-th>
          <vs-th sort-key="jadwalvhsname">Start</vs-th>
          <vs-th sort-key="start">End</vs-th>
          <vs-th sort-key="quota">Kuota</vs-th>
          <vs-th sort-key="total0">Total user belum disetujui</vs-th>
          <vs-th sort-key="total1">Total user disetujui</vs-th>
          <vs-th></vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
            <vs-td :data="tr.name">{{ tr.name }}</vs-td>
            <vs-td :data="tr.start">{{ format_date(tr.start) }}</vs-td>
            <vs-td :data="tr.end">{{ format_date(tr.end) }}</vs-td>
            <vs-td :data="tr.quota">{{ tr.quota }}</vs-td>
            <vs-td :data="tr.total0">{{ tr.total0 }}</vs-td>
            <vs-td :data="tr.total1">{{ tr.total1 }}</vs-td>
            <vs-td>
              <div class="flex">
                <vs-button
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  :to="{
                    name: `indexdetail`,
                    params: { id: tr.id },
                  }"
                >
                </vs-button>
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
      dispatchIndex: 'jadwalUser/index',
      dispatchDestroy: 'jadwalUser/destroy'
    }),
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
    }
  },
  mounted () {
    this.$vs.loading({
      type: 'radius',
      color: 'blue',
      textAfter: true,
      text: 'Please Wait ...'
    })
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close()
      })
      .catch(() => {
        this.$vs.loading.close()
      })
  }
}
</script>
