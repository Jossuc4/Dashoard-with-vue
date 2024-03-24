<script >
import BarTrack from "./components/BarTrack.vue"
import SearchBar from "./components/SearchBar.vue";
import Categories from "./components/Categories.vue";
import DateRange from "./components/DateRange.vue";
import { store } from "./Store";

export default{
  name:'App',
  components:{
    BarTrack,
    SearchBar,
    Categories,
    DateRange
  },
  created(){
    store.commit('setAllUsersData')
  }
}
</script>

<template>
  <div class="main-container">
    <div class="header">
      <SearchBar/>
      <Categories/>
      <DateRange/>
    </div>
    <div class="chart">
      <h1 class="h-tracked">HOURS TRACKED</h1>
      <div class="chart-container">
        <BarTrack/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .h-tracked{
    color: rgb(163, 154, 154);
    font-weight: bold;
    font-family: sans-serif;
    font-size: 14px;
    margin-left: 70px;
    margin-top: 30px;
  }
  .header{
    display: flex;
    /*flex-direction: flex-start;*/
    align-items: center;
    gap: 10px;
    width: 95vw;
    padding: 0px 50px;
    background-color: rgb(255, 255, 255);
    margin-left: -10px;
    position: relative;
  }
  .chart-container{
    width: 100vw;
    padding: 0px 12px;
    display: flex;
    justify-content: center;
  }
</style>./components/DatePicker/DatePicker.vue
