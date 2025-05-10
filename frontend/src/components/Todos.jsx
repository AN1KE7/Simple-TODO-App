// We can use props.todos in function but more modern syntax is object destructuring.
// {tsks} is passed inside function.


// todos = [
//     {
//         title:"go to gym",
//         description:"at time 5-6 AM"
//     }
// ]


export function Todos({todos}){
    return <div>
        {todos.map(function(todo){
            return <div>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button>{todo.completed == true ? "Completed" : "Mark as complete"}</button>
            </div>
        })}
       
    </div>
}