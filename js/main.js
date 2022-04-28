
// Add an event listener to the button
document.querySelector('.check').addEventListener('click', compute)

function compute(){
    let barcode = document.querySelector('input').value
    if (barcode.length != 12){
        hideProductError();
        hideContent();
        error();
      } else {
          hideError();
          removeHidden();
          getFetch();
      }
}

function hideContent(){
    let allTitles = document.querySelectorAll('.title')
    allTitles.forEach(e => {e.classList.add('hidden')})
}

function hideError(){
    let errorMessage = document.querySelector('.barcodeWrongLength')
    let productError = document.querySelector('.notAProduct')
    errorMessage.classList.add('hidden')
    productError.classList.add('hidden')
}

function hideProductError(){
    let productError = document.querySelector('.notAProduct')
    productError.classList.add('hidden')
}

function removeHidden(){
    // Grab all elements with class 'title' and assign as variable 'allTitles'
    let allTitles = document.querySelectorAll('.title')
    // Remove class 'hidden' from those elements
    allTitles.forEach(e => {e.classList.remove('hidden')})
}

function getFetch(){
    // Grab user input and assign as variable 'barcode'
    let barcode = document.querySelector('input').value
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)
          populate(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
            hideContent();
            hideError();
            productNotFound();
        });
  }

  function populate(data){
      let foodName = data.product.product_name
      let imageRef = data.product.image_url
      let allergens = data.product.allergens_hierarchy
      let nameTextChange = document.querySelector('.productName')
      let gfStatusChange = document.querySelector('.gfStatus')
      let foodImage = document.querySelector('.productImage')

      nameTextChange.innerText = foodName
      foodImage.src = imageRef

      if (allergens.includes('en:gluten')){
          gfStatusChange.innerText = 'This product IS NOT gluten free'
      } else {
          gfStatusChange.innerText = 'This product IS gluten free'
      }
  }

  function error(){
      let errorRef = document.querySelector('.barcodeWrongLength')
      errorRef.classList.remove('hidden')
  }

  function productNotFound(){
        let productError = document.querySelector('.notAProduct')
        productError.classList.remove('hidden')
  }
