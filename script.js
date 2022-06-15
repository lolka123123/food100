const product = {
    plainBurger: {
        name: "Гамбургер простой",
        price: 10000,
        kkal: 300,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kkal: function () {
            return this.kkal * this.amount
        }
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        price: 20500,
        kkal: 500,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kkal: function () {
            return this.kkal * this.amount
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kkal: 900,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kkal: function () {
            return this.kkal * this.amount
        }
    }
}

const extraProducts = {
    doubleMayonnaise: {
        name: "Двойной мойонез",
        price: 1000,
        kkal: 50
    },
    lettuce: {
        name: "Салатный лист",
        price: 500,
        kkal: 10
    },
    cheese: {
        name: "Сыр",
        price: 1000,
        kkal: 100
    }
}

const btnPlusOrMinus = document.querySelectorAll(".main__product-btn"),
    checkExtraProduct = document.querySelectorAll(".main__product-checkbox"),
    addCart = document.querySelector(".addCart"),
    receipt = document.querySelector(".receipt"),
    receiptWindow = document.querySelector(".receipt__window"),
    receiptOut = document.querySelector(".receipt__window-out"),
    brnReceipt = receipt.querySelector(".receipt__window-btn")



for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener("click", function () {
        plusOrMinus(this)

    })
}

function plusOrMinus(element) {
    const parent = element.closest(".main__product"),
        parentId = parent.getAttribute("id"),
        out = parent.querySelector(".main__product-num"),
        price = parent.querySelector(".main__product-price span"),
        kkal = parent.querySelector(".main__product-kcall span"),
        elementData = element.getAttribute("data-symbol")

    if (elementData == "+" && product[parentId].amount < Infinity) {
        product[parentId].amount++
    } else if (elementData == "-" && product[parentId].amount > 0) {
        product[parentId].amount--
    }


    out.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].Summ()
    kkal.innerHTML = product[parentId].Kkal()
}


for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener("click", function () {
        addExtraProducts(this)
    })
}

function addExtraProducts(element) {
    const parent = element.closest(".main__product"),
        parentId = parent.getAttribute("id"),
        price = parent.querySelector(".main__product-price span"),
        kkal = parent.querySelector(".main__product-kcall span"),
        elAtr = element.getAttribute("data-extra")

    product[parentId][elAtr] = element.checked

    console.log(product[parentId][elAtr]);

    if (product[parentId][elAtr] = true) {
        product[parentId].kkal += extraProducts[elAtr].kkal
        product[parentId].price += extraProducts[elAtr].price
    } else {
        product[parentId].kkal -= extraProducts[elAtr].kkal
        product[parentId].price -= extraProducts[elAtr].price
    }

    kkal.innerHTML = product[parentId].Kkal()
    price.innerHTML = product[parentId].Summ()
}



//     addCart = document.querySelector(".addCart"),
//     receipt = document.querySelector(".receipt"),
//     receiptWindow = document.querySelector(".receipt__window"),
//     receiptOut = document.querySelector(".receipt__window-out"),
//     brnReceipt = receipt.querySelector(".receipt__window-btn")


let arrayProduct = [],
    totalName = "",
    totalPrice = 0,
    totalKcall = 0

addCart.addEventListener("click", function () {
    for (const key in product) {
        const po = product[key]

        if (po.amount > 0) {
            arrayProduct.push(po)
            for (const infokey in po) {
                if (po[infokey] === true) {
                    po.name += "\n" + extraProducts[infokey].name
                }
            }
        }

        po.price = po.Summ()
        po.kcall = po.Kkal()
    }

    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i]

        totalPrice += el.price
        totalKcall += el.kkal

        totalName += "\n" + el.name + " x" + el.amount + "\n"


    }
    receiptOut.innerHTML = `Вы купили: \n ${totalName} \n Каллорийность ${totalKcall} \n Стоймость покупки ${totalPrice} сумм`
    receipt.style.display = "flex"
    setTimeout(() => {
        receipt.style.opacity = "1"
    }, 100);
    setTimeout(() => {
        receiptWindow.style.top = "50px"
    }, 200);

    document.body.style.overflow = "hidden"

    brnReceipt.addEventListener("click", function () {
        location.reload()
    })
})


const view = document.querySelector(".view"),
    viewClose = document.querySelector(".view__close"),
    viewImage = view.querySelector("img"),
    productImages = document.querySelectorAll(".main__product-info")

for (let i = 0; i < productImages.length; i++) {
    productImages[i].addEventListener("click", function () {
        img(this)
    })
}

function img(params) {
    view.classList.add("active")

    const img = params.querySelector("img").getAttribute("src")

    viewImage.setAttribute("src", img)
    document.body.style.overflow = "hidden"
}

viewClose.addEventListener("click", function () {
    view.classList.remove("active")
    document.body.style.overflow = "visible"

})


let header = document.querySelector(".header__timer-extra"),
    headerNum = 0,
    headerSpeed = 0

headerCount()

function headerCount() {
    if (headerNum == 0) {
        headerSpeed = 20
    } else if (headerNum == 50) {
        headerSpeed = 50
    } else if (headerNum == 75) {
        headerSpeed = 100
    } else if (headerNum == 90) {
        headerSpeed = 250
    } else if (headerNum == 98) {
        headerSpeed = 1000
    }

    if (headerNum < 100) {
        headerNum++
        header.innerHTML++
        setTimeout(() => {
            headerCount()
        }, headerSpeed);
    }

}