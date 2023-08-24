<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Cross Function">
        <vs-table stripe search :data="data" class="mb-2">
        <!-- <template slot="header">
          <vs-button :to="{name: 'cross-create'}">Add Cross Function</vs-button>
        </template> -->
          <template slot="thead">
            <vs-th>Cross Function</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.organization.name">{{tr.organization.name}}</vs-td>
              <vs-td>
                <div class="flex">
                  <!-- <vs-button class="mr-2" :to="{name: `sop-edit`, params: {id: tr.id}}" icon-pack="feather" icon="icon-edit" size="small"></vs-button> -->
                  <!-- <vs-button class="mr-2" @click="updateQuestion" icon-pack="feather" icon="icon-edit" size="small"></vs-button> -->
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
import {mapActions, mapState} from 'vuex'
import vSelect from 'vue-select'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    vSelect
  },
  data () {
    return {
      popUp: false,
      idDelete: null,
      idUpdate: null,
      idDeletes: null,
      updatePopUp: false,
      questionPopUp: false,
      f_question: '',
      id: '',
      f_name: '',
      f_is_true: false
    }
  },
  computed:{
    ...mapState({
      data: state => state.sop.rows
    })
  },
  methods:{
    ...mapActions({
      dispatchStoreQuestion: 'sop/store_cross',
      dispatchAllQuestion: 'sop/getCross',
      // dispatchUpdates: 'sop/update_answer',
      dispatchShow: 'sop/show',
      // dispatchDestroy: 'sop/delete',
      dispatchDelete: 'sop/delete'

    }),
    addQuestion () {
      this.popUp = true
    },
    clearForm () {
      this.f_question = ''
    },
    async confirmUpdates () {

      const payload = {
        id: this.id,
        name: this.f_name,
        is_true: this.f_is_true
      }
      // console.log(payload);
      await this.dispatchUpdates(payload).then(() => {
        this.$vs.loading()
        this.dispatchAllQuestion(this.$route.params.id).then(() => {
          this.$vs.loading.close()
        }).catch(() => {
          this.$vs.loading.close()
        })
      })
      this.clearFormmm()
      this.updatePopUp = false
    },
    updates (id) {
      this.id = id
      this.idUpdate = id
      this.updatePopUp = true
    },
    async confirmDeletes () {
      try {
        await this.dispatchDelete(this.idDeletes).then(() => {
          this.$vs.loading()
          this.dispatchAllQuestion(this.$route.params.id).then(() => {
            this.$vs.loading.close()
          }).catch(() => {
            this.$vs.loading.close()
          })
        })
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
      this.idDeletes = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Are you sure ?',
        text: 'Deleted data can no longer be restored',
        accept: this.confirmDeletes
      })
    }
  },
  mounted () {
    this.$vs.loading()
    this.dispatchAllQuestion(this.$route.params.id).then(() => {
      this.$vs.loading.close()
    }).catch(() => {
      this.$vs.loading.close()
    })
  }
}
</script>
