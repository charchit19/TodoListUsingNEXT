import React, { useEffect, useState } from 'react';

const Todos = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Fetch todos from the server
            fetchTodos(token);
        }
    }, []);

    const fetchTodos = (token) => {
        fetch(`http://localhost:3001/todos?token=${token}`)
            .then(response => response.json())
            .then(data => {
                console.log('Todos:', data.todos);
                setTodos(data.todos);
            })
            .catch(error => console.error('Error fetching todos:', error));
    };

    const deleteTodo = (title) => {
        const token = localStorage.getItem('token');

        fetch(`http://localhost:3001/deleteTodo?token=${token}&title=${title}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Todo deleted successfully:', data.message);
                // Update the state to reflect the changes
                setTodos(todos.filter(item => item.title !== title));
            })
            .catch(error => console.error('Error deleting todo:', error));
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-4xl font-medium title-font mb-4 text-gray-900">Your Todos</h1>
                    {todos.length === 0 && (
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Your Todos will show up here. Please add a todo by going to the homepage
                        </p>
                    )}
                </div>
                <div className="flex flex-wrap -m-4">
                    {todos.map(item => (
                        <div className="p-4 lg:w-1/4 md:w-1/2" key={item._id}>
                            <div className="h-full flex flex-col items-center text-center">
                                <img
                                    alt="team"
                                    className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                                    src={`https://picsum.photos/600/900?a=${item.title}`}
                                />
                                <div className="w-full">
                                    <h2 className="title-font font-medium text-lg text-gray-900">{item.title}</h2>
                                    <p className="mb-4">{item.desc}</p>
                                    <span className="inline-flex">
                                        <a className="text-gray-500 cursor-pointer" onClick={() => deleteTodo(item.title)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">
                                                <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Todos;
