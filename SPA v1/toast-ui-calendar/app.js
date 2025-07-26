//------------------------------
//    APi Calendar           -----
//------------------------------
/* ES6 module in Node.js environment */
//import Calendar from '@toast-ui/calendar';
//import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const Calendar = tui.Calendar;
var today = new Date();
const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 60));

const mon_schedules = [
  {
    id: "1",
    title: "Mua nuoc dum",
    calendarId: "1",
    category: "time",
    attendees: ["Chin"],
    isVisible: true,
    start ,
    end  ,
  },
  {
    id: "2",
    title: "Di lau nha",
    calendarId: "2",
    category: "time",
    attendees: ["Khanh"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2))
  },
  {
    id: "3",
    title: "Di don phong",
    calendarId: "3",
    category: "time",
    attendees: ["Hai"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 2)),
    end: new Date(new Date().setHours(start.getHours() + 4))
  },
  {
    id: "4",
    title: "Phai lam sao day",
    calendarId: "4",
    category: "time",
    attendees: ["Linh"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 2)),
    end: new Date(new Date().setHours(start.getHours() + 6))
  }
];
//calendars list 
const mes_calendars = [
    {
      id: 'cal1',
      name: 'Personal',
      backgroundColor: '#03bd9e',
    },
    {
      id: 'cal2',
      name: 'Work',
      backgroundColor: '#00a9ff',
    },
  ];
//components

Vue.component('calendar', {
  template : "#id_template",

  conditions : {},
  props : {
      ville :"",
      country:""
  },
  //-- 
  data: function(){
    return {
      message : "Horaire de prière par ville",
      horaires : [],
      photo : "",
    }
  },
  //-- a la creation
  created(){
    console.log("created  !!" + this.message )
    //var url = "https://www.prevision-meteo.ch/services/json/lat=xxxlng=yyy".replace('xxx',this.ville.latitude )
    var url = "http://localhost:8500/api/v1/prayer_time/"
    fetch(url)
    .then( (response) => { return  response.json() })
    .then( json => {
            this.horaires = json
            console.log("ok mes horaires !!" + this.horaires.length)
            },
    )
    .catch((err)=>console.error(err))
  },
})

//------------------------------
//    APP Calendar Horaires prières -----
//------------------------------
 var app = new Vue({
  el : "#app",
  component : ["calendar", ],

  data(){
    return {
      titre : "Horaire Prière pour Vénissieux",
      pays : "France",
      ville : "Vénissieux",
      schedules: mon_schedules,
      calendars : mes_calendars,
     
    }
  },
  //--
  watch : {
    new_ville : function(newValue){
        this.ville = newValue
        this.latitude = this.list_villes[0].latitude
        this.longitude = this.list_villes[0].longitude
        console.log("computed ville  !!" + this.ville )

      },
   },
});

//------------------------------
//--------- Calendar
//------------------------------
/* in the browser environment namespace */


 new Calendar('#calendar', {
  defaultView: 'week',
  template: {
    time(event) {
      const { start, end, title } = event;

      return `<span style="color: white;">${formatTime(start)}~${formatTime(end)} ${title}</span>`;
    },
    allday(event) {
      return `<span style="color: gray;">${event.title}</span>`;
    },
  },
  calendars: [
    {
      id: 'cal1',
      name: 'Personal',
      backgroundColor: '#03bd9e',
    },
    {
      id: 'cal2',
      name: 'Work',
      backgroundColor: '#00a9ff',
    },
  ],
  schedules : [
      {
        id: '1',
        calendarId: '0',
        title: 'TOAST UI Calendar Study',
        category: 'time',
        dueDateClass: '',
        start: today.toISOString(),
        end: today.getDate('hours', today, 3, '+')
      },
      {
        id: '2',
        calendarId: '0',
        title: 'Practice',
        category: 'milestone',
        dueDateClass: '',
        start: today.getDate('date', today, 1, '+'),
        end: today.getDate('date', today, 1, '+'),
        isReadOnly: true
      },
    ],
});
