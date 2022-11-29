<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Employee" class="rounded-card">
        <vs-table search :data="data" class="mb-base">
          <template slot="header">
            <!-- <vs-button :to="{name: 'employee-create'}">Create User</vs-button> -->
            <vs-button @click="popupActivo=true">Tambah User</vs-button>
            <vs-popup class="holamundo"  title="Input Data Pegawai" :active.sync="popupActivo">
              <vx-card>
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
              <div class="vx-row mb-5"> 
                <div class="vx-col w-full">
                <vs-input class="w-full" v-validate="'required'" name="name" label="Nama" v-model="storeData.name"></vs-input>
                <span class="text-danger text-sm" v-show="errors.has('name')">{{errors.first('name')}}</span>
                </div>
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
                  <span class="text-sm text-danger" v-show="errors.has('id_card')">{{errors.first("id_card")}}</span>
                </div>
              </div>
              <div class="vx-row mb-5">
                <div class="vx-col w-full">
                  <vs-input class="w-full" v-validate="'required'" name="nik" label="NIK" v-model="storeData.nik"></vs-input>
                  <span class="text-sm text-danger" v-show="errors.has('nik')">{{ errors.first("nik") }}</span>
                </div>
              </div>
              <div class="vx-row mb-5">
                <div class="vx-col w-full">
                  <small>Perusahaan</small>
                  <v-select @search:blur="storeData.organization_id = null" v-model="storeData.company_id" :options="companies" v-validate="'required'" name="company" :reduce="(e) => e.id" label="Company"></v-select>
                  <span class="text-sm text-danger" v-show="errors.has('company')">{{errors.first("company") }}</span>
                </div>
              </div>
              <div class="vx-row mb-5">
                <div class="vx-col w-full">
                  <small>Divisi</small>
                  <v-select v-model="storeData.organization_id" :options="organizations.filter((e) => e.company_id == storeData.company_id)" v-validate="'required'" name="organization" :reduce="(e) => e.id" label="name"></v-select>
                  <span class="text-sm text-danger" v-show="errors.has('organization')" >{{ errors.first("organization") }}</span>
                </div>
              </div>
              <div class="mb-5 vx-row">
                <div class="w-full vx-col">
                  <small>Golongan</small>
                  <v-select v-model="storeData.golongan_id" :options="golongans" v-validate="'required'" name="golongan_id" :reduce="(e) => e.id" label="name"></v-select>
                  <span class="text-sm text-danger" v-show="errors.has('golongan_id')" >{{ errors.first("golongan_id") }}</span
                  >
                </div>
              </div>
              <div class="mb-5 vx-row">
                <div class="w-full vx-col">
                  <vs-input ref="password" type="password" autocomplete="new-password" class="w-full" name="password" label="Password" v-model="storeData.password"></vs-input>
                  <span class="text-sm text-danger" v-show="errors.has('password')">{{ errors.first("password") }}</span>
                </div>
              </div>
              <div v-if="!this.$route.params.id" class="mb-5 vx-row">
              <!-- <div class="mb-5 vx-row"> -->
                <div class="w-full vx-col">
                  <vs-input type="password" autocomplete="new-password" class="w-full" v-validate="'required|confirmed:password'" name="c_password" label="Password Confirmation" v-model="storeData.c_password"></vs-input>
                  <span class="text-sm text-danger" v-show="errors.has('c_password')" >{{ errors.first("c_password") }}</span>
                </div>
              </div>
              <vs-button @click="store" class="right">Simpan</vs-button>
              </vx-card>
            </vs-popup>
          </template>
          <template slot="thead">
            <vs-th></vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Username</vs-th>
            <vs-th>Company</vs-th>
            <vs-th>Division</vs-th>
            <vs-th>Level</vs-th>
            <vs-th>NIK</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td class="img-container">
                <vs-avatar :src="image + '/files/' + tr.image"/>
              </vs-td>
              <vs-td :data="tr.name">{{tr.name}}</vs-td>
              <vs-td :data="tr.username">{{tr.username}}</vs-td>
              <vs-td :data="tr.company.name">{{tr.company.name}}</vs-td>
              <vs-td :data="tr.organization.name">{{tr.organization.name}}</vs-td>
              <vs-td :data="tr.golongan.name">{{tr.golongan.name}}</vs-td>
              <vs-td :data="tr.nik">{{tr.nik}}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button class="mr-2" :to="{name: `employee-edit`, params: {id: tr.id}}" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
                  <vs-button color="danger" @click="deletes(tr.id)" icon-pack="feather" icon="icon-delete" size="small"></vs-button>
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
import vSelect from "vue-select";
import {mapState, mapActions} from 'vuex';
export default {
  data () {
    return {
      popupActivo:false,
      currentx: 1,
      idDelete: null,
      image: process.env.VUE_APP_API_URL,
      popupActivo:false,
      storeData: {
        id: this.$route.params.id,
        company_id: null,
        golongan_id: null,
        organization_id: null,
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
    }
  },
  components: {
    vSelect,
  },
  computed:{
    ...mapState({
      data: state => state.employee.rows
    })
  },
  methods:{
    ...mapActions({
      dispatchIndex: 'employee/index',
      dispatchDestroy: 'employee/destroy',
      dispatchStore: "employee/store",
      dispatchUpdate: "employee/update",
      dispatchShow: "employee/show",
      dispatchGetCompanies: "master/companies",
      dispatchGetOrganizations: "master/organizations",
      dispatchGetGolongans: "master/golongans",
    }),
    async confirmDelete () {
      try {
        await this.dispatchDestroy(this.idDelete)
        this.dispatchIndex()
        this.$vs.notify({
          title: 'Success',
          text: 'Your data has been deleted successfully',
          color: 'primary'
        })
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: 'danger'
        })
      }
    },
    deletes (id) {
      this.idDelete = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Are you sure ?',
        text: 'Deleted data can no longer be restored',
        accept: this.confirmDelete
      })
    },
    async getMaster() {
      const co = await this.dispatchGetCompanies();
      this.companies = co.data;
      const org = await this.dispatchGetOrganizations();
      this.organizations = org.data;
      const gol = await this.dispatchGetGolongans();
      this.golongans = gol.data;
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
        "password",
        "c_password",
        "nik",
        "file",
      ].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key]);
      });
      if (this.$route.params.id) data.append("_method", "PUT");

      console.log("=======");
      console.log("company id -> " + this.storeData.id);
      console.log("=======");
      return data;
    },
    store() {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false;
        const formData = this.convertToFormData();
        // this.$vs.loading();
        // try {
        //   if (this.$route.params.id) {
        //     await this.dispatchUpdate(formData);
        //   } else {
        //     await this.dispatchStore(formData);
        //   }
        //   this.$vs.loading.close();
        //   this.$vs.notify({
        //     title: "Success!",
        //     text: "Data was saved successfully!",
        //     color: "success",
        //   });
        //   this.$router.push({ name: "employee" });
        // } catch (error) {
        //   this.$vs.loading.close();
        //   this.$vs.notify({
        //     title: "Oops!",
        //     text: error.data.message,
        //     color: "danger",
        //   });
        // }
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
  mounted () {
    this.$vs.loading()
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
    this.getMaster()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  }
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
.rounded-card{
    border-radius: 30px;
  }
.right{
  margin-left: auto;
  display: block;
}
.text-small {
  font-size: 12px;
  padding-left: 5px;
}
</style>
