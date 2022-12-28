<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Update Data Question">
          <!-- <div class="mt-3 mb-10 vx-row">
            <div class="w-full vx-col">
              <h4><b>List Pertanyaan</b></h4>
            </div>
          </div> -->
          <!-- <div class="mb-5 vx-row" v-for="(item, index) in storeData.questions" :key="index"> -->
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <!-- <h6 class="mb-2">Soal</h6>
              <quill-editor name="description" v-model="storeData.description"/> -->
              <table class="w-full">
                <thead>
                <tr>
                  <th>Answer List</th>
                  <th width="110">True Answer</th>
                </tr>
                </thead>
                <!-- <tr v-for="(storeData, i) in item.answers" :key="i"> -->
                <tr>
                  <td>
                    <vs-input class="w-full" name="name" label-placeholder="Answer" v-model="storeData.name"></vs-input>
                  </td>
                  <td class="text-center">
                    <vs-checkbox vs-name="radio-answer" name="is_true" class="mt-5" v-model="storeData.is_true"></vs-checkbox>
                  </td>
                </tr>
              </table>
            </div>
        </div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button @click="store" :disabled="isLoading">Save</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import vSelect from 'vue-select'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: "CreateCourse",
  components:{
    vSelect,
    quillEditor
  },
  data () {
    return {
      storeData: {
        id: this.$route.params.id,
        description:'',
        name: '',
        is_true: '',
        questions: [
          {
            is_pre_test: '',
            description: '',
            answers: [
              {
                name: '',
                is_true: 0
              },
              {
                name: '',
                is_true: 0
              },
              {
                name: '',
                is_true: 0
              },
              {
                name: '',
                is_true: 0
              },
            ]
          }
        ]
      }
    }
  },
  computed:{
    ...mapState({
      uploadProgress: state => state.questions.upload_progress
    })
  },
  methods:{
    ...mapActions({
      dispatchStore: 'course/store',
      dispatchUpdate: 'course/edits',
      dispatchShow: 'course/details',
    }),
    checkQuestion() {
      let vm = this;
      this.storeData.questions.every(function (item, index) {
        if (!item.description) {
          vm.isQuestionComplete = true;
          // alert(`Soal nomor ${index+1} belum terisi`);
          return true;
        } else {
          let key = false;
          let choose = true;
          item.answers.forEach(function (answer, i) {
            if (!answer.name) {
              choose = false;
              alert(`Ada pilihan jawaban untuk soal nomor ${index+1} belum terisi`);
              return false;
            } else if (answer.is_true == true) key = true;
          });
          if (!key) {
            vm.isQuestionComplete = false;
            alert(`Kunci jawaban untuk soal nomor ${index+1} belum ada`);
            return false;
          } else {
            vm.isQuestionComplete = choose;
          }
        }
      });
    },
    convertToFormData () {
      this.checkQuestion();
      if (!this.isQuestionComplete) return false;
      const data = new FormData;
      // eslint-disable-next-line no-unexpected-multiline
      ['id', 'organization_id', 'golongan_id', 'image', 'title', 'description', 'file', 'video', 'link', 'type', 'questions'].forEach((key) => {
        if (key == 'questions') {
          this.storeData.questions.forEach(function (question, index) {
            data.append(`questions[${index}][is_pre_test]`,question.is_pre_test);
            data.append(`questions[${index}][description]`,question.description);
            question.answers.forEach(function (answer, i) {
              data.append(`questions[${index}][answers][${i}][name]`,answer.name);
              data.append(`questions[${index}][answers][${i}][is_true]`,answer.is_true?1:0);
            })
          });
        } else if (this.storeData[key]) data.append(`${key}`, this.storeData[key])
      })
      if (this.$route.params.id) data.append('_method', 'PUT')
      return data
    },
    store () {
      this.$validator.validateAll().then(async res => {
        if (!res) return false;
        const formData = this.convertToFormData()
        if (!formData) return false;
        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0] }, ${  pair[1]}`)
        // }
        this.$vs.loading()
        this.isLoading = true
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formData)
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
          this.$router.push({name: 'course'})
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
    },
    async getDetail () {
      const { success } = await this.dispatchShow(this.$route.params.id)
      this.storeData.name = success.name
      this.storeData.is_true = success.is_true
    }
  },
  async mounted () {
    if (this.$route.params.id) {
      this.getDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
    .preview {
        max-width:100%;
        margin-left:auto;
        margin-right:auto;
        display:block;
        cursor: pointer;
        border-radius: 5px;
    }
    .center {
        margin-left:auto;
        margin-right:auto;
        display:block;
        text-align: center;
        margin-bottom: 5px;
    }
    .text-small {
        font-size: 12px;
        padding-left: 5px;
    }
</style>
