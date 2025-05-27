<template>
  <div class="container-fluid"> 
    <div v-if="affCalendar" class="row">

        <h3> Choisissez la date du rendez-vous </h3>
        <vue-meeting-selector
          class="simple-example__meeting-selector"
          v-model="meeting"
          :date="date"
          :loading="loading"
          :meetings-days="meetingsDays"
          @next-date="nextDate"
          @previous-date="previousDate"
          @change="getMeetings"
          @meeting-slot-selected="getMeetingDate"
        />
        <small>rendez-vous choisi: {{ meeting ? dateChoisie : "No Meeting selected" }}</small>
    </div>

    <div v-show="affFormEmail" class="row card">
      <div class="card-header">Condifmer votre RDV {{ error }}</div>
      <div class="card-body"> 
        <form class="form-inline" @submit.prevent="valider_email">
          <!-- Default input -->
          <div class="form-group col-12">
            <input v-model="email" placeholder="Saisir votre Email" 
              class="form-control form-control-lg " >
            <span>
              <a type="submit" class="btn btn-warning btn-lg" 
                href="#id_details">Enregistrez
                <i class="fas fa-envelope ml-1"></i>
              </a>
              <button @click.prevent="valider_email">ok test</button>
            </span>
          </div>
          <div class="card-footer">{{ meeting.day }}</div>
        </form>
      </div>
    </div>

    <div v-show="affDetailsRDV" class="row" id="id_details">
      <div class="jumbotron">
        <h3 class="p-2 bg-light">Details de votre rendez-vous </h3>
        <hr>
        <h4>
          votre rendez-vous  : 
          Mercredi 9 novembre 2022 à 14h40 <br><br>
          Mme Jenny et Paola Salon <br>

          Votre rendez-vous en détail <br>

          Jenny Et Paola 
          4 rue Poissy 75005 Paris .
        </h4>
      </div>
      <div>
        <a href="/services" class="btn btn-warning btn-lg">Choisir un autre service</a>
      </div>
    </div>
  </div>
</template>
 
<script>
//import { validate } from "json-schema";
import VueMeetingSelector from "vue-meeting-selector";
import data from "../data.json";

export default {
  name: "CMeetingSelect",
  components: {
    VueMeetingSelector,
  },
  data() {
    return {
      date: new Date(),
      error : "",
      meetingsDays: [],
      affCalendar : true,
      affFormEmail : false,
      affDetailsRDV : false,
      email : "",
      meeting: { date: "2022-11-09T:08:00.000Z" },
      loading: true,
      nbDaysToDisplay: 5,
    };
  },
  computed:{
    dateChoisie(){
      return this.meeting.date
      //"deeting.getYear(), meeting.getMonth()  meeting.getDay()" 
    },
  },
  methods: {
    getMeetingDate(){
      let dtstr = this.meeting.replace(/\D/g," ");
      let dtcomps = dtstr.split(" ");
      // modify month between 1 based ISO 8601 and zero based Date
      dtcomps[1]--;
      let convdt = new Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],dtcomps[3],dtcomps[4],dtcomps[5]));
      console.log("date selected = " + convdt.getFullYear())
      return convdt
    },

    getMeetings(rdv) {
        console.log("get meetings = " + rdv.date)  
        // alert("get meetings = " + rdv.date)
        // afficher email de confirmation
        this.affFormEmail = !this.affFormEmail 
        this.affDetailsRDV = true
        this.meeting = rdv.date
        return this.avaiable
    },
    // @click on button-right
    async nextDate() {
      console.log("nextDate");
    },
    // @click on button-left
    async previousDate() {
      console.log("previousDate");
    },
  },
  created() {
    this.meetingsDays = data;
    this.loading = false;
  },
  valider_email(){
    console.log("valider_email ...")
    this.affFormEmail = !this.affFormEmail 
    this.affCalendar = !this.affCalendar
    this.affDetailsRDV = true

    if(this.email == ""){
      this.error = "saisir votre email"
    }
  }
};
</script>
