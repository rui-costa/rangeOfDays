/* TURN TRUE TO HIDE DELIVERY CALENDAR SELECTION */
let hide = true
let WAITTIME = 500

/* HACK CODE FOR DELIVERY */
let standard_delivery
let express_delivery
let normal_delivery


function addDeliveryOptions(visible = true, text = '') {
    try {
        let delivery_info

        if (document.querySelectorAll('.delivery_info')[0] === undefined) {
            delivery_info = document.createElement('span')
            delivery_info.className = "delivery_info"
            delivery_info.style.display = 'none'
            document.querySelectorAll('.delivery__option--active')[0].appendChild(delivery_info)
        } else {
            delivery_info = document.querySelectorAll('.delivery_info')[0]
        }

        if (visible) {
            delivery_info.style.display = ''
        } else {
            delivery_info.style.display = 'none'
        }

        delivery_info.innerHTML = text
    } catch (error) {
        console.error(">>>>addDeliveryOptions<<<<\n" + error)
    }
}

function setRadioText() {
    /* SET TEXT */
    standard_delivery.querySelectorAll('span')[3].innerText = "Standard Delivery"
    normal_delivery.querySelectorAll('span')[3].innerText = "Normal Delivery"
    express_delivery.querySelectorAll('span')[3].innerText = "Premium Delivery"
}

function setRadioPrice() {
    /* SET PRICES */
    standard_delivery.querySelectorAll('span')[4].innerText = "FREE"
    normal_delivery.querySelectorAll('span')[4].innerText = "€ 2.99"
    express_delivery.querySelectorAll('span')[4].innerText = "€ 5.99"
}

function configRangeOfDays() {

    console.warn("CONFIGURING RANGE OF DAYS")
    /* DIV CONSTANTS */
    let DELIVERY_OPTIONS = document.querySelectorAll('.homedeliveryoptions__option')[0]
    let DELIVERY_TEMPLATE = DELIVERY_OPTIONS.querySelectorAll('.radio')[0]


    /* HACK CODE FOR DELIVERY */
    standard_delivery = DELIVERY_TEMPLATE.cloneNode(true)
    express_delivery = DELIVERY_TEMPLATE.cloneNode(true)
    normal_delivery = DELIVERY_TEMPLATE.cloneNode(true)

    /* CLEAN UP OLD DELIVERY OPTIONS */
    DELIVERY_OPTIONS.innerHTML = ""

    DELIVERY_OPTIONS.appendChild(standard_delivery)
    DELIVERY_OPTIONS.appendChild(normal_delivery)
    DELIVERY_OPTIONS.appendChild(express_delivery)

    setRadioText()
    setRadioPrice()
    setOnClick()

    /* AUTO SELECT STANDARD DELIVERY */
    normal_delivery.querySelectorAll('input')[0].click()
}

function setOnClick() {

    /* CLICK CODE FOR STANDARD */
    standard_delivery.querySelectorAll('input')[0].onclick = function () {
        try {
            let DELIVERY_ARRANGEMENT = document.querySelectorAll('.deliveryarrangement.deliveryarrangement-parcel')[0];
            let DELIVERY_CALENDAR = DELIVERY_ARRANGEMENT.querySelectorAll('.delivery-calendar')[0]

            DELIVERY_CALENDAR.style.display = ''
            DELIVERY_ARRANGEMENT.querySelectorAll('button')[0].click()

            let DELIVERY_DAYS = DELIVERY_ARRANGEMENT.querySelectorAll('button')
            let first_day = DELIVERY_DAYS[3].ariaLabel
            let last_day = DELIVERY_DAYS[DELIVERY_DAYS.length - 2].ariaLabel
            let selected_day = DELIVERY_DAYS[Math.round((DELIVERY_DAYS.length-2)/2 + 1,0)].ariaLabel

            DELIVERY_DAYS[5].click()
            DELIVERY_ARRANGEMENT.querySelectorAll('button')[0].click()
            DELIVERY_CALENDAR.style.display = 'none'

            addDeliveryOptions(true, `<i>Delivery between ${first_day} and ${last_day}</i>`)

            console.warn(`SELECTED DAY: ${selected_day}`)
        } catch (error) {
            setTimeout(function () { configRangeOfDays() }, WAITTIME)
            console.error(">>>>STANDARD CLICK<<<<\n" + error)
        }
    }

    /* CLICK CODE FOR NORMAL */
    normal_delivery.querySelectorAll('input')[0].onclick = function () {
        try {

            let DELIVERY_ARRANGEMENT = document.querySelectorAll('.deliveryarrangement.deliveryarrangement-parcel')[0];
            let DELIVERY_CALENDAR = DELIVERY_ARRANGEMENT.querySelectorAll('.delivery-calendar')[0]

            DELIVERY_CALENDAR.style.display = ''
            DELIVERY_ARRANGEMENT.querySelectorAll('button')[0].click()

            let DELIVERY_DAYS = DELIVERY_ARRANGEMENT.querySelectorAll('button')
            let selected_day = DELIVERY_DAYS[2].ariaLabel

            DELIVERY_DAYS[2].click()
            DELIVERY_ARRANGEMENT.querySelectorAll('button')[0].click()

            addDeliveryOptions(false)
            console.warn(`SELECTED DAY: ${selected_day}`)
        } catch (error) {
            setTimeout(function () { configRangeOfDays() }, WAITTIME)
            console.error(">>>>NORMAL CLICK<<<<\n" + error)
        }
    }

    /* CLICK CODE FOR EXPRESS */
    express_delivery.querySelectorAll('input')[0].onclick = function () {
        try {

            let DELIVERY_ARRANGEMENT = document.querySelectorAll('.deliveryarrangement.deliveryarrangement-parcel')[0];
            let DELIVERY_CALENDAR = DELIVERY_ARRANGEMENT.querySelectorAll('.delivery-calendar')[0]

            DELIVERY_CALENDAR.style.display = ''
            DELIVERY_ARRANGEMENT.querySelectorAll('button')[0].click()

            let DELIVERY_DAYS = DELIVERY_ARRANGEMENT.querySelectorAll('button')
            let delivery_day = DELIVERY_DAYS[1].ariaLabel
            let selected_day = DELIVERY_DAYS[1].ariaLabel

            DELIVERY_DAYS[1].click()
            DELIVERY_ARRANGEMENT.querySelectorAll('button')[0].click()
            DELIVERY_CALENDAR.style.display = 'none'

            addDeliveryOptions(true, `<i>Delivery on ${delivery_day}</i>`)

            console.warn(`SELECTED DAY: ${selected_day}`)
        } catch (error) {
            setTimeout(function () { configRangeOfDays() }, WAITTIME)
            console.error(">>>>EXPRESS CLICK<<<<\n" + error)
        }
    }

}


function initRangeOfDays() {

    try {
        document.querySelectorAll('.deliveryarrangement.deliveryarrangement-parcel')[0].querySelectorAll('.delivery-calendar')[0]
        configRangeOfDays()
    } catch (error) {
        setTimeout(function () { initRangeOfDays() }, WAITTIME);
        console.warn(`WAITING ${WAITTIME} ms`)
    }


}

initRangeOfDays()