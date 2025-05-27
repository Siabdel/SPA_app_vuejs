
// Cle CRSF
function getCookie(name)
 {
   var re = new RegExp(name + "=([^;]+)");
   var value = re.exec(document.cookie);
   console.log("cle CSRF " + value)
   return (value != null) ? unescape(value[1]) : null;
 }

function getCookie2(name) {
  if (!document.cookie) {
    return null;
  }
  //--
  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

//INSTANCE vm
const vm = Vue.createApp({

  data(){
    return {
      message : "bonsoir tout le monde !!! match a 20h00",
      note : "",
      completed : false,
      task_courant : "",
      error : "",
      todos : [],
      show_courante : true,
      show_btn_add : true,
      show_btn_update : false,
      show_form  : false,
    }
  },

  mounted() {
    //do something after creating vue instance
    //const url = 'http://51.178.136.190:93/apipro/todos/'
    this.loadTodos()
  },

  computed: {
    //
    reversedTodos(){
      this.todos.reverse(1)
      return this.todos
    },

  classObject() {
    return {
       //active: this.isActive && !this.error,
      'text-danger': this.error != "" ,
      'list-group-item bg-secondary' : this.completed == true,
      'list-group-item active' : this.note.id == this.task_courant.id
    }
  },
  } ,

  methods: {
    //do something after creating vue instance
    loadTodos() {
      //const url = 'http://51.178.136.190:93/apipro/todos/'
      const url = 'http://127.0.0.1:91/apipro/todos/'

      fetch(url)
      .then(response => response.json())
      .then( data => {
        this.todos = data
        console.log("data load = " + this.todos.length + "**")
      })
      .catch(error => console.log("erreur = " + error));
    },

    afficher_content(elem){
      alert(elem.content)
    },

    inverser(){
      this.todos.reverse(1);
      console.log("reverse la liste des tasks ...")
    },

    // task closed
    close_note(elem){
      console.log("note faite ... ")
      // completed
      this.task_courant = elem
      this.completed = !this.completed
      this.update_content(elem)
    },

    // add note
    ajouterNote(){

      if(this.note === ""){
        this.error = "note vide saisissez quelques chose !!!"
        return -1
      }

      //maj compteur
      compteur = this.todos.length + 1
      content = {id : compteur, content: this.note }
      //add note en tableau
      this.todos.push(content)
      //clear saisie
      this.note = ""
      // api add // NOTE:
      this.add_task()
    },
    // afficher le formulaire et la tache a modifier
    show_form_toupdate(task){
      // afficher le formulaire
      this.show_form = true
      this.message = "Modifier cette tache"
      // 1- set input with val tasks
      this.note = task.content
      this.task_courant = task  //maj courant
      // 2- focus to input
      // 3- show btn update
      this.show_btn_update = true
      this.show_btn_add = false
    },

    // afficher le formulaire pour ajouter une note
    show_form_toadd(){
      // afficher le formulaire
      this.show_form = true
      this.message = "Ajoute cette note"
      //clear saisie
      this.note = ""
      // 1- set input with val tasks
      // 3- show btn update
      this.show_btn_update = false
      this.show_btn_add = true
    },

    // afficher le formulaire et la tache a modifier
    hide_form(){
      // 1- masque le formulaire
      this.show_form = false
      this.message = ""
      this.error = ""
      // 3- hide btn update
      this.show_btn_update = false
      this.show_btn_add = true
    },

    togglebtn(){
      // 3- show btn update
      this.show_btn_update = !this.show_btn_update
      this.show_btn_add = !this.show_btn_add
      this.note = ""
    },

    // update task http action="PUT"
    update_content(elem){
      //const url
      const url = `http://127.0.0.1:91/apipro/todos/update/${this.task_courant.id}/`
      // request
      const headers = {
           //"Content-Type": "application/x-www-form-urlencoded",
           'Content-Type': 'application/json; charset=UTF-8',
           'Accept': 'application/json',
           //'X-CSRFToken': csrftoken,
          // "authToken" : "ACCESS_TOKEN",
        }
      // data form
      if (this.note){
        content = this.note
      }else{
        content = elem.content
      }

      form = JSON.stringify({
         'content' : content,
         'completed' : this.completed,
       })
       console.log(form)
      //--
      fetch(url,
        {
          method : 'PUT',
          headers : headers,
          body : form,
        }
      ).then(response => {
          console.log(response)
          this.loadTodos()
          this.togglebtn()
          this.hide_form()
        }
      )
      .catch((err)=>console.log( err))
    },

    // create task http action="POST"
    add_task(){
      /**
      add fetch
      **/
      //const url = `/apipro/todos/`
      const url = 'http://127.0.0.1:91/apipro/todos/create/'
      //const csrftoken = getCookie('csrftoken');
      const csrftoken = getCookie('CSRF-TOKEN');
      //console.log("cle CSRF " + csrftoken)
      let  cle_csrf = $( "input[name='csrfmiddlewaretoken']" ).val()
      content = $( "input[name='content']" ).val(),

      form = JSON.stringify({
        //'content' : this.task_courant.content,
        'content' : content,
       })
       //
        //form = $( "#form_task" ).serialize()
        console.log("form serialize = " + form )
        // request
        const headers = {
             //"Content-Type": "application/x-www-form-urlencoded",
             'Content-Type': 'application/json; charset=UTF-8',
             'Accept': 'application/json',
             //'X-CSRFToken': csrftoken,
            // "authToken" : "ACCESS_TOKEN",
          }

        fetch(url,
          {
            method : 'POST',
            credentials: "same-origin",
            headers : headers,
            body : form,
          }
        ).then(response => {
            console.log(response)
            this.hide_form()
        })
        .catch((err)=>console.log( err))
      },

      delete_note(elem){
        //--
        this.task_courant = elem
        if (confirm("Vous voulez supprimer")==true){
          //this.task_courant = elem
          //save
          this.removeTodo(elem.id)
        }
      },
      //------------
     // delete todo
     removeTodo(pk) {
       // delete en vrai de la base
       var url = `http://127.0.0.1:91/apipro/todos/delete/${pk}/`
       var CSRF_TOKEN =  getCookie("csrftoken")
       console.log("task deleted !" +  url)

       fetch(url,
         {
          method: 'delete',
          credentials: "same-origin",
          headers : {
              "X-CSRFToken": CSRF_TOKEN,
            }
         })
         .then(response => {
           response.json()
           this.loadTodos()
         })
         .catch(error => { console.log(error)})
         ///
       },

    }// fin methods

})

// components
vm.component('note',
  {
    props : [ 'taches', ],
    template : `#id_tasks`,
  });
//mout application sur app
vm.mount("#app");

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
});
