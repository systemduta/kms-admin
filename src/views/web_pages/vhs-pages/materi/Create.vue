<template>
  <div class="vx-row" v-if="this.$route.params.id">
    <div class="w-full vx-col mb-base">
      <vx-card title="Materi 1VHS">
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
            <span>Deskripsi : </span>

            <quill-editor
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
            <small>Jadwal 1VHS</small>
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
              v-validate="'size:3072'"
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
              v-validate="'ext:pdf|size:3072'"
            />
            <small class="ml-2" v-if="storeData.file"
              >file sebelumnya: {{ storeData.file }}</small
            >
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
            <small class="ml-2" v-if="storeData.video"
              >video sebelumnya: {{ storeData.video }}</small
            >
            <span class="text-sm text-danger" v-show="errors.has('video')">{{
              errors.first("video")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <div class="relative">
              <span>Soal Pretest ? </span>
              <select
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                v-model="storeData.isPreTest"
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
              <span
                class="text-sm text-danger"
                v-show="errors.has('isPreTest')"
                >{{ errors.first("isPreTest") }}</span
              >
            </div>
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

  <div class="vx-row" v-else>
    <div class="w-full vx-col mb-base">
      <vx-card title="Materi 1VHS">
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
            <span>Deskripsi : </span>
            <quill-editor
              style="height: 250px"
              v-model="storeData.desc"
              v-validate="'required'"
              name="desc"
              label="Desc Materi"
            />
            <span class="text-danger text-sm" v-show="errors.has('desc')">
              {{ errors.first("desc") }}
            </span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Type</span>
            <v-select
              v-model="storeData.type"
              :options="[
                '1VHS Basic',
                '1VHS Class',
                '1VHS Camp',
                '1VHS Academy',
              ]"
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
            <small>Jadwal 1VHS</small>
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
              v-validate="'ext:pdf|size:3072'"
            />
            <small class="ml-2" v-if="storeData.file"
              >file sebelumnya: {{ storeData.file }}</small
            >
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
            <small class="ml-2" v-if="storeData.video"
              >video sebelumnya: {{ storeData.video }}</small
            >
            <span class="text-sm text-danger" v-show="errors.has('video')">{{
              errors.first("video")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <div class="relative">
              <span>Soal Pretest ? </span>
              <select
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                v-model="storeData.isPreTest"
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
              <span
                class="text-sm text-danger"
                v-show="errors.has('isPreTest')"
                >{{ errors.first("isPreTest") }}</span
              >
            </div>
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
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      isVisible: true,
      urlImage: process.env.VUE_APP_API_URL + "/file/materivhs/image/",
      isLoading: false,
      previewImage: null,
      allowedImageType: ["image/jpeg", "image/png"],
      options: [
        { value: 0, text: "Tidak" },
        { value: 1, text: "Ya" },
      ],
      storeData: {
        id: this.$route.params.id,
        jadwal_id: null,
        name: "",
        type: "",
        desc: "",
        image: null,
        file: null,
        video: null,
        isPreTest: "",
      },

      jadwalvhs: [],
    };
  },
  components: {
    vSelect,
    quillEditor,
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
      this.jadwalvhs.map(function (x) {
        return (x.item_data = x.name + " - " + x.batch + " - " + x.start);
      });

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
        "isPreTest",
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

        // console.log(...formData);
        this.$vs.loading({
          type: "radius",
          color: "blue",
          textAfter: true,
          text: "Please Wait ...",
        });
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
          this.$vs.notify({
            title: "Oops!",
            text: error.error,
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
      this.storeData.isPreTest = success.isPreTest;
    },
  },
  async mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });

    await this.getMaster()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
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
