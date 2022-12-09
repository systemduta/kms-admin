<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Jadwal Zoom meeting VHS">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'zoom-vhs-create' }"
              >Create zooms</vs-button
            >
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama VHS</vs-th>
            <vs-th>Nama Batch</vs-th>
            <vs-th>Judul Zoom</vs-th>
            <vs-th>Time</vs-th>
            <vs-th>Link</vs-th>
            <vs-th>Meeting id</vs-th>
            <vs-th>Password</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.jadwalvhs_name">{{ tr.jadwalvhs_name }}</vs-td>
              <vs-td :data="tr.batch">{{ tr.batch }}</vs-td>
              <vs-td :data="tr.zoom_name">{{ tr.zoom_name }}</vs-td>
              <vs-td :data="tr.times">{{ tr.times }}</vs-td>
              <vs-td :data="tr.link">{{ tr.link }}</vs-td>
              <vs-td :data="tr.meeting_id">{{ tr.meeting_id }}</vs-td>
              <vs-td :data="tr.password">{{ tr.password }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    :to="{ name: `zoom-vhs-edit`, params: { id: tr.zoom_id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button>
                  <vs-button
                    color="danger"
                    @click="deletes(tr.zoom_id)"
                    icon-pack="feather"
                    icon="icon-delete"
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
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.zoom.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "zoom/index",
      dispatchDestroy: "zoom/destroy",
    }),
    // format_date(value) {
    //   if (value) {
    //     return moment(String(value)).format("DD/MM/YYYY");
    //   }
    // },
    async confirmDelete() {
      try {
        await this.dispatchDestroy(this.idDelete);
        this.dispatchIndex();
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });

        this.dispatchIndex(this.$route.params.id);
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
