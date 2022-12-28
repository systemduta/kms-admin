<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Update Data Question">
          <div class="mt-3 mb-10 vx-row">
            <div class="w-full vx-col">
              <h4><b>List Pertanyaan</b></h4>
            </div>
          </div>
          <div class="mb-5 vx-row">
            <!-- <div class="mb-5 vx-row"> -->
              <div class="w-full vx-col">
                <h6 class="mb-2">Soal</h6>
                <quill-editor name="description" v-model="storeData.description"/>
                <table class="w-full">
                  <thead>
                  <tr>
                    <th>Answer List</th>
                    <th width="110">True Answer</th>
                  </tr>
                  </thead>
                  <tr v-for="(tr, i) in storeData.answers" :key="i">
                    <td>
                      <vs-input hidden class="w-full" name="id" v-model="tr.id"></vs-input>
                      <vs-input class="w-full" name="name" label-placeholder="Answer" v-model="tr.name"></vs-input>
                    </td>
                    <td class="text-center">
                      <vs-checkbox vs-name="radio-answer" class="mt-5" name="is_true" v-model="tr.is_true"></vs-checkbox>
                    </td>
                  </tr>
                </table>
              </div>
          </div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button @click="store" :disabled="isLoading" class="right">Simpan</vs-button>
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

import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
  name: "CreateCourse",
  components:{
    vSelect,
    quillEditor
  },
  data () {
    return {
      isLoading: false,
      storeData: {
        is_pre_test: '',
        description: '',
        id: this.$route.params.id,
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
    }
  },
  computed:{
    ...mapState({
      data: state => state.course.rows
      // uploadProgress: state => state.course.upload_progress
    })
  },
  methods:{
    ...mapActions({
      dispatchAllQuestion: 'course/getQuestion',
      dispatchStore: 'course/store',
      dispatchUpdate: 'course/edits',
      dispatchShow: 'course/details',
    }),
    async getMaster () {
      if (this.$route.params.id) {
        await this.getDetail()
      }
    },
    convertToFormData () {
      const data = new FormData;
      // eslint-disable-next-line no-unexpected-multiline
      ['id', 'description','answers'].forEach((key) => {
        if (key == 'answers') {
          this.storeData.answers.forEach(function (answer, index) {
              data.append(`answers[${index}][id]`,answer.id);
              data.append(`answers[${index}][name]`,answer.name);
              data.append(`answers[${index}][is_true]`,answer.is_true?1:0);
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
        this.$vs.loading()
        this.isLoading = true
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formData)
          }
          this.$vs.loading.close()
          this.isLoading = false
          this.$vs.notify({
            title: 'Success!',
            text: 'Data was saved successfully!',
            color: 'success'
          })
          this.$router.push({name: 'course-read'})
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
      this.storeData.description = success.description
      this.storeData.answers = success.answers
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
    .right{
      margin-left: auto;
      display: block;
    }
</style>
