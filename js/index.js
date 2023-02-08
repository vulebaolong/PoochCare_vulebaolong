import { CountUp } from "../library/countUp.min.js"

window.scrollTo({ behavior: "smooth" })

const lightEl = document.querySelector(".icon_light")
const darkEl = document.querySelector(".icon_dark")
const htmlEl = document.querySelector("html")

//click change theme dark to light
;[lightEl, darkEl].forEach((el) => {
    el.addEventListener("click", (e) => {
        lightEl.classList.toggle("hide")
        darkEl.classList.toggle("hide")
        htmlEl.dataset.bsTheme === "dark"
            ? (htmlEl.dataset.bsTheme = "light")
            : (htmlEl.dataset.bsTheme = "dark")
    })
})

// COUNT_UP
// ======================================================
//https://inorganik.github.io/countUp.js/
;[730, 1229, 369, 69].forEach((val, i) => {
    new CountUp(`number${i}`, val, {
        enableScrollSpy: true,
        duration: 2,
        // scrollSpyOnce: true,
    })
})

// Observer stiky backToTop
// ======================================================
const carouselEl = document.querySelector(".carousel")
const backToTopEl = document.querySelector(".backToTop")
const headerEl = document.querySelector(".header")
const navElHeight = document.querySelector("nav").getBoundingClientRect().height

const obsCallBack = function (entries, observer) {
    const [entry] = entries
    const isAction = entry.isIntersecting
    if (!isAction) {
        headerEl.classList.add("sticky")
        backToTopEl.classList.add("showbtt")
    } else {
        //khi remove sticky
        //=>
        //di chuyển header chạy lên 100% (hoàn thành 0.3s với transition của header
        //đợi 0.3s  setTimeout
        //xóa class sticky
        //chuyển translateY về 0, khi này chỉ còn class header sẽ áp dụng transition của header
        headerEl.style.transform = ` translateY(-100%) `
        setTimeout(() => {
            headerEl.classList.remove("sticky")
            headerEl.style.transform = ` translateY(0) `
        }, 300)
        backToTopEl.classList.remove("showbtt")
    }
}
const obsOption = {
    root: null,
    threshold: 0,
    rootMargin: `-${navElHeight}px`,
}
const headerElObserver = new IntersectionObserver(obsCallBack, obsOption)
headerElObserver.observe(carouselEl)

// scroll
// ======================================================
const scroll = function (element, headerHeight) {
    const coords = element.getBoundingClientRect()
    //coords.left, coords.top sẽ so từ element tới top của view port
    //nên khi scroll ở giữa trang sẽ không chính xác
    //khắc phục bằng cách + thêm khoảng cách từ top của trang đến Y hiện tại của view port
    //window.scrollY là Y hiện tại của viewport so với top 0 trang web
    window.scroll({
        left: coords.left + window.scrollX,
        //trừ đi chiều cao của header để scroll đến đúng top 0 của element
        top: coords.top + window.scrollY - headerHeight,
        behavior: "smooth",
    })
}

const navbarNavEl = document.querySelector(".navbar-nav")
const navbarTogglerEl = document.querySelector(".navbar-toggler")
navbarNavEl.addEventListener("click", function (e) {
    if (e.target.classList[0] === "nav-link") {
        e.preventDefault()
        if (e.target.hash === "") return
        const element = document.querySelector(e.target.hash)
        const headerHeight = headerEl.offsetHeight
        scroll(element, headerHeight)
        navbarTogglerEl.click()
    }
})
