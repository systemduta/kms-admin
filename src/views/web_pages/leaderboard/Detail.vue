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
      <vx-card title="Detail" class="mb-5">
        <table>
          <tr>
            <td style="width: 40%">Nama</td>
            <td style="width: 5%">:</td>
            <td class="mr-3">
              {{ detail && detail[0] ? detail[0].name : "" }}
            </td>
          </tr>
          <tr>
            <td style="width: 40%">NIK</td>
            <td style="width: 5%">:</td>
            <td>{{ detail && detail[0] ? detail[0].nik : "" }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Total score</td>
            <td style="width: 5%">:</td>
            <td>{{ total && total.point }}</td>
          </tr>
        </table>
      </vx-card>
      <vx-card>
        <vs-table search :data="detail" class="mb-2">
          <template slot="header">
            <h3>Data Course</h3>
          </template>
          <template slot="thead">
            <vs-th>No.</vs-th>
            <vs-th>Course</vs-th>
            <vs-th>Score</vs-th>
            <vs-th>Aksi</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr + 1">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.title">{{ tr.title }}</vs-td>
              <vs-td :data="tr.score">{{ tr.score }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    color="danger"
                    icon-pack="feather"
                    icon="icon-delete"
                    size="small"
                    @click="deletes(tr.id)"
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
      idDelete: null,
      golongan_id: this.$route.params.golongan_id,
      user_id: this.$route.params.user_id,
      detail: [],
      total: null,
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      dispatchIndex: "leaderboard/getLeaderboardDetail",
      dispatchDestroy: "leaderboard/destroy",
    }),
    goBack() {
      this.$router.go(-1);
    },
    async getDetail() {
      try {
        const data = new FormData();
        data.append("golongan_id", this.golongan_id);
        data.append("user_id", this.user_id);

        this.$vs.loading({
          type: "radius",
          color: "blue",
          textAfter: true,
          text: "Please Wait ...",
        });

        var res = await this.dispatchIndex(data);
        this.detail = res.data;
        this.total = res.total;

        this.$vs.loading.close();
      } catch (error) {
        this.$vs.loading.close();
      }
    },

    async confirmDelete() {
      try {
        await this.dispatchDestroy(this.idDelete);
        this.getDetail();
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });
        this.getDetail();
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
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
    this.getDetail();
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
