<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Score VHS">
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
import { mapState, mapActions } from "vuex";
// import moment from "moment";
export default {
  data() {
    return {
      idDelete: null,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.score.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "score/index",
    }),
    // async confirmDelete() {
    //   try {
    //     await this.dispatchDestroy(this.idDelete);
    //     this.dispatchIndex();
    //     this.$vs.notify({
    //       title: "Success",
    //       text: "Your data has been deleted successfully",
    //       color: "primary",
    //     });

    //     this.dispatchIndex(this.$route.params.id);
    //   } catch (error) {
    //     this.$vs.notify({
    //       title: "Oops!",
    //       text: `Looks like something went wrong. please try again later (${error.data.message})`,
    //       color: "danger",
    //     });
    //   }
    // },
    // deletes(id) {
    //   this.idDelete = id;
    //   this.$vs.dialog({
    //     type: "confirm",
    //     color: "danger",
    //     title: "Are you sure ?",
    //     text: "Deleted data can no longer be restored",
    //     accept: this.confirmDelete,
    //   });
    // },
  },
  mounted() {
    this.$vs.loading();
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
