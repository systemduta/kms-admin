<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="Input Data Course">
        <div class="vx-col w-full">
            <input class="hidden" type="file" @change="changeImage" ref="imageInput" v-validate="'required'" data-vv-as="Course Image" name="image" accept="image/jpeg,image/png"><br>
            <img v-if="storeData.image.length<1" src="@/assets/images/upload.png" width="100" height="100" alt="" class="preview" @click="$refs.imageInput.click()">
            <img v-if="storeData.image.length>0" :src="storeData.image" alt="" class="preview" @click="$refs.imageInput.click()">
            <span class="text-danger text-sm center" v-show="errors.has('image')">{{ errors.first('image') }}</span>
        </div>
        <div class="vx-row mb-5 mt-10">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required'" name="title" label="Title" v-model="storeData.title"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('title')">{{errors.first('title')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required'" name="description" label="Description" v-model="storeData.description"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('description')">{{errors.first('description')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required'" name="link" label="Link" v-model="storeData.link"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('link')">{{errors.first('link')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <small class="ml-2">Type</small> <br>
            <vs-radio class="ml-2 mr-2" v-model="storeData.type" vs-value="4">Soft Skill</vs-radio>
            <vs-radio class="ml-2 mr-2" v-model="storeData.type" vs-value="1">Hard Skill</vs-radio>
            <vs-radio class="ml-2 mr-2" v-model="storeData.type" vs-value="2">Our Company</vs-radio>
            <vs-radio class="ml-2 mr-2" v-model="storeData.type" vs-value="3">Corporate Value</vs-radio>
          </div>
        </div>
        <div class="vx-row mb-5" v-if="storeData.type==1">
          <div class="vx-col w-full">
            <small class="ml-2">Organization</small> <br>
            <v-select v-model="storeData.organization_id" :options="organizations.filter(e => e.company_id==company_id)" v-validate="'required'" name="organization" :reduce="e => e.id" label="name"></v-select>
            <span class="text-danger text-sm" v-show="errors.has('organization')">{{errors.first('organization')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <small class="ml-2">Upload pdf file</small> <br>
            <input class="w-full" type="file" id="file" ref="file" @change="getBase64File" name="pdf_file" v-validate="'required'"/>
            <span class="text-danger text-sm" v-show="errors.has('pdf_file')">{{errors.first('pdf_file')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <small class="ml-2">Upload video</small> <br>
<!--            <input class="ml-2 mr-2" type="file" id="video" ref="file" @change="getBase64Video"/>-->
            <input class="w-full" type="file" id="video" ref="file" @change="readVideo"/>
          </div>
        </div>
        <vs-progress :percent="uploadProgress" color="primary" v-if="isLoading">primary</vs-progress>
        <div v-if="isLoading">Saving data progress: {{ uploadProgress }} %</div>
        <vs-button @click="store" :disabled="isLoading">Save</vs-button>
      </vx-card>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import vSelect from 'vue-select'
export default {
  components:{
    vSelect
  },
  data () {
    return {
      organizations:[],
      company_id:1,
      allowedImageType:['image/jpeg', 'image/png'],
      isLoading: false,
      storeData: {
        id: this.$route.params.id,
        organization_id:null,
        image: '',
        title:'',
        description:'',
        file: '',
        video: '',
        link:'',
        type: 4
      }
    }
  },
  computed:{
    ...mapState({
      uploadProgress: state => state.course.upload_progress
    })
  },
  methods:{
    ...mapActions({
      dispatchStore: 'course/store',
      dispatchUpdate: 'course/update',
      dispatchShow: 'course/show',
      dispatchGetOrganizations: 'master/organizations'
    }),
    async getMaster () {
      const org = await this.dispatchGetOrganizations()
      this.organizations = org.data
    },
    convertToFormData () {
      const data = new FormData;
      // eslint-disable-next-line no-unexpected-multiline
      ['id', 'organization_id', 'image', 'title', 'description', 'file', 'video', 'link', 'type'].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key])
        if (this.$route.params.id) data.append('_method', 'PUT')
      })
      return data
    },
    store () {
      this.$validator.validateAll().then(async res => {
        if (!res) return false
        const formData = this.convertToFormData()
        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0] }, ${  pair[1]}`)
        // }
        // this.$vs.loading()
        this.isLoading = true
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formData)
          } else {
            await this.dispatchStore(formData)
          }
          // this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Success!',
            text: 'Data was saved successfully!',
            color: 'success'
          })
          this.$router.push({name: 'course'})
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
      this.storeData.organization_id = success.organization_id
      this.storeData.image = `${process.env.VUE_APP_API_URL}/files/${success.image}`
      this.storeData.title = success.title
      this.storeData.description = success.description
      this.storeData.file = success.file
      this.storeData.video = success.video
      this.storeData.link = success.link
      this.storeData.type = success.type
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
