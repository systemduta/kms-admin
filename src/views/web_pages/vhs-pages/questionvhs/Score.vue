<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Set Nilai User VHS">
        <!-- {{ this.$route.params.id }} -->
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="nama_materi"
              label="Nama Materi"
              v-model="storeData.nama_materi"
              :disabled="true"
            ></vs-input>
            <span
              class="text-danger text-sm"
              v-show="errors.has('nama_materi')"
              >{{ errors.first("nama_materi") }}</span
            >
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="nama_user"
              label="Nama User"
              v-model="storeData.nama_user"
              :disabled="true"
            ></vs-input>
            <span
              class="text-danger text-sm"
              v-show="errors.has('nama_user')"
              >{{ errors.first("nama_user") }}</span
            >
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-textarea
              class="w-full"
              v-validate="'required'"
              name="answer"
              label="Answer User"
              v-model="storeData.answer"
              :disabled="true"
            />
            <span class="text-danger text-sm" v-show="errors.has('answer')">{{
              errors.first("answer")
            }}</span>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="score"
              label="Score User"
              v-model="storeData.score"
              type="number"
            ></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('score')">{{
              errors.first("score")
            }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button
              color="dark"
              type="flat"
              :to="{
                name: `vhs-pages/questionvhs/answer`,
                params: { id: id_question },
              }"
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
      id_question: null,
      storeData: {
        id: this.$route.params.id,
        materi_id: "",
        nama_materi: "",
        user_id: "",
        nama_user: "",
        answer: "",
        score: "",
      },
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
      dispatchStore: "questionvhs/setuserscore",
      dispatchUpdate: "questionvhs/setuserscore",
      dispatchShow: "questionvhs/show",

      dispatchGetCompanies: "questionvhs/getmateri",
      dispatchGetSingleAnswer: "questionvhs/getsingleanswer",
    }),

    convertToFormData() {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      ["id", "materi_id", "user_id", "score"].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key]);
      });

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
          this.$router.push({ name: "vhs-pages/questionvhs" });
        } catch (error) {
          this.$vs.loading.close();
          this.isLoading = false;
          this.$vs.notify({
            title: "Oops!",
            text: error.data.error,
            color: "danger",
          });
        }
      });
    },
    async getDetail() {
      const success = await this.dispatchGetSingleAnswer(this.$route.params.id);
      // console.log(success.success);
      this.storeData.materi_id = success.success.id_materi;
      this.storeData.user_id = success.success.id_user;
      this.storeData.nama_materi = success.success.nama_materi;
      this.storeData.nama_user = success.success.name;
      this.storeData.answer = success.success.answer;
      this.id_question = success.success.id_question;
      // console.log(this.storeData.materi_id);
    },
  },
  async mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    await this.getDetail()
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
