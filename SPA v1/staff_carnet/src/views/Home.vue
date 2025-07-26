<template>
    <div class="container-fluid">
        <h1> {{ msg }} </h1>
        <router-link to="/users"> Mes contactes </router-link>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css';

    export default {
        name: "HomePage",
        data: () => ({
            msg: "Hello Home page",
            contactes : [],
            searchBy : true,
        }),
    }
</script>