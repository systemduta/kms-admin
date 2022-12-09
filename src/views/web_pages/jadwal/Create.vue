<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Create Jadwal VHS">
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Nama</span>
            <v-select
              v-model="storeData.name"
              :options="['1VHS Basic', '1VHS Class', '1VHS Academy']"
              :value="storeData.name"
              name="name"
              label="Nama"
            />
            <span class="text-sm text-danger" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Batch</span>
            <v-select
              v-model="storeData.batch"
              :options="['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4', 'Batch 5']"
              :value="storeData.batch"
              name="batch"
              label="Batch"
            />
            <span class="text-sm text-danger" v-show="errors.has('batch')">{{
              errors.first("batch")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              type="date"
              class="w-full"
              v-validate="'required'"
              name="start"
              label="Start"
              v-model="storeData.start"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('start')">{{
              errors.first("start")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              type="date"
              class="w-full"
              v-validate="'required'"
              name="end"
              label="End"
              v-model="storeData.end"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('end')">{{
              errors.first("end")
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
import moment from "moment";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      isLoading: false,
      storeData: {
        id: this.$route.params.id,
        name: "",
        batch: "",
        start: "",
        end: "",
      },
    };
  },
  components: {
    vSelect,
  },
  computed: {
    ...mapState({
      uploadProgress: (state) => state.jadwal.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "jadwal/index",
      dispatchStore: "jadwal/store",
      dispatchUpdate: "jadwal/update",
      dispatchShow: "jadwal/show",
    }),
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY");
      }
    },
    convertToFormData() {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      ["id", "name", "batch", "start", "end"].forEach((key) => {
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
        //   console.log(`${pair[0] }, ${  pair[1]}`)
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
          this.$router.push({ name: "jadwal" });
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
      this.storeData.name = success.name;
      this.storeData.batch = success.batch;
    },
  },
  async mounted() {
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
