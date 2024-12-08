// Handle form submissions

const FormSubmission = (formId, endpoint) => {

    const addMenuForm = document.getElementById(formId)
    
    addMenuForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch(`/api/v1/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    .then(response => response.json())
    .then(() => alert(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} added!`))
    .catch(error => console.error('Error:', error));

    this.reset();
    });
};

FormSubmission('menuForm', 'menu'); //invoke the function and pass the id from the end points.


  