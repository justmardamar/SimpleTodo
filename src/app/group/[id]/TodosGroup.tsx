"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useRoleUserGroup } from "@/lib/users/useRoleUserGroup"
import SearchInput from "@/components/SearchInput"
import { TodosRole } from "@/lib/todos/TodosRole"
import Link from "next/link"

export default function TodosGroup() {
    const { id } = useParams<{ id: string }>()
    const [todos, setTodos] = useState<any[]>([])
    const [search, setSearch] = useState({
        title: "",
        priorities_id: "",
        status: ""
    })
    const [debounceSearch, setDebounce] = useState(search)

    const { role } = useRoleUserGroup(id)

    const fetchTodos = async () => {
        if (!role) return
        const query = TodosRole({ roleId: role, groupId: id })

        if (debounceSearch.title) {
            query.ilike('title', `%${debounceSearch.title}%`)
        }
        if (debounceSearch.priorities_id) {
            query.eq('priorities_id', debounceSearch.priorities_id)
        }
        if (debounceSearch.status) {
            query.eq('status', debounceSearch.status)
        }

        const { data, error } = await query.order("deadline", { ascending: true })

        if (error) {
            console.log(error)
            return
        }
        
        setTodos(data)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(search)
        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        fetchTodos()
    }, [id, debounceSearch,role])

    return (
        <div className="min-h-[calc(100vh-140px)] flex justify-center py-10 px-4">
            <div className="w-full max-w-4xl bg-white  overflow-hidden">
                <div className="p-8 md:p-10 flex flex-col gap-8">
                    <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center">Todos Group</h1>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700/50">
                        <form className="flex flex-col md:flex-row gap-6 items-center flex-wrap">
                            <SearchInput
                                placeholder="Search title..."
                                className="w-full md:flex-1"
                                onChange={(e) => setSearch((prev) => ({ ...prev, title: e.target.value }))}
                            />
                            <div className="flex gap-4 flex-wrap w-full md:w-auto">
                                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 w-full sm:w-auto">
                                    Priorities
                                    <select
                                        className="p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        onChange={(e) => setSearch((prev) => ({ ...prev, priorities_id: e.target.value }))}
                                    >
                                        <option value="">All</option>
                                        <option value="1">Urgent</option>
                                        <option value="3">Moderate</option>
                                        <option value="4">Small</option>
                                        <option value="2">Optional</option>
                                    </select>
                                </label>
                                {role == 1 || role == 2 ? (
                                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 w-full sm:w-auto">
                                        Status
                                        <select
                                            className="p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            onChange={(e) => setSearch((prev) => ({ ...prev, status: e.target.value }))}
                                        >
                                            <option value="">All</option>
                                            <option value="complete">Complete</option>
                                            <option value="incomplete">Incomplete</option>
                                        </select>
                                    </label>
                                ) : ""}
                            </div>
                        </form>
                    </div>

                    <ul className="space-y-4">
                        {todos.length > 0 ?
                            todos?.map((todo, index) => (
                                <li key={index} className="p-6 border border-slate-100 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200 hover:border-indigo-100 dark:hover:border-indigo-900/30 group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{todo.title}</h2>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-600`}>
                                            {todo.priorities.name}
                                        </span>
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{todo.notes}</p>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                                        <div className="flex gap-3 text-xs text-slate-500">
                                            <span className={`px-2 py-1 rounded ${todo.status === 'complete' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                                                {todo.status}
                                            </span>
                                            <span className="flex items-center">
                                                Deadline: {todo.deadline ? new Date(todo.deadline).toLocaleDateString() : "-"}
                                            </span>
                                        </div>

                                        <div className="flex gap-3">
                                            <Link href={`/group/due/admin/${todo.id}`} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm hover:shadow">
                                                Task Due
                                            </Link>
                                            <Link href={`/group/due/${id}`} className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200">
                                                Comment
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))
                            :
                            <li className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                                Belum Ada Todo
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
