<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Daftar User">
        <vs-table search :data="datas" pagination max-items="10" class="mb-2">
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama</vs-th>
            <vs-th>Perusahaan</vs-th>
            <vs-th>Score</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="index" v-for="(tr, index) in data">
              <vs-td :data="index">{{ index + 1 }}</vs-td>
              <vs-td :data="tr.username">{{ tr.username }}</vs-td>
              <vs-td :data="tr.comname">{{ tr.comname }}</vs-td>
              <vs-td :data="tr.score">{{ tr.score }}</vs-td>
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
    return {
      idDelete: null,
      datas: [],
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.softskill.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "softskill/leaderboard",
    }),

    async master($id) {
      const data = await this.dispatchIndex($id);
      this.datas = data.success;
    },
  },
  mounted() {
    this.$vs.loading();
    this.master(this.$route.params.id)
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
