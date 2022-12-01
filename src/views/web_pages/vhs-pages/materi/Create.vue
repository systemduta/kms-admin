//TODO not fixed yet

<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Materi VHS">
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
            <vs-button
              color="dark"
              type="flat"
              :to="{ name: `vhs-pages/materi` }"
              >Back</vs-button
            >
            &nbsp; &nbsp;
            <vs-button @click="store" :disabled="isLoading">Save</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import vSelect from "vue-select";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      isVisible: true,
      // urlImage: "http://localhost:8000/file/materivhs/image/", //TODO jangan lupa diganti
      urlImage: process.env.VUE_APP_API_URL + "/file/materivhs/image/", //TODO jangan lupa diganti
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
      uploadProgress: (state) => state.materi.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "materi/index",
      dispatchStore: "materi/store",
      dispatchUpdate: "materi/update",
      dispatchShow: "materi/show",

      dispatchGetCompanies: "zoom/getvhs",
    }),

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

        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0]}, ${pair[1]}`);
        // }

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
  async mounted() {
    this.$vs.loading();
    // console.log(this.$route.params.id);

    await this.getMaster()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });

    this.jadwalvhs.map(function (x) {
      return (x.item_data = x.name + " - " + x.batch + " - " + x.start);
    });
    // if (this.$route.params.id) {
    //   this.getDetail();
    // }
  },
};
</script>

<style lang="scss" scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 50%;
  max-height: 250px;
}
</style>
