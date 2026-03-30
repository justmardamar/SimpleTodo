import Calendar from "./Calendar"
import Link from "next/link"

export default function page() {
  return (
    <>
        <h1>Ini adalah calender</h1>
        <Link href={'/todos'} className="border p-2 rounded-xl hover:bg-gray-600 transition">History Todos</Link>
        <Calendar locale='en-US'/>
    </>

  )
}
