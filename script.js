const scriptURL = 'https://script.google.com/macros/s/AKfycbwBLtmTyogGxuYZvmw9oLnoEFJ17d0sPNaW407xs0DlWQfDcQE82D3-EuuIeiVNBDOW/exec'
  const form = document.forms['myform']
  const btn = document.querySelector('#postData')

  btn.addEventListener('click', e => {
      e.preventDefault()
      console.log("halo")
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })