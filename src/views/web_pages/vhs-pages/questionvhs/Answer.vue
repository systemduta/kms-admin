//TODO kurang search dan pagination

<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="User Answer VHS">
        Question:
        <h4 v-if="dataJudul">
          {{ dataJudul }}
        </h4>
        <h4 v-else>-</h4>
        <vs-table pagination :data="dataAnswer" class="mb-2">
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama user</vs-th>
            <vs-th>Answer</vs-th>
            <vs-th>Tanggal</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(item, indextr) in dataAnswer">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="item.name">{{ item.name }}</vs-td>
              <vs-td :data="item.answer">{{ item.answer }}</vs-td>
              <vs-td :data="item.date_update">{{ item.date_update }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    :to="{
                      name: `vhs-pages/questionvhs/score`,
                      params: { id: item.id_answer },
                    }"
                    icon-pack="feather"
                    icon="icon-edit"
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
      dataAnswer: [],
      dataJudul: "",
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.questionvhs.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "questionvhs/index",
      dispatchShowAnswer: "questionvhs/getanswer",
    }),

    ujiClick(id) {
      console.log(id);
    },

    async getAnswer(id) {
      const co = await this.dispatchShowAnswer(id);
      this.dataAnswer = co.success;
      this.dataJudul = co.question.question;
      // console.log(this.dataJudul);
    },
  },
  async mounted() {
    this.$vs.loading();
    await this.getAnswer(this.$route.params.id)
      // this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
