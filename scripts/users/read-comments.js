(function() {
    const requestSelector = document.querySelector('#method');
    const dataTable = document.querySelector('#data-table');
    const dataForm = document.querySelector('#data-form');
    const userIdField = document.querySelector('#user-id-field');
    const id = document.querySelector('#id');

function readById() {
    setStatus('PREPARING GET REQUEST');

    fetch(`https://jsonplaceholder.typicode.com/users/${id.value}/comments`, {
        method: 'GET'
    }).then(response => {
        setStatus('RECEIVED RESPONSE');
        if (response.ok) return response.json();
        else throw new Error('Uh oh, something went wrong...');
    })
      .then(comments => {
        setStatus('RENDERING TABLE');
        renderCommentsTable(comments, dataTable);
        setStatus('RESPONSE RENDERED INTO TABLE');
    })
      .catch(error => {
        setStatus('ERROR ENCOUNTERED');
        handleError(error);
    });
}
    // default initialisation
    readAll();

    dataForm.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent default page refresh on form submission
        readById();
    });
})();