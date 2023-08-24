<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Sertifikat 1VHS">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'vhs-pages/sertifikat/create' }"
              >Tambah Sertifikat</vs-button
            >
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama Peserta</vs-th>
            <vs-th>File 1</vs-th>
            <vs-th>File 2</vs-th>
            <vs-th>File 3</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.usersname">{{ tr.usersname }}</vs-td>
              <vs-td v-if="tr.doc1 != 'not found'" :data="tr.doc1">
                <span style="color: green">Ada Data</span>
              </vs-td>
              <vs-td v-else :data="tr.doc1">kosong / tidak diisi</vs-td>
              <vs-td v-if="tr.doc2 != 'not found'" :data="tr.doc2">
                <span style="color: green">Ada Data</span></vs-td
              >
              <vs-td v-else :data="tr.doc2">kosong / tidak diisi</vs-td>
              <vs-td v-if="tr.doc3 != 'not found'" :data="tr.doc2">
                <span style="color: green">Ada Data</span></vs-td
              >
              <vs-td v-else :data="tr.doc3">kosong / tidak diisi</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    @click="show(tr.id)"
                    color="warning"
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    size="small"
                  ></vs-button>
                  <vs-button
                    class="mr-2"
                    :to="{
                      name: `vhs-pages/sertifikat/edit`,
                      params: { id: tr.id },
                    }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button>
                  <vs-button
                    color="danger"
                    @click="deletes(tr.id)"
                    icon-pack="feather"
                    icon="icon-delete"
                    size="small"
                  ></vs-button>

                  <div class="centerx">
                    <vs-popup title="" :active.sync="popup">
                      <template>
                        <div class="vx-row">
                          <div v-if="dataShow" class="w-full vx-col mb-base">
                            <vx-card
                              title="Detail Sertifikat"
                              elevation="9"
                              shaped
                            >
                              <div class="vx-row mb-5">
                                <div class="vx-col w-full">
                                  <vs-input
                                    v-if="dataShow.Data['usersname']"
                                    class="w-full"
                                    v-validate="'required'"
                                    label="Nama User"
                                    v-model="dataShow.Data['usersname']"
                                    :disabled="true"
                                  ></vs-input>
                                </div>
                              </div>
                              <div class="vx-row mb-5">
                                <div class="vx-col w-90">
                                  <vs-input
                                    v-if="dataShow.Data['doc1'] != 'not found'"
                                    class="w-full"
                                    v-validate="'required'"
                                    label="File 1:"
                                    v-model="dataShow.Data['doc1']"
                                    :disabled="true"
                                  ></vs-input>
                                </div>
                                <a
                                  v-if="dataShow.Data['doc1'] != 'not found'"
                                  v-bind:href="
                                    url +
                                    '/file/certivhs/doc1/' +
                                    dataShow.Data['doc1']
                                  "
                                  style="margin-top: 40px"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span>
                                    <vs-icon
                                      icon="visibility"
                                      color="primary"
                                    ></vs-icon>
                                  </span>
                                </a>
                              </div>
                              <div class="vx-row mb-5">
                                <div class="vx-col w-90">
                                  <vs-input
                                    v-if="dataShow.Data['doc2'] != 'not found'"
                                    class="w-full"
                                    v-validate="'required'"
                                    label="File 2:"
                                    v-model="dataShow.Data['doc2']"
                                    :disabled="true"
                                  ></vs-input>
                                </div>
                                <a
                                  v-if="dataShow.Data['doc2'] != 'not found'"
                                  v-bind:href="
                                    url +
                                    '/file/certivhs/doc2/' +
                                    dataShow.Data['doc2']
                                  "
                                  style="margin-top: 40px"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span>
                                    <vs-icon
                                      icon="visibility"
                                      color="primary"
                                    ></vs-icon>
                                  </span>
                                </a>
                              </div>
                              <div class="vx-row mb-5">
                                <div class="vx-col w-90">
                                  <vs-input
                                    v-if="dataShow.Data['doc3'] != 'not found'"
                                    class="w-full"
                                    v-validate="'required'"
                                    label="File 3:"
                                    v-model="dataShow.Data['doc3']"
                                    :disabled="true"
                                  ></vs-input>
                                </div>
                                <a
                                  v-if="dataShow.Data['doc3'] != 'not found'"
                                  v-bind:href="
                                    url +
                                    '/file/certivhs/doc3/' +
                                    dataShow.Data['doc3']
                                  "
                                  style="margin-top: 40px"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span>
                                    <vs-icon
                                      icon="visibility"
                                      color="primary"
                                    ></vs-icon>
                                  </span>
                                </a>
                              </div>
                            </vx-card>
                          </div>
                          <div v-else></div>
                        </div>
                      </template>
                    </vs-popup>
                  </div>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      url: process.env.VUE_APP_API_URL,
      idDelete: null,
      dataShow: null,
      popup: false
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.sertif.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'sertif/index',
      dispatchDestroy: 'sertif/destroy',
      dispatchShow: 'sertif/show'
    }),
    async show (id) {
      try {
        this.dataShow = await this.dispatchShow(id)
        if (this.dataShow.Data) {
          this.popup = true
        } else {
          this.$vs.notify({
            title: 'Oops!',
            text: 'Maaf, Unknow error ',
            color: 'danger'
          })
        }
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: 'Maaf, Unknow error ',
          color: 'danger'
        })
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

        this.dispatchIndex(this.$route.params.id)
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
