<template>
    <div class="panel">
        <input type="text" id="search" placeholder="Search" v-model="inputname"><br>
        <h3>Users</h3>
        <div v-for="nom in noms" @click="$emit('setUser',nom)" class="user" :key="nom"> {{ nom }} </div>
    </div>
</template>
<script>
    import { store } from "@/Store";
    import "../../../public/modal.css"
    
    export default{
        data(){
            return {
                inputname: ""
            }
        },
        computed:{
            noms(){
                const filteredUserArray = (store.state.checkedProjects.length>0) ? store.state.allUsersStat.filter(
                    user=>store.state.checkedProjects.indexOf(user.project)>-1
                ) : store.state.allUsersStat

                const usersArray = []
                filteredUserArray.forEach(user=>{
                    usersArray.push(user.username)
                })
                return this.inputname.length===0 ? usersArray : 
                        usersArray.filter(user=>user.toLowerCase().includes(this.inputname.toLowerCase())) 
            }
        }
    }
</script>
<style scoped>
    .panel{
        left: 150px;
        top: 58px;
        transition: .6s all;
    }

    .user{
        cursor: pointer;
        width: 100%;
        padding: 5px;
    }
    .user:hover{
        background-color: rgba(207, 205, 205, 0.267);
    }
</style>