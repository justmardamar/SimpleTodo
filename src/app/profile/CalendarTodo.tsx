"use client"
import useCalendar from "@/lib/Calender"
import React, { useMemo, useState, useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import { isToday, format } from "date-fns"
import { supabaseClient } from "@/lib/supabaseClient"
import { TodosCalendar } from "@/types/Todos"
import CompleteStatus from "@/components/due/CompleteStatus"
import Link from "next/link"

const CalendarTodo: React.FC<{ locale: string, group_id: string }> = ({ locale, group_id }) => {
    const [todosByDate, setTodosByDate] = useState<Record<string, TodosCalendar[]>>({})
    const [selectedDate, setSelectedDate] = useState<string>("")
    const dailyTodos = todosByDate[selectedDate]

    useEffect(() => {
        async function loadDeadlines() {
            if (!group_id) {
                return
            }
            const { data, error } = await supabaseClient.from("todos")
                .select("id,title,notes,email_user,deadline,priorities_id, priorities (id,name)")
                .eq("group_id", group_id)
                .eq("status", "incomplete")
            if (error) {
                console.log(error)
                return
            }

            const grouped = ((data as unknown as TodosCalendar[]) || []).reduce((acc: Record<string, TodosCalendar[]>, todo: TodosCalendar) => {
                if (todo.deadline) {
                    const dateKey = format(new Date(todo.deadline), 'yyyy-MM-dd')
                    if (!acc[dateKey]) acc[dateKey] = []
                    acc[dateKey].push(todo)
                }
                return acc
            }, {})

            setTodosByDate(grouped)
        }
        loadDeadlines()
    }, [group_id])

    locale = navigator.language
    const { year, month, weekdays, cells, startMonth, goNext, goPrev } = useCalendar(new Date(), locale)

    const monthFormater = useMemo(() => {
        return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
    }, [locale])


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
                            const dayTodos = todosByDate[cellDateKey]
                            const hasDeadline = dayTodos && dayTodos.length > 0
                            const isSelected = selectedDate === cellDateKey

                            const todayCell = isToday(date)
                            let base = 'aspect-squere relative flex items-center justify-center rounded-2xl select-none cursor-pointer '
                            base += todayCell ? '' : 'hover:bg-gray-100'
                            const tones = currentMonth ? 'bg-white' : 'bg-gray-100 opacity-70'

                            const todayRing = todayCell ? 'ring-2 ring-offset-1 ring-blue-400' : ''
                            const selectedRing = isSelected ? 'ring-2 ring-offset-1 ring-gray-600' : ''

                            const isTodayWithDeadline = todayCell && hasDeadline

                            return <div key={date.toISOString()}
                                className={`${base} ${tones} ${todayRing} ${selectedRing}`}
                                title={date.toDateString()}
                                onClick={() => setSelectedDate(cellDateKey)}
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
            </div>
            {selectedDate && dailyTodos && dailyTodos.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="space-y-3">
                        {dailyTodos.map(todo => (
                            <div key={todo.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-medium text-gray-900">{todo.title}</h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium `}>
                                        {todo.priorities.name}
                                    </span>
                                </div>
                                {todo.notes && <p className="text-sm text-gray-500 mb-2 line-clamp-2">{todo.notes}</p>}
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span>Dibuat Oleh : {todo.email_user}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <CompleteStatus id={String(todo.id)} />
                                    <Link href={`group/due/admin/${todo.id}`} className="btn btn-secondary">Show Tasks</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
export default CalendarTodo
