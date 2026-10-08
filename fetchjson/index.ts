import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

axios.get(url).then(response => {
    // response.data is the JSON object returned from the API

    const todo = response.data as Todo;
    const id = todo.id;
    const title = todo.title;
    const finished = todo.completed;

    logTodo(id, title, finished);

}).catch(error => {
    console.error('Error fetching data:', error);
});

const logTodo = (id: number, title: string, completed: boolean) => {
    console.log(`Todo ID: ${id}, Title: ${title}, Completed: ${completed}`);
}