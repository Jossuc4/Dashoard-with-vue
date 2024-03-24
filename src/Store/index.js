import Vuex from 'vuex'

export const store = new Vuex.Store(
    {
        state:{
            dateDisplayer:[],
            actualUser: "",
            allUsersStat : [],
            checkedProjects:[],
            userTrackPeriod:[]
        },
        mutations:{
            setUser(state,payload)
            {
                state.actualUser = payload
            },
            setProject(state,payload)
            {
                state.checkedProjects.push(payload)

                console.log(state.checkedProjects)
            },
            uncheckProject(state,payload)
            {
                const index = state.checkedProjects.indexOf(payload)
                state.checkedProjects.splice(index,1)
            },
            setAllUsersData(state){
                try{
                    fetch('src/api/api.json').then(res=>res.json())
                    .then(data=>{
                        state.allUsersStat = [...data]
                    })
                } catch(error) {
                    throw error
                }
            },
            setUserTrackPeriod(state,payload)
            {
                state.userTrackPeriod = payload
            }
        }
    }
)