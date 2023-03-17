<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Create Zoom 1VHS">
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small>Nama 1VHS</small>
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
              v-show="errors.has('jadwalvhs')"
              >{{ errors.first("jadwalvhs") }}</span
            >
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-model="storeData.name"
              v-validate="'required'"
              name="name"
              label="Name Zoom"
            ></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              type="datetime-local"
              class="w-full"
              v-validate="'required'"
              name="times"
              label="Waktu zoom"
              v-model="storeData.times"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('times')">{{
              errors.first("times")
            }}</span>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="link"
              label="Link Zoom"
              v-model="storeData.link"
            ></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('link')">{{
              errors.first("link")
            }}</span>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              type="number"
              class="w-full"
              v-validate="'required'"
              name="meeting_id"
              label="Meeting-id Zoom"
              v-model="storeData.meeting_id"
            ></vs-input>
            <span
              class="text-danger text-sm"
              v-show="errors.has('meeting_id')"
              >{{ errors.first("meeting_id") }}</span
            >
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="password"
              label="Password Zoom"
              v-model="storeData.password"
            ></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('password')">{{
              errors.first("password")
            }}</span>
          </div>
        </div>

        <vs-progress :percent="uploadProgress" color="primary" v-if="isLoading"
          >primary</vs-progress
        >
        <div v-if="isLoading">Saving data progress: {{ uploadProgress }} %</div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button color="dark" type="flat" :to="{ name: `zoom-vhs` }"
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
        jadwal_id: null,
        name: "",
        times: "",
        link: "",
        meeting_id: "",
        password: "",
      },

      jadwalvhs: [],
    };
  },
  components: {
    vSelect,
  },
  computed: {
    ...mapState({
      uploadProgress: (state) => state.zoom.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "zoom/index",
      dispatchStore: "zoom/store",
      dispatchUpdate: "zoom/update",
      dispatchShow: "zoom/show",

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

    convertToFormData() {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      [
        "id",
        "jadwal_id",
        "link",
        "meeting_id",
        "name",
        "password",
        "times",
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
            // console.log(formData);
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
          this.$router.push({ name: "zoom-vhs" });
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
      this.storeData.jadwal_id = success.jadwalvhs_id;
      this.storeData.name = success.zoom_name;
      this.storeData.times = success.times;
      this.storeData.link = success.link;
      this.storeData.meeting_id = success.meeting_id;
      //   this.storeData.password = suceess.password;
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
      this.getDetail();
    }
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
