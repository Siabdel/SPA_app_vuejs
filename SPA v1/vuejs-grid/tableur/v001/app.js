		// Regular expression from W3C HTML5.2 input specification:
// https://www.w3.org/TR/html/sec-forms.html#email-state-typeemail
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


var C_stock = {
	props : ['articles'],
	data () {
		return {
			article : '',
		}
	},

	methods : {
		ajouterarticle : function(){
			var vm = this;
			vm.articles.push(vm.article);
		},
	},
	template : '<div>\
		<input type="text" v-model="article" placeholder="ajouter un article"/>\
		<button v-on:click="ajouterarticle">Ajouter !</button>\
		<ul>\
			<li v-for="article in articles"> {{ article }}</li>\
		</ul>\
	</div>'
};



var C_of = {
	// data IN
	props :  {
		ofs : Array,
		index : Number,
	},

	data () {

		return {
			checked : true,
			active : true }
	},

	methods : {
		ajouterarticle : function(){
			var vm = this;
			vm.articles.push(vm.article);
		},
		supprimer(elem){
			this.$emit('supp', elem)
		},

		changeStatut: function(of, v_id, v_statut) {
			//console.log('changment statut ' + v_id, v_statut	);
			//of.statut = v_statut;
			this.$emit('statut_change',v_id,  v_statut)
			of.statut = v_statut
			console.log( " mon of " + of.code_of )
		},
	},
 // OUT : render template

template : `
<table v-if="ofs.length" class="table table-bordered table-striped">
	<thead> <tr class="font-weight-bold text-center" > <th>Check</th> <th> Statut </th> <th> Code of</th><th>Date debut</th><th>Commande</th><th> Client</th><th> Quantite</th><th colspan="4"> Action</th> </tr> </thead>
		<tbody>
			<tr v-for="(of, index) in ofs" :key=of.id  v-show="active" >
				<td> <span> <input type="checkbox"
						v-bind:checked="checked"
				    v-on:change="$emit('checker', $event.target.checked)"
				 class="form-check-input" /> </span> </td>
				<td>
					<A href="" class="btn" v-bind:class="{
							'btn-success btn-xs' : 	of.statut == 'S',
							'btn-info btn-xs' : 		of.statut == 'P',
							'btn-danger btn-xs' : 	of.statut == 'L',
						  'btn-warning btn-xs' : 	of.statut == 'C',}" >
						<i class="fa fa-pencil"  >  </i>
						<span v-if="of.statut == 'L'" > Lancer </span>
						<span v-if="of.statut == 'C'"> Creer </span>
						<span v-if="of.statut == 'P'"> planifier </span>
						<span v-if="of.statut == 'S'" > Cloturer </span>
					</A>
				</td>

				<td> {{ of.statut  }}</td>
				<td> {{ of.code_of  }}</td>
				<td> {{ of.date_debut  }}</td>
				<td> {{ of.commande}}</td>
				<td> {{ of.client  }}</td>
				<td> {{ of.quantite_cde }}</td>
				<td> <A @click="changeStatut(of, index, 'C')" href="" class="" > <i class="fa fa-pencil" style="font-size:14px;">Lancer </i>  </A> </td>
				<td> <A @click="supprimer(of)" href="" class="" > <i class="fa fa-pencil" style="font-size:14px;">Cloturer </i>  </A> </td>
				<td> <A href="" class="" > <i class="fa fa-pencil" style="font-size:14px;">Planifier </i>  </A> </td>
				<td> <A href="" class="" > <i class="fa fa-pencil" style="font-size:14px;">Edit </i>  </A> </td>
			</tr>
		</tbody>
</table>`,

};


var items =  [
	{'id' : 1002, 'isActive': true,  'statut': 'L', 'code_of':'C2018129901', 'date_debut' : '25/12/2018',  'commande': 'F7815003' , 'client' : 'SEPHORA', 'quantite_cde' : 5600}  ,
	{'id' : 1003, 'isActive': false, 'statut': 'S', 'code_of':'C2018129933', 'date_debut' : '23/12/2018',  'commande': 'F7826110' , 'client' : 'MAKE UP', 'quantite_cde' : 10250}  ,
	{'id' : 1004, 'isActive': true,  'statut': 'C', 'code_of':'C2018129956', 'date_debut' : '27/12/2018',  'commande': 'F7813710' , 'client' : 'FRESH', 		'quantite_cde' : 13000}  ,
	{'id' : 1005, 'isActive': true,  'statut': 'P', 'code_of':'C2018129968', 'date_debut' : '21/12/2018',  'commande': 'F7834820' , 'client' : 'BEIERSDORF' , 'quantite_cde': 9500 },
];

var vm = new Vue({
	// root node
	el: "#app", // the instance state

	components : {
		stock : C_stock,
		compof : C_of,
	 },

	data:  {
			dict_mois :  ['Janvier' , 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Novembre', 'Decembre']  ,

			dict_ofs :  items,

			message: {
				text: "Dear Mr. President,\n...",
				maxlength: 255
			},
			submitted: false
		},

		methods: {
			// submit form handler
			change_st: function(elem, v_statut) {
				//this.dict_ofs[elem].statut = v_statut;
				var vm = this;
				//vm.dict_ofs[elem].statut = v_statut;
				//vm.dict_ofs.pop();
				//console.log("changement de statut " + this.dict_ofs[elem].statut);
				//alert("ok");
			},

			remove (item) {

        var i = this.dict_ofs.indexOf(item)
				alert("ok" + i)
        if (i > -1) {
          this.dict_ofs.splice(i, 1)
        }
      },

			submit: function() {
				this.submitted = true;
			},
			// check or uncheck all
			checkAll: function(event) {
				this.selection.features = event.target.checked ? this.features : [];
			}
	  },

	  watch: {
			// watching nested property
			message : function(value) {
			console.log("watch couriel" + value );
	  	},

		// kilometre
		kilometers : function(val) {
		  console.log("watch" + val);
                  this.kilometers = val;
                  this.meters = val * 1000;
               	},

		meters : function (val) {
                  this.kilometers = val/ 1000;
                  this.meters = val;
	  	}
	}
});
