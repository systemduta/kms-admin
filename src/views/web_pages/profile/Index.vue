<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Edit Profile">
        <div class="mt-10 mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="nik"
              label="NIK"
              v-model="storeData.nik"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('nik')">{{
              errors.first("nik")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="password"
              label="Password"
              v-model="storeData.password"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('password')">{{
              errors.first("password")
            }}</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button @click="store">Update</vs-button>
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
  name: "Create",
  components: {
    vSelect,
    quillEditor,
  },
  data() {
    return {
      storeData: {
        nik: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState({
      uploadProgress: (state) => state.profile.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "profile/index",
      dispatchUpdate: "profile/store",
    }),
    async getMaster() {
      const org = await this.dispatchIndex();
      this.storeData.nik = org.data.nik;
    },
    convertToFormData() {
      const data = new FormData();
      ["id", "nik", "password"].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key]);
      });
      data.append("_method", "PUT");
      return data;
    },
    store() {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false;
        const formData = this.convertToFormData();
        if (!formData) return false;
        this.$vs.loading();
        this.isLoading = true;
        try {
          await this.dispatchUpdate(formData);

          this.$vs.loading.close();
          this.isLoading = false;
          this.$vs.notify({
            title: "Success!",
            text: "Data was Updated successfully!",
            color: "success",
          });
          this.$router.push("/pages/login");
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
  },
  async mounted() {
    await this.getMaster();
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
