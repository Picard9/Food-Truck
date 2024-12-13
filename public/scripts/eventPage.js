
document.addEventListener('DOMContentLoaded', async function () {
    const EventName = document.getElementById('EventName')
    const EventLocation = document.getElementById('EventLocation')
    const EventDate = document.getElementById('EventDate')
    const EventTime = document.getElementById('EventTime')

    // Get the event ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id'); // Get the actual Event's Id.
  
    if (!eventId) {
      alert("No event ID found!");
      return;
    }
  
    // Fetch the event details from the server
    const response = await fetch(`/api/v1/events/${eventId}`);
    const event = await response.json();
  
    // Check if the event exists and display the data
    if (event && !event.error) {
      EventName.textContent = event.name;
      EventLocation.textContent = event.location;
      EventDate.textContent = event.date;
      EventTime.textContent = event.time;
    } else {
      alert('Event not found');
    }
});
  
  

