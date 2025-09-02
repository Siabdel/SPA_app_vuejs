import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        tprayers : [],
        favories : [],
        settings : [],
        today : {},
        geocods : [],
        isFetching : false,
        message : "Prayer time calendar",
    },

    getters :{
        getMessage(state){
            return state.message
        },
        // get times prayers
        getTprayers(state){
            return state.tprayers
        },
        
        getSettings(state){
            return state.settings
        },
        
        getToday(state){
            return state.today
        },
        get_geocods(state){
            return state.geocods
        },
        get_favories(state){
            return state.favories
        },

    },

    mutations : {
        set_tprayer(state, {tprayers}){
            state.tprayers = tprayers
        },
        set_settings(state, {params}){
            state.settings = params
        },

        set_today(state, {maintenant}){
            state.today = maintenant
        },

        setIsFetching(state, bool){
            state.isFetching = bool
        },
        set_geocod(state, codes){
            state.geocods = codes
        },
        set_favories(state, favories){
            state.favories = favories
        }
    },

    actions:{
        fetchPrayerTime({commit}) {
            var url = `http://localhost:8000/api/v1/prayer_time/`

            commit('setIsFetching', true);
            //ajax load
            return fetch(url)
                .then(response => response.json())
                .then(json => {
                    commit('set_tprayer', {tprayers : json["data"]})
                    commit('set_settings', {params : json["settings"]})
                    commit('set_today', { maintenant : json["today"]})
                    commit('setIsFetching', false)
                    console.log("json today timings=" + json["today"]["timings"])
                    })  
                .catch(err => {
                    commit('setIsFetching', false)
                    console.error(err)
                });
        },
        //
        fetch_geocod({commit}, ville){
            // url 
            var url = `http://localhost:8000/api/v1/geocod/${ville}/`

            commit('setIsFetching', true);
            //ajax load
            //let data = {'ville':ville};
            let headers = {
                method: 'GET',
                //body: JSON.stringify( data ),
                'Authorization': 'Bearer '+this.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            }
            // retour
            return fetch(url, headers)
                .then(response => response.json())
                .then(json => {
                    commit('set_geocod', { codes : json })
                    //console.log("json geocod =" + json[0].name)
                    })  
                .catch(err => {
                    commit('setIsFetching', false)
                    console.error(err)
                });
        },
        // save param
        fetch_save({commit}, form){
            var url = `http://localhost:8000/api/v1/save_param/`
            commit('setIsFetching', true);
            //ajax load
            let header = {
                method: 'POST',
                 body: JSON.stringify( form ),
                'Authorization': 'Bearer '+this.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            };
            // fetch to save
            return fetch(url, header)
                .then(response => response.json())
                .then(json => {
                    commit('setIsFetching', false)
                    console.log("save ok " + json)
                    })  
                .catch(err => {
                    commit('setIsFetching', false)
                    console.error(err)
                });
        },
        // save a l'axios
        axios_save({commit}, data){
            var url = `http://localhost:8000/api/v1/save_param/`
            commit('setIsFetching', false)
            console.log("data recu =", data)
            axios.post(url, data)
            .then(response => console.log("Add param in DB =" +  response.data))
            .catch(error => {
                console.error('There was an error!', error);
            });
        },
        
        fetch_favories({commit}, ){
            // url 
            var url = `http://localhost:8000/api/v1/list_favorie/`

            commit('setIsFetching', true);
            //ajax load
            let headers = {
                method: 'GET',
                'Authorization': 'Toto '+this.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            }
            // retour
            return fetch(url, headers)
                .then(response => response.json())
                .then(json => {
                    commit('set_favories', { favories : json })
                    console.log("json favories =" + json)
                    })  
                .catch(err => {
                    commit('setIsFetching', false)
                    console.error(err)
                });
        },
    },
})