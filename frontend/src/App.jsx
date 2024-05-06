import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos]= useState([])

  fetch("http://localhost:3000/todos").then(
    async (res) => {
      const data= await res.json()
      setTodos(data)
    }
  )

  return (
    <> 
      <CreateTodo />
      <Todos todos={todos} />
    </>
  )
}

export default App
