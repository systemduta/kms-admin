<template>
  <div v-if="this.$route.params.id" class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Edit Jadwal 1VHS">
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Name : </span>
            <vs-input
              type="string"
              class="w-full"
              v-validate="'required'"
              name="name"
              v-model="storeData.name"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Batch : </span>
            <vs-input
              type="string"
              class="w-full"
              v-validate="'required'"
              name="batch"
              v-model="storeData.batch"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('batch')">{{
              errors.first("batch")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Type : </span>
            <v-select
              v-model="storeData.type"
              :options="[
                '1VHS Basic',
                '1VHS Class',
                '1VHS Camp',
                '1VHS Academy',
              ]"
              :value="storeData.type"
              name="type"
              label="Type"
            />
            <span class="text-sm text-danger" v-show="errors.has('type')">{{
              errors.first("type")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Start : </span>
            <vs-input
              type="date"
              class="w-full"
              v-validate="'required'"
              name="start"
              v-model="storeData.start"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('start')">{{
              errors.first("start")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>End : </span>
            <vs-input
              type="date"
              class="w-full"
              v-validate="'required'"
              name="end"
              v-model="storeData.end"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('end')">{{
              errors.first("end")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Pilih Jenis Kuota : </span>
            <select
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              v-model="isQuota"
              @change="handleUpdateQuota"
            >
              <option v-for="quota in quota" :value="quota.value">
                {{ quota.text }}
              </option>
            </select>

            <span class="text-sm text-danger" v-show="errors.has('type')">{{
              errors.first("type")
            }}</span>
          </div>
        </div>

        <div v-if="isQuota === 1">
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <span>Quota : </span>
              <vs-input
                type="number"
                class="w-full"
                v-validate="'required'"
                name="quota"
                v-model="storeData.quota"
              ></vs-input>
              <span class="text-sm text-danger" v-show="errors.has('quota')">{{
                errors.first("quota")
              }}</span>
            </div>
          </div>
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <span>Pilih Area : </span>
              <select
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                v-model="storeData.isCity"
                @change="handleChange"
              >
                <option v-for="option in options" :value="option.value">
                  {{ option.text }}
                </option>
              </select>

              <span class="text-sm text-danger" v-show="errors.has('type')">{{
                errors.first("type")
              }}</span>
            </div>
          </div>
        </div>

        <vs-progress :percent="uploadProgress" color="primary" v-if="isLoading"
          >primary</vs-progress
        >
        <div v-if="isLoading">Saving data progress: {{ uploadProgress }} %</div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button color="dark" type="flat" :to="{ name: 'jadwal' }"
              >Back</vs-button
            >
            &nbsp; &nbsp;
            <vs-button @click="update" :disabled="isLoading">Update</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
  <div v-else class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Create Jadwal 1VHS">
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Name : </span>
            <vs-input
              type="string"
              class="w-full"
              v-validate="'required'"
              name="name"
              v-model="storeData.name"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Batch : </span>
            <vs-input
              type="string"
              class="w-full"
              v-validate="'required'"
              name="batch"
              v-model="storeData.batch"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('batch')">{{
              errors.first("batch")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Type : </span>
            <v-select
              v-model="storeData.type"
              :options="[
                '1VHS Basic',
                '1VHS Class',
                '1VHS Camp',
                '1VHS Academy',
              ]"
              :value="storeData.type"
              name="type"
              label="Type"
            />
            <span class="text-sm text-danger" v-show="errors.has('type')">{{
              errors.first("type")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Start : </span>
            <vs-input
              type="date"
              class="w-full"
              v-validate="'required'"
              name="start"
              v-model="storeData.start"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('start')">{{
              errors.first("start")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>End : </span>
            <vs-input
              type="date"
              class="w-full"
              v-validate="'required'"
              name="end"
              v-model="storeData.end"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('end')">{{
              errors.first("end")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <span>Pilih Jenis Kuota : </span>
            <select
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              v-model="isQuota"
            >
              <option v-for="quota in quota" :value="quota.value">
                {{ quota.text }}
              </option>
            </select>

            <span class="text-sm text-danger" v-show="errors.has('type')">{{
              errors.first("type")
            }}</span>
          </div>
        </div>

        <div v-if="isQuota === 1">
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <span>Quota : </span>
              <vs-input
                type="number"
                class="w-full"
                v-validate="'required'"
                name="quota"
                v-model="storeData.quota"
              ></vs-input>
              <span class="text-sm text-danger" v-show="errors.has('quota')">{{
                errors.first("quota")
              }}</span>
            </div>
          </div>
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <span>Pilih Area : </span>
              <select
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                v-model="storeData.isCity"
                @change="handleChange"
              >
                <option v-for="option in options" :value="option.value">
                  {{ option.text }}
                </option>
              </select>

              <span class="text-sm text-danger" v-show="errors.has('type')">{{
                errors.first("type")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="ml-5 w-full vx-col">
              <div v-if="storeData.isCity === 1 || storeData.isCity === 2">
                <div v-for="(item, index) in storeData.quotaAP" :key="index">
                  <label>Pilih Perusahaan : </label>
                  <select
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    v-model="item.id"
                  >
                    <option v-for="option in company" :value="option.id">
                      {{ option.name }}
                    </option>
                  </select>
                  <br />
                  <label>Masukkan Quota:</label>
                  <vs-input
                    type="number"
                    class="w-full"
                    v-validate="'required'"
                    name="quota"
                    v-model="item.quota"
                  ></vs-input>
                  <span
                    class="text-sm text-danger"
                    v-show="errors.has('quota')"
                    >{{ errors.first("quota") }}</span
                  >
                  <br />
                </div>
                <vs-button @click="addItem">Add Quota</vs-button> &nbsp; &nbsp;
                <vs-button
                  v-if="storeData.quotaAP.length > 1"
                  @click="deleteItem"
                  >Delete Quota</vs-button
                >
              </div>
            </div>
          </div>
        </div>

        <vs-progress :percent="uploadProgress" color="primary" v-if="isLoading"
          >primary</vs-progress
        >
        <div v-if="isLoading">Saving data progress: {{ uploadProgress }} %</div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button color="dark" type="flat" :to="{ name: 'jadwal' }"
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
import moment from "moment";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      options: [
        { value: 1, text: "Dalam Kota" },
        { value: 2, text: "Luar Kota" },
        { value: 3, text: "Semua Kota" },
      ],
      quota: [
        { value: 1, text: "Dengan Kuota" },
        { value: 2, text: "Tanpa Kuota" },
      ],
      isQuota: null,
      company: [{ id: "", name: "" }],
      getResponse: [],
      isLoading: false,
      storeData: {
        id: this.$route.params.id,
        name: "",
        batch: "",
        type: "",
        start: "",
        end: "",
        isCity: "",
        quota: null,
        quotaAP: [],
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

      dispatchCompany: "company/index",
    }),
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY");
      }
    },
    convertToFormData() {
      const data = new FormData();
      data.append("id", this.storeData.id);
      data.append("name", this.storeData.name);
      data.append("batch", this.storeData.batch);
      data.append("type", this.storeData.type);
      data.append("start", this.storeData.start);
      data.append("end", this.storeData.end);
      data.append("isCity", this.storeData.isCity);
      data.append("quota", this.storeData.quota);
      data.append("quotaAP", JSON.stringify(this.storeData.quotaAP));

      if (this.$route.params.id) data.append("_method", "PUT");
      return data;
    },

    handleUpdateQuota() {
      if (this.isQuota == 2) {
        this.storeData.isCity = 4;
        this.storeData.quota = 0;
      }
    },
    store() {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false;
        const formData = this.convertToFormData();
        if (!formData) return false;

        let sum = this.storeData.quotaAP.reduce(
          (n, { quota }) => n + parseInt(quota),
          0
        );
        if (sum > this.storeData.quota) {
          alert("Quota AP lebih besar dari quota utama");
        } else if (sum < this.storeData.quota) {
          alert("Quota AP lebih kecil dari quota utama");
        } else {
          this.$vs.loading({
            type: "radius",
            color: "blue",
            textAfter: true,
            text: "Please Wait ...",
          });
          this.isLoading = true;
          try {
            if (this.$route.params.id) {
              const response = await this.dispatchUpdate(formData);
              if (this.storeData.isCity == "3") {
                console.log("3");
                this.$vs.loading.close();
                this.isLoading = false;
                this.$vs.notify({
                  title: "Success!",
                  text: "Data was saved successfully!",
                  color: "success",
                });
                this.$router.push({ name: "jadwal" });
              }
              if (this.storeData.isCity == "4") {
                this.$vs.loading.close();
                this.isLoading = false;
                this.$vs.notify({
                  title: "Success!",
                  text: "Data was saved successfully!",
                  color: "success",
                });
                this.$router.push({ name: "jadwal" });
              }
              if (this.storeData.isCity == "2") {
                console.log("2");
                this.$vs.loading.close();
                this.isLoading = false;
                this.$vs.notify({
                  title: "Success!",
                  text: "Data was saved successfully!",
                  color: "success",
                });
                this.$router.push({
                  name: "quotaap",
                  params: { id: response.success["id"] },
                });
              }
              if (this.storeData.isCity == "1") {
                console.log("1");
                this.$vs.loading.close();
                this.isLoading = false;
                this.$vs.notify({
                  title: "Success!",
                  text: "Data was saved successfully!",
                  color: "success",
                });
                this.$router.push({
                  name: "quotaap",
                  params: { id: response.success["id"] },
                });
              }
            } else {
              await this.dispatchStore(formData);
              this.$vs.loading.close();
              this.isLoading = false;
              this.$vs.notify({
                title: "Success!",
                text: "Data was saved successfully!",
                color: "success",
              });
              this.$router.push({ name: "jadwal" });
            }
          } catch (error) {
            this.$vs.loading.close();
            this.isLoading = false;
            // console.log(error.data);
            this.$vs.notify({
              title: "Oops!",
              text: error.data,
              color: "danger",
              time: 10000,
              icon: "error",
            });
          }
        }
      });
    },

    async update() {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false;
        const data = new FormData();
        data.append("id", this.storeData.id);
        data.append("name", this.storeData.name);
        data.append("batch", this.storeData.batch);
        data.append("type", this.storeData.type);
        data.append("start", this.storeData.start);
        data.append("end", this.storeData.end);
        data.append("isCity", this.storeData.isCity);
        data.append("quota", this.storeData.quota);
        data.append("_method", "PUT");

        this.$vs.loading({
          type: "radius",
          color: "blue",
          textAfter: true,
          text: "Please Wait ...",
        });
        this.isLoading = true;
        try {
          const response = await this.dispatchUpdate(data);
          if (this.storeData.isCity == "3") {
            // console.log("3");
            this.$vs.loading.close();
            this.isLoading = false;
            this.$vs.notify({
              title: "Success!",
              text: "Data was saved successfully!",
              color: "success",
            });
            this.$router.push({ name: "jadwal" });
          }
          if (this.storeData.isCity == "4") {
            // console.log("4");
            this.$vs.loading.close();
            this.isLoading = false;
            this.$vs.notify({
              title: "Success!",
              text: "Data was saved successfully!",
              color: "success",
            });
            this.$router.push({ name: "jadwal" });
          }
          if (this.storeData.isCity == "2") {
            // console.log("2");
            this.$vs.loading.close();
            this.isLoading = false;
            this.$vs.notify({
              title: "Success!",
              text: "Data was saved successfully!",
              color: "success",
            });
            this.$router.push({
              name: "quotaap",
              params: { id: response.success["id"] },
            });
          }
          if (this.storeData.isCity == "1") {
            console.log("1");
            this.$vs.loading.close();
            this.isLoading = false;
            this.$vs.notify({
              title: "Success!",
              text: "Data was saved successfully!",
              color: "success",
            });
            this.$router.push({
              name: "quotaap",
              params: { id: response.success["id"] },
            });
          }
        } catch (error) {
          this.$vs.loading.close();
          this.isLoading = false;
          this.$vs.notify({
            title: "Oops!",
            text: error,
            color: "danger",
            time: 10000,
            icon: "error",
          });
        }
      });
    },
    async getDetail() {
      const { success } = await this.dispatchShow(this.$route.params.id);
      this.storeData.name = success.name;
      this.storeData.batch = success.batch;
      this.storeData.type = success.type;
      this.storeData.start = success.start;
      this.storeData.end = success.end;
      if (success.quota == "null" || success.quota == "0") {
        this.isQuota = 0;
      } else {
        this.isQuota = 1;
        this.storeData.quota = success.quota;
        this.storeData.isCity = success.isCity;
      }
    },
    handleChange() {
      if (this.storeData.isCity === 1 || this.storeData.isCity === 2) {
        this.storeData.quotaAP.pop({ id: null, quota: "" });
        this.storeData.quotaAP.push({ id: null, quota: "" });
      } else {
        this.storeData.quotaAP.pop({ id: null, quota: "" });
      }
    },

    addItem() {
      let sum = this.storeData.quotaAP.reduce(
        (n, { quota }) => n + parseInt(quota),
        0
      );
      if (sum > this.storeData.quota) {
        alert("Quota AP lebih besar dari quota utama");
      } else {
        this.storeData.quotaAP.push({ id: null, quota: "" });
      }
    },
    deleteItem() {
      this.storeData.quotaAP.pop({ id: null, quota: "" });
    },

    async getCompanyData() {
      const getCom = await this.dispatchCompany();
      // console.log(getCom);
      this.getResponse = getCom.data;
      this.company = this.getResponse.map((item) => {
        return { id: item.id, name: item.name };
      });
    },
  },

  async mounted() {
    if (this.$route.params.id) {
      this.getDetail();
    }
    this.getCompanyData();
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
