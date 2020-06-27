console.log('weather-client connected!!!')

const form = document.querySelector('form')
const search = document.querySelector('#search')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


console.log('form', form)

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const address = search.value
    const url = '/weather?address=' + address
    message1.textContent = 'loading...'
    message2.textContent = ''
    fetch(url).then((res) => {
        res.json().then((body) => {
            if (body.error) {
                message1.textContent = 'Error'
                message2.textContent = body.error
                console.log(body.error)
            } else {
                message1.textContent = body.place
                message2.textContent = 'Current Temperature(C) ' + body.temp + ' Feels Like ' + body.feelslike

            }
        })
    })
})