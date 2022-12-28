<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Jadwal Zoom meeting VHS" class="rounded-card">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <!-- <vs-button :to="{ name: 'zoom-vhs-create' }">Create zooms</vs-button> -->
            <vs-button @click="popupActivo=true">Tambah Zooms</vs-button>
            <vs-popup class="holamundo"  title="Input Data VHS" :active.sync="popupActivo">
              <vx-card>
                <div class="mb-5 vx-row">
                  <div class="w-full vx-col">
                    <small>Nama VHS</small>
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
                    <vs-button @click="store" :disabled="isLoading">Simpan</vs-button>
                  </div>
                </div>
              </vx-card>
            </vs-popup>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama VHS</vs-th>
            <vs-th>Nama Batch</vs-th>
            <vs-th>Judul Zoom</vs-th>
            <vs-th>Time</vs-th>
            <vs-th>Link</vs-th>
            <vs-th>Meeting id</vs-th>
            <vs-th>Password</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.jadwalvhs_name">{{ tr.jadwalvhs_name }}</vs-td>
              <vs-td :data="tr.batch">{{ tr.batch }}</vs-td>
              <vs-td :data="tr.zoom_name">{{ tr.zoom_name }}</vs-td>
              <vs-td :data="tr.times">{{ tr.times }}</vs-td>
              <vs-td :data="tr.link">{{ tr.link }}</vs-td>
              <vs-td :data="tr.meeting_id">{{ tr.meeting_id }}</vs-td>
              <vs-td :data="tr.password">{{ tr.password }}</vs-td>
              <vs-td>
                <div class="flex">
                  <!-- <vs-button
                    class="mr-2"
                    :to="{ name: `zoom-vhs-edit`, params: { id: tr.zoom_id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button> -->
                  <vs-button class="mr-2" @click="popupActivo=true" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
                  <vs-button
                    color="danger"
                    @click="deletes(tr.zoom_id)"
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
      popupActivo:false,
      idDelete: null,
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
      data: (state) => state.zoom.rows,
      uploadProgress: (state) => state.zoom.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "zoom/index",
      dispatchDestroy: "zoom/destroy",
      dispatchStore: "zoom/store",
      dispatchUpdate: "zoom/update",
      dispatchShow: "zoom/show",

      dispatchGetCompanies: "zoom/getvhs",
    }),
    // format_date(value) {
    //   if (value) {
    //     return moment(String(value)).format("DD/MM/YYYY");
    //   }
    // },
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

        this.$vs.loading();
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
  mounted() {
    this.$vs.loading();
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
      this.jadwalvhs.map(function (x) {
      return (x.item_data = x.name + " - " + x.batch + " - " + x.start);
    });
    if (this.$route.params.id) {
      this.getDetail();
    };
    this.getMaster()
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
.rounded-card{
    border-radius: 30px;
  }
</style>
