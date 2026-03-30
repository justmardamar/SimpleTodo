import { useCallback, useMemo, useState } from "react"

function detectLocaleFirtsDay(locale:string ) {
    try{
        const loc = new Intl.Locale(locale)
        if (loc.weekInfo?.firstDay){
            const index = weekInfo.firstDay % 7
            return index
        }
    }catch{
        
    }
    return 0
}

function useCalendar(date : Date, locale : string) {
    
    const [startMonth,setStartMonth] = useState(new Date(
        date.getFullYear(),date.getMonth(),1
    ))

    const goNext = useCallback(() => {
        setStartMonth((dateNext:Date) => 
            new Date(dateNext.getFullYear(),dateNext.getMonth() + 1,1)
        )
    },[])

    const goPrev = useCallback(() => {
        setStartMonth((datePrev:Date) => 
            new Date(datePrev.getFullYear(),datePrev.getMonth() - 1,1)
        )
    },[])

    const data = useMemo(() => {
        const now = new Date(startMonth)
        const year = startMonth.getFullYear()
        const month = startMonth.getMonth()

        const endOfMonth = new Date(year,month + 1,0)
        const daysInMonth = endOfMonth.getDate()

        const weekDayFormater = new Intl.DateTimeFormat(locale,{weekday: 'short'})
        let weekdays = Array.from({length:7}).map((_,i) => {
            const baseDate = new Date(2021,7,1+i)
            return weekDayFormater.format(baseDate)
        })

        const indexStart = detectLocaleFirtsDay(locale)
        weekdays = weekdays.slice(indexStart).concat(weekdays.slice(0,indexStart))

        const haripertama = startMonth.getDay()
        const leading = ((haripertama - indexStart + 7)%7)

        const cells = []
        const prevMonthLastDay = new Date(year, month, 0).getDate()

        for (let i = leading - 1; i >= 0; i--) {
            cells.push({
                date: new Date(year, month - 1, prevMonthLastDay - i),
                currentMonth: false
            })
        }
        for (let j = 1; j <= daysInMonth; j++){
            cells.push({
                date: new Date(year,month,j),
                currentMonth : true
            })
        }

        while(cells.length < 42){
            const last: Date = cells[cells.length - 1].date
            const next: Date = new Date(last)
            next.setDate(last.getDate() + 1)
            cells.push({
                date:next,
                currentMonth:false
            })
        }

        const isToday = (date:Date) => {
            return (
                date.getFullYear() === now.getFullYear() &&
                date.getMonth() === now.getMonth() &&
                date.getDate() === now.getDate()
            )
        }

        return {
            year, month, weekdays,cells, isToday
        }
    },[startMonth])

    return {...data,startMonth,goNext,goPrev}

}
export default useCalendar