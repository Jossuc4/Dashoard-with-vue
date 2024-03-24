<template>
    <div class="main">
        <div class="body">
            <h3 class="title">User Dashborad: </h3>
            <h3 class="variable" @click="handleclick" @set_user="setUser">{{ intialUser }} <i class="fa fa-chevron-down"></i></h3>
        </div>
        <MenuUserDashboard v-if="clicked" @set-user="setUser"/>
    </div>
</template>
<script>
    import '../../public/header.css' 
    import MenuUserDashboard from './UserDashboard/MenuUserDashboard.vue'
    import { store } from '@/Store'

    export default{
        components:{
            MenuUserDashboard
        },
        computed:{
            intialUser(){
                return store.state.actualUser === "" ? "Select an user" : store.state.actualUser
            }
        },
        data(){
            return {
                clicked:false
            }
        },
        methods:{
            handleclick(e){
                e.preventDefault()
                this.clicked = !this.clicked
            },
            setUser(nom){
                store.commit('setUser',nom)
                store.commit('setUserTrackPeriod',[])
                this.clicked = !this.clicked
            }
        }
    }
</script>
<style scoped>
    .title{
        min-width: 140px;
    }
</style>