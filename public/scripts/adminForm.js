// Handle form submissions

const FormSubmission = (formId, endpoint) => {

    const addMenuEventForm = document.getElementById(formId)
    
    addMenuEventForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data and Convert data
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

FormSubmission('menuForm', 'menu'); //invoke the function and pass the id's from and the end point (menu).
FormSubmission('eventForm', 'events'); //invoke the function and pass the id's from and the end point (events).



  