import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({

    state : {
        users : [],
        isLoading : false,
        selectedUserId : null,
    },
    
    getters: {
        selectedUser : state => 
            state.users.find(user => user.login.uuid === state.selectedUserId)
    },

    mutations : {
        setUsers(state, {users}){
            state.users = users;
        },

        setSelectedUser(state, id){
            state.selectedUserId = id;
        },
        setIsLoading(state, bool){
            state.isLoading = bool;
        },
    },

    actions: {
        loadUsers( {commit }){
            //let url = 'http://atlass.fr:93/apipro/directories/'
            let url = 'https://randomuser.me/api/?nat=fr,Fr&results=10&seed=abc'

            commit("setIsLoading", true)
            // fetch 
            return axios
            .get(url)
            .then(res => {
                setTimeout( ()=>
                  {
                    commit("setIsLoading", false)
                    commit("setUsers", { users : res.data.results});
                  }, 3500
                )
                console.log("  users loaded ..." + res.data.results.length)
            })
            .catch(error => {
                console.log("Erreur loading data from " + error)
                commit("setIsLoading", false)
                }
            )
        }
        
    },


})