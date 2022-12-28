<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Materi VHS" class="rounded-card">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <!-- <vs-button :to="{ name: 'vhs-pages/materi/create' }"
              >Tambah Materi</vs-button
            > -->
            <vs-button @click="popupActivo=true">Tambah Materi</vs-button>
            <vs-popup class="holamundo"  title="Input Data VHS" :active.sync="popupActivo">
              <vx-card>
                <div class="vx-row mb-5">
                  <div class="vx-col w-full">
                    <vs-input
                      class="w-full"
                      v-model="storeData.name"
                      v-validate="'required'"
                      name="name"
                      label="Name Materi"
                    ></vs-input>
                    <span class="text-danger text-sm" v-show="errors.has('name')">{{
                      errors.first("name")
                    }}</span>
                  </div>
                </div>

                <div class="vx-row mb-5">
                  <div class="vx-col w-full">
                    <vs-textarea
                      v-model="storeData.desc"
                      v-validate="'required'"
                      name="desc"
                      label="Desc Materi"
                    />
                    <span class="text-danger text-sm" v-show="errors.has('desc')">{{
                      errors.first("desc")
                    }}</span>
                  </div>
                </div>

                <div class="mb-5 vx-row">
                  <div class="w-full vx-col">
                    <span>Type</span>
                    <v-select
                      v-model="storeData.type"
                      :options="['1VHS Basic', '1VHS Class', '1VHS Academy']"
                      :value="storeData.type"
                      name="type"
                      label="Type"
                    />
                    <span class="text-sm text-danger" v-show="errors.has('type')">{{
                      errors.first("type")
                    }}</span>
                  </div>
                </div>

                <div class="mb-5 vx-row">
                  <div class="w-full vx-col">
                    <small>Jadwal VHS</small>
                    <v-select
                      v-model="storeData.jadwal_id"
                      :options="jadwalvhs"
                      v-validate="'required'"
                      name="jadwal_id"
                      :reduce="(e) => e.id"
                      label="item_data"
                    ></v-select>
                    <span
                      class="text-sm text-danger"
                      v-show="errors.has('jadwal_id')"
                      >{{ errors.first("jadwal_id") }}</span
                    >
                  </div>
                </div>

                <div class="mb-5 vx-row">
                  <div class="w-full vx-col">
                    <small class="ml-2">Upload image</small> <br />
                    <input
                      class="w-full"
                      type="file"
                      id="image"
                      ref="image"
                      @change="readImage"
                      name="image"
                      v-validate="'required|size:3072'"
                    />
                    <span class="text-sm text-danger" v-show="errors.has('image')">{{
                      errors.first("image")
                    }}</span>

                    <div id="preview">
                      <img
                        v-if="this.$route.params.id && isVisible == true"
                        :src="urlImage + storeData.image"
                      />
                      <img src="" />
                      <img v-if="previewImage" :src="previewImage" />
                    </div>
                  </div>
                </div>

                <div class="mb-5 vx-row">
                  <div class="w-full vx-col">
                    <small class="ml-2">Upload pdf file</small> <br />
                    <input
                      class="w-full"
                      type="file"
                      id="file"
                      ref="file"
                      @change="readFile"
                      name="file"
                      v-validate="'required|ext:pdf|size:3072'"
                    />
                    <span class="text-sm text-danger" v-show="errors.has('file')">{{
                      errors.first("file")
                    }}</span>
                  </div>
                </div>

                <div class="mb-5 vx-row">
                  <div class="w-full vx-col">
                    <small class="ml-2">Upload video (mp4)</small> <br />
                    <input
                      class="w-full"
                      type="file"
                      id="video"
                      ref="video"
                      name="video"
                      @change="readVideo"
                      v-validate="'ext:mp4|size:30480'"
                    />
                    <span class="text-sm text-danger" v-show="errors.has('video')">{{
                      errors.first("video")
                    }}</span>
                  </div>
                </div>

                <div class="vx-row">
                  <div class="w-full text-right vx-col">
                    <vs-button @click="store" :disabled="isLoading">Simpan</vs-button>
                  </div>
                </div>
              </vx-card>
            </vs-popup>
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
                  <!-- <vs-button
                    class="mr-2"
                    :to="{
                      name: `vhs-pages/materi/edit`,
                      params: { id: tr.id },
                    }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button> -->
                  <vs-button class="mr-2" @click="popupActivo=true" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
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
import vSelect from "vue-select";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// import moment from "moment";
export default {
  data() {
    return {
      idDelete: null,
      popupActivo:false,
      isVisible: true,
      urlImage: "http://localhost:8000/file/materivhs/image/", //TODO jangan lupa diganti
      isLoading: false,
      previewImage: null,
      allowedImageType: ["image/jpeg", "image/png"],
      storeData: {
        id: this.$route.params.id,
        jadwal_id: null,
        name: "",
        type: "",
        desc: "",
        image: null,
        file: null,
        video: null,
      },

      jadwalvhs: [],
    };
  },
  components: {
    vSelect,
  },
  computed: {
    ...mapState({
      data: (state) => state.materi.rows,
      uploadProgress: (state) => state.materi.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "materi/index",
      dispatchDestroy: "materi/destroy",
      dispatchStore: "materi/store",
      dispatchUpdate: "materi/update",
      dispatchShow: "materi/show",

      dispatchGetCompanies: "zoom/getvhs",
    }),
    // format_date(value) {
    //   if (value) {
    //     return moment(String(value)).format("DD/MM/YYYY");
    //   }
    // },
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
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
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
    async getMaster() {
      const co = await this.dispatchGetCompanies();
      this.jadwalvhs = co.data;
      if (this.$route.params.id) {
        await this.getDetail();
      }
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY H:i:s");
      }
    },

    async readImage(event) {
      const image = event.target.files[0];
      this.storeData.image = image;
      this.isVisible = false;
      this.previewImage = URL.createObjectURL(image);
      //   return this.$set(this.storeData, "image", image);
    },
    async readVideo(event) {
      const video = event.target.files[0];
      this.storeData.video = video;
      //   return this.$set(this.storeData, "video", video);
    },
    async readFile(event) {
      const file = event.target.files[0];
      this.storeData.file = file;
      //   return this.$set(this.storeData, "file", file);
    },

    convertToFormData() {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      [
        "id",
        "jadwal_id",
        "name",
        "type",
        "desc",
        "image",
        "file",
        "video",
      ].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key]);
      });

      if (this.$route.params.id) data.append("_method", "PUT");
      return data;
    },
    store() {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false;
        const formData = this.convertToFormData();
        if (!formData) return false;

        for (const pair of formData.entries()) {
          console.log(`${pair[0]}, ${pair[1]}`);
        }

        this.$vs.loading();
        this.isLoading = true;
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formData);
          } else {
            await this.dispatchStore(formData);
          }
          this.$vs.loading.close();
          this.isLoading = false;
          this.$vs.notify({
            title: "Success!",
            text: "Data was saved successfully!",
            color: "success",
          });
          this.$router.push({ name: "vhs-pages/materi" });
        } catch (error) {
          this.$vs.loading.close();
          this.isLoading = false;
          console.log(error);
          this.$vs.notify({
            title: "Oops!",
            text: error,
            color: "danger",
          });
        }
      });
    },
    async getDetail() {
      const { success } = await this.dispatchShow(this.$route.params.id);
      this.storeData.jadwal_id = success.jadwal_id;
      this.storeData.name = success.name;
      this.storeData.type = success.type;
      this.storeData.desc = success.desc;
      this.storeData.image = success.image;
      this.storeData.file = success.file;
      this.storeData.video = success.video;
      // console.log(this.$route.params.id);
    },
  },
  mounted() {
    this.$vs.loading();
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
    this.jadwalvhs.map(function (x) {
      return (x.item_data = x.name + " - " + x.batch + " - " + x.start);
    });
    this.getMaster()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });

    this.jadwalvhs.map(function (x) {
      return (x.item_data = x.name + " - " + x.batch + " - " + x.start);
    });
  },
};
</script>

<style lang="scss" scoped>
.rounded-card{
    border-radius: 30px;
  }
</style>
