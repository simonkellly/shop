
//Cart
var cart = []
var carttwo = []
var cost = 0;
const shippingSelect = document.getElementById('shippingType')
var cartCards = document.getElementById("cartCards");
var cartTotal = document.getElementById("cartTotal").innerHTML = "Total: €" + cost/100

var cartButton = document.getElementById("cartButton")



function start(){
  
    if (shippingSelect.value === 'delivery'){
      deliveryPrice = 650
      runningTotal = parseInt(cost) + deliveryPrice
      var cartTotal = document.getElementById("cartTotal").innerHTML = "Total: €" + runningTotal/100
  
    }else{
      if (shippingSelect.value === 'collection'){
        deliveryPrice = 0
        runningTotal = parseInt(cost) + deliveryPrice
        var cartTotal = document.getElementById("cartTotal").innerHTML = "Total: €" + runningTotal/100
    }
  } 
  
  shippingSelect.addEventListener("change", shippingType, false);
  }

window.addEventListener("load", start, false);

function modalCart() {
    document.getElementById("cartModal").className += " is-active";
  }
  
function closeCartFunction() {
    document.getElementById("cartModal").className += "modal";
  }

//Hoodie
function modalHoodie() {
    document.getElementById("hoodieModal").className += " is-active";
  }
  
function closeHoodieFunction() {
    document.getElementById("hoodieModal").className += "modal";
  }
  
//Jersey
function modalJersey() {
    document.getElementById("jerseyModal").className += " is-active";
  }
  
function closeJerseyFunction() {
    document.getElementById("jerseyModal").className += "modal";
  }
  
//Tshirt
function modalTshirt() {
  document.getElementById("tshirtModal").className += " is-active";
}

function closeTshirtFunction() {
  document.getElementById("tshirtModal").className += "modal";
}


// JSON code
let data  = ''
fetch('products.json')
 .then(function(response) {
   return response.json();
 })
 .then(function(resJson) {

   data = resJson
  console.log(data)
 });
 

//  Image Modals
imageElem = document.getElementById("imageElem")

function modalImage(src) {
  imageElem.src = src
  document.getElementById("imageModal").className += " is-active";
}

function closeImageFunction() {
  document.getElementById("imageModal").className += "modal";
}


imageElem = document.getElementById("imageElem")

// Selector Codes

function jerseySize(){
  var jerseySelect = document.getElementById("jerseySelect");
  var jerseyCustom = document.getElementById("jerseyCustom")
  var jerseySize= "jersey" + jerseySelect.options[jerseySelect.selectedIndex].text;
  if (jerseySize !== "jerseySize") {
  if (jerseyCustom && jerseyCustom.value){
  let cartItem = data[jerseySize]
  cartItem["name"] = "Jersey - " + jerseySelect.options[jerseySelect.selectedIndex].text + " - " + jerseyCustom.value
  cart.push(cartItem)
  closeJerseyFunction();
  // alert("Item added to cart")
  cost = parseInt(cost) + parseInt(data[jerseySize].amount)
  runningTotal = parseInt(cost) + deliveryPrice
  var cartTotal = document.getElementById("cartTotal").innerHTML = "Total: €" + runningTotal/100
  const article = createItem({
    name: data[jerseySize].name,
    images: data[jerseySize].images,
    description: data[jerseySize].description,
    price: data[jerseySize].amount
  })
  cartCards.appendChild(article)
  }else {
  alert('Please Input Customisation Options')
  }
  } else {
  alert('Please Select Size')
  }
}


function hoodieSize(){
  var hoodieSelect = document.getElementById("hoodieSelect");
  var hoodieCustom = document.getElementById("hoodieCustom")
  var hoodieSize= "hoodie" + hoodieSelect.options[hoodieSelect.selectedIndex].text;
  if (hoodieSize !== "hoodieSize") {
  if (hoodieCustom && hoodieCustom.value){
  let cartItem = data[hoodieSize]
  cartItem["name"] = "Hoodie - " + hoodieSelect.options[hoodieSelect.selectedIndex].text + " - " + hoodieCustom.value
  cart.push(cartItem)
  closeHoodieFunction();
  // alert("Item added to cart")
  cost = parseInt(cost) + parseInt(data[hoodieSize].amount)
  runningTotal = parseInt(cost) + deliveryPrice
  var cartTotal = document.getElementById("cartTotal").innerHTML = "Total: €" + runningTotal/100
  const article = createItem({
    name: data[hoodieSize].name,
    images: data[hoodieSize].images,
    description: data[hoodieSize].description,
    price: data[hoodieSize].amount
  })
  cartCards.appendChild(article)
  }else {
  alert('Please Input Customisation Options')
  }
} else {
  alert('Please Select Size')
}
}

