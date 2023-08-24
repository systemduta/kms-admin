<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Jadwal 1VHS">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'jadwal-create' }"
              >Create Jadwal 1vhs</vs-button
            >
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama</vs-th>
            <vs-th>Type</vs-th>
            <vs-th>Batch</vs-th>
            <vs-th>Start</vs-th>
            <vs-th>End</vs-th>
            <vs-th>Pembagian</vs-th>
            <vs-th>Max Quota</vs-th>
            <vs-th>Aksi</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.type">{{ tr.type }}</vs-td>
              <vs-td :data="tr.batch">{{ tr.batch }}</vs-td>
              <vs-td :data="tr.start">{{ format_date(tr.start) }}</vs-td>
              <vs-td :data="tr.end">{{ format_date(tr.end) }}</vs-td>
              <vs-td :data="tr.isCity">
                <span v-if="tr.isCity == '1'">Ada Pembagian</span>
                <span v-if="tr.isCity == '2'">Ada Pembagian</span>
                <span v-if="tr.isCity == '3'">Tanpa Pembagian</span>
                <span v-if="tr.isCity == '4'">Tanpa Pembagian</span>
              </vs-td>
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
                    icon="icon-eye"
                    size="small"
                    v-on:mouseover="showMessage(3)"
                    v-bind:title="message"
                    :to="{ name: `permit`, params: { id: tr.id } }"
                  >
                  </vs-button>

                  <vs-button
                    class="mr-2"
                    :to="{ name: `jadwal-edit`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                    v-on:mouseover="showMessage(1)"
                    v-bind:title="message"
                  >
                  </vs-button>

                  <!-- <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-copy"
                    size="small"
                    @click="copyData(tr.id, tr.end)"
                    v-on:mouseover="showMessage(2)"
                    v-bind:title="message"
                  >
                  </vs-button> -->

                  <!-- <vs-button
                    v-if="
                      tr.isCity == '1' || tr.isCity == '2' || tr.isCity == '3'
                    "
                    class="mr-2"
                    :to="{ name: `quotaAnak`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                    color="success"
                    v-on:mouseover="showMessage(2)"
                    v-bind:title="message"
                  >
                  </vs-button> -->

                  <vs-button
                    color="danger"
                    @click="deletes(tr.id)"
                    icon-pack="feather"
                    icon="icon-delete"
                    size="small"
                  ></vs-button>
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
import moment from 'moment'
export default {
  data () {
    return {
      showPopup: false,
      idDelete: null,
      message: ''
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.jadwal.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'jadwal/index',
      dispatchDestroy: 'jadwal/destroy'
    }),
    copyData (id, end) {
      const now = new Date()
      const ended = new Date(end)
      if (ended < now) {
        alert('pass ')
      } else {
        alert('jadwal 1VHS ini masih belum berakhir')
      }
    },

    showMessage (id) {
      if (id == 1) {
        this.message = 'Edit Semua data keseluruhan'
      } else if (id == 2) {
        this.message = 'Copy Semua'
      } else if (id == 3) {
        this.message = 'Lihat peserta yang didaftarkan admin AP'
      }
    },

    format_date (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
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
          title: 'Gagal Menghapus',
          // text: `Jadwal ini sudah ada materi / kuota untuk AP / user yang terjadwal didalamnya, harap hapus terlebih dahulu`,
          text: `<p>Penyebab: <br><br>
          1. Ada materi yang terkait didalam jadwal <br>
          2. Ada Pembagian kuota untuk anak perusahaan didalamnya<br>
          3. Ada User yang telah dijadwalkan <br><br>
          
          Hapus data diatas terlebih dahulu !!!
            </p>`,
          color: 'danger',
          time: 10000
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
<style>
.popup-background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
