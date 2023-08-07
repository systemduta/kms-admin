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
        <vs-table pagination max-items="10" search :data="data" class="mb-2">
          <template slot="header">
            <h3>All Exam Result</h3>
          </template>
          <template slot="thead">
            <vs-th sort-key="name">No</vs-th>
            <vs-th sort-key="name">Name</vs-th>
            <vs-th sort-key="title">Course</vs-th>
            <vs-th sort-key="score">Score</vs-th>
            <vs-th sort-key="is_pre_test">PreTest/Post Test</vs-th>
            <vs-th sort-key="status">Status</vs-th>
            <vs-th sort-key="status">Aksi</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr + 1">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.title">{{ tr.title }}</vs-td>
              <vs-td :data="tr.score">{{
                tr.status == 1 ? "0" : tr.score
              }}</vs-td>
              <vs-td :data="tr.is_pre_test">
                <vs-chip
                  transparent
                  color="dark"
                  v-if="tr.is_pre_test === 0 || tr.is_pre_test === null"
                >
                  Post Test
                </vs-chip>
                <vs-chip
                  transparent
                  color="#24c1a0"
                  v-if="tr.is_pre_test === 1"
                >
                  Pre Test
                </vs-chip>
                <!-- <vs-chip transparent color="#24c1a0" v-else> Not set </vs-chip> -->
              </vs-td>
              <vs-td :data="tr.status">
                <vs-chip color="primary" v-if="tr.status == 2">Finish</vs-chip>
                <vs-chip color="danger" v-if="tr.status == 1">On Going</vs-chip>
              </vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    @click="deletes(tr.id)"
                    icon-pack="feather"
                    icon="icon-delete"
                    color="danger"
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
export default {
  data() {
    return {
      idDelete: "",
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.leaderboard.exam_result,
    }),
  },
  methods: {
    ...mapActions({
      dispatchExamResult: "leaderboard/exam_result",
      dispatchDestroy: "leaderboard/destroy",
    }),
    goBack() {
      this.$router.go(-1);
    },
    async confirmDelete() {
      try {
        await this.dispatchDestroy(this.idDelete);
        this.dispatchExamResult();
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });
        this.dispatchExamResult();
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: `Looks like something went wrong. please try again later (${error})`,
          color: "danger",
        });
      }
    },
    deletes(id) {
      this.idDelete = id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Are you sure ?",
        text: "Deleted data can no longer be restored",
        accept: this.confirmDelete,
      });
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.dispatchExamResult()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
