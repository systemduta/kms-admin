<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Input Data Book">
        <div class="w-full vx-col">
            <input class="hidden" type="file" @change="changeImage" ref="imageInput" v-validate="storeData.image.length<1?(this.$route.params.id?'':'required|')+'ext:jpg,jpeg,png|size:1024':''" data-vv-as="Course Image" name="image" accept="image/jpeg,image/png"><br>
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
            <h6 class="mb-2">Description</h6>
            <quill-editor class="w-full" v-validate="'required'" name="description" v-model="storeData.description"/>
            <span class="text-sm text-danger" v-show="errors.has('description')">{{errors.first('description')}}</span>
          </div>
        </div>
        <vs-button @click="store" class="right">Simpan</vs-button>
      </vx-card>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { mapActions, mapState } from 'vuex'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      image: '',
      // title:'',
      // description:'',
      storeData: {
        id: this.$route.params.id,
        image: '',
        title:'',
        description:''
      },
      allowedImageType:['image/jpeg', 'image/png']
    }
  },
  components:{
    vSelect,
    quillEditor
  },

  computed:{
    ...mapState({
      uploadProgress: state => state.book.upload_progress
    })
  },

  methods:{
    ...mapActions({
      dispatchStore: 'book/store',
      dispatchUpdate: 'book/update',
      dispatchShow: 'book/show',
    }),

    async getMaster () {
      if (this.$route.params.id) {
        await this.getDetail()
      }
    },
    convertToFormData () {
      const data = new FormData;
      // eslint-disable-next-line no-unexpected-multiline
      ['id', 'image', 'title', 'description'].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key])
      })
      if (this.$route.params.id) data.append('_method', 'PUT')
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
        this.$vs.loading()
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formData)
          } else {
            await this.dispatchStore(formData)
          }
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success!',
            text: 'Data was saved successfully!',
            color: 'success'
          })
          this.$router.push({name: 'book'})
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
      // this.image = success.image ? `${process.env.VUE_APP_API_URL  }/files/${success.image}`: ''
      this.storeData.title = success.title
      this.image = success.image ? `${process.env.VUE_APP_API_URL  }/files/${success.image}`: ''
      // this.image = success.image ? `/files/${success.image}`: ''
      this.storeData.description = success.description
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
    .right{
      margin-left: auto;
      display: block;
    }
</style>
