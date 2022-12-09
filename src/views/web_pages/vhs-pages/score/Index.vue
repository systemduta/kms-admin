<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Score VHS">
        <vs-table pagination search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'vhs-pages/score/all' }">
              All Score
            </vs-button>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Company</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    :to="{
                      name: `vhs-pages/scorecompany`,
                      params: { id: tr.id },
                    }"
                    icon-pack="feather"
                    icon="icon-eye"
                    size="small"
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
// import moment from "moment";
export default {
  data() {
    return {
      idDelete: null,
      cekData: [],
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.score.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "score/getCompany",

      dispatchGetUserPerCompany: "score/getuserpercompany",
    }),
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
