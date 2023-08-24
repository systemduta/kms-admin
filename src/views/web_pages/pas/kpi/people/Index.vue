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
      <vx-card title="KPI PAS">
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
        </table>
      </vx-card>

      <hr />
      <vx-card>
        <vs-table pagination max-items="15" search :data="listKpi" class="mb-2">
          <template slot="header">
            <vs-button size="small" @click="isAdd = true">
              Tambah KPI
            </vs-button>
          </template>
          <template slot="thead">
            <vs-th sort-key="no">No</vs-th>
            <vs-th sort-key="kpi">KPI</vs-th>
            <vs-th sort-key="max_nilai">Nilai Maksimal</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.max_nilai">{{ tr.max_nilai }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    icon-pack="feather"
                    icon="icon-eye"
                    size="small"
                    :to="{
                      name: `indPenilaianPas`,
                      params: {
                        idKpi: tr.id,
                        idDimensi: idDimensi,
                        id3p: id3p,
                        name3p: nama3p,
                        nameDimensi: namaDimensi,
                        nameKpi: tr.name,
                      },
                    }"
                  >
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

      <vs-popup :active.sync="isAdd" title="Tambah KPI PAS">
        <vx-card title="Tambah Dimensi PAS">
          <div class="vx-row mb-5">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="storeData.name"
                v-validate="'required'"
                name="name"
                label="Name Dimensi"
              ></vs-input>
              <span class="text-danger text-sm" v-show="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
          </div>

          <div class="vx-row mb-5">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="storeData.max_nilai"
                v-validate="'required'"
                name="max_nilai"
                label="Nilai Maksimal"
                type="number"
              ></vs-input>
              <span
                class="text-danger text-sm"
                v-show="errors.has('max_nilai')"
                >{{ errors.first("max_nilai") }}</span
              >
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
      <vs-popup :active.sync="isUpdate" title="Update KPI PAS">
        <vx-card title="Tambah Dimensi PAS">
          <div class="vx-row mb-5">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="updateData.name"
                v-validate="'required'"
                name="name"
                label="Name Dimensi"
              ></vs-input>
              <span class="text-danger text-sm" v-show="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
          </div>

          <div class="vx-row mb-5">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="updateData.max_nilai"
                v-validate="'required'"
                name="max_nilai"
                label="Nilai Maksimal"
                type="number"
              ></vs-input>
              <span
                class="text-danger text-sm"
                v-show="errors.has('max_nilai')"
                >{{ errors.first("max_nilai") }}</span
              >
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
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      isAdd: false,
      isUpdate: false,
      idDelete: null,
      id3p: this.$route.params.id3p,
      idDimensi: this.$route.params.id,
      nama3p: this.$route.params.name3p,
      namaDimensi: this.$route.params.nameDimensi,
      listKpi: [],
      storeData: {
        id_3p: this.$route.params.idKpi,
        dimensi_id: this.$route.params.id,
        name: '',
        max_nilai: null
      },

      updateData: {
        id: null,
        id_3p: this.$route.params.idKpi,
        dimensi_id: this.$route.params.id,
        name: '',
        max_nilai: null
      }
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.kpi.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'kpi/index',
      dispatchStore: 'kpi/store',
      dispatchDestroy: 'kpi/destroy',
      dispatchShow: 'kpi/show',
      dispatchUpdate: 'kpi/update'
    }),
    goBack () {
      this.$router.push({
        name: 'people',
        params: {
          id: this.$route.params.idKpi
        }
      })
    },
    async datas (id) {
      try {
        const datas = await this.dispatchIndex(id)
        this.listKpi = datas.data
      } catch (error) {
        console.log(error)
      }
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

        this.datas(this.$route.params.id)
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: 'Maaf, Materi sudah di jadwalkan ke user atau sudah ada data jawaban user',
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

    async store () {
      const send = new FormData()
      send.append('id_3p', this.storeData.id_3p)
      send.append('dimensi_id', this.storeData.dimensi_id)
      send.append('name', this.storeData.name)
      send.append('max_nilai', this.storeData.max_nilai)

      this.$vs.loading({
        type: 'radius',
        color: 'blue',
        textAfter: true,
        text: 'Please Wait ...'
      })

      try {
        await this.dispatchStore(send)
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Success!',
          text: 'Data was saved successfully!',
          color: 'success'
        })
        this.datas(this.$route.params.id)
        this.storeData.name = ''
        this.storeData.max_nilai = null
        this.isAdd = false
      } catch (error) {
        this.$vs.loading.close()
        this.isLoading = false
        this.$vs.notify({
          title: 'Oops!',
          text: error.data.error,
          color: 'danger'
        })
      }
    },

    async getUpdate ($id) {
      try {
        const kpi_data = await this.dispatchShow($id)
        this.updateData.id = kpi_data.data['id']
        this.updateData.name = kpi_data.data['name']
        this.updateData.max_nilai = kpi_data.data['max_nilai']

        this.isUpdate = true
      } catch (error) {
        console.log(error)
      }
    },

    async update () {
      const send = new FormData()
      send.append('id', this.updateData.id)
      send.append('id_3p', this.updateData.id_3p)
      send.append('dimensi_id', this.updateData.dimensi_id)
      send.append('name', this.updateData.name)
      send.append('max_nilai', this.updateData.max_nilai)
      send.append('_method', 'PUT')

      this.$vs.loading({
        type: 'radius',
        color: 'blue',
        textAfter: true,
        text: 'Please Wait ...'
      })

      try {
        await this.dispatchUpdate(send)
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Success!',
          text: 'Data was updated successfully!',
          color: 'success'
        })
        this.datas(this.$route.params.id)
        this.isUpdate = false
      } catch (error) {
        this.$vs.loading.close()
        this.isLoading = false
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
    this.datas(this.$route.params.id)
      .then(() => {
        this.$vs.loading.close()
      })
      .catch(() => {
        this.$vs.loading.close()
      })
  }
}
</script>
