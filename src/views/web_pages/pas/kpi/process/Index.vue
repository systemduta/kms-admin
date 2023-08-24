<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vs-button
        color="primary"
        type="flat"
        icon="arrow_back_ios"
        @click="goBack"
        >Kembali</vs-button
      >
      <vx-card title="KPI PAS">
        <table>
          <tr>
            <td>Nama Parameter</td>
            <td>&nbsp;:&nbsp;</td>
            <td>{{ nama3p }}</td>
          </tr>
          <tr>
            <td>Nama Dimensi</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              {{ namaDimensi }}
            </td>
          </tr>
        </table>
      </vx-card>
      <hr />
      <vx-card title="Pilih Perusahaan">
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
      nama3p: this.$route.params.name3p,
      namaDimensi: this.$route.params.nameDimensi,
      listKpi: [],
      getList: [],

      //dikirim ke page selanjutnya
      id3p: this.$route.params.id3p,
      idDimensi: this.$route.params.id,
      idCompany: null,
      idDivisi: null
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
      this.isDivisi = false
      setTimeout(() => {
        this.$router.push({
          name: 'processDetailKpiPas',
          params: {
            id3p: this.id3p,
            idDimensi: this.idDimensi,
            idCompany: this.idCompany,
            idDivisi: id
          }
        })
      }, 500)
    },
    goBack () {
      this.$router.push({
        name: 'processDimensiPas',
        params: {
          id: this.$route.params.idKpi
        }
      })
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
