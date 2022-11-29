<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All VHS Module">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <!-- <vs-button :to="{name:'vhs-create'}">Create VHS</vs-button> -->
            <vs-button @click="popupActivo=true">Create VHS</vs-button>
            <vs-popup class="holamundo"  title="Input Data VHS" :active.sync="popupActivo">
              <vx-card>
              <div class="vx-row mb-5 mt-10">
                <div class="vx-col w-full">
                    <input class="hidden" type="file" @change="readImage" ref="imageInput" v-validate="'required'" data-vv-as="Thumbnail" name="image" accept="image/jpeg,image/png"><br>
                    <img v-if="thumbnail_preview.length<1" src="@/assets/images/upload.png" width="100" height="100" alt="" class="preview" @click="$refs.imageInput.click()">
                    <img v-if="thumbnail_preview.length>0" :src="thumbnail_preview" alt="" class="preview" @click="$refs.imageInput.click()">
                    <span class="text-danger text-sm center" v-show="errors.has('image')">{{ errors.first('image') }}</span>
                </div>
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
              <vs-button @click="store" class="right">Simpan</vs-button>
              </vx-card>
            </vs-popup>
          </template>
          <template slot="thead">
            <vs-th>Title</vs-th>
            <vs-th>Description</vs-th>
            <vs-th>Thumbnail</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="index" v-for="(tr, index) in data">
              <vs-td :data="tr.title">{{tr.title}}</vs-td>
              <vs-td :data="tr.description">{{tr.description}}</vs-td>
              <vs-td class="img-container">
                <img :src="base_url_image + '/files/' + tr.thumbnail" width="150" height="100" class="product-img"/>
              </vs-td>
              <vs-td>
                <div class="flex">
<!--                  <vs-button class="mr-2" :to="{name: `course-read`, params: {id: tr.id}}" icon-pack="feather" icon="icon-edit" size="small"></vs-button>-->
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
import {mapState, mapActions} from 'vuex'
import imageCompression from 'browser-image-compression'
export default {
  data () {
    return {
      base_url_image: process.env.VUE_APP_API_URL,
      idDelete: null,
      popupActivo: false,
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
      data: state => state.vhs.rows,
      uploadProgress: state => state.vhs.upload_progress
    })
  },
  methods:{
    ...mapActions({
      dispatchIndex: 'vhs/index',
      dispatchDestroy: 'vhs/destroy',
      dispatchStore: 'vhs/store',
      dispatchUpdate: 'vhs/update',
      dispatchShow: 'vhs/show'
    }),
    async confirmDelete () {
      this.$vs.loading()
      try {
        await this.dispatchDestroy(this.idDelete)
        this.dispatchIndex()
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Success',
          text: 'Your data has been deleted successfully',
          color: 'primary'
        })
      } catch (error) {
        this.$vs.loading.close()
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
  mounted () {
    this.$vs.loading()
    this.dispatchIndex({}).then(() => {
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
    .right{
      margin-left: auto;
      display: block;
    }
    .text-small {
        font-size: 12px;
        padding-left: 5px;
    }
</style>
