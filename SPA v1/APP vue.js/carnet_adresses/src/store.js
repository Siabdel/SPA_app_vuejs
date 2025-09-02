import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        users : [],
        selectedUserId : null,
        isFetching : false,
        message : "Hello Toto",
    },

    getters :{
        //selectedUser : state =>  state.users.find(user => user.login.uuid === state.selectedUserId),

        getUsers(state){
            return state.users
        },

        getMessage(state){
            return state.message
        }
    },

    mutations : {
        setUsers(state, {users}){
            state.users = users
            //console.log(" setUsers = !!" + state.users)
        },

        setSelectedUser(state, id){
            state.selectedUserId = id
        },

        setIsFetching(state, bool){
            state.isFetching = bool
        }

    },

    actions:{
        test_action(){
            console.log("test action = !!" + this.state.users)
        },

        fetchUsers({commit}) {
          let url = `http://51.178.136.190:93/apipro/directories/`

            commit('setIsFetching', true);
            //ajax load
            return fetch(url)
                .then(response => response.json())
                .then(json => {
                    commit('setUsers', {users : json})
                    commit('setIsFetching', false)
                    })  
                .catch(err => {
                    commit('setIsFetching', false)
                    console.error(err)
                });
        }      
    }
})