<template>
    <div class="panel">
        <input type="text" id="search" placeholder="Search" v-model="inputProject"><br><br>
        <h5>Active projects</h5>
        <div v-for="({project,status},index) in projects" :key="index" class="ctg">
            <div v-if="status === 'active'" class="ctgc">  
                <div class="categories">
                    <input 
                        type="checkbox" 
                        v-model="projectsChecked[project]"
                        @change="changeProjectStatus(project)"
                    >
                    <div class="ctgt">
                        {{ project }}
                    </div>
                </div>
            </div>
        </div>
        <h5>Concluded projects</h5>
        <div v-for="({project,status},index) in projects" :key="index" class="ctg">
            <div v-if="status === 'concluded'" class="ctgc">  
                <div class="categories">
                    <input 
                        type="checkbox" 
                        v-model="projectsChecked[project]"
                        @change="changeProjectStatus(project)"
                    >
                    <div class="ctgt">
                        {{ project }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { store } from '@/Store'
    export default{
        data(){
            return {
                inputProject:""
            }
        },
        computed:{
            projects(){
                const projectsArray = []
                store.state.allUsersStat.forEach(user=>{
                    projectsArray.push({project:user.project,status:user.project_status})
                })
                return this.inputProject.length===0 ? projectsArray : 
                projectsArray.filter(user=>user.project.toLowerCase().includes(this.inputProject.toLowerCase())) 
            },
            projectsChecked(){
                const projectCheckObject = this.projects.reduce((acc, {project,status}) => {
                    acc[project] = store.state.checkedProjects.indexOf(project)>-1;
                    return acc;
                },{})

                return projectCheckObject
            }
        },
        methods:{
            changeProjectStatus(project){
                if(store.state.checkedProjects.indexOf(project)>-1)
                    store.commit('uncheckProject',project)
                else
                    store.commit('setProject',project)
            }
        }
    }
</script>
<style scoped>
    .panel{
        left: 75px;
        top: 58px;
        width: 18vw
    }
    .categories{
        padding: 8px;
        margin: 15px;
        display: flex;
        gap: 10px;
        justify-content: flex-start;
        align-items: center;
    }
    .categories input{
        margin-left: -15px;
    }
    h5{
        color: gray;
        height: fit-content;
        margin-top: -5px;
        margin-left: 15px;
        font-size: 15px;
        font-weight: 200;
    }
    .ctg{
        margin-top: -18px;
        padding: 0;
    }
    .ctgc{
        margin-top: 5px;
        display: flex;
        gap: 0px;
        justify-content: flex-start;
        align-items: center;
    }
</style>