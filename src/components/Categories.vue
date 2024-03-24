<template>
    <div class="main">
        <div class="body">
            <h3 class="title">Project: </h3>
            <h3 class="variable" @click="handleClick">{{ category }} <i class="fa fa-chevron-down"></i></h3>
        </div> 
        <MenucategoryProject v-if="clicked"/>
    </div>
</template>
<script>
    import { store } from "@/Store"
    import MenucategoryProject from "./CategoryProject/MenucategoryProject.vue"
    export default{
        components:{
            MenucategoryProject
        },
        data(){
            return {
                clicked:false,
                selectedcategories:[]
            }
        },
        methods:{
            handleClick(e){
                e.preventDefault()
                this.clicked = !this.clicked
            }
        },
        computed:{
            category(){
               const projectFilter = store.state.checkedProjects
                if(store.state.checkedProjects.length>1){
                    const value = projectFilter.pop()
                    return value + `(+${projectFilter.length})`
                }else if(projectFilter.length===0){
                    return "Select project"
                }
                return projectFilter[0]
            }
        }
    }
</script>