function tshirtSize(){
  var tshirtSelect = document.getElementById("tshirtSelect");
  var tshirtSize= "tshirt" + tshirtSelect.options[tshirtSelect.selectedIndex].text;
  if (tshirtSize !== "tshirtSize") {
  let cartItem = data[tshirtSize]
  cartItem["name"] = "T-Shirt - " + tshirtSelect.options[tshirtSelect.selectedIndex].text 
  cart.push(cartItem)
  closeTshirtFunction();
  // alert("Item added to cart")
  cost = parseInt(cost) + parseInt(data[tshirtSize].amount)
  runningTotal = parseInt(cost) + deliveryPrice
  var cartTotal = document.getElementById("cartTotal").innerHTML = "Total: €" + runningTotal/100
  const article = createItem({
    name: data[tshirtSize].name,
    images: data[tshirtSize].images,
    description: data[tshirtSize].description,
    price: data[tshirtSize].amount
  })
  cartCards.appendChild(article)
  }else {
  alert('Please Input Customisation Options')
  }
}

var deliveryPrice = 0
runningTotal = 0

shippingSelect.addEventListener('change', (e) => {
  if (e.target.value === 'delivery'){
    deliveryPrice = 650
    runningTotal = parseInt(cost) + deliveryPrice
    var cartTotal = document.getElementById("cartTotal").innerHTML = "Total: €" + runningTotal/100

  }else{
    if (e.target.value === 'collection'){
      deliveryPrice = 0
      runningTotal = parseInt(cost) + deliveryPrice
      var cartTotal = document.getElementById("cartTotal").innerHTML = "Total: €" + runningTotal/100
  }
} 
})

// Stripe Code ======================

var createCheckoutSession = function(stripe) {
  if(cart.length < 1 || cart == undefined){
    alert("Cart Empty")
} else {
  if (shippingSelect.value === 'delivery'){
    cart.push(data["shipping"])
    
  }


    return fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // quantity: quantity,
        cart
      })
    }).then(function(result) {
      return result.json();
    });
}

  
  };
  
  // Handle any errors returned from Checkout
  var handleResult = function(result) {
    if (result.error) {
      var displayError = document.getElementById("error-message");
      displayError.textContent = result.error.message;
    }
  };
  
  /* Get your Stripe publishable key to initialize Stripe.js */
  fetch("/config")
    .then(function(result) {
      return result.json();
    })
    .then(function(json) {
      window.config = json;
      var stripe = Stripe(config.publicKey);
      // Setup event handler to create a Checkout Session on submit
      document.querySelector("#submit").addEventListener("click", function(evt) {
        createCheckoutSession().then(function(data) {
          stripe
            .redirectToCheckout({
              sessionId: data.sessionId
            })
            .then(handleResult);
        });
      });
    });

// Displaying Items in Cart
var cartCards = document.getElementById("cartCards");

function createItem ({ name, images, description, price}) {
  const article = document.createElement('article')
  article.className = 'media'

  const figure = document.createElement('figure')
  figure.className = 'media-left'

  const img = document.createElement('img')
  img.className = 'image is-64x64'
  img.src = images

  const div = document.createElement('div')
  div.className = 'media-content'

  const content = document.createElement('div')
  content.className = 'content'

  const right = document.createElement('div')
  right.className = 'media-right'

  const priceElem = document.createElement('strong')
  priceElem.innerHTML = "€" + price/100
  priceElem.className = 'is-size-5 has-text-black-bis padded-right'

  const p = document.createElement('p')
  
  const strong = document.createElement('strong')
  strong.innerHTML = name
  strong.className = 'is-size-5'

  const br = document.createElement('br')

  const desc = document.createElement('p')
  desc.innerText = description
  desc.className = 'has-text-grey is-size-6'

  figure.appendChild(img)
  p.appendChild(strong)
  p.appendChild(br)
  p.appendChild(desc)
  content.appendChild(p)
  div.appendChild(content)
  right.appendChild(priceElem)
  article.appendChild(figure)
  article.appendChild(div)
  article.appendChild(right)

  return article
}

