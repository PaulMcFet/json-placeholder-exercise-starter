(function() {
    const dataForm = document.querySelector('#data-form');
    const id = document.querySelector('#id');

    function findById() {
        setStatus('Finding user to delete...')
        fetch(`https://jsonplaceholder.typicode.com/users/${id.value}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) return response.json();
            else throw new Error('Uh oh, something went wrong...');
        })
          .then(user => {
            confirm = window.confirm("Are you sure you want to delete " + user.name + "?")
            if (confirm) {
                remove();
            }
        })
          .catch(error => {
            setStatus('ERROR ENCOUNTERED');
            handleError(error);
        });
    }

    function remove() {
        fetch(`https://jsonplaceholder.typicode.com/users/${id.value}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) return response.json();
            else throw new Error('Uh oh, something went wrong...');
        }).then(json => {
            setStatus('USER DELETED');
            console.log(json);
        }).catch(error => {
            setStatus('FAILED TO DELETE USER');
            handleError(error);
        });
    }

    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        findById();
    });

})();