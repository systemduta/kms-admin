<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vs-button
        class="ml-4 my-2"
        icon-pack="feather"
        icon="icon-arrow-left"
        size="small"
        type="border"
        @click="goBack"
      >
        Back
      </vs-button>
      <vx-card>
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <h3>Leaderboard</h3>
          </template>
          <template slot="thead">
            <vs-th>No.</vs-th>
            <vs-th>NIK</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Point</vs-th>
            <vs-th>Level</vs-th>
            <vs-th>Aksi</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr + 1">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.nik">{{ tr.nik }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.point">{{ tr.point }}</vs-td>
              <vs-td>
                <span class="badge bg-danger" v-if="tr.point <= 500"
                  >Beginner</span
                >
                <span
                  class="badge bg-success"
                  v-if="tr.point > 500 && tr.point <= 1000"
                  >Intermediate</span
                >
                <span class="badge bg-warning" v-if="tr.point > 1000"
                  >Advance</span
                >
              </vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    radius
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    size="small"
                    :to="{
                      name: `leaderboard-detail`,
                      params: {
                        golongan_id: tr.golongan_id,
                        user_id: tr.user_id,
                      },
                    }"
                  ></vs-button>
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      data: (state) => state.leaderboard.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "leaderboard/getLeaderboard",
    }),
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.$vs.loading();
    this.dispatchIndex(this.$route.params.id)
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>

<style scoped>
.badge {
  padding: 1px 5px;
  border-radius: 5px;
  color: white;
  font-weight: 400;
}
</style>
