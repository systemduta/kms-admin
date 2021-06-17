<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="Input Data Course">
        <div class="vx-col w-full">
            <input class="hidden" type="file" @change="readImage" ref="imageInput" v-validate="'required'" data-vv-as="Thumbnail" name="image" accept="image/jpeg,image/png"><br>
            <img v-if="thumbnail_preview.length<1" src="@/assets/images/upload.png" width="100" height="100" alt="" class="preview" @click="$refs.imageInput.click()">
            <img v-if="thumbnail_preview.length>0" :src="thumbnail_preview" alt="" class="preview" @click="$refs.imageInput.click()">
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
            <small class="ml-2">Upload video</small> <br>
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
import imageCompression from 'browser-image-compression'
// import axios from '@/axios'
export default {
  data () {
    return {
      company_id:1,
      allowedImageType:['image/jpeg', 'image/png'],
      isLoading: false,
      thumbnail_preview: '',
      // upload_progress: null,
      storeData: {
        id: this.$route.params.id,
        thumbnail: '',
        title:'',
        description:'',
        video: ''
      }
    }
  },
  computed:{
    ...mapState({
      uploadProgress: state => state.vhs.upload_progress
    })
  },
  methods:{
    ...mapActions({
      dispatchStore: 'vhs/store',
      dispatchUpdate: 'vhs/update',
      dispatchShow: 'vhs/show'
    }),
    convertToFormData () {
      const data = new FormData;
      // eslint-disable-next-line no-unexpected-multiline
      ['id', 'thumbnail', 'title', 'description', 'video'].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key])
        if (this.$route.params.id) data.append('_method', 'PUT')
      })
      return data
    },
    // store () {
    //   this.$validator.validateAll().then(async res => {
    //     if (!res) return false
    //     this.isLoading = true
    //     const formData = this.convertToFormData()
    //     try {
    //       if (this.$route.params.id) {
    //         await this.dispatchUpdate(formData)
    //       } else {
    //         axios.post('api/web/vhs',
    //           formData,
    //           {
    //             headers: {
    //               'Content-Type': 'multipart/form-data'
    //             },
    //             onUploadProgress: (progressEvent) => {
    //               this.upload_progress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
    //             }
    //           }
    //         ).then(() => {
    //           this.upload_progress = 0
    //           this.$vs.notify({
    //             title: 'Success!',
    //             text: 'Data was saved successfully!',
    //             color: 'success'
    //           })
    //           this.$router.push({name: 'vhs'})
    //         })
    //       }
    //     } catch (error) {
    //       this.$vs.loading.close()
    //       this.$vs.notify({
    //         title: 'Oops!',
    //         text: error.data.message,
    //         color: 'danger'
    //       })
    //     }
    //   })
    // },
    store () {
      this.$validator.validateAll().then(async res => {
        if (!res) return false
        const formData = this.convertToFormData()
        this.isLoading = true
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formData)
          } else {
            await this.dispatchStore(formData)
          }
          this.isLoading = false
          this.$vs.notify({
            title: 'Success!',
            text: 'Data was saved successfully!',
            color: 'success'
          })
          this.$router.push({name: 'vhs'})
        } catch (error) {
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
      this.storeData.image = `${process.env.VUE_APP_API_URL}/files/${success.image}`
      this.storeData.title = success.title
      this.storeData.description = success.description
      this.storeData.file = success.file
      this.storeData.video = success.video
      this.storeData.link = success.link
      this.storeData.type = success.type
    },
    async readImage (e) {
      const image = e.target
      if (image.files && image.files[0]) {
        const filterFormat = await this.allowedImageType.filter(e => e === image.files[0].type)
        if (filterFormat.length < 1) return this.$vs.notify({title:'Maaf!', text:'File bukan berupa gambar!', color:'warning'})
        const reader = new FileReader()
        reader.onload = async (e) => {
          this.thumbnail_preview = e.target.result
        }
        reader.readAsDataURL(image.files[0])

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: false
        }
        try {
          this.$set(this.storeData, 'thumbnail', await imageCompression(image.files[0], options)
            .then(blob => new File([blob], blob.name)))
        } catch (error) {
          throw error
        }
      }
      return image
    },
    async readVideo (event) {
      const video = event.target.files[0]
      return this.$set(this.storeData, 'video', video)
    }
  },
  async mounted () {
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
