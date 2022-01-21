<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All VHS Module">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{name:'vhs-create'}">Create VHS</vs-button>
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
export default {
  data () {
    return {
      base_url_image: process.env.VUE_APP_API_URL,
      idDelete: null
    }
  },
  computed:{
    ...mapState({
      data: state => state.vhs.rows
    })
  },
  methods:{
    ...mapActions({
      dispatchIndex: 'vhs/index',
      dispatchDestroy: 'vhs/destroy'
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
