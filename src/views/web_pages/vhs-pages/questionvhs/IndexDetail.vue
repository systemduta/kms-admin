<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Question materi 1VHS">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'vhs-pages/questionvhs/create' }"
              >Tambah Pertanyaan</vs-button
            >
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama Materi</vs-th>
            <vs-th>Question</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.question">{{ tr.question }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    :to="{
                      name: `vhs-pages/questionvhs/answer`,
                      params: { id: tr.id_question },
                    }"
                    size="small"
                  ></vs-button>
                  <vs-button
                    class="mr-2"
                    :to="{
                      name: `vhs-pages/questionvhs/edit`,
                      params: { id: tr.id_question },
                    }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button>
                  <vs-button
                    color="danger"
                    @click="ujiClick(tr.id_question)"
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
import { mapState, mapActions } from 'vuex'
// import moment from "moment";
export default {
  data () {
    return {
      idDelete: null,
      cekData: []
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.questionvhs.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'questionvhs/index',
      dispatchDestroy: 'questionvhs/destroy',

      dispatchShowAnswer: 'questionvhs/getanswer'
    }),

    async ujiClick (id) {
      const co = await this.dispatchShowAnswer(id)
      this.cekData = co.success
      if (this.cekData.length > 0) {
        this.$vs.notify({
          title: 'Oops!',
          text: 'Maaf, Ada data jawaban',
          color: 'danger'
        })
      } else {
        this.deletes(id)
      }
    },

    async confirmDelete () {
      try {
        await this.dispatchDestroy(this.idDelete)
        this.dispatchIndex()
        this.$vs.notify({
          title: 'Success',
          text: 'Your data has been deleted successfully',
          color: 'primary'
        })
        this.dispatchIndex(this.$route.params.id)
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: 'danger'
        })
      }
    },
    deletes (id) {
      this.idDelete = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Are you sure ?',
        text: 'Deleted data can no longer be restored',
        accept: this.confirmDelete
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
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close()
      })
      .catch(() => {
        this.$vs.loading.close()
      })
  }
}
</script>
