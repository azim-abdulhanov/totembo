const products = {
  cartier: {
    name: 'Cartier',
    img: 'assets/images/product-1.png',
    price: 1300000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  audemars: {
    name: 'Audemars',
    img: 'assets/images/product-2.png',
    price: 1420000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  tag: {
    name: 'Tag',
    img: 'assets/images/product-3.png',
    price: 1120000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  duchen: {
    name: 'Duchen',
    img: 'assets/images/product-4.png',
    price: 950000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  rolex: {
    name: 'Rolex',
    img: 'assets/images/product-5.png',
    price: 2450000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  spikes: {
    name: 'Spikes',
    img: 'assets/images/product-6.png',
    price: 1450000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  pierrelannier: {
    name: 'Pierrelannier',
    img: 'assets/images/product-7.png',
    price: 1280000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  tiamo: {
    name: 'Tiamo',
    img: 'assets/images/product-8.png',
    price: 1000000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  tag2: {
    name: 'Tag2',
    img: 'assets/images/product-9.png',
    price: 1120000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  montblanc: {
    name: 'Montblanc',
    img: 'assets/images/product-10.png',
    price: 845000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  jaeger: {
    name: 'Jaeger',
    img: 'assets/images/product-11.png',
    price: 2450000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
  hockey: {
    name: 'Hockey',
    img: 'assets/images/product-12.png',
    price: 750000,
    count: 0,
    like: false,
    get totalPrice() {
      return this.price * this.count
    },
  },
}

const cartBtns = document.querySelectorAll('.cart')
const cartBtnIcon = document.querySelectorAll('.cart > img')
const likeBtns = document.querySelectorAll('.favourite')
const headerNavLinks = document.querySelectorAll('.header-nav-link')
const cartModal = document.querySelector('.carts')
const cartBtn = document.querySelector('.cart-open')
const cartClose = document.querySelector('.cart-modal-btn')
const cartBtnCount = document.querySelector('.header-cart-count')
const cartBtnChecklist = document.querySelector('.cart-modal-checklist')
const totalPriceCart = document.querySelector('.cart-modal-prices')
const likesModal = document.querySelector('.likes')
const likesBtn = document.querySelector('.likes-open')
const likesClose = document.querySelector('.likes-modal-btn')
const likesBtnCount = document.querySelector('.header-likes-count')
const likesChecklist = document.querySelector('.likes-modal-checklist')
const headerNavList = document.querySelector('.header-nav-lists')
const menuOpen = document.querySelector('.menu')
const menuClose = document.querySelector('.header-nav-close')


cartBtns.forEach(cartBtn => {
  cartBtn.addEventListener('click', function () {
    plusAndMinus(this)

    for (let i = 0; i < cartBtnIcon.length; i++) {}
  })
})

likeBtns.forEach(likeBtn => {
  likeBtn.addEventListener('click', function () {
    likes(this)
  })
})

function likes(favourite) {
  let parent = favourite.closest('.products-card')
  parentId = parent.getAttribute('id')
  parentFavourite = document.querySelector(`#${parentId} .favourite`)

  if (products[parentId].like == true) {
    products[parentId].like = false
  } else {
    products[parentId].like = true
  }

  parentFavourite.style.background = products[parentId].like ? '#e63535' : '#fff'

  likesCart()
}

function likesCart() {
  let likeProducts = []

  for (const key in products) {
    if (products[key].like) likeProducts.push(products[key])
  }

  likesChecklist.innerHTML = ''

  for (let i = 0; i < likeProducts.length; i++) {
    likesChecklist.innerHTML += cardItemLike(likeProducts[i])
  }

  for (let i = 0; i < likeBtns.length; i++) {
    let parent = likeBtns[i].closest('.products-card')
    parentId = parent.getAttribute('id')

    if (products[parentId].like) {
      likeBtns[i].classList.add('active')
    } else {
      likeBtns[i].classList.remove('active')
    }
  }

  const allCount = totalLikesCount()

  if (allCount) {
    likesBtnCount.classList.add('active')
  } else {
    likesBtnCount.classList.remove('active')
  }

  likesBtnCount.innerHTML = allCount
}

function totalLikesCount() {
  let total = 0

  for (const key in products) {
    if (products[key].like == true) total++
  }

  return total
}

function plusAndMinus(btn) {
  let parent = btn.closest('.products-card')
  parentId = parent.getAttribute('id')
  let parentCart = document.querySelector(`#${parentId} .cart`)

  products[parentId].count++

  cart()

  parentCart.style.background = '#45cf63'
}

function cart() {
  const productsArray = []

  for (const key in products) {
    let totalCount = 0
    const order = products[key]
    const productCard = document.querySelector(`#${order.name.toLowerCase()}`)
    let parentIndecator = productCard.querySelector('.products-card-count')

    if (order.count) {
      productsArray.push(order)
      cartBtnCount.classList.add('active')
      totalCount += order.count
      parentIndecator.classList.add('active')
      parentIndecator.innerHTML = order.count
    } else {
      parentIndecator.classList.remove('active')
      parentIndecator.innerHTML = 0
    }

    cartBtnCount.innerHTML = totalCount
  }

  cartBtnChecklist.innerHTML = ''

  for (let i = 0; i < productsArray.length; i++) {
    cartBtnChecklist.innerHTML += cardItemBurger(productsArray[i])
  }

  const allCount = totalCountProduct()

  if (allCount) {
    cartBtnCount.classList.add('active')
  } else {
    cartBtnCount.classList.remove('active')
  }

  cartBtnCount.innerHTML = allCount
  totalPriceCart.innerHTML = totalSumProduct()
}

function totalSumProduct() {
  let total = 0

  for (const key in products) {
    total += products[key].totalPrice
  }

  return total + ' UZS'
}

function totalCountProduct() {
  let total = 0

  for (const key in products) {
    total += products[key].count
  }

  return total
}

function cardItemLike(save) {
  const { img, name, price } = save

  return `
    <div class="cart-modal-product">
      <div class="cart-modal-order">
        <img src="${img}" alt="img" class="cart-modal-image">

        <div class="cart-modal-info">
          <p class="cart-modal-name">${name}</p>
          <p class="cart-modal-price">${price} UZS</p>
        </div>
      </div>

      <div class="cart-modal-check" id="${name.toLowerCase()}_card">
        <img src="assets/icons/favourite.svg" alt="favourite.svg" class="modal-heart">
      </div>
    </div>
  `
}

function cardItemBurger(productsData) {
  const {name, totalPrice: price, img, count} = productsData

  return `
    <div class="cart-modal-product">
      <div class="cart-modal-order">
        <img src="${img}" alt="img" class="cart-modal-image">

        <div class="cart-modal-info">
          <p class="cart-modal-name">${name}</p>
          <p class="cart-modal-price">${price} UZS</p>
        </div>
      </div>

      <div class="cart-modal-check" id="${name.toLowerCase()}_card">
        <button class="cart-modal-symbol minus" data-symbol="-">-</button>
        <button class="cart-modal-count">${count}</button>
        <button class="cart-modal-symbol plus" data-symbol="+">+</button>
      </div>
    </div>
  `
}

cartBtn.addEventListener('click', () => {
  cartModal.classList.add('active')
})

cartClose.addEventListener('click', () => {
  cartModal.classList.remove('active')
})

likesBtn.addEventListener('click', () => {
  likesModal.classList.add('active')
})

likesClose.addEventListener('click', () => {
  likesModal.classList.remove('active')
})

window.addEventListener('click', function (e) {
  const btn = e.target

  if (btn.classList.contains('cart-modal-symbol')) {
    const attribute = btn.getAttribute('data-symbol')
    const parent = btn.closest('.cart-modal-check')

    if (parent) {
      const idProduct = parent.getAttribute('id').split('_')[0]

      if (attribute == '-') {
        products[idProduct].count--
      } else {
        products[idProduct].count++
      }

      cart()
    }
  } else if (btn.classList.contains('modal-heart')) {
    const parent = btn.closest('.cart-modal-check')

    if (parent) {
      const parentId = parent.getAttribute('id').split('_')[0]
      products[parentId].like = false

      likesCart()
    }
  }
})

menuOpen.addEventListener('click', function () {
  headerNavList.classList.add('active')
})

menuClose.addEventListener('click', function () {
  headerNavList.classList.remove('active')
})

for (let i = 0; i < headerNavLinks.length; i++) {
  headerNavLinks[i].addEventListener('click', function () {
    headerNavList.classList.remove('active')
  })
}

const select = document.querySelector('select')
const allLang = ['ru', 'en', 'uz']

select.addEventListener('change', changeURLLanguage)

function changeURLLanguage() {
  let lang = select.value
  location.href = window.location.pathname + '#' + lang
  location.reload()
}

function changeLanguage() {
  let hash = window.location.hash
  hash = hash.substring(1)

  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#ru'
    location.reload()
  }
  select.value = hash

  for (let key in langArr) {
    let elem = document.querySelector('#lang-' + key)
    if (elem) {
      elem.innerHTML = langArr[key][hash]
    }
  }
}
changeLanguage()
