<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Input Data Employee">
        <div class="w-full vx-col">
          <input
            class="hidden"
            type="file"
            @change="changeImage"
            ref="imageInput"
            v-validate="
              storeData.image.length < 1
                ? (this.$route.params.id ? '' : 'required|') +
                  'ext:jpg,jpeg,png|size:1024'
                : ''
            "
            data-vv-as="Course Image"
            name="image"
            accept="image/jpeg,image/png"
          /><br />
          <img
            v-if="image.length < 1"
            src="@/assets/images/upload.png"
            width="100"
            height="100"
            alt=""
            class="preview"
            @click="$refs.imageInput.click()"
          />
          <img
            v-if="image.length > 0"
            :src="image"
            alt=""
            class="preview"
            @click="$refs.imageInput.click()"
          />
          <span
            class="text-sm text-danger center"
            v-show="errors.has('image')"
            >{{ errors.first("image") }}</span
          >
        </div>
        <div class="mt-10 mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="name"
              label="Name"
              v-model="storeData.name"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="nik"
              label="NIK"
              v-model="storeData.nik"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('nik')">{{
              errors.first("nik")
            }}</span>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small>Companies</small>
            <v-select
              @search:blur="storeData.organization_id = null"
              v-model="storeData.company_id"
              :options="companies"
              v-validate="'required'"
              name="company"
              :reduce="(e) => e.id"
              label="name"
            ></v-select>
            <span class="text-sm text-danger" v-show="errors.has('company')">{{
              errors.first("company")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small>Division</small>
            <v-select
              v-model="storeData.organization_id"
              :options="
                organizations.filter(
                  (e) => e.company_id == storeData.company_id
                )
              "
              v-validate="'required'"
              name="organization"
              :reduce="(e) => e.id"
              label="name"
            ></v-select>
            <span
              class="text-sm text-danger"
              v-show="errors.has('organization')"
              >{{ errors.first("organization") }}</span
            >
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small>Golongan</small>
            <v-select
              v-model="storeData.golongan_id"
              :options="golongans"
              v-validate="'required'"
              name="golongan_id"
              :reduce="(e) => e.id"
              label="golongan_data"
            ></v-select>
            <span
              class="text-sm text-danger"
              v-show="errors.has('golongan_id')"
              >{{ errors.first("golongan_id") }}</span
            >
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small>Status Pegawai : </small><br />
            <vs-radio
              class="ml-2 mr-2"
              v-model="storeData.status"
              name="status"
              vs-value="1"
              >Aktif / Ada</vs-radio
            >
            <vs-radio
              class="ml-2 mr-2"
              v-model="storeData.status"
              name="status"
              vs-value="0"
              >Resign</vs-radio
            >
            <!-- <v-select
              v-model="storeData.golongan_id"
              :options="golongans"
              v-validate="'required'"
              name="golongan_id"
              :reduce="(e) => e.id"
              label="golongan_data"
            ></v-select> -->
            <span class="text-sm text-danger" v-show="errors.has('status')">{{
              errors.first("status")
            }}</span>
          </div>
        </div>
        <!-- <div v-if="!this.$route.params.id" class="mb-5 vx-row"> -->
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              ref="password"
              type="password"
              autocomplete="new-password"
              class="w-full"
              name="password"
              label="Password"
              v-model="storeData.password"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('password')">{{
              errors.first("password")
            }}</span>
          </div>
        </div>
        <div v-if="!this.$route.params.id" class="mb-5 vx-row">
          <!-- <div class="mb-5 vx-row"> -->
          <div class="w-full vx-col">
            <vs-input
              type="password"
              autocomplete="new-password"
              class="w-full"
              v-validate="'required|confirmed:password'"
              name="c_password"
              label="Konfirmasi Password"
              v-model="storeData.c_password"
            ></vs-input>
            <span
              class="text-sm text-danger"
              v-show="errors.has('c_password')"
              >{{ errors.first("c_password") }}</span
            >
          </div>
          <!-- </div> -->
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2">Upload Foto ID Card</small> <br />
            <input
              class="ml-2 mr-2"
              type="file"
              id="file"
              ref="file"
              name="id_card"
              @change="getBase64File"
              v-validate="
                storeData.file.length < 1
                  ? (this.$route.params.id ? '' : 'required|') +
                    'ext:jpg,jpeg,png|size:1024'
                  : ''
              "
            />
            <br />
            <span class="text-sm text-danger" v-show="errors.has('id_card')">{{
              errors.first("id_card")
            }}</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button color="dark" type="flat" :to="{ name: `employee` }"
              >Back</vs-button
            >
            &nbsp; &nbsp;
            <vs-button @click="store">Save</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      storeData: {
        id: this.$route.params.id,
        company_id: null,
        golongan_id: null,
        organization_id: null,
        status: null,
        image: "",
        name: "",
        password: "",
        c_password: "",
        nik: "",
        file: "",
      },
      image: "",
      companies: [],
      organizations: [],
      golongans: [],
      allowedImageType: ["image/jpeg", "image/png"],
    };
  },
  components: {
    vSelect,
  },

  methods: {
    ...mapActions({
      dispatchStore: "employee/store",
      dispatchUpdate: "employee/update",
      dispatchShow: "employee/show",
      dispatchGetCompanies: "master/companies",
      dispatchGetOrganizations: "master/organizations",
      dispatchGetGolongans: "master/golongans",
    }),

    async getMaster() {
      const co = await this.dispatchGetCompanies();
      this.companies = co.data;
      const org = await this.dispatchGetOrganizations();
      this.organizations = org.data;
      const gol = await this.dispatchGetGolongans();
      this.golongans = gol.data;
      // console.log(this.golongans);
      if (this.$route.params.id) {
        await this.getDetail();
      }
    },
    convertToFormData() {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      [
        "id",
        "company_id",
        "golongan_id",
        "organization_id",
        "image",
        "name",
        "status",
        "password",
        "c_password",
        "nik",
        "file",
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
        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0]}, ${pair[1]}`);
        // }
        this.$vs.loading({
          type: "radius",
          color: "blue",
          textAfter: true,
          text: "Please Wait ...",
        });
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formData);
          } else {
            await this.dispatchStore(formData);
          }
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Success!",
            text: "Data was saved successfully!",
            color: "success",
          });
          this.$router.push({ name: "employee" });
        } catch (error) {
          this.$vs.loading.close();
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
      this.image = success.image
        ? `${process.env.VUE_APP_API_URL}/files/${success.image}`
        : "";
      this.storeData.nik = success.nik;
      this.storeData.company_id = success.company_id;
      this.storeData.organization_id = success.organization_id;
      this.storeData.golongan_id = success.golongan_id;
      this.storeData.status = success.status;
      // const dataku = CryptoJS.AES.encrypt(success.password).toString();
      this.storeData.password = bcrypt(success.password);
    },
    async changeImage(e) {
      const image = e.target;
      if (image.files && image.files[0]) {
        // eslint-disable-next-line eqeqeq
        const filterFormat = await this.allowedImageType.filter(
          (e) => e == image.files[0].type
        );
        if (filterFormat.length < 1)
          return this.$vs.notify({
            title: "Maaf!",
            text: "File bukan berupa gambar!",
            color: "warning",
          });
        const reader = new FileReader();
        reader.onload = async (e) => {
          this.storeData.image = e.target.result;
          this.image = e.target.result;
        };
        reader.readAsDataURL(image.files[0]);
      }
    },
    getBase64File(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.storeData.file = reader.result;
      };
      this.$emit("input", event.target.files[0]);
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
    this.golongans.map(function (x) {
      return (x.golongan_data = x.code + " - " + x.name);
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
