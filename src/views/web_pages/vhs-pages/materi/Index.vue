<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Materi 1VHS">
        <vs-table pagination max-items="10" search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'vhs-pages/materi/create' }" size="small">
              Tambah Materi
            </vs-button>
          </template>
          <template slot="thead">
            <vs-th sort-key="no">No </vs-th>
            <vs-th sort-key="namauser">Nama Jadwal </vs-th>
            <vs-th sort-key="type">Tipe </vs-th>
            <vs-th sort-key="jadwalvhsname">Start</vs-th>
            <vs-th sort-key="start">End</vs-th>
            <vs-th sort-key="total">Total Materi</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.type">{{ tr.type }}</vs-td>
              <vs-td :data="tr.start">{{ format_date(tr.start) }}</vs-td>
              <vs-td :data="tr.end">{{ format_date(tr.end) }}</vs-td>
              <vs-td :data="tr.total">{{ tr.total }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    icon-pack="feather"
                    icon="icon-eye"
                    size="small"
                    :to="{
                      name: `vhsmateri-detail`,
                      params: { id: tr.id },
                    }"
                  >
                  </vs-button>
                  <!-- &nbsp;
                  <vs-button
                    color="danger"
                    icon-pack="feather"
                    @click="deletes(tr.id)"
                    icon="icon-delete"
                    size="small"
                  ></vs-button> -->
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
import { mapState, mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      idDelete: null,
      urlImage: process.env.VUE_APP_API_URL + "/file/materivhs/image/",
      urlFile: process.env.VUE_APP_API_URL + "/file/materivhs/file/",
      urlVideo: process.env.VUE_APP_API_URL + "/file/materivhs/video/",
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.materi.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "materi/index",
      dispatchDestroy: "materi/destroy",
    }),
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY");
      }
    },
    async confirmDelete() {
      try {
        await this.dispatchDestroy(this.idDelete);
        this.dispatchIndex();
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });

        this.dispatchIndex(this.$route.params.id);
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: "Maaf, Materi sudah di jadwalkan ke user atau sudah ada data jawaban user",
          color: "danger",
        });
      }
    },

    deletes(id) {
      this.idDelete = id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Are you sure ?",
        text: "Deleted data can no longer be restored",
        accept: this.confirmDelete,
      });
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
