<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card>
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <h3>
              Leaderboard
            </h3>
          </template>
          <template slot="thead">
            <vs-th>Username</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Point</vs-th>
            <vs-th>Level</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.username">{{tr.username}}</vs-td>
              <vs-td :data="tr.name">{{tr.name}}</vs-td>
              <vs-td :data="tr.point">{{tr.point}}</vs-td>
              <vs-td>
                <span class="badge bg-danger" v-if="tr.point <= 500">Beginner</span>
                <span class="badge bg-success" v-if="tr.point > 500 && tr.point <= 1000">Intermediate</span>
                <span class="badge bg-warning" v-if="tr.point > 1000">Advance</span>
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

    }
  },
  computed:{
    ...mapState({
      data: state => state.leaderboard.rows
    })
  },
  methods:{
    ...mapActions({
      dispatchIndex: 'leaderboard/getLeaderboard'
    })
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

<style scoped>
.badge {
  padding: 1px 5px;
  border-radius: 5px;
  color: white;
  font-weight: 400;
}
</style>
