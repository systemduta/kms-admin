<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Jadwal VHS" class="rounded-card">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <!-- <vs-button :to="{ name: 'jadwal-create' }">Create Jadwal</vs-button> -->
            <vs-button @click="popupActivo=true">Create Jadwal VHS</vs-button>
            <vs-popup class="holamundo"  title="Input Jadwal VHS" :active.sync="popupActivo">
              <vx-card>
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
                    <vs-button @click="store" :disabled="isLoading">Simpan</vs-button>
                  </div>
                </div>
              </vx-card>
            </vs-popup>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama</vs-th>
            <vs-th>Batch</vs-th>
            <vs-th>Start</vs-th>
            <vs-th>End</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.batch">{{ tr.batch }}</vs-td>
              <vs-td :data="tr.start">{{ format_date(tr.start) }}</vs-td>
              <vs-td :data="tr.end">{{ format_date(tr.end) }}</vs-td>
              <vs-td>
                <div class="flex">
                  <!-- <vs-button
                    class="mr-2"
                    :to="{ name: `jadwal-edit`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button> -->
                  <vs-button class="mr-2" @click="popupActivo=true" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
                  <vs-button
                    color="danger"
                    @click="deletes(tr.id)"
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
import { mapActions, mapState } from "vuex";
import vSelect from "vue-select";
import moment from "moment";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      popupActivo:false,
      idDelete: null,
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
      data: (state) => state.jadwal.rows,
      uploadProgress: (state) => state.jadwal.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "jadwal/index",
      dispatchDestroy: "jadwal/destroy",
      dispatchStore: "jadwal/store",
      dispatchUpdate: "jadwal/update",
      dispatchShow: "jadwal/show",
    }),
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
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
  mounted() {
    this.$vs.loading();
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
      if (this.$route.params.id) {
      this.getDetail();
    };
    if (this.$route.params.id) {
      this.getDetail();
    }
  },
};
</script>

<style lang="scss" scoped>
.rounded-card{
    border-radius: 30px;
  }
</style>
