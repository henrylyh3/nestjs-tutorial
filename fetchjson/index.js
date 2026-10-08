const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/todos/1';

axios.get(url).then(response => {
    // response.data is the JSON object returned from the API

    const todo = response.data;
    const id = todo.id;
    const title = todo.title;
    const finished = todo.completed;

    logTodo(id, title, finished);

}).catch(error => {
    console.error('Error fetching data:', error);
});

const logTodo = (id, title, completed) => {
    console.log(`Todo ID: ${id}, Title: ${title}, Completed: ${completed}`);
}
