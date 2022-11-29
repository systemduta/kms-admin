<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="All Company" class="rounded-card">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <!-- <vs-button :to="{name:'vhs-create'}">Create VHS</vs-button> -->
            <vs-button @click="popupActivo=true">Tambah Perusahaan</vs-button>
            <vs-popup class="holamundo"  title="Input Data Perusahaan" :active.sync="popupActivo">
              <vx-card>
              <div class="vx-row mb-5 mt-10">
                <div class="vx-col w-full">
                  <vs-input class="w-full" v-validate="'required'" name="title" label="Perusahaan" v-model="storeData.perusahaan"></vs-input>
                  <span class="text-danger text-sm" v-show="errors.has('perusahaan')">{{errors.first('perusahaan')}}</span>
                </div>
              </div>
              <div class="vx-row mb-5">
                <div class="vx-col w-full">
                  <vs-input class="w-full" v-validate="'required'" name="nama_perushaan" label="Nama Perusahaan" v-model="storeData.nama_perushaan"></vs-input>
                  <span class="text-danger text-sm" v-show="errors.has('nama_perushaan')">{{errors.first('nama_perushaan')}}</span>
                </div>
              </div>
              <div class="vx-row mb-5">
                <div class="vx-col w-full">
                  <vs-input class="w-full" v-validate="'required'" name="kode" label="Kode" v-model="storeData.kode"></vs-input>
                  <span class="text-danger text-sm" v-show="errors.has('kode')">{{errors.first('kode')}}</span>
                </div>
              </div>
              <vs-progress :percent="uploadProgress" color="primary" v-if="isLoading">primary</vs-progress>
              <div v-if="isLoading">Saving data progress: {{ uploadProgress }} %</div>
              <vs-button @click="store" class="right">Simpan</vs-button>
              </vx-card>
            </vs-popup>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Code</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.code">{{ tr.code }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    :to="{ name: `leaderboard-read`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
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
import vSelect from "vue-select";
import {mapState, mapActions} from 'vuex'
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
        perusahaan: null,
        nama_perusahaan: null,
        kode: null,
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
      golongans: [
      "1 - Staf PKWT",
        "2 - Staf PKWT",
        "3 - Staf PKWTT",
        "4 - Staf PKWTT",
        "5 - Supervisor",
        "6 - Manager",
        "7 - General Manager",
        "8 - Manager",
        "9 - CEO/CSO/CFO/CPO/COO/CMO/Direktur"
      ],
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
    this.dispatchIndex().then(() => {
      this.$vs.loading.close()
    }).catch(() => {
      this.$vs.loading.close()
    })
  }
}
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
