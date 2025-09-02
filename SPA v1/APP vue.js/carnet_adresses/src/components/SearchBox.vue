<template lang="">
    <div>
        <form action="form-inline">
            <input @keyup.prevent="$emit('searchKey', terms)" type="text"  v-model="terms">
            <Button  @click.prevent="$emit('searchKey', terms)"> Chercher </Button>

        </form>
    </div>
</template>

<script>

import 'bootstrap3/dist/css/bootstrap.min.css';

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