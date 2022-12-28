<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="All Division">
        <vs-table search :data="data" class="mb-2">
          <!-- button create division -->
          <template slot="header">
            <!-- <vs-button @click="popupActivo=true" :to="{name: 'division-create'}">Create Division</vs-button> -->
            <vs-button @click="popupActivo=true">Create Perusahaan</vs-button>
            <vs-popup class="holamundo"  title="Input Data Perusahaan" :active.sync="popupActivo">
              <vx-card>
                <div class="vx-row mb-5">
                  <div class="vx-col w-full">
                  <vs-input class="w-full" v-validate="'required'" name="name" label="Perusahaan" v-model="name"></vs-input>
                  <span class="text-danger text-sm" v-show="errors.has('name')">{{errors.first('name')}}</span>
                  </div>
                </div>
                <div class="vx-row mb-5 mt-10">
                  <div class="vx-col w-full">
                  <vs-input class="w-full" v-validate="'required'" name="name" label="Nama Perusahaan" v-model="name"></vs-input>
                  <span class="text-danger text-sm" v-show="errors.has('name')">{{errors.first('name')}}</span>
                  </div>
                </div>
                <div class="vx-row mb-5 mt-10">
                  <div class="vx-col w-full">
                    <vs-input class="w-full" v-validate="'required'" name="code" label="Kode" v-model="code"></vs-input>
                    <span class="text-danger text-sm" v-show="errors.has('code')">{{errors.first('code')}}</span>
                  </div>
                </div>
                <vs-button @click="store" class="right">Simpan</vs-button>
              </vx-card>
            </vs-popup>
          </template>
          <!-- table -->
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Code</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{(indextr+1)}}</vs-td>
              <vs-td :data="tr.name">{{tr.name}}</vs-td>
              <vs-td :data="tr.code">{{tr.code}}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button class="mr-2" :to="{name: `division-edit`, params: {id: tr.id}}" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
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
import vSelect from 'vue-select'
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      idDelete: null,
      image: process.env.VUE_APP_API_URL,
      popupActivo:false,
      auth: JSON.parse(localStorage.getItem('userInfo')).data,
      name:'',
      code:'',
      company_id:null,
      companies:[],
    }
  },
  components:{
    vSelect
  },
  computed:{
    ...mapState({
      data: state => state.division.rows
    })
  },
  methods:{
    ...mapActions({
      dispatchIndex: 'division/index',
      dispatchDestroy: 'division/destroy',
      dispatchStore: 'division/store',
      dispatchUpdate: 'division/update',
      dispatchShow: 'division/show',
      dispatchGetCompanies: 'master/companies',
    }),
    async confirmDelete () {
      try {
        await this.dispatchDestroy(this.idDelete)
        await this.dispatchIndex()
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
    },
    async getMaster () {
      if (this.auth.role == 1) {
        const co = await this.dispatchGetCompanies()
        this.companies = co.data
      }
      if (this.$route.params.id) {
        await this.getDetail()
      }
    },
    store () {
      this.$validator.validateAll().then(async res => {
        if (!res) return false
        const payload = {
          id: this.$route.params.id,
          company_id: this.company_id,
          name: this.name,
          code: this.code
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
          this.$router.push({name: 'division'})
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
      const { data } = await this.dispatchShow(this.$route.params.id)
      this.name = data.name
      this.code = data.code
      this.company_id = data.company_id
    },
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
