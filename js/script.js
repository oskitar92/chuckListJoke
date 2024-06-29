document.addEventListener('DOMContentLoaded', () => {
    const fetchJokeButton = document.getElementById('fetchJoke');
    const jokeList = document.getElementById('jokeList');

    
    loadJokes();

    
    fetchJokeButton.addEventListener('click', function() {
        getJoke().then(function(joke) {
            if (joke) {
                addJokeToDOM(joke);
                saveJokes();
            }
        });
    });


   
    function getJoke() {
        return fetch('https://api.chucknorris.io/jokes/random')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                return data.value;
            })
            .catch(function(error) {
                console.log('Error fetching joke:', error);
            });
    }
   
    function addJokeToDOM(joke) {
        const li = document.createElement('li');
        li.textContent = joke;
        li.appendChild(createDeleteButton(li));
        jokeList.appendChild(li);
    }

    
    function createDeleteButton(li) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveJokes();
        });
        return deleteBtn;
    }

    
    function saveJokes() {
        const jokes = Array.from(jokeList.children).map(li => li.firstChild.textContent);
        localStorage.setItem('jokes', JSON.stringify(jokes));
    }

    
    function loadJokes() {
        const jokes = JSON.parse(localStorage.getItem('jokes')) || [];
        jokes.forEach(addJokeToDOM);
    }
});
