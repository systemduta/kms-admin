<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Materi 1VHS">
        <vs-table search :data="response" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'vhs-pages/materi/create' }" size="small">
              Tambah Materi
            </vs-button>
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
            <vs-th>Jenis Materi</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.desc" v-if="tr.desc">
                <a
                  href="#"
                  @click="poupDesc(tr.desc)"
                  style="color: blue; cursor: pointer"
                >
                  Ada Deskripsi
                </a>
              </vs-td>
              <vs-td :data="tr.type">{{ tr.type }}</vs-td>
              <vs-td :data="tr.jadwal_vhs_name">{{ tr.jadwal_vhs_name }}</vs-td>

              <vs-td :data="tr.image" v-if="tr.image">
                <a
                  :href="urlImage + tr.image"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Ada Gambar</a
                >
              </vs-td>
              <vs-td :data="tr.image" v-else>Kosong</vs-td>

              <vs-td :data="tr.file" v-if="tr.file != 'error'">
                <a
                  :href="urlFile + tr.file"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Ada File</a
                >
              </vs-td>
              <vs-td :data="tr.file" v-else>Kosong</vs-td>

              <vs-td v-if="tr.video != 'error'" :data="tr.video">
                <a
                  :href="urlVideo + tr.video"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Ada Video</a
                >
              </vs-td>
              <vs-td v-else :data="tr.video">kosong / tidak diisi</vs-td>

              <vs-td :data="tr.isPreTest" v-if="tr.isPreTest == '1'"
                >Pretest</vs-td
              >
              <vs-td :data="tr.isPreTest" v-else>PostTest</vs-td>
              <vs-td>
                <div class="flex">
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
      <vs-popup title="Deskripsi Materi" fullscreen :active.sync="isDesc">
        <div v-html="desc"></div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      idDelete: null,
      isDesc: false,
      desc: "",
      urlImage: process.env.VUE_APP_API_URL + "/file/materivhs/image/",
      urlFile: process.env.VUE_APP_API_URL + "/file/materivhs/file/",
      urlVideo: process.env.VUE_APP_API_URL + "/file/materivhs/video/",
      response: [],
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.materi.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "materi/detail",
      dispatchDestroy: "materi/destroy",
    }),

    poupDesc(desc) {
      this.desc = desc;
      setTimeout(() => {
        this.isDesc = true;
      }, 500);
      // this.isDesc = true;
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
        this.detail();
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
    async detail() {
      const response = await this.dispatchIndex(this.$route.params.id);
      this.response = response.data;
      this.$vs.loading.close();
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.detail();
    // this.dispatchIndex(this.$route.params.id)
    //   .then(() => {
    //     this.$vs.loading.close();
    //   })
    //   .catch(() => {
    //     this.$vs.loading.close();
    //   });
  },
};
</script>
