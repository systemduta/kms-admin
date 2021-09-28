<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="Input Data Employee">
        <div class="vx-col w-full">
            <input class="hidden" type="file" @change="changeImage" ref="imageInput" v-validate="image.length<1?'required|ext:jpg,jpeg,png|size:1024':''" data-vv-as="Course Image" name="image" accept="image/jpeg,image/png"><br>
            <img v-if="image.length<1" src="@/assets/images/upload.png" width="100" height="100" alt="" class="preview" @click="$refs.imageInput.click()">
            <img v-if="image.length>0" :src="image" alt="" class="preview" @click="$refs.imageInput.click()">
            <span class="text-danger text-sm center" v-show="errors.has('image')">{{ errors.first('image') }}</span>
        </div>
        <div class="vx-row mb-5 mt-10">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required'" name="name" label="Name" v-model="name"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('name')">{{errors.first('name')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required'" name="nik" label="NIK" v-model="nik"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('nik')">{{errors.first('nik')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <small>Companies</small>
            <v-select @search:blur="organization_id=null" v-model="company_id" :options="companies" v-validate="'required'" name="company"  :reduce="e => e.id" label="name"></v-select>
            <span class="text-danger text-sm" v-show="errors.has('company')">{{errors.first('company')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <small>Division</small>
            <v-select v-model="organization_id" :options="organizations.filter(e => e.company_id==company_id)" v-validate="'required'" name="organization"  :reduce="e => e.id" label="name"></v-select>
            <span class="text-danger text-sm" v-show="errors.has('organization')">{{errors.first('organization')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <small>Level</small>
            <v-select v-model="golongan_id" :options="golongans" v-validate="'required'" name="golongan_id" :reduce="e => e.id" label="name"></v-select>
            <span class="text-danger text-sm" v-show="errors.has('golongan_id')">{{errors.first('golongan_id')}}</span>
          </div>
        </div>
        <div v-if="!this.$route.params.id" class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input ref="password" type="password" autocomplete="new-password" class="w-full" v-validate="'required'" name="password" label="Password" v-model="password"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('password')">{{errors.first('password')}}</span>
          </div>
        </div>
        <div v-if="!this.$route.params.id" class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input type="password" autocomplete="new-password" class="w-full" v-validate="'required|confirmed:password'" name="c_password" label="Password Confirmation" v-model="c_password"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('c_password')">{{errors.first('c_password')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <small class="ml-2">Upload Foto ID Card</small> <br>
            <input class="ml-2 mr-2" type="file" id="file" ref="file" name="id_card" @change="getBase64File" v-validate="file.length<1?'required|ext:jpg,jpeg,png|size:1024':''"/> <br>
            <span class="text-danger text-sm" v-show="errors.has('id_card')">{{errors.first('id_card')}}</span>
          </div>
        </div>
        <vs-button @click="store">Save</vs-button>
      </vx-card>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      image: '',
      file: '',
      name:'',
      password:'',
      c_password:'',
      nik:'',
      company_id:null,
      organization_id:null,
      golongan_id:null,
      companies:[],
      organizations:[],
      golongans:[],
      allowedImageType:['image/jpeg', 'image/png']
    }
  },
  components:{
    vSelect
  },
  methods:{
    ...mapActions({
      dispatchStore: 'employee/store',
      dispatchUpdate: 'employee/update',
      dispatchShow: 'employee/show',
      dispatchGetCompanies: 'master/companies',
      dispatchGetOrganizations: 'master/organizations',
      dispatchGetGolongans: 'master/golongans'
    }),
    async getMaster () {
      const co = await this.dispatchGetCompanies()
      this.companies = co.data
      const org = await this.dispatchGetOrganizations()
      this.organizations = org.data
      const gol = await this.dispatchGetGolongans()
      this.golongans = gol.data
      if (this.$route.params.id) {
        await this.getDetail()
      }
    },
    store () {
      this.$validator.validateAll().then(async res => {
        if (!res) return false
        const payload = {
          id: this.$route.params.id,
          image: this.image,
          file: this.file,
          name: this.name,
          company_id: this.company_id,
          organization_id: this.organization_id,
          golongan_id: this.golongan_id,
          nik: this.nik,
          password: this.password,
          c_password: this.c_password
        }
        this.$vs.loading()
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(payload)
          } else {
            await this.dispatchStore(payload)
          }
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success!',
            text: 'Data was saved successfully!',
            color: 'success'
          })
          this.$router.push({name: 'employee'})
        } catch (error) {
          this.$vs.loading.close()
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
      this.name = success.name
      this.image = `${process.env.VUE_APP_API_URL  }/files/${  success.image}`
      this.file = success.file
      this.nik = success.nik
      this.company_id = success.company_id
      this.organization_id = success.organization_id
      this.golongan_id = success.golongan_id
    },
    async changeImage (e) {
      const image = e.target
      if (image.files && image.files[0]) {
        // eslint-disable-next-line eqeqeq
        const filterFormat = await this.allowedImageType.filter(e => e == image.files[0].type)
        if (filterFormat.length < 1) return this.$vs.notify({title:'Maaf!', text:'File bukan berupa gambar!', color:'warning'})
        const reader = new FileReader()
        reader.onload = async (e) => {
          this.image = e.target.result
        }
        reader.readAsDataURL(image.files[0])
      }
    },
    getBase64File (event) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        this.file = reader.result
      }
      this.$emit('input', event.target.files[0])
    }
  },
  async mounted () {
    this.$vs.loading()
    await this.getMaster().then(() => {
      this.$vs.loading.close()
    }).catch(() => {
      this.$vs.loading.close()
    })
  }
}
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
    .text-small {
        font-size: 12px;
        padding-left: 5px;
    }
</style>
