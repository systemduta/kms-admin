<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Sertifikat 1VHS">
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <small>Pilih User</small>
            <v-select
              v-model="storeData.user_id"
              :options="userArr"
              v-validate="'required'"
              name="user_id"
              :reduce="(e) => e.id"
              label="user_data"
            ></v-select>
            <span class="text-danger text-sm" v-show="errors.has('user_id')">{{
              errors.first("user_id")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2"
              >1. Upload sertifikasi
              <span style="color: red"> (pdf, max: 3 MB) </span></small
            >
            <br />
            <input
              class="w-full"
              type="file"
              id="file"
              ref="file"
              @change="readFile1"
              name="doc1"
              v-validate="'ext:pdf|size:3072'"
            />
            <span v-if="$route.params.id"
              >file di server: {{ singleData.Data["doc1"] }}</span
            >
            <span class="text-sm text-danger" v-show="errors.has('doc1')">{{
              errors.first("doc1")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2"
              >2. Upload sertifikasi
              <span style="color: red"> (pdf, max: 3 MB) </span></small
            >
            <br />
            <input
              class="w-full"
              type="file"
              id="file"
              ref="file"
              @change="readFile2"
              name="doc2"
              v-validate="'ext:pdf|size:3072'"
            />

            <span v-if="$route.params.id"
              >file di server: {{ singleData.Data["doc2"] }}</span
            >
            <span class="text-sm text-danger" v-show="errors.has('doc2')">{{
              errors.first("doc2")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2"
              >3. Upload sertifikasi
              <span style="color: red"> (pdf, max: 3 MB) </span></small
            >
            <br />
            <input
              class="w-full"
              type="file"
              id="file"
              ref="file"
              @change="readFile3"
              name="doc3"
              v-validate="'ext:pdf|size:3072'"
            />

            <span v-if="$route.params.id"
              >file di server: {{ singleData.Data["doc3"] }}</span
            >
            <span class="text-sm text-danger" v-show="errors.has('doc3')">{{
              errors.first("doc3")
            }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button
              color="dark"
              type="flat"
              :to="{ name: `vhs-pages/sertifikat` }"
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
      userArr: [],
      user_id: null,
      singleData: null,
      isLoading: false,
      storeData: {
        id: this.$route.params.id,
        user_id: null,
        doc1: null,
        doc2: null,
        doc3: null,
      },
    };
  },
  components: {
    vSelect,
  },
  computed: {
    ...mapState({
      uploadProgress: (state) => state.sertif.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "sertif/index",
      dispatchStore: "sertif/store",
      dispatchUpdate: "sertif/update",
      dispatchShow: "sertif/show",
      dispatchGetUser: "jadwalUser/getuser",
    }),

    async getUser() {
      if (this.$route.params.id) {
        this.storeData.user_id = this.user_id;
        const co = await this.dispatchGetUser();
        this.userArr = co.data;
        this.userArr.map(function (x) {
          return (x.user_data = x.name + " - " + x.company.name);
        });
      } else {
        const co = await this.dispatchGetUser();
        this.userArr = co.data;
        this.userArr.map(function (x) {
          return (x.user_data = x.name + " - " + x.company.name);
        });
      }
    },
    async readFile1(event) {
      const file1 = event.target.files[0];
      this.storeData.doc1 = file1;
    },
    async readFile2(event) {
      const file2 = event.target.files[0];
      this.storeData.doc2 = file2;
    },
    async readFile3(event) {
      const file3 = event.target.files[0];
      this.storeData.doc3 = file3;
    },

    convertToFormData() {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      ["id", "user_id", "doc1", "doc2", "doc3"].forEach((key) => {
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
          this.$router.push({ name: "vhs-pages/sertifikat" });
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
  },
  async mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    if (this.$route.params.id) {
      const userId = await this.dispatchShow(this.$route.params.id);
      this.user_id = userId.Data["user_id"];
      this.singleData = userId;
      // console.log(userId.Data);
    }
    await this.getUser()
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
