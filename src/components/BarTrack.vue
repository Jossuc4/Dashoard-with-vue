<template>
  <div class="main">
    <p> {{chosenDate}} </p>
    <Bar 
        :data="data" :options="options" 
    />
  </div>
</template>
  
  <script>
  import { store } from '@/Store'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  import moment from 'moment'
  import { Bar } from 'vue-chartjs'
  import { getDaysInMonth , intialUserTrack } from './TrackChart'

  //Régler l'espace entre la graphe et la légende
  const legendMargin ={
    id:'legendMargin', 
    afterInit(chart, args, options){

      const fitValue = chart.legend.fit
      chart.legend.fit = function fit(){
        fitValue.bind(chart.legend)()
        return this.height += 80
      }

    }
  }

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, legendMargin)
  
  export default {
    name: 'App',
    components: {
      Bar
    },
    data() {
      return {
        options: {
          plugins:{
            legend:{
              display:true,
              position: 'top',
              align:'start',
            },
          },
          scales:{
            'real-y-axis':{
              position: 'right',
              ticks: {
                min: 0,
                max: 12,
                stepSize: 2,
                callback: function(value, index, values) {
                  if (value === 0) return '0h'
                  if (value===2) return '2h'
                  if (value===4) return '4h'
                  if (value === 6) return '6h'
                  if (value === 8) return '8h'
                  if (value === 10) return '10h'
                  if (value===12) return '12h'
                  return ''
                },
                stacked:true
              },
            },
            x:{
              ticks:{
                color: function(value,data){
                  if(value.tick.label[1]==='S'){
                    return 'red'
                  }else{
                    return "black"
                  }
                }
              },
              stacked:true
            }
          },
          maintainAspectRatio: false,
          responsive:true
        }
      }
    },
    computed:{
      data(){
        return {
            labels:getDaysInMonth(moment(store.state.userTrackPeriod[0]).month(),moment(store.state.userTrackPeriod[0]).year()).days,
            color: 'red',
            datasets:[
              {
                label:"Tracked time",
                data: store.state.actualUser.length>0 ?
                  intialUserTrack(this.chosenDate).total :
                  [],
                barThickness:30,
                backgroundColor: 'rgb(35, 184, 151)',
                borderRadius: 8,
                order:1,
                yAxisID: 'real-y-axis'
              },
              {
                label:"Idle time",
                data: store.state.actualUser.length>0 ?
                 intialUserTrack(this.chosenDate).idle :
                  [],
                barThickness:30,
                backgroundColor: '#fd0033',
                borderRadius: 8,
                order:0,
                yAxisID: 'real-y-axis'
              }
            ]
          }
        },
      chosenDate(){
        // return getDaysInMonth(this.initial.month,this.initial.year).dateTittle
        return getDaysInMonth(moment(store.state.userTrackPeriod[0]).month(),moment(store.state.userTrackPeriod[0]).year()).dateTittle
      }
    }
  }
</script>
<style scoped>
  .main{
    position: relative;
    width: 90vw;
    padding:10px;
    border-radius: 12px;
    height: 400px;
    max-height: 400px;
    box-shadow: 2px 4px rgba(90, 88, 88, 0.39);
    background-color: white;
    display: flex;
    align-items: center;
  }
  p{
    position: absolute;
    color: rgba(119, 119, 118, 0.342);
    margin-bottom: 12px;
    z-index: 100  !important;
    top: 50px;
    left: 18px;
  }
</style>