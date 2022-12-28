<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Input Data SOP">
        <div class="w-full vx-col">
            <input class="hidden" type="file" @change="changeImage" ref="imageInput" v-validate="'required|ext:jpg,jpeg,png|size:1024'" data-vv-as="Course Image" name="image" accept="image/jpeg,image/png"><br>
            <img v-if="image.length<1" src="@/assets/images/upload.png" width="100" height="100" alt="" class="preview" @click="$refs.imageInput.click()">
            <img v-if="image.length>0" :src="image" alt="" class="preview" @click="$refs.imageInput.click()">
            <span class="text-sm text-danger center" v-show="errors.has('image')">{{ errors.first('image') }}</span>
        </div>
        <div class="mt-10 mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input class="w-full" v-validate="'required'" name="title" label="Title" v-model="storeData.title"></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('title')">{{errors.first('title')}}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input class="w-full" v-validate="'required'" name="description" label="Description" v-model="storeData.description"></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('description')">{{errors.first('description')}}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2">Organization</small> <br>
            <v-select v-model="storeData.organization_id" :options="organizations.filter(e => e.company_id==company_id)" v-validate="'required'" name="organization" :reduce="e => e.id" label="name"></v-select>
            <span class="text-sm text-danger" v-show="errors.has('organization')">{{errors.first('organization')}}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2">Upload pdf file</small> <br>
            <input class="w-full" type="file" id="file" ref="file" @change="getBase64File" name="pdf_file" v-validate="'required|ext:pdf|size:3072'"/>
            <span class="text-sm text-danger" v-show="errors.has('pdf_file')">{{errors.first('pdf_file')}}</span>
          </div>
        </div>
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
import {mapActions, mapState} from 'vuex'
import vSelect from 'vue-select'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: "Create",
  components:{
    vSelect,
    quillEditor
  },
  data () {
    return {
      organizations:[],
      golongans:[],
      company_id: JSON.parse(localStorage.getItem('userInfo')).data.company_id,
      allowedImageType:['image/jpeg', 'image/png'],
      isLoading: false,
      isQuestionComplete: false,
      image: '',
      storeData: {
        id: this.$route.params.id,
        organization_id:null,
        golongan_id:null,
        image: '',
        title:'',
        description:'',
        file: ''
      }
    }
  },
  computed:{
    ...mapState({
      uploadProgress: state => state.sop.upload_progress
    })
  },
  methods:{
    ...mapActions({
      dispatchStore: 'sop/store',
      dispatchUpdate: 'sop/update',
      dispatchShow: 'sop/show',
      dispatchGetOrganizations: 'master/organizations',
      dispatchGetGolongans: 'master/golongans'
    }),
    async getMaster () {
      const org = await this.dispatchGetOrganizations()
      this.organizations = org.data
      const gol = await this.dispatchGetGolongans()
      this.golongans = gol.data
    },
    convertToFormData () {
      // this.checkQuestion();
      // if (!this.isQuestionComplete) return false;
      const data = new FormData;
      // eslint-disable-next-line no-unexpected-multiline
      ['id', 'organization_id', 'image', 'title', 'description', 'file'].forEach((key) => {
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
          this.$router.push({name: 'sop'})
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
      this.image = success.image ? `${process.env.VUE_APP_API_URL  }/files/${success.image}`: ''
      this.storeData.title = success.title
      this.storeData.description = success.description
      this.storeData.file = success.file
      // this.storeData.questions = success.description
    },
    async changeImage (e) {
      const image = e.target
      if (image.files && image.files[0]) {
        const filterFormat = await this.allowedImageType.filter(e => e === image.files[0].type)
        if (filterFormat.length < 1) return this.$vs.notify({title:'Maaf!', text:'File bukan berupa gambar!', color:'warning'})
        const reader = new FileReader()
        reader.onload = async (e) => {
          // this.image = e.target.result
          this.storeData.image = e.target.result
          this.image = e.target.result
        }
        reader.readAsDataURL(image.files[0])
      }
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
  async mounted () {
    await this.getMaster()
    if (this.$route.params.id) {
      this.getDetail()
    }
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
