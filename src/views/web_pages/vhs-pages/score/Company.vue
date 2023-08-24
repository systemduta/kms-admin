<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card>
        Company:
        <h4 v-if="dataCompany.length > 0">{{ dataCompany[0].name }}</h4>
        <h4 v-else>-</h4>
        <vs-table pagination search :data="data" class="mb-2">
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama</vs-th>
            <vs-th>Question</vs-th>
            <vs-th>Answer</vs-th>
            <vs-th>Type</vs-th>
            <vs-th>Score</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.nama_user">{{ tr.nama_user }}</vs-td>
              <vs-td :data="tr.question">{{ tr.question }}</vs-td>
              <vs-td :data="tr.answer">{{ tr.answer }}</vs-td>
              <vs-td :data="tr.type">{{ tr.type }}</vs-td>
              <vs-td :data="tr.score">{{ tr.score }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import moment from "moment";
export default {
  data () {
    return {
      idDelete: null,
      dataCompany: []
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.score.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'score/getuserpercompany'
    }),

    async getDataCompany (id) {
      const co = await this.dispatchIndex(id)
      this.dataCompany = co.company
    }
  },
  mounted () {
    this.$vs.loading({
      type: 'radius',
      color: 'blue',
      textAfter: true,
      text: 'Please Wait ...'
    })
    this.dispatchIndex(this.$route.params.id)
      .then(() => {
        this.$vs.loading.close()
      })
      .catch(() => {
        this.$vs.loading.close()
      })
    this.getDataCompany(this.$route.params.id)
  }
}
</script>
