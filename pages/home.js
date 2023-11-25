import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function home() {
  const router = useRouter();
  const [username, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Fetch user information using the token
      fetch(`http://localhost:3001/login?token=${token}`)
        .then(response => response.json())
        .then(data => setUserName(data.username))
        .catch(error => console.error('Error fetching user information:', error));
    } else {
      setUserName(''); // Set username to an empty string when the token is not present
    }
  }, []);



  const [todo, setTodo] = useState({ title: "", desc: "" })

  // Add Todo function
  const addTodo = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, title: todo.title, desc: todo.desc }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        fetchTodos(token);
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  // Fetch Todos function
  const fetchTodos = (token) => {
    fetch(`http://localhost:3001/todos?token=${token}`)
      .then(response => response.json())
      .then(data => {
        console.log('Todos:', data.todos);
      })
      .catch(error => console.error('Error fetching todos:', error));
  };


  const onChange = (e) => {

    setTodo({ ...todo, [e.target.name]: e.target.value })
  }
  return (
    <div className="my-2 text-3xl">
      <h1 className="flex items-center justify-between">
        <span>Welcome {username}</span>
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">

          <div className="  bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Add a Todo</h2>
            <div className="relative mb-4">
              <label htmlFor="title" className="leading-7 text-sm text-gray-600">Todo Title</label>
              <input onChange={onChange} value={todo.title} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Todo Text</label>
              <input onChange={onChange} value={todo.desc} type="text" id="desc" name="desc" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button onClick={addTodo} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none w-fit hover:bg-indigo-600 rounded text-lg">Add Todo</button>
            <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
