import { useState } from 'react'

export function CreateTodo(){
    const [title, setTitle]= useState("")
    const [description, setDescription]= useState("")

    return <div>
        <input style={{
            padding: 10,
            margin: 10
        }} type="text" placeholder="title" onChange={(e) => {
            setTitle(e.target.value)
        }}></input> <br />
        <input style={{
            padding: 10,
            margin: 10
        }} type="text" placeholder="description" onChange={(e) => {
            setDescription(e.target.value)
        }}></input> <br />
        <button style={{
            padding: 10,
            margin: 10
        }} onClick={ async() => {
            const res= await fetch("http://localhost:3000/todo",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    completed: false
                })
            })
            const resData= await res.json()
            alert(resData.msg)
        }}>Add a todo</button>
    </div>
}