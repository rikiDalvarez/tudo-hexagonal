import { useState } from 'react';

function TodoForm() {
	const [todo, setTodo] = useState('');

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:3000/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ todo: todo, done: false }),
			});

			if (response.ok) {
				console.log('Todo created successfully');
			} else {
				console.error('Error creating todo:', response.status);
			}
		} catch (error) {
			console.error('Error creating todo:', error);
		}

		setTodo('');
	};

	return (
		<div className="headerInput">
			<h1>TodoList</h1>
			<form id={todo} onSubmit={handleSubmit}>
				<input
					className='input'
					type="text"
					placeholder="Input todo here"
					value={todo}
					onChange={(e) => setTodo(e.target.value)}
				/>
				<button className="addTodo" type="submit">Add Todo</button>
			</form>
		</div>
	);
}


export default TodoForm;
