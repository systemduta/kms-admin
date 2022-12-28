<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Question materi VHS" class="rounded-card">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <!-- <vs-button :to="{ name: 'vhs-pages/questionvhs/create' }"  >Tambah Materi</vs-button> -->
            <vs-button @click="popupActivo=true">Tambah Pertanyaan</vs-button>
            <vs-popup class="holamundo"  title="Input Question" :active.sync="popupActivo">
              <vx-card>
                <div class="mb-5 vx-row">
                  <div class="w-full vx-col">
                    <small>Nama VHS</small>
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
                    <vs-button @click="store" :disabled="isLoading">Simpan</vs-button>
                  </div>
                </div>
              </vx-card>
            </vs-popup>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama Materi</vs-th>
            <vs-th>Question</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.question">{{ tr.question }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    :to="{
                      name: `vhs-pages/questionvhs/answer`,
                      params: { id: tr.id_question },
                    }"
                    size="small"
                  ></vs-button>
                  <!-- <vs-button
                    class="mr-2"
                    :to="{
                      name: `vhs-pages/questionvhs/edit`,
                      params: { id: tr.id_question },
                    }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button> -->
                  <vs-button class="mr-2" @click="popupActivo=true" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
                  <vs-button
                    color="danger"
                    @click="ujiClick(tr.id_question)"
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
      popupActivo: false,
      cekData: [],
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
      data: (state) => state.questionvhs.rows,
      uploadProgress: (state) => state.questionvhs.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "questionvhs/index",
      dispatchDestroy: "questionvhs/destroy",

      dispatchShowAnswer: "questionvhs/getanswer",
      dispatchStore: "questionvhs/store",
      dispatchUpdate: "questionvhs/update",
      dispatchShow: "questionvhs/show",

      dispatchGetCompanies: "questionvhs/getmateri",
    }),

    async ujiClick(id) {
      const co = await this.dispatchShowAnswer(id);
      this.cekData = co.success;
      if (this.cekData.length > 0) {
        this.$vs.notify({
          title: "Oops!",
          text: `Maaf, Ada data jawaban`,
          color: "danger",
        });
      } else {
        this.deletes(id);
      }
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
  mounted() {
    this.$vs.loading();
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
      this.materivhs.map(function (x) {
      return (x.item_data = x.name + " - " + x.type);
    });
    this.getMaster()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });

    this.materivhs.map(function (x) {
      return (x.item_data = x.name + " - " + x.type);
    });
  },
};
</script>

<style lang="scss" scoped>
.rounded-card{
    border-radius: 30px;
  }
</style>