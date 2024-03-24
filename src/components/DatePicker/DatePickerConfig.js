import moment from "moment"

export const date = moment()

export const filters = [
    {
        target: "Today",
        val: [date.toDate()],
        selected:false
    },
    {
       target:"Yesterday",
       val:[date.subtract(1,'days').toDate()],
       selected:false
    },
    {
        target:"This Week",
        val:[
            date.startOf('week').toDate(),
            date.endOf('week').toDate()
        ],
        selected:false
    },
    {
        target:"Last Week",
        val:function(){
            const currentWeekStart = date.startOf('week')
            const startLastWeek = moment(currentWeekStart).subtract(7, 'days').toDate()
            const endLastWeek= moment(startLastWeek).endOf('week').toDate()

            return [
                startLastWeek,
                endLastWeek
            ]
        }(),
        selected:false
    },
    {
        target:"First Part Mounth",
        val:[
            date.startOf('month').toDate(),
            date.startOf('mounth').add(14,'days').toDate()
        ],
        selected:false
    },
    {
        target:"Second Part Mounth",
        val:[
            date.startOf('month').add(15,'days').toDate(),
            date.endOf('month').toDate()
        ],
        selected:false
    },
    {
        target:"Current Part Mounth",
        val: date.date() <= 15 ? 
            [
                date.startOf('month').toDate(),
                date.startOf('mounth').add(14,'days').toDate()
            ] : 
            [
                date.startOf('month').add(15,'days').toDate(),
                date.endOf('month').toDate()
            ],
            selected:false
    },
    {
        target:"Previous Part Mounth",
        val:function (){
            const currentMonthStart = date.startOf('month')
            const previousMonthPartStart = moment(currentMonthStart).subtract(15,'days').toDate()
            const previousMonthPartEnd = moment(previousMonthPartStart).endOf('month').toDate()
            return [
                previousMonthPartStart,
                previousMonthPartEnd
            ]
        }(),
        selected:false
    }
]