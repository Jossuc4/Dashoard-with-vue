<template>
    <div class="container-dp">
        <div class="dp-root">
            <VCalendar 
                borderless
                transparent
                color="sky-blue"
                :attributes="attrs"
                title-position="left"
            />
        </div>
        <div class="filters">
            <h1>Preset filters</h1>
            <h4 
                v-for="filter in filters" 
                :key="filter" 
                @click="setFilter(filter)"

                :class="filter.selected && 'selected'"
                >{{ filter.target }}
            </h4>

            <div class="buttons">
                <button class="cancel" @click="cancelFilter">Cancel</button>
                <button class="apply" @click="validFilter">Apply</button>
            </div>
        </div>
    </div>
</template>

<script>
    import "../../../public/date-picker.css"
    import { filters } from "./DatePickerConfig";
    import { store } from "@/Store";

    export default{

        props:{
            closeModal:{
                type: Function ,
                required: true
            }
        },
        data(){
            return {
                // filters,
                attrs:[
                    {
                        key: 'today',
                        highlight: false,
                        dates: null
                    }
                ],
                dateFilter:[],
                titleFilter:""
            }
        },
        methods:{
            setFilter(filter){

                this.titleFilter = filter.target

                const dateValue = filter.val

                this.dateFilter = dateValue

                if(dateValue.length === 1){
                    this.attrs= [
                        {
                            key:'single-day-action',
                            highlight:{
                                class: 'over-round little-round'
                            },
                            dates: dateValue[0]
                        }
                    ]
                }else{
                    this.attrs=[
                        {
                            key: 'multiple-days-action',
                            highlight:{
                                start:{
                                    class: 'over-round little-round'
                                },
                                base:{
                                    class: 'basics'
                                },
                                end:{
                                    class: 'over-round little-round'
                                }
                            },
                            dates:{
                                start: dateValue[0],
                                end: dateValue[1]
                            }
                        },
                        {
                            highlight:{
                                class: 'little-round',
                            },
                            dates: dateValue
                        }
                    ]   
                }
            },
            cancelFilter(){
                this.attrs= [{
                    key:'today',
                    highlight: "blue",
                    dates: new Date()
                }]
                this.closeModal()
            },
            validFilter()
            {
                store.commit('setUserTrackPeriod',this.dateFilter)
                this.closeModal()
            }
        },
        computed:{
            filters(){
                
                filters.forEach(f => {
                    f.selected = f.target === this.titleFilter
                })

                return filters
            }
        }
    }
</script>
<style scoped>
    .dp-root{
        background-color: white;
    }
</style>