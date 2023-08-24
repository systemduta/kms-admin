<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Lihat Nilai PAS">
        <vs-table search :data="data" class="mb-2">
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Code</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.code"><p v-html="tr.code"></p></vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    @click="getDivisi(tr.id)"
                    size="small"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>

      <vs-popup
        fullscreen
        :active.sync="isDivisi"
        title="Pilih Divisi Perusahaan"
      >
        <vx-card>
          <vs-table
            pagination
            max-items="10"
            search
            :data="getList"
            class="mb-2"
          >
            <template slot="thead">
              <vs-th>No</vs-th>
              <vs-th>Name</vs-th>
              <vs-th>Code</vs-th>
              <vs-th></vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
                <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                <vs-td :data="tr.code">{{ tr.code }}</vs-td>
                <vs-td>
                  <div class="flex">
                    <vs-button
                      icon-pack="feather"
                      icon="icon-eye"
                      size="small"
                      @click="toDetail(tr.id)"
                    ></vs-button>
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vx-card>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      isAdd: false,
      isUpdate: false,
      isDivisi: false,
      idDelete: null,
      idCompany: null,
      idDivisi: null,
      listKpi: [],
      getList: []
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.masterpas.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'masterpas/index_company',
      dispatchDivisi: 'masterpas/index_divisi'
    }),
    toDetail (id) {
      this.isDivisi = !this.isDivisi
      setTimeout(() => {
        this.$router.push({
          name: 'nilaidetailpas',
          params: {
            idCompany: this.idCompany,
            idDivisi: id
          }
        })
      }, 500)
    },
    async getDivisi (id) {
      this.idCompany = id
      const dataDivisi = await this.dispatchDivisi(id)
      this.getList = dataDivisi.data
      this.isDivisi = true
    }
  },
  mounted () {
    this.$vs.loading({
      type: 'radius',
      color: 'blue',
      textAfter: true,
      text: 'Please Wait ...'
    })
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close()
      })
      .catch(() => {
        this.$vs.loading.close()
      })
  }
}
</script>
