
<template lang="">
    <div class="container ">
        <form action="form-inline">
            <input class="form-control" keyup.prevent="$emit('searchKey', terms)" type="text"  v-model="terms">
            <Button class="btn btn-warning btn-lg"  @click.prevent="$emit('searchKey', terms)"> Chercher </Button>
        </form>
    </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    name : "SearchBox",
    data(){
        return {
            terms : "",
        }
    },
    
}
</script>
<style lang="">
    
</style>