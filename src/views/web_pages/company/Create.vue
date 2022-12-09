<template>
  <div class="vx-row">
    <div v-if="this.$route.params.id" class="w-full vx-col mb-base">
      <vx-card title="Edit Perusahaan">
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-model="storeData.code"
              v-validate="'required'"
              name="code"
              label="Kode Perusahaan"
              placeholder="XXX"
            ></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('code')">{{
              errors.first("code")
            }}</span>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-model="storeData.name"
              v-validate="'required'"
              name="name"
              label="Nama Perusahaan"
              placeholder="000 - nama"
            ></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>
        </div>

        <vs-progress :percent="uploadProgress" color="primary" v-if="isLoading"
          >primary</vs-progress
        >
        <div v-if="isLoading">Saving data progress: {{ uploadProgress }} %</div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button color="dark" type="flat" :to="{ name: `company` }"
              >Back</vs-button
            >
            &nbsp; &nbsp;
            <vs-button @click="store" :disabled="isLoading">Update</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
    <div v-else class="w-full vx-col mb-base">
      <vx-card title="Tambah Perusahaan">
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-model="storeData.code"
              v-validate="'required'"
              name="code"
              label="Kode Perusahaan"
              placeholder="XXX"
            ></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('code')">{{
              errors.first("code")
            }}</span>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-model="storeData.name"
              v-validate="'required'"
              name="name"
              label="Nama Perusahaan"
              placeholder="000 - nama"
            ></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>
        </div>

        <vs-progress :percent="uploadProgress" color="primary" v-if="isLoading"
          >primary</vs-progress
        >
        <div v-if="isLoading">Saving data progress: {{ uploadProgress }} %</div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button color="dark" type="flat" :to="{ name: `company` }"
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
      isLoading: false,
      storeData: {
        id: this.$route.params.id,
        code: null,
        name: "",
      },
    };
  },
  components: {
    vSelect,
  },
  computed: {
    ...mapState({
      uploadProgress: (state) => state.company.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchStore: "company/store",
      dispatchUpdate: "company/update",
      dispatchShow: "company/show",

      // dispatchGetCompanies: "zoom/getvhs",
    }),

    // async getMaster() {
    //   const co = await this.dispatchGetCompanies();
    //   this.jadwalvhs = co.data;
    //   if (this.$route.params.id) {
    //     await this.getDetail();
    //   }
    // },
    // format_date(value) {
    //   if (value) {
    //     return moment(String(value)).format("MM/DD/YYYY H:i:s");
    //   }
    // },

    convertToFormData() {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      ["id", "code", "name"].forEach((key) => {
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
        }),
          (this.isLoading = true);
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
          this.$router.push({ name: "company" });
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
      const success = await this.dispatchShow(this.$route.params.id);
      // console.log(success.data.code);
      this.storeData.code = success.data.code;
      this.storeData.name = success.data.name;
    },
  },
  //URUNG blm selesai
  async mounted() {
    // this.$vs.loading({
    //   type: "radius",
    //   color: "blue",
    //   textAfter: true,
    //   text: "Please Wait ...",
    // });
    if (this.$route.params.id) {
      this.getDetail();
    }
    // this.$vs.loading.close();
    // await this.getMaster()
    //   .then(() => {
    //     this.$vs.loading.close();
    //   })
    //   .catch(() => {
    //     this.$vs.loading.close();
    //   });

    // this.jadwalvhs.map(function (x) {
    //   return (x.item_data = x.name + " - " + x.batch + " - " + x.start);
    // });
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
