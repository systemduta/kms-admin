<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Riwayat User: Perusahaan">
        <vs-table search :data="data" class="mb-2">
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Code</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.code"><p v-html="tr.code"></p></vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    @click="listUser(tr.id)"
                    size="small"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>

    <!-- list user -->
    <vs-popup title="list user" fullscreen :active.sync="isList">
      <div class="vx-row" v-if="resListUser">
        <div class="w-full vx-col mb-base">
          <vx-card title="Data Riwayat User 1VHS">
            <vs-table
              search
              pagination
              max-items="10"
              :data="resListUser"
              class="mb-2"
            >
              <template slot="thead">
                <vs-th sort-key="no">No </vs-th>
                <vs-th sort-key="nik">NIK </vs-th>
                <vs-th sort-key="name">Nama</vs-th>
                <vs-th sort-key="com_name">Perusahaan</vs-th>
                <vs-th sort-key="org_name">Posisi</vs-th>
                <vs-th sort-key="isBasic">1VHS Basic</vs-th>
                <vs-th sort-key="isClass">1VHS Class</vs-th>
                <vs-th sort-key="isCamp">1VHS Camp</vs-th>
                <vs-th sort-key="isAcademy">1VHS Academy</vs-th>
                <vs-th></vs-th>
              </template>
              <template slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
                  <vs-td :data="tr.nik">{{ tr.nik }}</vs-td>
                  <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                  <vs-td :data="tr.com_name">{{ tr.com_name }}</vs-td>
                  <vs-td :data="tr.org_name">{{ tr.org_name }}</vs-td>
                  <vs-td :data="tr.isBasic" v-if="tr.isBasic == 1">
                    Sudah Ikut
                  </vs-td>
                  <vs-td :data="tr.isBasic" v-else>-</vs-td>

                  <vs-td :data="tr.isClass" v-if="tr.isClass == 1">
                    Sudah Ikut
                  </vs-td>
                  <vs-td :data="tr.isClass" v-else>-</vs-td>

                  <vs-td :data="tr.isCamp" v-if="tr.isCamp == 1">
                    Sudah Ikut
                  </vs-td>
                  <vs-td :data="tr.isCamp" v-else>-</vs-td>

                  <vs-td :data="tr.isAcademy" v-if="tr.isAcademy == 1">
                    Sudah Ikut
                  </vs-td>
                  <vs-td :data="tr.isAcademy" v-else>-</vs-td>
                  <vs-td>
                    <div class="flex">
                      <vs-button
                        icon-pack="feather"
                        icon="icon-edit"
                        size="small"
                        @click="editUser(tr.id)"
                      >
                      </vs-button>
                      &nbsp;
                      <vs-button
                        icon-pack="feather"
                        icon="icon-eye"
                        size="small"
                        @click="getDetailUser(tr.id)"
                      >
                      </vs-button>
                    </div>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </vx-card>
        </div>
      </div>
    </vs-popup>

    <!-- edit status -->
    <vs-popup
      class="holamundo"
      title="Edit User status"
      :active.sync="popupActivo"
    >
      <div class="vx-row">
        <div class="w-full vx-col mb-base">
          <vx-card>
            <p style="color: red">
              *Warning: Pastikan User telah benar statusnya
            </p>

            <div class="vx-row mb-5">
              <div class="vx-col w-full">
                <vs-input
                  class="w-full"
                  v-model="dataUpdate.name"
                  v-validate="'required'"
                  name="name"
                  label="Name User"
                ></vs-input>
                <span class="text-danger text-sm" v-show="errors.has('name')">{{
                  errors.first("name")
                }}</span>
              </div>
            </div>
            <div class="vx-row mb-5">
              <div class="vx-col w-full">
                <div class="relative">
                  <span>Status 1VHS Basic : </span>
                  <select
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    v-model="dataUpdate.isBasic"
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
              </div>
            </div>
            <div class="vx-row mb-5">
              <div class="vx-col w-full">
                <div class="relative">
                  <span>Status 1VHS Class : </span>
                  <select
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    v-model="dataUpdate.isClass"
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
              </div>
            </div>
            <div class="vx-row mb-5">
              <div class="vx-col w-full">
                <div class="relative">
                  <span>Status 1VHS Camp : </span>
                  <select
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    v-model="dataUpdate.isCamp"
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
              </div>
            </div>
            <div class="vx-row mb-5">
              <div class="vx-col w-full">
                <div class="relative">
                  <span>Status 1VHS Academy : </span>
                  <select
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    v-model="dataUpdate.isAcademy"
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
              </div>
            </div>
            <div class="vx-row">
              <div class="w-full text-right vx-col">
                <vs-button color="dark" type="flat" @click="popupActivo = false"
                  >Back</vs-button
                >
                &nbsp; &nbsp;
                <vs-button @click="store">Update</vs-button>
              </div>
            </div>
          </vx-card>
        </div>
      </div>
    </vs-popup>

    <!-- detail user -->
    <vs-popup
      title="Detail User"
      fullscreen
      :active.sync="isDetail"
      @close="
        isDetail = false;
        isList = true;
      "
    >
      <vx-card>
        <table class="table table-striped">
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>{{ detailUser.name }}</td>
          </tr>
          <tr>
            <td>NIK</td>
            <td>:</td>
            <td>{{ detailUser.nik }}</td>
          </tr>
          <tr>
            <td>Perusahaan</td>
            <td>:</td>
            <td>{{ detailUser.company }}</td>
          </tr>
          <tr>
            <td>Divisi</td>
            <td>:</td>
            <td>{{ detailUser.division }}</td>
          </tr>
        </table>
        <vs-table search :data="vhs" class="mb-2">
          <template slot="header"> <h4>Data 1 VHS user</h4> </template>
          <template> Riwayat 1 VHS user </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Batch</vs-th>
            <vs-th>Type</vs-th>
            <vs-th>Start</vs-th>
            <vs-th>End</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr
              :key="indextr"
              v-for="(tr, indextr) in data"
              v-if="
                (tr.type == '1VHS Basic' && tr.isBasic == 1) ||
                (tr.type == '1VHS Class' && tr.isClass == 1) ||
                (tr.type == '1VHS Camp' && tr.isCamp == 1) ||
                (tr.type == '1VHS Academy' && tr.isAcademy == 1)
              "
            >
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.batch">{{ tr.batch }}</vs-td>
              <vs-td :data="tr.type">{{ tr.type }}</vs-td>
              <vs-td :data="tr.start">{{ tr.start }}</vs-td>
              <vs-td :data="tr.end">{{ tr.end }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </vs-popup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      // close: true,
      resListUser: [],
      options: [
        { value: 0, text: 'Tidak Pernah' },
        { value: 1, text: 'Pernah' }
      ],
      dataUpdate: {
        id: null,
        nik: '',
        name: '',
        isBasic: null,
        isClass: null,
        isCamp: null,
        isAcademy: null
      },
      isList: false,
      isDetail: false,
      popupActivo: false,
      detailUser: {
        id: null,
        nik: null,
        name: '',
        company: '',
        division: ''
      },
      vhs: []
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.company.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'company/index',
      dispatchListUser: 'user/index',
      dispatchShow: 'user/show',
      dispatchUpdate: 'user/updatelist',
      dispatchDetailUser: 'user/detailUser'
    }),
    async getDetailUser (id) {
      const response = await this.dispatchDetailUser(id)
      this.detailUser.id = response.user['id']
      this.detailUser.name = response.user['name']
      this.detailUser.nik = response.user['nik']
      this.detailUser.company = response.user['com_name']
      this.detailUser.division = response.user['org_name']

      this.vhs = response.vhs
      this.isList = false
      this.isDetail = true
    },
    async listUser (id) {
      const res = await this.dispatchListUser(id)
      this.resListUser = res.data
      // setTimeout(() => {
      this.isList = true
      // }, 500);
    },
    async editUser (id) {
      this.isList = false
      const res = await this.dispatchShow(id)
      this.dataUpdate.id = res.data[0].id
      this.dataUpdate.nik = res.data[0].nik
      this.dataUpdate.name = res.data[0].name
      this.dataUpdate.isBasic = res.data[0].isBasic
      this.dataUpdate.isClass = res.data[0].isClass
      this.dataUpdate.isCamp = res.data[0].isCamp
      this.dataUpdate.isAcademy = res.data[0].isAcademy
      setTimeout(() => {
        this.popupActivo = true
      }, 100)
    },

    convertToFormData () {
      const data = new FormData()
      data.append('id', this.dataUpdate.id)
      data.append('nik', this.dataUpdate.nik)
      data.append('name', this.dataUpdate.name)
      data.append('isBasic', this.dataUpdate.isBasic)
      data.append('isClass', this.dataUpdate.isClass)
      data.append('isCamp', this.dataUpdate.isCamp)
      data.append('isAcademy', this.dataUpdate.isAcademy)
      data.append('_method', 'PUT')
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
        try {
          await this.dispatchUpdate(formData)
          this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Success!',
            text: 'Data was saved successfully!',
            color: 'success'
          })

          this.popupActivo = false
        } catch (error) {
          this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Oops!',
            text: error.data.error,
            color: 'danger'
          })
        }
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
