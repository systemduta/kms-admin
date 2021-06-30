<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card class="mb-base" title="Pre-Test">
        <vs-table stripe search :data="data" class="mb-2">
        <template slot="header">
          <vs-button @click="addQuestion(true)">Add Pre-Test</vs-button>
        </template>
        <template slot="thead">
          <vs-th>Question</vs-th>
        </template>
        <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data" v-if="tr.is_pre_test===1">
              <vs-td :data="tr.description">
                <p v-html="tr.description"></p>
              </vs-td>
              <template class="expand-user" slot="expand">
                <div class="con-expand-users" style="width: 100%;">
                  <vs-row vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                      <vs-chip class="w-full" v-for="(val,k) in tr.answers" :key="k" :color="val.is_true==1 ? 'success' : 'warning'">
                        <vs-avatar icon-pack="feather" :icon="val.is_true==1 ? 'icon-check' : 'icon-x'" :color="val.is_true ? 'success' : 'warning'"></vs-avatar>
                        {{val.name}}
                      </vs-chip>
                    </vs-col>
                  </vs-row>
                </div>
              </template>
            </vs-tr>
        </template>
        </vs-table>
      </vx-card>
      <vx-card title="Post Test">
        <vs-table stripe search :data="data" class="mb-2">
        <template slot="header">
          <vs-button @click="addQuestion(false)">Add Post Test</vs-button>
        </template>
        <template slot="thead">
          <vs-th>Question</vs-th>
        </template>
        <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data" v-if="tr.is_pre_test!==1">
              <vs-td :data="tr.description">
                <p v-html="tr.description"></p>
              </vs-td>
              <template class="expand-user" slot="expand">
                <div class="con-expand-users" style="width: 100%;">
                  <vs-row vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                      <vs-chip class="w-full" v-for="(val,k) in tr.answers" :key="k" :color="val.is_true==1 ? 'success' : 'warning'">
                        <vs-avatar icon-pack="feather" :icon="val.is_true==1 ? 'icon-check' : 'icon-x'" :color="val.is_true ? 'success' : 'warning'"></vs-avatar>
                        {{val.name}}
                      </vs-chip>
                    </vs-col>
                  </vs-row>
                </div>
              </template>
            </vs-tr>
        </template>
        </vs-table>
<!--        <vs-popup :active.sync="popUp" title="Add New Question">-->
<!--          <quill-editor v-model="f_question"/>-->
<!--          <table class="w-full">-->
<!--            <thead>-->
<!--              <tr>-->
<!--                <th>Answer List</th>-->
<!--                <th width="25">True Answer</th>-->
<!--              </tr>-->
<!--            </thead>-->
<!--            <tr v-for="(tr, i) in f_answers" :key="i">-->
<!--              <td>-->
<!--                <vs-input class="w-full" label-placeholder="Answer" v-model="tr.name"></vs-input>-->
<!--              </td>-->
<!--              <td class="text-center">-->
<!--                <vs-checkbox vs-name="radio-answer" v-model="tr.is_true"></vs-checkbox>-->
<!--              </td>-->
<!--            </tr>-->
<!--          </table>-->
<!--          <vs-button class="mt-3 w-full" @click="storeAnswer">Save</vs-button>-->
<!--        </vs-popup>-->
      </vx-card>
      <vs-popup :active.sync="popUp" :title="'Add New '+ (f_is_pre_test?'Pre Test':'Post Test') +' Question'">
        <!--          <vs-input v-model="f_question" class="w-full" label-placeholder="Question"></vs-input>-->
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
      f_is_pre_test: null,
      f_question: '',
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
      dispatchAllQuestion: 'course/getQuestion'
    }),
    addQuestion (isPreTest) {
      if (isPreTest) this.f_is_pre_test = 1
      else this.f_is_pre_test = null
      this.popUp = true
    },
    clearForm () {
      this.f_is_pre_test = null
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
    async storeAnswer () {
      //check double answer and no answer
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

      const payload = {
        course_id: this.$route.params.id,
        is_pre_test: this.f_is_pre_test,
        description: this.f_question,
        answers: this.f_answers
      }
      await this.dispatchStoreQuestion(payload)
      this.clearForm()
      this.popUp = false
      this.dispatchAllQuestion(this.$route.params.id)
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
