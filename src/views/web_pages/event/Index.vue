<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="All Event" class="rounded-card">
        <vs-table search :data="data" class="mb-base">
          <template slot="header">
            <!-- <vs-button :to="{name: 'event-create'}">Create Event</vs-button> -->
            <vs-button @click="popupActivo=true">Tambah Event</vs-button>
            <vs-popup class="holamundo"  title="Input Data Event" :active.sync="popupActivo">
              <vx-card>
              <div class="vx-col w-full">
                <input class="hidden" type="file" @change="changeImage" ref="imageInput" v-validate="'required'" data-vv-as="Event Image" name="image" accept="image/jpeg,image/png"><br>
                <img v-if="image.length<1" src="@/assets/images/upload.png" width="100" height="100" alt="" class="preview" @click="$refs.imageInput.click()">
                <img v-if="image.length>0" :src="image" alt="" class="preview" @click="$refs.imageInput.click()">
                <span class="text-danger text-sm center" v-show="errors.has('image')">{{ errors.first('image') }}</span>
            </div>
            <div class="vx-row mb-5 mt-10">
              <div class="vx-col w-full">
                <vs-input class="w-full" v-validate="'required'" name="title" label="Title" v-model="title"></vs-input>
                <span class="text-danger text-sm" v-show="errors.has('title')">{{errors.first('title')}}</span>
              </div>
            </div>
            <div class="vx-row mb-5">
              <div class="vx-col w-full">
                <vs-input class="w-full" v-validate="'required'" name="description" label="Description" v-model="description"></vs-input>
                <span class="text-danger text-sm" v-show="errors.has('description')">{{errors.first('description')}}</span>
              </div>
            </div>
            <div class="vx-row mb-5">
              <div class="vx-col w-full">
                <vs-input class="w-full" v-validate="'required'" name="link" label="Link" v-model="link"></vs-input>
                <span class="text-danger text-sm" v-show="errors.has('link')">{{errors.first('link')}}</span>
              </div>
            </div>
              <vs-button @click="store" class="right">Simpan</vs-button>
              </vx-card>
            </vs-popup>
          </template>
          <template slot="thead">
            <vs-th>Image</vs-th>
            <vs-th>Title</vs-th>
            <vs-th>Description</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td class="img-container">
                <img :src="image + '/files/' + tr.image" width="150" height="100" class="product-img"/>
              </vs-td>
              <vs-td :data="tr.title">{{tr.title}}</vs-td>
              <vs-td :data="tr.description">{{tr.description}}</vs-td>
              <vs-td>
                <div class="flex">
                  <!-- <vs-button class="mr-2" :to="{name: `event-edit`, params: {id: tr.id}}" icon-pack="feather" icon="icon-edit" size="small"></vs-button> -->
                  <vs-button class="mr-2" @click="popupActivo=true" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
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
export default {
  data () {
    return {
      popupActivo:false,
      idDelete: null,
      image: process.env.VUE_APP_API_URL,
      company_id:null,
      image: '',
      base_url_image: process.env.VUE_APP_API_URL,
      title:'',
      description:'',
      link:'',
      allowedImageType:['image/jpeg', 'image/png']
    }
  },
  computed:{
    ...mapState({
      data: state => state.event.rows
    })
  },
  methods:{
    ...mapActions({
      dispatchIndex: 'event/index',
      dispatchDestroy: 'event/destroy',
      dispatchStore: 'event/store',
      dispatchUpdate: 'event/update',
      dispatchShow: 'event/show'
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
        this.dispatchIndex(this.$store.state.AppActiveUser.data.company_id)
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
    store () {
      this.$validator.validateAll().then(async res => {
        if (!res) return false
        const payload = {
          id: this.$route.params.id,
          company_id: this.$store.state.AppActiveUser.data.company_id,
          image: this.image,
          title: this.title,
          description: this.description,
          link: this.link
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
          this.$router.push({name: 'event'})
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
      this.company_id = success.company_id
      this.image = `${this.base_url_image  }/files/${success.image}`
      this.title = success.title
      this.description = success.description
      this.link = success.link
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
    }
  },
  mounted () {
    this.$vs.loading()
    this.dispatchIndex(this.$store.state.AppActiveUser.data.company_id).then(() => {
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
    .rounded-card{
    border-radius: 30px;
    }
    .text-small {
        font-size: 12px;
        padding-left: 5px;
    }
</style>

