( async () => {



    const nameEl = document.querySelector('#name')
    const locationEl = document.querySelector('#location')
    const dateEl = document.querySelector('#date')
    const timeEl = document.querySelector('#time')


    const { pathname } = window.location
    const [, event, id] = pathname.split('/')

    const url = `/api/v1/events/${id}`

    const result = await fetch(url)

    const { name, location, date, time } = await result.json()

    nameEl.textContent = name
    locationEl.textContent = location
    dateEl.textContent = date
    timeEl.textContent = time


    console.log( { name, location, date, time })


})()

