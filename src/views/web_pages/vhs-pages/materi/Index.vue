<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Materi VHS">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'vhs-pages/materi/create' }"
              >Tambah Materi</vs-button
            >
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama Materi</vs-th>
            <vs-th>Deskripsi</vs-th>
            <vs-th>Tipe</vs-th>
            <vs-th>Jadwal</vs-th>
            <vs-th>Image</vs-th>
            <vs-th>File PDF</vs-th>
            <vs-th>Video</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.desc">{{ tr.desc }}</vs-td>
              <vs-td :data="tr.type">{{ tr.type }}</vs-td>
              <vs-td :data="tr.jadwal_vhs_name">{{ tr.jadwal_vhs_name }}</vs-td>
              <vs-td :data="tr.image">{{ tr.image }}</vs-td>
              <vs-td :data="tr.file">{{ tr.file }}</vs-td>
              <vs-td v-if="tr.video != 'error'" :data="tr.video">{{
                tr.video
              }}</vs-td>
              <vs-td v-else :data="tr.video">kosong / tidak diisi</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    @click="downData(tr.id)"
                    color="warning"
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-download"
                    size="small"
                  ></vs-button>
                  <vs-button
                    class="mr-2"
                    :to="{
                      name: `vhs-pages/materi/edit`,
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
// import moment from "moment";
export default {
  data() {
    return {
      idDelete: null,
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
    async downData(id) {
      // console.log(id);
      this.$http
        .get("api/web/downmateri/" + id)
        .then((response) => {
          const link = document.createElement("a");
          link.href =
            process.env.VUE_APP_API_URL +
            "/file/materivhs/file/" +
            response.data.data;
          link.setAttribute("download", response.data.data);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
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
