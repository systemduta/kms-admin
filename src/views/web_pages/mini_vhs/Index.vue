<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="All Mini VHS">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{name:'mini_vhs_create'}">Create Mini VHS</vs-button>
          </template>
          <template slot="thead">
            <vs-th>Image</vs-th>
            <vs-th>Title</vs-th>
            <vs-th>Description</vs-th>
            <vs-th>Type</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td class="img-container">
                <img :src="base_url_image + '/files/' + tr.image" width="150" height="100" class="product-img"/>
              </vs-td>
              <vs-td :data="tr.title">
                <router-link :to="{name:'mini_vhs_detail', params:{id: tr.id}}">{{tr.title}}</router-link>
              </vs-td>
              <vs-td :data="tr.description">{{tr.description}}</vs-td>
              <vs-td :data="tr.type" v-if="tr.type === 1">Hard Skill</vs-td>
              <vs-td :data="tr.type" v-if="tr.type === 4">Soft Skill</vs-td>
              <vs-td :data="tr.type" v-if="tr.type === 2">Our Company</vs-td>
              <vs-td :data="tr.type" v-if="tr.type === 3">Corporate Value</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button class="mr-2" :to="{name: `mini_vhs_edit`, params: {id: tr.id}}" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
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
  name: 'MiniVHS.Index',
  data () {
    return {
      idDelete: null,
      base_url_image: process.env.VUE_APP_API_URL
    }
  },
  computed:{
    ...mapState({
      data: state => state.course.rows
    })
  },
  methods:{
    ...mapActions({
      dispatchIndex: 'course/getCorporateValueCourse',
      dispatchDestroy: 'course/destroy'
    }),
    async confirmDelete () {
      try {
        await this.dispatchDestroy(this.idDelete)
        this.$vs.notify({
          title: 'Success',
          text: 'Your data has been deleted successfully',
          color: 'primary'
        })
        this.dispatchIndex(3)
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
    }
  },
  mounted () {
    this.$vs.loading()
    this.dispatchIndex(3).then(() => {
      this.$vs.loading.close()
    }).catch(() => {
      this.$vs.loading.close()
    })
  }
}
</script>
