<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Question materi 1VHS">
        <vs-table :data="response" class="mb-2">
          <template slot="header">
            <vs-button
              :to="{ name: 'vhs-pages/questionvhs/create' }"
              size="small"
              >Tambah Pertanyaan</vs-button
            >
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Materi</vs-th>
            <vs-th>Type</vs-th>
            <vs-th>Total Pertanyaan</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in response">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.isPreTest" v-if="tr.isPreTest == 1"
                >Pre Test</vs-td
              >
              <vs-td :data="tr.isPreTest" v-else>Post Test</vs-td>
              <vs-td :data="tr.totalQue">{{ tr.totalQue }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    @click="getdetail(tr.id, tr.name)"
                    size="small"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
      <vs-popup title="Detail Pertanyaan" :active.sync="isDetail">
        <vx-card>
          <h5>Nama Materi: {{ materiName }}</h5>
          <vs-table :data="resDetail" class="mb-2">
            <template slot="header">
              <vs-button
                :to="{ name: 'vhs-pages/questionvhs/create' }"
                size="small"
                >Tambah Pertanyaan</vs-button
              >
            </template>
            <template slot="thead">
              <vs-th>No</vs-th>
              <vs-th>Nama Question</vs-th>
              <vs-th>Total Jawaban</vs-th>
              <vs-th></vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in resDetail">
                <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
                <vs-td :data="tr.question">{{ tr.question }}</vs-td>
                <vs-td :data="tr.totalAns">{{ tr.totalAns }}</vs-td>
                <vs-td>
                  <div class="flex">
                    <vs-button
                      class="mr-2"
                      icon-pack="feather"
                      icon="icon-eye"
                      @click="toAnswer(tr.id)"
                      v-on:mouseover="showMessage(1)"
                      v-bind:title="message"
                      size="small"
                    ></vs-button>
                    <vs-button
                      class="mr-2"
                      @click="toEdit(tr.id)"
                      icon-pack="feather"
                      icon="icon-edit"
                      size="small"
                      v-on:mouseover="showMessage(2)"
                      v-bind:title="message"
                    ></vs-button>
                    <vs-button
                      color="danger"
                      @click="ujiClick(tr.id)"
                      icon-pack="feather"
                      icon="icon-delete"
                      size="small"
                      v-on:mouseover="showMessage(3)"
                      v-bind:title="message"
                    ></vs-button>
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vx-card>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      idDelete: null,
      cekData: [],
      response: [],
      isDetail: false,
      resDetail: [],
      message: "",
      materiName: "",
    };
  },
  beforeRouteLeave(to, from, next) {
    this.isDetail = false;
    next();
  },
  computed: {
    ...mapState({
      data: (state) => state.questionvhs.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "questionvhs/indexmat",
      dispatchDetail: "questionvhs/indexdet",
      dispatchDestroy: "questionvhs/destroy",
      dispatchShowAnswer: "questionvhs/getanswer",
    }),
    toAnswer(id) {
      this.isDetail = false;
      setTimeout(() => {
        this.$router.push({
          name: `vhs-pages/questionvhs/answer`,
          params: { id: id },
        });
      }, 500);
    },
    toEdit(id) {
      this.isDetail = false;
      setTimeout(() => {
        this.$router.push({
          name: `vhs-pages/questionvhs/edit`,
          params: { id: id },
        });
      }, 500);
    },
    showMessage(id) {
      if (id == 1) {
        this.message = "Lihat data jawaban";
      } else if (id == 2) {
        this.message = "Edit Pertanyaan";
      } else if (id == 3) {
        this.message = "Hapus Pertanyaan";
      }
    },

    async ujiClick(id) {
      const co = await this.dispatchShowAnswer(id);
      this.cekData = co.success;
      if (this.cekData.length > 0) {
        this.$vs.notify({
          title: "Oops!",
          text: `Maaf, Ada data jawaban`,
          color: "danger",
        });
      } else {
        this.isDetail = false;
        setTimeout(() => {
          this.deletes(id);
        }, 500);
      }
    },

    async confirmDelete() {
      try {
        await this.dispatchDestroy(this.idDelete);
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });
        this.getData();
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
    async getData() {
      const res = await this.dispatchIndex(this.$route.params.id);
      this.response = res.data;
      this.$vs.loading.close();
    },
    async getdetail(id, name) {
      const res = await this.dispatchDetail(id);
      this.resDetail = res.data;

      this.materiName = name;
      this.isDetail = true;
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.getData();
  },
};
</script>
