<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="Input Data Division">
        <div class="vx-row mb-5" v-if="auth.role == 1">
          <div class="vx-col w-full">
            <small>Companies</small>
            <v-select @search:blur="organization_id=null" v-model="company_id" :options="companies" v-validate="'required'" name="company"  :reduce="e => e.id" label="name"></v-select>
            <span class="text-danger text-sm" v-show="errors.has('company')">{{errors.first('company')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required'" name="name" label="Name" v-model="name"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('name')">{{errors.first('name')}}</span>
          </div>
        </div>
        <div class="vx-row mb-5 mt-10">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required'" name="code" label="Code" v-model="code"></vs-input>
            <span class="text-danger text-sm" v-show="errors.has('code')">{{errors.first('code')}}</span>
          </div>
        </div>
        <vs-button @click="store">Save</vs-button>
      </vx-card>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
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
  methods:{
    ...mapActions({
      dispatchStore: 'division/store',
      dispatchUpdate: 'division/update',
      dispatchShow: 'division/show',
      dispatchGetCompanies: 'master/companies',
    }),
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
</style>
