import * as types from '../mutation-types';
import * as accountService from 'services/account';




let state = {

  status: 'test'// test | test-over | active | disable

}


let getters = {

  monetizationStatus: state => state.status,

  monetizationTestOver: state => state.status === 'test-over',

  monetizationActive: state => state.status === 'active'

}


let actions = {

  setMonetization( { commit, state }, value ){

    function getDaysOver(val) {

      let day = 3600 * 24;

      if(val < day) {
        return 3;
      }
      if(val < day * 2 ) {
        return 2;
      }
      if(val < day * 3 ) {
        return 1;
      }
      if(val > day * 3) {

        return 0;
      }

    }

    return new Promise((resolve, reject)=>{

      accountService.list({}).then(data=>{

        let daysOver = getDaysOver(data.created_at_ago);

        if( daysOver === 0) {

          commit(types.MONETIZATION_SET_STATUS, 'test-over')

        }

        if( daysOver > 0) {

          commit(types.MONETIZATION_SET_STATUS, 'test')

        }

      })

    })

  }

}


let mutations = {


  [types.MONETIZATION_SET_STATUS]( state, value){

    state.status = value;

  }


}


export default {

  actions,
  state,
  mutations,
  getters

}
