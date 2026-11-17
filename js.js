
let over = document.getElementById('over')
let imgOver = document.getElementById('img_over')
let test5 = document.getElementById('test5')
let test6 = document.getElementById('test6')
let navSlider = document.querySelectorAll('.nav_slider')
let linkBox = document.querySelectorAll('a')
let wrapScreen = document.querySelectorAll('.wrap_screen')
let moreDetails = document.querySelectorAll('.more_details')
let test = document.querySelector('#test')

let pathImg
let pathFull
let counter = 0


let objSreen = {
   Find_a_Pair: ['1.png', '2.png', '3.png', '4.png', '5.png'],
   Rate_of_Fire: ['1.png', '2.png', '3.png', '4.png', '5.png'],
   Stacker_Game: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'],
   Snake_Game: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
   Plaing_On_Attention: ['1.png', '2.png', '3.png', '4.png', '5.png'],
   My_Bookmarks: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png'],
   Code_In_Frame: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png']
}



for (const link of linkBox) {
   link.addEventListener('click', function (e) {

      e.stopPropagation()
      e.preventDefault()
      let wrap = link.lastElementChild

      if (!wrap.classList.contains('active')) resetStyle()

      if (e.target.tagName == 'BUTTON' && e.target.classList.contains('more_details')) {
         wrap.classList.toggle('active')
         if (wrap.classList.contains('active')) {
            e.target.disabled = true
            e.target.classList.add('close_img')
            link.style.boxShadow = '0px -100px 100px -14px rgba(34, 60, 80, 1) inset'
            addScreenImg(wrap)
         } else {
            e.target.classList.remove('close_img')
            link.style.boxShadow = ''
         }
      }
      if (e.target.classList.contains('next')) window.open(link.href, '_blank')
   })
}


function addScreenImg(elem) {
   elem.innerHTML = ''
   elem.addEventListener('animationend', (e, params) => {
      let attribute = elem.dataset.name
      renderScreen(attribute, elem)
      elem.previousElementSibling.disabled = false
   }, { once: true })
}


function createElems(tag, parent, className, attr) {
   let elem = document.createElement(tag, parent)
   if (elem.classList) elem.classList.add(className)
   parent.appendChild(elem)
   return elem
}


function renderScreen(keyObj, elem) {
   for (const screen of objSreen[keyObj]) {
      let img = createElems('img', elem, 'screen')
      img.src = `img/${keyObj}/${screen}`
      img.addEventListener('click', addOverlay)
   }
}

function addOverlay() {
   overlay.classList.add('active')
   imgOver.src = this.src
   pathImg = this.src
   pathFull = objSreen[pathImg.split('/').at(-2)]

   for (let i = 0; i < pathFull.length; i++) {
      if (pathFull[i] == pathImg.split('/').at(-1)) counter = i
   }
}

overlay.addEventListener('click', () => overlay.classList.remove('active'))

for (const elems of navSlider) {
   elems.addEventListener('click', sliderImg)
}

function sliderImg(e) {
   e.stopPropagation()

   if (this.dataset.nav == 'left') {
      counter--
      if (counter <= 0) counter = pathFull.length - 1
      imgOver.src = `img/${pathImg.split('/').at(-2)}/${pathFull[counter]}`
   }

   if (this.dataset.nav == 'right') {
      counter++
      if (counter >= pathFull.length) counter = 0
      imgOver.src = `img/${pathImg.split('/').at(-2)}/${pathFull[counter]}`
   }

}


function resetStyle() {
   wrapScreen.forEach(element => element.classList.remove('active'));
   linkBox.forEach(element => element.style.boxShadow = '');
   moreDetails.forEach(element => {
      element.classList.remove('close_img')
      element.disabled = false
   })
}
