<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Company">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button
              :to="{ name: 'company-create' }"
              size="small"
              icon-pack="feather"
              icon="icon-plus-circle"
            >
              Tambah Perusahaan
            </vs-button>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Code</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.code"><p v-html="tr.code"></p></vs-td>
              <vs-td>
                <div class="flex">
                  <custom-tooltip-button
                    text-tooltip="Lihat Divisi"
                    :to="{
                      name: `companydetail`,
                      params: { id: tr.id },
                    }"
                    icon="icon-eye"
                    color="primary"
                  />
                  <custom-tooltip-button
                    text-tooltip="Edit Perusahaan"
                    :to="{
                      name: `company-edit`,
                      params: { id: tr.id },
                    }"
                    icon="icon-edit"
                    color="warning"
                  />
                  <div @click="deletes(tr.id)">
                    <custom-tooltip-button
                      text-tooltip="Hapus Perusahaan"
                      icon="icon-delete"
                      color="danger"
                    />
                  </div>
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
import CustomTooltipButton from "../../components/CustomTooltipButton.vue";
export default {
  components: {
    CustomTooltipButton,
  },
  data() {
    return {
      idDelete: null,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.company.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "company/index",
      dispatchDestroy: "company/destroy",
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
        this.dispatchIndex();
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          // text: `Looks like something went wrong. please try again later (${error.data.message})`,
          text: "Looks like something went wrong. please try again later maybe you have another relevant data",
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
