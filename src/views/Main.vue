<template>
    <div>
        MAIN
        <div v-html="s">

        </div>
    </div>
</template>

<script>
export default {
    name:'Main',
    data(){
        return{
            s:`<script>console.log('test');<`+`/script>`
        }
    }
}
</script>
