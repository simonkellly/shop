
//Cart
var cart = []
var cost = 0;

var cartCards = document.getElementById("cartCards");
var cartTotal = document.getElementById("cartTotal").innerHTML = "Total: €" + cost/100

function start(){
  document.getElementById("shippingType").addEventListener("change", shippingType, false);
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
  var jerseySize= "jersey" + jerseySelect.options[jerseySelect.selectedIndex].text;
  console.log(jerseySize);
  
  console.log(data[jerseySize]);
  cart.push(data[jerseySize])
  console.log(cart);
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
}

function hoodieSize(){
  var hoodieSelect = document.getElementById("hoodieSelect");
  var hoodieSize= "hoodie" + hoodieSelect.options[hoodieSelect.selectedIndex].text;
  if (hoodieSize !== "hoodieSelect Size") {
    console.log(data[hoodieSize]);
    cart.push(data[hoodieSize])
    console.log(cart);
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
  } else {
    alert('Select Size')
  }
  
}

var deliveryPrice = 0
runningTotal = 0

const shippingSelect = document.getElementById('shippingType')
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
  console.log("yeet");
  
  console.log(cart);
  
    return fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(
        cart
      )
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

