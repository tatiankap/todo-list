
import { useState } from 'react';
import TodoList from './todo/TodoList';
import TodoInput from './todo/TodoInput';
import { toast } from 'react-toastify'

export default function Main() {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState('');

    const handleAddTodo = () => {
        if (todo.trim() === '') {
            return toast.error('The field cannot be empty')
        }

        const newTodo = {
            completed: false,
            text: todo,
            id: Date.now()
        }
        setTodoList(todos => ([...todos, newTodo]));
        setTodo('');
        toast.info('New todo added to list')
    }

    const handleSetTodo = (value) => {
        setTodo(value)
    }

    const toggleCompleted = (id) => {
        setTodoList(todos => todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }

    const deleteTodo = (id) => {
        setTodoList(todos => todos.filter(todo => todo.id !== id))
        toast.info('Todo deleted')
    }

    const sortedTodoList = todoList.sort((a, b) => b.completed - a.completed);

    return (
        <div className="container d-flex flex-column h-100">
            <h1>Todo List</h1>
            <div className="row h-50 overflow-scroll mb-3">
                <TodoList todos={sortedTodoList} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo} />
            </div>
            <div className="row gy-5">
                <TodoInput todo={todo} handleSetTodo={handleSetTodo} handleAddTodo={handleAddTodo} />
            </div>
        </div>
    )
}
