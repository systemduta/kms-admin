<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card>
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <h3>
              All Exam Result
            </h3>
          </template>
          <template slot="thead">
            <vs-th sort-key="name">Name</vs-th>
            <vs-th sort-key="title">Course</vs-th>
            <vs-th sort-key="score">Score</vs-th>
            <vs-th sort-key="is_pre_test">PreTest/Post Test</vs-th>
            <vs-th sort-key="status">Status</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.name">{{tr.name}}</vs-td>
              <vs-td :data="tr.title">{{tr.title}}</vs-td>
              <vs-td :data="tr.score">{{tr.status==1?'':tr.score}}</vs-td>
              <vs-td :data="tr.is_pre_test">
                <vs-chip transparent color="dark" v-if="tr.is_pre_test==0">Post Test</vs-chip>
                <vs-chip transparent color="#24c1a0" v-if="tr.is_pre_test==1">Pre Test</vs-chip>
              </vs-td>
              <vs-td :data="tr.status">
                <vs-chip color="primary" v-if="tr.status==2">Finish</vs-chip>
                <vs-chip color="danger" v-if="tr.status==1">On Going</vs-chip>
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
      data: state => state.leaderboard.exam_result
    })
  },
  methods:{
    ...mapActions({
      dispatchExamResult: 'leaderboard/exam_result'
    })
  },
  mounted () {
    this.$vs.loading()
    this.dispatchExamResult().then(() => {
      this.$vs.loading.close()
    }).catch(() => {
      this.$vs.loading.close()
    })
  }
}
</script>
