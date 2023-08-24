/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
import moduleAuth from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'

import master from './maesa/master'
import employee from './maesa/employee'
import division from './maesa/division'
import course from './maesa/course'
import question from './maesa/question'
import leaderboard from './maesa/leaderboard'
import event from './maesa/event'
import vhs from './maesa/vhs'
import splash_screen from './maesa/splash_screen'
import book from './maesa/book'
import sop from './maesa/sop'
import lampiran from './maesa/lampiran'
import crossfunction from './maesa/crossfunction'
import lamcross from './maesa/lamcross'
import jadwal from './maesa/jadwal'
import zoom from './maesa/zoom'
import materi from './maesa/vhs/materi'
import questionvhs from './maesa/vhs/questionvhs'
import score from './maesa/vhs/score'
import jadwalUser from './maesa/vhs/jadwalUser'
import company from './maesa/company'
import dashboard from './maesa/dashboard'
import sertif from './maesa/vhs/sertif'
import profile from './maesa/profile'
import quotaap from './maesa/quotaap'
import jadwalap from './maesa/adminap/jadwalap'
import user from './maesa/vhs/user'
import message from './maesa/message'
import softskill from './maesa/softskill'
import permission from './maesa/permission'
import golongan from './maesa/golongan'

/**PAS Project */
import masterpas from './maesa/pas/masterpas'
//people
import dimensi from './maesa/pas/people/dimensi'
import kpi from './maesa/pas/people/kpi'
import indPenilaian from './maesa/pas/people/indPenilaian'
//process
import processDimensi from './maesa/pas/process/processDimensi'
import processKpi from './maesa/pas/process/processKpi'
import processInd from './maesa/pas/process/processInd'
//performance
import performDimensi from './maesa/pas/performance/performDimensi'
import performKpi from './maesa/pas/performance/performKpi'
import performInd from './maesa/pas/performance/performInd'

/**penilaian */
import pen_people from './maesa/pas/penilaian/people/pen_people'
import pen_proces from './maesa/pas/penilaian/process/pen_proces'
import pen_performance from './maesa/pas/penilaian/performance/pen_performance'
/**akhir PAS Project */

/** read,update,delete, Pas */
import showedit from './maesa/pas/showedit/showedit'
/** akhir read,update,delete, Pas */

import email from './maesa/email'

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
    eCommerce: moduleECommerce,

    /* vuex for maesa group */
    master,
    permission,
    employee,
    division,
    course,
    question,
    leaderboard,
    event,
    vhs,
    splash_screen,
    book,
    sop,
    lampiran,
    crossfunction,
    lamcross,
    jadwal,
    zoom,
    materi,
    questionvhs,
    score,
    jadwalUser,
    company,
    dashboard,
    sertif,
    profile,
    quotaap,
    jadwalap,
    user,
    message,
    softskill,
    email,
    golongan,

    /**PAS project */

    //people
    dimensi,
    masterpas,
    kpi,
    indPenilaian,

    //process
    processDimensi,
    processKpi,
    processInd,

    //performance
    performDimensi,
    performKpi,
    performInd,

    //penilaian
    pen_people,
    pen_proces,
    pen_performance,

    /**show,edit,delete */
    showedit

    /**akhir PAS project */
  },
  strict: process.env.NODE_ENV !== 'production'
})
