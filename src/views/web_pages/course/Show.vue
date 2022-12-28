<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Questions">
        <vs-table stripe search :data="data" class="mb-2">
        <template slot="header">
          <vs-button @click="addQuestion">Add Question</vs-button>
        </template>
          <template slot="thead">
            <vs-th>Question</vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.description">
                <p v-html="tr.description"></p>
              </vs-td>
              <template class="expand-user" slot="expand">
                <div class="con-expand-users" style="width: 100%;">
                  <vs-row vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                      <vs-chip class="w-full" v-for="(val,k) in tr.answers" :key="k" :color="val.is_true==1 ? 'success' : 'warning'">
                        {{val.name}}
                        <div class="modal-footer">
                          <vs-chip :color="val.is_true==1 ? 'success' : 'warning'">
                            <vs-avatar color="danger" @click="updates(val.id)" icon-pack="feather" icon="icon-edit" size="small"></vs-avatar>
                            <!-- <vs-avatar color="danger" @click="deletess(val.id)" icon-pack="feather" icon="icon-delete" size="small"></vs-avatar> -->
                          </vs-chip>
                        </div>
                      </vs-chip>
                    </vs-col>
                  </vs-row>
                </div>
              </template>
              <vs-td>
                <div class="flex">
                  <vs-button class="mr-2" :to="{name: `question-edit`, params: {id: tr.id}}" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
                  <!-- <vs-button class="mr-2" @click="updateQuestion" icon-pack="feather" icon="icon-edit" size="small"></vs-button> -->
                  <vs-button color="danger" @click="deletes(tr.id)" icon-pack="feather" icon="icon-delete" size="small"></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <vs-popup :active.sync="popUp" title="Add New Question">
          <quill-editor v-model="f_question"/>
          <table class="w-full">
            <thead>
              <tr>
                <th>Answer List</th>
                <th width="25">True Answer</th>
              </tr>
            </thead>
            <tr v-for="(tr, i) in f_answers" :key="i">
              <td>
                <vs-input class="w-full" label-placeholder="Answer" v-model="tr.name"></vs-input>
              </td>
              <td class="text-center">
                <vs-checkbox vs-name="radio-answer" v-model="tr.is_true"></vs-checkbox>
              </td>
            </tr>
          </table>
          <vs-row class="mt-3" vs-type="flex" vs-justify="space-between">
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
              <vs-button @click="storeAnswer">Save</vs-button>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
              <vs-button color="danger" type="border" @click="clearForm">Clear</vs-button>
            </vs-col>
          </vs-row>
        </vs-popup>
        <vs-popup :active.sync="updatePopUp" title="Update Answer">
          <table class="w-full">
            <thead>
              <tr>
                <th>Answer List</th>
                <th width="25">True Answer</th>
              </tr>
            </thead>
            <tr >
              <td>
                <vs-input hidden class="w-full" name="id" v-model="id"></vs-input>
                <vs-input class="w-full" name="name" label-placeholder="Answer" v-model="f_name"></vs-input>
              </td>
              <td>
                <vs-checkbox vs-name="radio-answer" name="is_true" v-model="f_is_true"></vs-checkbox>
              </td>
            </tr>
          </table>
          <vs-row class="mt-3" vs-type="flex" vs-justify="space-between">
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
              <vs-button @click="confirmUpdates">Save</vs-button>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
              <vs-button color="danger" type="border" @click="clearForm">Clear</vs-button>
            </vs-col>
          </vs-row>
        </vs-popup>
      </vx-card>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import {mapState, mapActions} from 'vuex'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      popUp: false,
      idDelete: null,
      idUpdate: null,
      idDeletes: null,
      updatePopUp: false,
      questionPopUp: false,
      f_question: '',
      id: '',
      f_name: '',
      f_is_true: false,
      storeData :{
        id: this.$route.params.id
      },
      f_answers:[
        {
          is_true: false,
          name: ''
        },
        {
          is_true: false,
          name: ''
        },
        {
          is_true: false,
          name: ''
        },
        {
          is_true: false,
          name: ''
        }
      ]
    }
  },
  computed:{
    ...mapState({
      data: state => state.course.rows
    })
  },
  methods:{
    ...mapActions({
      dispatchStoreQuestion: 'course/store_question',
      dispatchAllQuestion: 'course/getQuestion',
      dispatchUpdates: 'course/update_answer',
      dispatchShow: 'course/detail_answer',
      dispatchDestroy: 'course/delete',
      dispatchDelete: 'course/deletes'

    }),
    addQuestion () {
      this.popUp = true
    },
    clearFormmm () {
      this.f_name = ''
      this.f_is_true = false
    },
    clearForm () {
      this.f_question = ''
      this.f_answers = [
        {
          is_true: false,
          name: ''
        },
        {
          is_true: false,
          name: ''
        },
        {
          is_true: false,
          name: ''
        },
        {
          is_true: false,
          name: ''
        }
      ]
    },
    async confirmUpdates () {

      const payload = {
        id: this.id,
        name: this.f_name,
        is_true: this.f_is_true
      }
        // console.log(payload);
      await this.dispatchUpdates(payload).then(() => {
          this.$vs.loading()
          this.dispatchAllQuestion(this.$route.params.id).then(() => {
            this.$vs.loading.close()
          }).catch(() => {
            this.$vs.loading.close()
          })
        })
      this.clearFormmm()
      this.updatePopUp = false
    },
    updates (id) {
      this.id = id
      this.idUpdate = id
      this.updatePopUp = true
    },
    async storeAnswer () {
      let is_ans = false
      let double = false
      this.f_answers.forEach(function (answer) {
        if (answer.is_true && is_ans) {
          is_ans = false
          double = true
        } else if (answer.is_true) is_ans = true
      })
      if (double) {
        alert('Double Answer')
        return null
      }
      if (!is_ans) {
        alert('Answer Not Available')
        return null
      }
      //end of check double answer and no answer

      this.$vs.loading()
      const payload = {
        course_id: this.$route.params.id,
        description: this.f_question,
        answers: this.f_answers
      }
      await this.dispatchStoreQuestion(payload).then(() => {
          this.$vs.loading()
          this.dispatchAllQuestion(this.$route.params.id).then(() => {
            this.$vs.loading.close()
          }).catch(() => {
            this.$vs.loading.close()
          })
        })
      this.clearForm()
      this.popUp = false
    },
    async confirmDelete () {
      try {
        await this.dispatchDestroy(this.idDelete).then(() => {
          this.$vs.loading()
          this.dispatchAllQuestion(this.$route.params.id).then(() => {
            this.$vs.loading.close()
          }).catch(() => {
            this.$vs.loading.close()
          })
        })
        this.$vs.notify({
          title: 'Success',
          text: 'Your data has been deleted successfully',
          color: 'primary'
        })
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: 'danger'
        })
      }
    },
    deletess (id) {
      this.idDelete = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Are you sure ?',
        text: 'Deleted data can no longer be restored',
        accept: this.confirmDelete
      })
    },
    async confirmDeletes () {
      try {
        await this.dispatchDelete(this.idDeletes).then(() => {
          this.$vs.loading()
          this.dispatchAllQuestion(this.$route.params.id).then(() => {
            this.$vs.loading.close()
          }).catch(() => {
            this.$vs.loading.close()
          })
        })
        this.$vs.notify({
          title: 'Success',
          text: 'Your data has been deleted successfully',
          color: 'primary'
        })
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: 'danger'
        })
      }
    },
    deletes (id) {
      this.idDeletes = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Are you sure ?',
        text: 'Deleted data can no longer be restored',
        accept: this.confirmDeletes
      })
    }
  },
  mounted () {
    this.$vs.loading()
    this.dispatchAllQuestion(this.$route.params.id).then(() => {
      this.$vs.loading.close()
    }).catch(() => {
      this.$vs.loading.close()
    })
  }
}
</script>
