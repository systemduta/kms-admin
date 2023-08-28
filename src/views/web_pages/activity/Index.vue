<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Riwayat aktivitas account">
        <vs-table pagination max-items="10" search :data="datas" class="mb-2">
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama</vs-th>
            <vs-th>Time</vs-th>
            <vs-th>Details</vs-th>
            <!-- <vs-th></vs-th> -->
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.username">{{ tr.username }}</vs-td>
              <vs-td :data="tr.time">{{ tr.time }}</vs-td>
              <vs-td :data="tr.details">{{ tr.details }}</vs-td>
              <!-- <vs-td>
                <div class="flex">
                  <div @click="getDetail(tr.id)">
                    <custom-tooltip-button
                      text-tooltip="lihat data"
                      icon="icon-eye"
                      color="success"
                    />
                  </div>
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button>
                  <vs-button
                    color="danger"
                    icon-pack="feather"
                    icon="icon-delete"
                    size="small"
                  ></vs-button>
                </div>
              </vs-td> -->
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CustomTooltipButton from "@/views/components/CustomTooltipButton";
export default {
  components: {
    CustomTooltipButton,
  },
  data() {
    return {
      idDelete: null,
      datas: [],
    };
  },
  methods: {
    ...mapActions({
      dispatchIndex: "activity/index",
      dispatchDestroy: "activity/destroy",
      dispatchStore: "activity/store",
      dispatchShow: "activity/show",
      dispatchUpdate: "activity/update",
    }),
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
    async getDatas() {
      try {
        const response = await this.dispatchIndex();
        this.datas = response.data;
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: error.data.message,
          color: "danger",
        });
      }
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.getDatas()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
