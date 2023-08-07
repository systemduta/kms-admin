<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vs-button
        class="ml-4 my-2"
        icon-pack="feather"
        icon="icon-arrow-left"
        size="small"
        type="border"
        @click="goBack"
      >
        Back
      </vs-button>
      <vx-card title="Input Data Crossfunction">
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="name"
              label="Name"
              v-model="storeData.name"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2">Name SOP</small> <br />
            <!-- <v-select
              v-model="storeData.sop_id"
              :options="sops.filter((e) => e.company_id == company_id)"
              v-validate="'required'"
              name="sop"
              :reduce="(e) => e.id"
              label="title"
            ></v-select> -->
            <v-select
              v-model="storeData.sop_id"
              v-validate="'required'"
              name="sop"
              :options="sops"
              :reduce="(e) => e.id"
              label="title"
            ></v-select>
            <span class="text-sm text-danger" v-show="errors.has('sop')">{{
              errors.first("sop")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2">Upload file</small> <br />
            <input
              v-if="this.$route.params.id"
              class="w-full"
              type="file"
              id="file"
              ref="file"
              @change="getBase64File"
              name="pdf_file"
              v-validate="'ext:pdf,docx,doc|size:3072'"
            />
            <input
              v-else
              class="w-full"
              type="file"
              id="file"
              ref="file"
              @change="getBase64File"
              name="pdf_file"
              v-validate="'required|ext:pdf,docx,doc|size:3072'"
            />

            <br />
            <span class="text-sm text-danger" v-show="errors.has('pdf_file')">{{
              errors.first("pdf_file")
            }}</span>
          </div>
        </div>

        <vs-progress :percent="uploadProgress" color="primary" v-if="isLoading"
          >primary</vs-progress
        >
        <div v-if="isLoading">Saving data progress: {{ uploadProgress }} %</div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
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
  components: {
    vSelect,
  },
  data() {
    return {
      sops: [],
      organizations: [],
      golongans: [],
      company_id: JSON.parse(localStorage.getItem("userInfo")).data.company_id,
      isLoading: false,
      storeData: {
        id: this.$route.params.id,
        sop_id: null,
        name: "",
        description: "",
        file: "",
      },
    };
  },
  computed: {
    ...mapState({
      uploadProgress: (state) => state.lampiran.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchStore: "crossfunction/store",
      dispatchUpdate: "crossfunction/update",
      dispatchShow: "crossfunction/show",
      dispatchGetOrganizations: "master/organizations",
      dispatchGetGolongans: "master/golongans",
      dispatchGetSops: "master/sops",
    }),
    goBack() {
      this.$router.go(-1);
    },
    async getMaster() {
      const org = await this.dispatchGetOrganizations();
      this.organizations = org.data;
      const gol = await this.dispatchGetGolongans();
      this.golongans = gol.data;
      const sop = await this.dispatchGetSops();
      this.sops = sop.data;
    },
    convertToFormData() {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      ["id", "name", "file", "sop_id"].forEach((key) => {
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
          this.$router.push({ name: "crossfunction" });
        } catch (error) {
          this.$vs.loading.close();
          this.isLoading = false;
          this.$vs.notify({
            title: "Oops!",
            text: error.data.message,
            color: "danger",
          });
        }
      });
    },
    async getDetail() {
      const { success } = await this.dispatchShow(this.$route.params.id);
      this.storeData.organization_id = success.organization_id;
      this.storeData.sop_id = success.sop_id;
      this.storeData.name = success.name;
      this.storeData.description = success.description;
    },
    getBase64File(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        // this.file = reader.result
        this.storeData.file = reader.result;
      };
      this.$emit("input", event.target.files[0]);
    },
    getBase64Video(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.video = reader.result;
      };
      this.$emit("input", event.target.files[0]);
    },
    async readVideo(event) {
      const video = event.target.files[0];
      return this.$set(this.storeData, "video", video);
    },
  },
  async mounted() {
    await this.getMaster();
    if (this.$route.params.id) {
      this.getDetail();
    }
  },
};
</script>

<style lang="scss" scoped>
.preview {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  cursor: pointer;
  border-radius: 5px;
}
.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
  text-align: center;
  margin-bottom: 5px;
}
.text-small {
  font-size: 12px;
  padding-left: 5px;
}
</style>
