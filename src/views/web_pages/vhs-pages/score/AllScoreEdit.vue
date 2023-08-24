<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <!-- <h4 v-if="dataUser.length > 0">{{ dataCompany[0].name }}</h4>
      <h4 v-else>-</h4> -->
      <vx-card title="Edit Score 1VHS" elevation="9" shaped>
        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-model="storeData.nama_user"
              v-validate="'required'"
              name="name_user"
              label="Nama User"
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
              name="nama_company"
              v-model="storeData.nama_company"
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
              v-model="storeData.type"
              :disabled="true"
              name="nama_company"
            ></vs-input>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label="Nama Materi"
              name="nama_materi"
              v-model="storeData.nama_materi"
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
              v-model="storeData.question"
              :disabled="true"
              name="question"
            ></vs-input>
          </div>
        </div>

        <div class="vx-row mb-5">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              v-validate="'required'"
              label="Jawaban"
              name="answer"
              v-model="storeData.answer"
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
              name="score"
              v-model="storeData.score"
            ></vs-input>
          </div>
        </div>

        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button @click="store">Save</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import moment from "moment";
export default {
  data () {
    return {
      idDelete: null,
      storeData: {
        id: this.$route.params.id,
        materi_id: '',
        user_id: '',
        nama_user: '',
        nama_company: '',
        score: '',
        type: '',
        nama_materi: '',
        question: '',
        answer: ''
      }
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.score.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'score/show',
      dispatchUpdate: 'score/update'
    }),

    async getUser (id) {
      const co = await this.dispatchIndex(id)
      this.storeData.materi_id = co.success[0].id_materi_vhs
      this.storeData.user_id = co.success[0].users_id
      this.storeData.nama_user = co.success[0].nama_user
      this.storeData.nama_company = co.success[0].nama_company
      this.storeData.score = co.success[0].score
      this.storeData.type = co.success[0].type
      this.storeData.nama_materi = co.success[0].nama_materi
      this.storeData.question = co.success[0].question
      this.storeData.answer = co.success[0].answer
    },

    convertToFormData () {
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      [
        'id',
        'materi_id',
        'user_id',
        'nama_user',
        'nama_company',
        'score',
        'type',
        'nama_materi',
        'question',
        'answer'
      ].forEach((key) => {
        if (this.storeData[key]) data.append(`${key}`, this.storeData[key])
      })
      if (this.$route.params.id) data.append('_method', 'PUT')

      return data
    },
    store () {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false
        const formData = this.convertToFormData()
        if (!formData) return false
        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0]}, ${pair[1]}`);
        // }
        this.$vs.loading({
          type: 'radius',
          color: 'blue',
          textAfter: true,
          text: 'Please Wait ...'
        })
        this.isLoading = true
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formData)
            // console.log(formData);
          } else {
            await this.dispatchStore(formData)
          }
          this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Success!',
            text: 'Data was saved successfully!',
            color: 'success'
          })
          this.$router.push({ name: 'vhs-pages/score/all' })
        } catch (error) {
          this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Oops!',
            text: error.data.message,
            color: 'danger'
          })
        }
      })
    }
  },
  mounted () {
    this.$vs.loading({
      type: 'radius',
      color: 'blue',
      textAfter: true,
      text: 'Please Wait ...'
    })
    this.getUser(this.$route.params.id)
      .then(() => {
        this.$vs.loading.close()
      })
      .catch(() => {
        this.$vs.loading.close()
      })
  }
}
</script>
