<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Jadwal VHS">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'jadwal-create' }"
              >Create Jadwal vhs</vs-button
            >
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama</vs-th>
            <vs-th>Batch</vs-th>
            <vs-th>Start</vs-th>
            <vs-th>End</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.batch">{{ tr.batch }}</vs-td>
              <vs-td :data="tr.start">{{ format_date(tr.start) }}</vs-td>
              <vs-td :data="tr.end">{{ format_date(tr.end) }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    :to="{ name: `jadwal-edit`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button>
                  <vs-button
                    color="danger"
                    @click="deletes(tr.id)"
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
import moment from "moment";
export default {
  data() {
    return {
      idDelete: null,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.jadwal.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "jadwal/index",
      dispatchDestroy: "jadwal/destroy",
    }),

    btnCLick() {
      console.log("btn klik");
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
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
          text: `Jadwal ini sudah ada materi didalamnya, harap hapus terlebih dahulu`,
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
