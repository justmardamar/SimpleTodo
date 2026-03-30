"use client"
import useCalendar from "@/lib/Calender"
import React, { useMemo, useState, useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import { isToday, format } from "date-fns"
import Todo from "./Todo"
import { getDeadlines } from "@/lib/getDeadline"
import { supabaseClient } from "@/lib/supabaseClient"
import { useParams } from "next/navigation"


const Calendar: React.FC<{ locale: string }> = ({ locale }) => {
    const [markedDates, setMarkedDates] = useState<Set<string>>(new Set())
    const { id } = useParams<{ id: string }>()


    useEffect(() => {
        async function loadDeadlines() {
            const { data: { user } } = await supabaseClient.auth.getUser()
            if (!user?.email) return
            const dates = await getDeadlines(id)
            setMarkedDates(new Set(dates))
        }
        loadDeadlines()
    }, [id])

    locale = navigator.language
    const { year, month, weekdays, cells, startMonth, goNext, goPrev } = useCalendar(new Date(), locale)

    const monthFormater = useMemo(() => {
        return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
    }, [locale])

    const [getDay, setGetDay] = useState<Date | null>(null)

    return (
        <div className="w-full min-w-[200px] p-4">
            <div className="flex items-center justify-between mb-3 ">
                <button className="px-3 py-2 rounded-2xl border border-gray-50 text-sm hover:bg-gray-100 transition"
                    onClick={goPrev}>
                    prev
                </button>
                <div className="text-lg font-semibold select-none">
                    {monthFormater.format(new Date(year, month, 1))}
                </div>
                <button className="px-3 py-2 rounded-2xl border border-gray-50 text-sm hover:bg-gray-100 transition"
                    onClick={goNext}>
                    next
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-1">
                {weekdays.map((day) => (
                    <div key={day} className="text-center font-medium py-1">
                        {day}
                    </div>
                ))}
            </div>

            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div key={`${startMonth.getFullYear()}-${startMonth.getMonth()}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="grid grid-cols-7 gap-1"
                    >
                        {cells.map(({ date, currentMonth }) => {
                            const cellDateKey = format(date, 'yyyy-MM-dd')
                            const hasDeadline = markedDates.has(cellDateKey)

                            const todayCell = isToday(date)
                            let base = 'aspect-squere relative flex items-center justify-center rounded-2xl select-none'
                            base += todayCell ? '' : 'hover:bg-gray-100'
                            const tones = currentMonth ? 'bg-white' : 'bg-gray-100 opacity-70'

                            const todayRing = todayCell ? 'ring-2 ring-offset-1 ring-blue-400' : ''

                            const isTodayWithDeadline = todayCell && hasDeadline

                            return <div key={date.toISOString()}
                                className={`${base} ${tones} ${todayRing} cursor-pointer hover:bg-gray-100`}
                                title={date.toDateString()}
                                onClick={() => setGetDay(date)}
                            >
                                <span className={todayCell ? 'font-bold' : ''} >
                                    {date.getDate()}
                                </span>

                                {isTodayWithDeadline ? (
                                    <span className="absolute -top-1.5 right-1.5 text-[10px] px-1 py-0.5 rounded-md bg-green-400/80 text-white">
                                        today & deadline
                                    </span>
                                ) : todayCell ? (
                                    <span className="absolute -top-1.5 right-1.5 text-[10px] px-1 py-0.5 rounded-md bg-blue-400/80 text-white">
                                        today
                                    </span>
                                ) : hasDeadline ? (
                                    <span className="absolute -top-1.5 right-1.5 text-[10px] px-1 py-0.5 rounded-md bg-red-500/80 text-white">Deadline</span>
                                ) : null}

                            </div>
                        })}

                    </motion.div>
                </AnimatePresence>

                <div className="mt-5">
                    Pilih Hari :
                    {getDay && (
                        <span className="ml-2 font-semibold">
                            {getDay.toLocaleDateString(locale, {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    )}
                    {getDay && (<Todo inputdate={getDay} />)}
                </div>
            </div>
        </div>
    )
}
export default Calendar