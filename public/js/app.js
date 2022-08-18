console.log('client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle')
   .then((response) => {
      response.json().then((data) => {
         console.log(data)
      }) 
   } )

fetch('http://localhost:3000/weather?address=Boston')
   .then(response => {
      response.json().then(data => {
         if(data.error){
            console.log(data.error)
         }else {
            console.log(data.address)
            console.log(data.forecast)
         }
      })
   })


const weatherForm = document.querySelector('button')

weatherForm.addEventListener('click' , (e) => {
   const location = document.querySelector('input').value
   if(location === ''){
      document.querySelector('#error').textContent = 'You must provide an address'
      setTimeout(() => document.querySelector('#error').textContent = '' , 2000)
   }else{
      fetch('http://localhost:3000/weather?address='+location)
      .then(response => {
         response.json().then(data => {
            if(data.error){
               document.querySelector('#error').textContent = data.error
            }else {
               document.querySelector('#error').textContent = data.address + ' ' + data.forecast
               console.log(data.address)
               console.log(data.forecast)
            }
         })
      })
   }
   e.preventDefault()
})
