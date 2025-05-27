<template>
    <div>
        <h2> Details du contacte </h2>
        <div class="container-fluid well span6">
            <div class="row-fluid">
                <div class="span2" >
                    <img src="https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm" class="img-circle">
                </div>
        
                <div class="span8">
                    <h3>Nom : {{ $route.params.userId.prenom}} {{ $route.params.userId.nom}}</h3>
                    <h4>Email:  {{ $route.params.userId.email}}</h4>
                    <h4> Adresse : {{ $route.params.userId.adresse }} </h4>
                    <h4> Ville :{{ $route.params.userId.ville }}</h4>
                    <h4> code postal : {{ $route.params.userId.codepostal }}</h4>
                    <h4> Telephone : {{ $route.params.userId.telephone  }}</h4>
                    <h4> Pays : {{ $route.params.userId.pays }}</h4>
                    <h4> Latitude : {{ $route.params.userId.latitude  }}</h4>
                    <h4> Longitude : {{ $route.params.userId.longitude }}</h4>

                    <h4><a href="#">More... </a></h4>
                </div>
        
                <div class="span2">
                    <div class="btn-group">
                        <a class="btn dropdown-toggle btn-info" data-toggle="dropdown" href="#">
                            Action 
                            <span class="icon-cog icon-white"></span><span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#"><span class="icon-wrench"></span> Modify</a></li>
                            <li><a href="#"><span class="icon-trash"></span> Delete</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name : 'UserDetails',
    props : ['id'],
    data(){
        return {
            message : "on est au details !!"
        }
    }

}

</script>