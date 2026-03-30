import TodosMessage from "./TodosMessage"
export default function page() {
    return (
        <div className="flex flex-row">
            <div className="m-5">
                <h5>Todos</h5>
                <TodosMessage/>
            </div>
        </div>
    )
}
