let navIcon = document.querySelector('.nav__icon') 
let navLogo= document.querySelector('.nav__logo') 
let menu = document.querySelector('.menu')
let cover = document.querySelector('.cover')
let header = document.querySelector('.header')
let skillItems = document.querySelectorAll('.skill__item')
let resumeDescriptionElem = document.querySelectorAll('.resume__description')
let portfolioListItems = document.querySelectorAll('.portfolio__item')
let menuItemElems = document.querySelectorAll('.menu__item')




menuItemElems.forEach(menuItem => {
    menuItem.addEventListener('click', (event) => {
        event.preventDefault()
        document.querySelector('.menu__item--active').classList.remove('menu__item--active')
        menuItem.classList.add('menu__item--active')    
        let sectionName = menuItem.getAttribute('data-section')
        let sectionOffsetTop = document.querySelector(`.${sectionName}`).offsetTop
        console.log(sectionOffsetTop);
    
        window.scrollTo({
            top:sectionOffsetTop - 95,  // minus the header Height
            behavior: 'smooth'
        })
    })
})

resumeDescriptionElem.forEach( function(resumeDescription) {
    // console.log(resumeDescription.id);
})


navIcon.addEventListener('click', function() {
    navIcon.classList.toggle('nav__icon--open')
    menu.classList.toggle('menu--open')
    cover.classList.toggle('cover--show')

})

document.addEventListener('scroll', function() {
    if(document.documentElement.scrollTop > 0) {
        header.classList.add('header--scroll')
        navLogo.style.fontSize = '3.5rem'
    } else {
        header.classList.remove('header--scroll')
        navLogo.style.fontSize = '5rem'
    }
})

skillItems.forEach( function(item) {    
    item.addEventListener('click', function() {        
        document.querySelector('.skill__item--active').classList.remove('skill__item--active')
        item.classList.add('skill__item--active')
        
        document.querySelector('.resume__description--show').classList.remove('resume__description--show')
        switch(item) {
            case skillItems[0] :
                document.getElementById('education').classList.add('resume__description--show')
                break
            case skillItems[1] :
                document.getElementById('work-history').classList.add('resume__description--show')
                break
            case skillItems[2] :
                document.getElementById('programming-skill').classList.add('resume__description--show')
                break
            case skillItems[3] :
                document.getElementById('design-skill').classList.add('resume__description--show')
                break
            case skillItems[4] :
                document.getElementById('seo-skill').classList.add('resume__description--show')
                break
        }
    })

})


portfolioListItems.forEach( function(item) {
    
    item.addEventListener('click', function() {
        document.querySelector('.portfolio__item--active').classList.remove('portfolio__item--active')
        item.classList.add('portfolio__item--active')
        document.querySelector('.portfolio__content--show').classList.remove('portfolio__content--show')

        let contentId = item.getAttribute('data-portfolio__id')
        document.querySelector('#' + contentId).classList.add('portfolio__content--show')
    })
})




//  Swipper

const swiper = new Swiper('.swiper', {

    pagination: {
      el: '.swiper-pagination',
    },

    spaceBetween: 30,
    breakpoints: {
        768: {
            slidesPerView:2,
        },
        1200: {
            slidesPerView:3,
        }

    }
});




// Dark Mode

window.onload = function() {
    let themeColor = localStorage.getItem('theme')
    if(themeColor == 'dark') {
       document.documentElement.classList.add('dark-theme')
       darkModeElem.innerHTML = `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="dark-mode__icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>`
    }
    
}

let darkModeElem = document.querySelector('.dark-mode')
darkModeElem.addEventListener('click', function() {
    // document.querySelector('html').classList.toggle('dark-theme')
    document.documentElement.classList.toggle('dark-theme')
    if(document.documentElement.classList.contains('dark-theme')) {
        setLocalStorage('dark')
        darkModeElem.innerHTML = `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="dark-mode__icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>`
    } else {
        setLocalStorage('light')
        darkModeElem.innerHTML = `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="dark-mode__icon">
       <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
       </svg>`
    }
})

    


// Intersection Observer

let sections = document.querySelectorAll('main > section')

const observer = new IntersectionObserver(observerHandler, {
    threshold: 0.3  // زمانی که به نصف صفحه رسید این آبزرورش فعال بشه و اون تابع آبزرور کارشو انجام بده 
});

function observerHandler(allSections) {
    // we access to each section when we see it
    allSections.map( section => {
        // console.log(section);

        let sectionClassName = section.target.className
        if(section.isIntersecting) {
            document.querySelector(`.menu__item[data-section=${sectionClassName}]`).classList.add('menu__item--active')
        } else {
            document.querySelector(`.menu__item[data-section=${sectionClassName}]`).classList.remove('menu__item--active')
        }
        
    })
}

sections.forEach( section => {
    observer.observe(section)    
})




// Functions

function setLocalStorage(color) {
    localStorage.setItem('theme', color)
}



// Type Writer Librariy

var mySkillsElem = document.getElementById('my-skills');

var mySkillsElemTypeWriter = new Typewriter(mySkillsElem, {
    loop: true,
    cursor: ''
});

mySkillsElemTypeWriter
    .typeString('Creative Designer')
    .pauseFor(2000)
    .deleteAll()
    .typeString('Full Stack Developer')
    .pauseFor(2000)
    .deleteAll()
    .typeString('AI  Researcher')
    .pauseFor(2000)
    .start();





// Sweet Alert 1 Librariy

const hireBtns = document.querySelectorAll('.hire__btn')
hireBtns.forEach( hireBtn => {
    hireBtn.addEventListener('click', (event) => {
        event.preventDefault()
        Swal.fire({
            icon: "success",
            title: "Well Done !",
            text: "Hope to Have a good Work :)",
            footer: '<a href="#">Click Here to See my Resume</a>',
            showConfirmButton: false,
            timer: 3000,
            showClass: {
                popup: `
                  animate__animated
                  animate__fadeInDown
                  animate__faster
                `
              },
            hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
          });
    })

})


const resumeBtns = document.querySelectorAll('.resume__btn')
resumeBtns.forEach( resumeBtn => {
    resumeBtn.addEventListener('click', (event) => {
        event.preventDefault()
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then(response => {
            if(response.isConfirmed) {
                Swal.fire({
                    title: "OK",
                    icon: "success"
                })
            } else if(response.isDenied) {
                Swal.fire({
                    title: "Deny",
                    icon: "error"
                })
            }
          })
    })

})



// Create mixin for Reuse toast box in other pages and sections
const toastBox = Swal.mixin({
    title: "Your Request Sent & You have Submited",
    showConfirmButton: false,
    position: "top-end",
    timer: 3000,
    timerProgressBar: true,
    toast: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});


const submitBtn = document.querySelector('.form__submit')
submitBtn.addEventListener('click', () => {
    toastBox.fire({
        icon: "success",
    }) 
})