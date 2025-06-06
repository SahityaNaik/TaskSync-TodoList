import { useState, useEffect} from 'react' 
import Navbar from './components/navbar.jsx'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
 

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
     let todoString=localStorage.getItem("todos")
     if(todoString){
       let todos=JSON.parse(todoString)
       setTodos(todos)
      }
  }, [])
  

  const saveToLS= (todosToSave) => {
    localStorage.setItem("todos", JSON.stringify(todosToSave))
  }
  
  const toggleFinished=(e) => {
    setShowFinished(!showFinished)
  }
  

  const handleEdit = (e,id)=>{
    let t= todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (e, id)=>{ 
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = ()=>{
    if (todo.trim().length <= 2) return;
    const newTodos=([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodos(newTodos)
    setTodo("") 
    saveToLS(newTodos)
  }

  const handleChange = (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox= (e) => {
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted= !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }
  
  

  return (
    <>
    <Navbar/> 
       <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200  min-h-[86vh] md:w-[40%]">
       <h1 className='font-bold text-center text-2xl'>TaskSync - Manage your tasks at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Task</h2>
           
        <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }} className="flex">
        <input onChange={handleChange} value={todo} type="text" placeholder='Enter your task' className="w-full rounded-full px-5 py-1" /> 
        <button type="submit" disabled={todo.length <= 2} className="bg-violet-800 mx-2 hover:bg-violet-950 disabled:bg-violet-700 p-4 py-2 text-sm font-bold text-white rounded-full cursor-pointer"> Save </button> </form> 

        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished 
         <h2 className='text-xl font-bold my-3'>Your Tasks</h2>
        <div className="todos">
        {todos.length===0 && <div className='m-5'> No tasks to display </div>}
          {todos.map(item=>{ 

         return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
          <div className='flex gap-5'>
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
            </div>
          </div>
          })}
          </div>

         </div>
    </>
  )
}

export default App
