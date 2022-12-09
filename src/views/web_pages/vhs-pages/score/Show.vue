<template>
  <div class="vx-row">
    <div v-if="dataUser.length > 0" class="w-full vx-col mb-base">
      <!-- <h4 v-if="dataUser.length > 0">{{ dataCompany[0].name }}</h4>
      <h4 v-else>-</h4> -->
      <vx-card title="Detail Score VHS" elevation="9" shaped>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              v-if="dataUser.length > 0"
              class="w-full"
              v-validate="'required'"
              label="Nama User"
              v-model="dataUser[0].nama_user"
              :disabled="true"
            ></vs-input>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label="Nama Perusahaan"
              v-model="dataUser[0].nama_company"
              :disabled="true"
            ></vs-input>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label="Tipe VHS"
              v-model="dataUser[0].type"
              :disabled="true"
            ></vs-input>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label="Nama Materi"
              v-model="dataUser[0].nama_materi"
              :disabled="true"
            ></vs-input>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label="Pertanyaan"
              v-model="dataUser[0].question"
              :disabled="true"
            ></vs-input>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label="Jawaban"
              v-model="dataUser[0].answer"
              :disabled="true"
            ></vs-input>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label="Score"
              v-model="dataUser[0].score"
              :disabled="true"
            ></vs-input>
          </div>
        </div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button
              color="dark"
              type="border"
              :to="{ name: `vhs-pages/score/all` }"
              >Back</vs-button
            >
          </div>
        </div>
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
      dataUser: [],
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.score.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "score/show",
      dispatchDestroy: "score/destroy",
    }),

    async getUser(id) {
      const co = await this.dispatchIndex(id);
      this.dataUser = co.success;
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.getUser(this.$route.params.id)
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
