<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Answer 1VHS: Jadwal">
        <vs-table pagination max-item="10" search :data="data" class="mb-2">
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama 1VHS</vs-th>
            <vs-th>Batch</vs-th>
            <vs-th>Type</vs-th>
            <vs-th>Jumlah Materi</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.batch">{{ tr.batch }}</vs-td>
              <vs-td :data="tr.type">{{ tr.type }}</vs-td>
              <vs-td :data="tr.ttlMateri">{{ tr.ttlMateri }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    type="border"
                    class="mr-2"
                    @click="getMateri(tr.id)"
                    icon-pack="feather"
                    icon="icon-chevrons-right"
                    size="small"
                    >Lihat Materi</vs-button
                  >
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <!-- popup materi -->
        <vs-popup title="Answer 1VHS: Materi" :active.sync="materipopup">
          <vs-table :data="resMateri" class="mb-2">
            <template slot="thead">
              <vs-th>No</vs-th>
              <vs-th>Name</vs-th>
              <vs-th>Type</vs-th>
              <vs-th></vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
                <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                <vs-td :data="tr.type">{{ tr.type }}</vs-td>
                <vs-td>
                  <div class="flex">
                    <vs-button
                      type="border"
                      class="mr-2"
                      @click="getQue(tr.id)"
                      icon-pack="feather"
                      icon="icon-chevrons-right"
                      size="small"
                      >Lihat Pertanyaan</vs-button
                    >
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vs-popup>

        <!-- popup pertanyaan -->
        <vs-popup
          title="Answer 1VHS: Pertanyaan"
          :active.sync="quePopup"
          @close="closePopup"
        >
          <vs-table :data="resQue" class="mb-2">
            <template slot="thead">
              <vs-th>No</vs-th>
              <vs-th>Pertanyaan</vs-th>
              <vs-th></vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
                <vs-td :data="tr.question">{{ tr.question }}</vs-td>
                <vs-td>
                  <div class="flex">
                    <vs-button
                      type="border"
                      class="mr-2"
                      @click="getAnswer(tr.id, tr.materi_id)"
                      icon-pack="feather"
                      icon="icon-chevrons-right"
                      size="small"
                      >Lihat Jawaban</vs-button
                    >
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vs-popup>

        <!-- popup jawban -->
        <vs-popup
          fullscreen
          title="Answer 1VHS: Jawaban"
          :active.sync="answerPopup"
          @close="
            answerPopup = false;
            quePopup = true;
          "
        >
          <vs-table search :data="resAns" class="mb-2">
            <template slot="thead">
              <vs-th width="5%">No</vs-th>
              <vs-th width="15%">Nama</vs-th>
              <vs-th width="15%">Perusahaan</vs-th>
              <vs-th width="45%">Jawaban</vs-th>
              <vs-th width="10%">File</vs-th>
              <vs-th></vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
                <vs-td :data="tr.username">{{ tr.username }}</vs-td>
                <vs-td :data="tr.company">{{ tr.company }}</vs-td>
                <vs-td :data="tr.answer">{{ tr.answer }}</vs-td>
                <vs-td :data="tr.file" v-if="!tr.file">Tidak ada file</vs-td>
                <vs-td :data="tr.file" v-else>
                  <a
                    :href="urlFile + tr.file"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Ada File</a
                  >
                </vs-td>
                <vs-td>
                  <div class="flex">
                    <vs-button
                      type="border"
                      class="mr-2"
                      @click="toOther(tr.jadwalid)"
                      icon-pack="feather"
                      icon="icon-chevrons-right"
                      size="small"
                    ></vs-button>
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vs-popup>
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
      materipopup: false,
      quePopup: false,
      answerPopup: false,
      resMateri: [],
      resQue: [],
      resAns: [],
      urlFile: process.env.VUE_APP_API_URL + "/file/answervhs/",
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
      dispatchMateri: "score/showMateri",
      dispatchQue: "score/showQue",
      dispatchAns: "score/showAnswer",
    }),
    closePopup(value) {
      if (!value) {
        this.quePopup = false;
        this.materipopup = true;
      }
    },
    toOther(id) {
      this.answerPopup = false;
      setTimeout(() => {
        this.$router.push({ name: `indexdetail`, params: { id: id } });
      }, 2000);
    },
    async getAnswer(question_id, materi_id) {
      const data = new FormData();
      data.append("question_id", question_id);
      data.append("materi_id", materi_id);
      try {
        const res = await this.dispatchAns(data);
        // console.log(res.success);
        this.resAns = res.success;
        this.materipopup = false;
        this.quePopup = false;
        this.answerPopup = true;
      } catch (error) {
        console.log(error);
      }
    },
    async getMateri(id) {
      try {
        const res = await this.dispatchMateri(id);
        this.resMateri = res.success;
        this.materipopup = true;
      } catch (error) {
        console.log(error);
      }
    },

    async getQue(id) {
      try {
        const res = await this.dispatchQue(id);
        this.resQue = res.success;
        this.materipopup = false;
        this.quePopup = true;
      } catch (error) {
        console.log(error);
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
