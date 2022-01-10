<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Book">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button v-if="company_id == 1" :to="{name: 'book-create'}">Create Book</vs-button>
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
              <vs-td :data="tr.description"><p v-html="tr.description"></p></vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button v-if="company_id == 1" class="mr-2" :to="{name: `book-edit`, params: {id: tr.id}}" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
                  <vs-button v-if="company_id == 1" color="danger" @click="deletes(tr.id)" icon-pack="feather" icon="icon-delete" size="small"></vs-button>
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
      idDelete: null,
      company_id: JSON.parse(localStorage.getItem('userInfo')).data.company_id,
      image: process.env.VUE_APP_API_URL
    }
  },
  computed:{
    ...mapState({
      data: state => state.book.rows,
    }),
  },
  methods:{
    ...mapActions({
      dispatchIndex: 'book/index',
      dispatchDestroy: 'book/destroy'
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
    this.dispatchIndex().then(() => {
      this.$vs.loading.close()
    }).catch(() => {
      this.$vs.loading.close()
    })
  }
}
</script>
