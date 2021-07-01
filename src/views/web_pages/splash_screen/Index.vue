<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="Splash Screen">
        <vs-table :data="data" class="mb-2">
          <template slot="header"></template>
          <template slot="thead">
            <vs-th>Image</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td class="img-container">
                <img :src="base_url_image + '/files/' + tr.image" width="150" height="100" class="product-img"/>
              </vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button class="mr-2" @click="showPopUp(tr.id)" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
      <vs-popup :active.sync="popUp" title="Edit Splash Screen">
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <small class="ml-2">Upload video</small> <br>
            <input class="w-full" type="file" id="image" name="image" accept="image/jpeg,image/png" ref="file" @change="readImage"/>
          </div>
        </div>
        <vs-button size="small" @click="updateSplash">Update</vs-button>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import imageCompression from 'browser-image-compression'
export default {
  name: 'SplashScreen.Index',
  data () {
    return {
      id: null,
      allowedImageType:['image/jpeg', 'image/png'],
      popUp: false,
      base_url_image: process.env.VUE_APP_API_URL,
      image: null
    }
  },
  computed:{
    ...mapState({
      data: state => state.splash_screen.rows
    })
  },
  methods:{
    ...mapActions({
      dispatchIndex: 'splash_screen/index',
      dispatchUpdate: 'splash_screen/update'
    }),
    fetchData () {
      this.$vs.loading()
      this.dispatchIndex().then(() => {
        this.$vs.loading.close()
      }).catch(() => {
        this.$vs.loading.close()
      })
    },
    showPopUp (id) {
      this.id = id
      this.popUp = true
    },
    async readImage (e) {
      const image = e.target
      if (image.files && image.files[0]) {
        const filterFormat = await this.allowedImageType.filter(e => e === image.files[0].type)
        if (filterFormat.length < 1) return this.$vs.notify({title:'Maaf!', text:'File bukan berupa gambar!', color:'warning'})

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: false
        }
        try {
          this.$set(this, 'image', await imageCompression(image.files[0], options)
            .then(blob => new File([blob], blob.name)))
        } catch (error) {
          throw error
        }
      }
    },
    convertToFormData () {
      const data = new FormData
      if (this.image) data.append('image', this.image)
      if (this.id) data.append('id', this.id)
      data.append('_method', 'PUT')
      return data
    },
    async updateSplash () {
      const formData = this.convertToFormData()
      this.isLoading = true
      try {
        await this.dispatchUpdate(formData, this.id)
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Success!',
          text: 'Data was updated successfully!',
          color: 'success'
        })
        this.image = null
        this.popUp = false
        this.fetchData()
      } catch (error) {
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Oops!',
          text: error.data.message,
          color: 'danger'
        })
      }
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
