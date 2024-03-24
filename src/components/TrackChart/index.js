import { store } from "@/Store"
import moment from "moment/moment"

export function getDaysInMonth(month, year) {

    var date = new Date(year, month, 1)
    var days = []
    

    const splittedDate = date.toDateString().split(' ')
    const dateTittle = splittedDate[1]+". "+splittedDate[3]

    while (date.getMonth() === month) {

    const gottendate = new Date(date).toDateString()

    days.push(
        [parseInt(gottendate.split(' ')[2]),gottendate.charAt(0)]
    )

    date.setDate(date.getDate() + 1)

    }
    return {days, dateTittle}
}

export const  getUserStat=(username)=>{
    const usersStat = store.state.allUsersStat
    if(username!==""){
        const user = usersStat.find(user=>user.username === username).tracks
        return user
    }
    return []
}

export const intialUserTrack=(chosenDate)=>{

    if(store.state.userTrackPeriod.length>0){

        const track = store.state.userTrackPeriod
        const {total,idle} = getUserStat(store.state.actualUser).filter(data=>data.month === chosenDate)[0].track

        if(track.length===1){
            const singleIndex = moment(track[0]).date() - 1

            console.log(singleIndex)
            return {
                total: total.map((data,index)=>index===singleIndex ? data : 0),
                idle:idle.map((data,index)=>index===singleIndex ? data : 0)
            }
            
        }else if(track.length===2){
            const startIndex = moment(track[0]).date() - 1
            const endIndex = moment(track[1]).date() - 1
            return {
                total:total.map((data,index)=>(index >= startIndex && index <= endIndex) ? data : 0),
                idle:idle.map((data,index)=>(index >= startIndex && index <= endIndex) ? data : 0)
            }
        }

    }

    return {
        total: Array.from(getUserStat(store.state.actualUser).filter(data=>data.month === chosenDate)[0].track.total),
        idle: Array.from(getUserStat(store.state.actualUser).filter(data=>data.month === chosenDate)[0].track.idle)
    }
    
}

export const getFilterAndUpdateChart= function ()
{

    const filteredDate = store.state.userTrackPeriod
    const {actualUserTrackTime,actualUserIdleTime } = getUserStat(store.state.actualUser)

    const FilteredTrackArray = []
    const FilteredIdleArray = []

    if(filteredDate.length===1){
        
        const singleIndex = parseInt(moment(filteredDate[0]).day()) - 1
        const currentMonthNumberDays = parseInt(moment(filteredDate[0]).endOf('month'))

        let i = 0

        while(i<currentMonthNumberDays){

            if(i!==singleIndex){
                FilteredTrackArray.push(0)
                FilteredIdleArray.push(0)
            }else{
                FilteredTrackArray.push(actualUserTrackTime[i])
                FilteredIdleArray.push(actualUserIdleTime[i])
            }
            console.log(FilteredTrackArray[i],FilteredIdleArray[i])
            i++
        }

        return {
            total: FilteredTrackArray,
            idle: FilteredIdleArray
        }

    }else if(filteredDate.length>1){

        const startIndex = parseInt(moment(filteredDate[0]).day()) - 1
        const endIndex = parseInt(moment(filteredDate[1]).day()) - 1
        const currentMonthNumberDays = parseInt(moment(filteredDate[0]).endOf('month'))

        let i = 0
        while(i<currentMonthNumberDays){

            if(i>=startIndex && i<=endIndex){
                FilteredTrackArray.push(actualUserTrackTime[i])
                FilteredIdleArray.push(actualUserIdleTime[i])
            }else{
                FilteredTrackArray.push(0)
                FilteredIdleArray.push(0)
            }
            console.log(FilteredTrackArray[i],FilteredIdleArray[i])
            i++

        }

        return {
            total: FilteredTrackArray,
            idle: FilteredIdleArray
        }
        
    }else{
        return []
    }

}

globalThis.getFilterAndUpdateChart = getFilterAndUpdateChart