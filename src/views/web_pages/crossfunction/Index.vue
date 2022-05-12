<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Crossfunction">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{name:'crossfunction-create'}">Create Crossfunction</vs-button>
          </template>
          <template slot="thead">
            <vs-th>Name Crossfunction</vs-th>
            <vs-th>Name SOP</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.name">{{tr.name}}</vs-td>
              <vs-td :data="tr.sop.title">{{tr.sop.title}}</vs-td>
              <!-- <vs-td :data="tr.status">
                <vs-chip color="danger" v-if="tr.status == 0">Non Active</vs-chip>
                <vs-chip color="warning" v-if="tr.status == 1">Pending</vs-chip>
                <vs-chip color="success" v-if="tr.status == 2">Active</vs-chip>
              </vs-td> -->
              <vs-td>
                <div class="flex">
                  <vs-button class="mr-2" :to="{name: `crossfunction-edit`, params: {id: tr.id}}" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
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
      idDelete: null,
      idStatus: null,
      base_url_image: process.env.VUE_APP_API_URL
    }
  },
  computed:{
    ...mapState({
      data: state => state.crossfunction.rows
    })
  },
  methods:{
    ...mapActions({
      dispatchIndex: 'crossfunction/index',
      dispatchDestroy: 'crossfunction/destroy',
      dispatchUpdates: 'crossfunction/status'
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
        this.dispatchIndex(this.$route.params.id)
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: 'danger'
        })
      }
    },
    async confirmStatus () {
      try {
        await this.dispatchUpdates(this.idStatus)
        this.dispatchIndex()
        this.$vs.notify({
          title: 'Success',
          text: 'Your data has been deleted successfully',
          color: 'primary'
        })
        this.dispatchIndex(this.$route.params.id)
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: 'danger'
        })
      }
    },
    statusUpdate (id) {
      this.idStatus = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'success',
        title: 'Are you sure ?',
        text: 'Do you want to change status',
        accept: this.confirmStatus
      })
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
    this.dispatchIndex(this.$route.params.id).then(() => {
      this.$vs.loading.close()
    }).catch(() => {
      this.$vs.loading.close()
    })
  }
}
</script>
