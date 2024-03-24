<template>
    <div class="d_range">
        <button @click="handleclick">
            <i class="fa fa-calendar"></i> Date Range
        </button>
        <DatePicker v-if="clicked" :closeModal="handleclick"/>
    </div>
</template>
<script>
    import DatePicker from "./DatePicker/DatePicker.vue"
    
    export default{
        components:{
            DatePicker
        },
        data(){
            return{
                clicked:false
            }
        },
        methods:{
            handleclick(){
                this.clicked = !this.clicked
            }
        }
    }
</script>
<style scoped>
    .d_range{
        position: absolute;
        align-self: center;
        right: 60px;
    }
    button{ 
        border: none;
        
        color: rgb(35, 184, 151);
        background-color: rgba(35, 184, 152, 0.425);
        height: fit-content;
        padding: 10px 8px;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
    }
</style>