<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Lampiran">
        <vs-table pagination max-items="10" search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'lampiran-create' }"
              >Create Lampiran</vs-button
            >
          </template>
          <template slot="thead">
            <vs-th>No.</vs-th>
            <vs-th>Nama Perusahaan</vs-th>
            <vs-th>Name Lampiran</vs-th>
            <vs-th>Name SOP</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <!-- <vs-td :data="tr.status">
                <div v-if="tr.status == 0">
                  No Request
                </div>
                <vs-button color="danger" v-if="tr.status == 2" @click="statusUpdate(tr.id)">Non Active</vs-button>
                <vs-button color="success" v-if="tr.status == 1" @click="statusUpdate(tr.id)">Active</vs-button>
              </vs-td> -->
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.company['name']">{{ tr.company["name"] }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.sop.title">{{ tr.sop.title }}</vs-td>
              <!-- <vs-td :data="tr.status">
                <vs-chip color="danger" v-if="tr.status == 0">Non Active</vs-chip>
                <vs-chip color="warning" v-if="tr.status == 1">Pending</vs-chip>
                <vs-chip color="success" v-if="tr.status == 2">Active</vs-chip>
              </vs-td> -->
              <vs-td>
                <div class="flex">
                  <vs-button
                    @click="downData(tr.id)"
                    color="warning"
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-download"
                    size="small"
                  ></vs-button>
                  <vs-button
                    class="mr-2"
                    :to="{ name: `lampiran-edit`, params: { id: tr.id } }"
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
export default {
  data() {
    return {
      idDelete: null,
      idStatus: null,
      base_url_image: process.env.VUE_APP_API_URL,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.lampiran.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "lampiran/index",
      dispatchDestroy: "lampiran/destroy",
      dispatchUpdates: "lampiran/status",
    }),
    async downData(id) {
      this.$http
        .get("api/web/downlamp/" + id)
        .then((response) => {
          const link = document.createElement("a");
          link.href =
            process.env.VUE_APP_API_URL + "/files/" + response.data.data;
          // link.setAttribute("download", response.data.data);

          link.setAttribute("target", "_blank");
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
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
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: "danger",
        });
      }
    },
    async confirmStatus() {
      try {
        await this.dispatchUpdates(this.idStatus);
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
    statusUpdate(id) {
      this.idStatus = id;
      this.$vs.dialog({
        type: "confirm",
        color: "success",
        title: "Are you sure ?",
        text: "Do you want to change status",
        accept: this.confirmStatus,
      });
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
