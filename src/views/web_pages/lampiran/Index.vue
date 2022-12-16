<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Lampiran" class="rounded-card">
        <vs-table pagination search :data="data" class="mb-base">
          <template slot="header">
            <!-- <vs-button :to="{ name: 'lampiran-create' }">Create Lampiran</vs-button > -->
            <vs-button @click="popupActivo=true">Tambah Lampiran</vs-button>
            <vs-popup class="holamundo"  title="Input Data Lampiran" :active.sync="popupActivo">
              <vx-card>
              <div class="mb-5 vx-row">
                <div class="w-full vx-col">
                  <vs-input class="w-full" v-validate="'required'" name="name" label="Name" v-model="storeData.name"></vs-input>
                  <span class="text-sm text-danger" v-show="errors.has('name')">{{errors.first('name')}}</span>
                </div>
              </div>
              <div class="mb-5 vx-row">
                <div class="w-full vx-col">
                  <small class="ml-2">Name SOP</small> <br>
                  <v-select v-model="storeData.sop_id" :options="sops.filter(e => e.company_id==company_id)" v-validate="'required'" name="sop" :reduce="e => e.id" label="title"></v-select>
                  <span class="text-sm text-danger" v-show="errors.has('sop')">{{errors.first('sop')}}</span>
                </div>
              </div>
              <div class="mb-5 vx-row">
                <div class="w-full vx-col">
                  <small class="ml-2">Upload file</small> <br>
                  <input class="w-full" type="file" id="file" ref="file" @change="getBase64File" name="pdf_file" v-validate="'required|ext:pdf,docx,doc|size:3072'"/>
                  <span class="text-sm text-danger" v-show="errors.has('pdf_file')">{{errors.first('pdf_file')}}</span>
                </div>
              </div>
              <vs-progress :percent="uploadProgress" color="primary" v-if="isLoading">primary</vs-progress>
              <div v-if="isLoading">Saving data progress: {{ uploadProgress }} %</div>
              <vs-button @click="store" :disabled="isLoading" class="right">Simpan</vs-button>
              </vx-card>
            </vs-popup>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Name Perusahaan</vs-th>
            <vs-th>Name Lampiran</vs-th>
            <vs-th>Name SOP</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <!-- <vs-td :data="tr.status">
                <div v-if="tr.status == 0">
                  No Request
                </div>
                <vs-button color="danger" v-if="tr.status == 2" @click="statusUpdate(tr.id)">Non Active</vs-button>
                <vs-button color="success" v-if="tr.status == 1" @click="statusUpdate(tr.id)">Active</vs-button>
              </vs-td> -->
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.company.name">{{tr.company.name}}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.sop.title">{{ tr.sop.title }}</vs-td>
              <!-- <vs-td :data="tr.status">
                <vs-chip color="danger" v-if="tr.status == 0">Non Active</vs-chip>
                <vs-chip color="warning" v-if="tr.status == 1">Pending</vs-chip>
                <vs-chip color="success" v-if="tr.status == 2">Active</vs-chip>
              </vs-td> -->
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    :to="{ name: `lampiran-edit`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button>
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
import { mapState, mapActions } from "vuex";
import vSelect from 'vue-select'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import moment from "moment";
export default {
  components:{
    vSelect,
  },
  data() {
    return {
      idDelete: null,
      idStatus: null,
      base_url_image: process.env.VUE_APP_API_URL,
      popupActivo: false,
      sops:[],
      organizations:[],
      golongans:[],
      company_id: JSON.parse(localStorage.getItem('userInfo')).data.company_id,
      isLoading: false,
      storeData: {
        id: this.$route.params.id,
        sop_id: null,
        name:'',
        description:'',
        file: '',
      }
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.lampiran.rows,
      uploadProgress: state => state.lampiran.upload_progress
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "lampiran/index",
      dispatchDestroy: "lampiran/destroy",
      dispatchUpdates: "lampiran/status",
      dispatchStore: 'lampiran/store',
      dispatchUpdate: 'lampiran/update',
      dispatchShow: 'lampiran/show',
      dispatchGetOrganizations: 'master/organizations',
      dispatchGetGolongans: 'master/golongans',
      dispatchGetSops: 'master/sops'
    }),
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
    async confirmStatus() {
      try {
        await this.dispatchUpdates(this.idStatus);
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
    statusUpdate(id) {
      this.idStatus = id;
      this.$vs.dialog({
        type: "confirm",
        color: "success",
        title: "Are you sure ?",
        text: "Do you want to change status",
        accept: this.confirmStatus,
      });
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
    async getMaster () {
      const org = await this.dispatchGetOrganizations()
      this.organizations = org.data
      const gol = await this.dispatchGetGolongans()
      this.golongans = gol.data
      const sop = await this.dispatchGetSops()
      this.sops = sop.data
    },
    convertToFormData () {
      const data = new FormData;
      // eslint-disable-next-line no-unexpected-multiline
      ['id', 'name','file','sop_id'].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key])
      })
      if (this.$route.params.id) data.append('_method', 'PUT')
      return data
    },
    store () {
      this.$validator.validateAll().then(async res => {
        if (!res) return false;
        const formData = this.convertToFormData()
        if (!formData) return false;
        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0] }, ${  pair[1]}`)
        // }
        this.$vs.loading()
        this.isLoading = true
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formData)
          } else {
            await this.dispatchStore(formData)
          }
          this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Success!',
            text: 'Data was saved successfully!',
            color: 'success'
          })
          this.$router.push({name: 'lampiran'})
        } catch (error) {
          this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Oops!',
            text: error.data.message,
            color: 'danger'
          })
        }
      })
    },
    async getDetail () {
      const { success } = await this.dispatchShow(this.$route.params.id)
      this.storeData.organization_id = success.organization_id
      this.storeData.sop_id = success.sop_id
      this.storeData.name = success.name
      this.storeData.description = success.description
      this.storeData.file = success.file
    },
    getBase64File (event) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        // this.file = reader.result
        this.storeData.file = reader.result
      }
      this.$emit('input', event.target.files[0])
    },
    getBase64Video (event) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        this.video = reader.result
      }
      this.$emit('input', event.target.files[0])
    },
    async readVideo (event) {
      const video = event.target.files[0]
      return this.$set(this.storeData, 'video', video)
    }
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
      this.getMaster()
    if (this.$route.params.id) {
      this.getDetail()
    }
  },
};
</script>

<style lang="scss" scoped>
    .preview {
        max-width:100%;
        margin-left:auto;
        margin-right:auto;
        display:block;
        cursor: pointer;
        border-radius: 5px;
    }
    .center {
        margin-left:auto;
        margin-right:auto;
        display:block;
        text-align: center;
        margin-bottom: 5px;
    }
    .right{
      margin-left: auto;
      display: block;
    }
    .text-small {
        font-size: 12px;
        padding-left: 5px;
    }
    .rounded-card{
    border-radius: 30px;
  }
</style>
