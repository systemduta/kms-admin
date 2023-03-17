<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Question 1VHS">
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small>Materi 1VHS</small>
            <v-select
              v-model="storeData.materi_id"
              :options="materivhs"
              v-validate="'required'"
              name="materi_id"
              :reduce="(e) => e.id"
              label="item_data"
            ></v-select>
            <span
              class="text-sm text-danger"
              v-show="errors.has('materivhs')"
              >{{ errors.first("materivhs") }}</span
            >
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-textarea
              v-model="storeData.question"
              v-validate="'required'"
              name="question"
              label="Question"
            />
            <span class="text-danger text-sm" v-show="errors.has('question')">{{
              errors.first("question")
            }}</span>
          </div>
        </div>

        <vs-progress :percent="uploadProgress" color="primary" v-if="isLoading"
          >primary</vs-progress
        >
        <div v-if="isLoading">Saving data progress: {{ uploadProgress }} %</div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button color="dark" type="flat" @click="goBack">Back</vs-button>
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
        materi_id: null,
        question: "",
      },

      materivhs: [],
    };
  },
  components: {
    vSelect,
  },
  computed: {
    ...mapState({
      uploadProgress: (state) => state.questionvhs.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "questionvhs/index",
      dispatchStore: "questionvhs/store",
      dispatchUpdate: "questionvhs/update",
      dispatchShow: "questionvhs/show",

      dispatchGetCompanies: "questionvhs/getmateri",
    }),
    goBack() {
      this.$router.go(-1);
    },
    async getMaster() {
      const co = await this.dispatchGetCompanies();
      this.materivhs = co.data;
      if (this.$route.params.id) {
        await this.getDetail();
      }
    },

    convertToFormData() {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      ["id", "materi_id", "question"].forEach((key) => {
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
          this.$router.push({ name: "vhs-pages/questionvhs" });
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
      this.storeData.materi_id = success.data.materi_id;
      this.storeData.question = success.data.question;
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

    this.materivhs.map(function (x) {
      return (x.item_data = x.name + " - " + x.type);
    });

    // window.location.reload();
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
