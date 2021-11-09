window.addEventListener('DOMContentLoaded', function() {
  function hasClass(array, classSearched) {for (i = 0; i < array.length; ++i) {if (array[i] === classSearched) return true;};return false}
  let dropdownBtns = document.querySelectorAll('.dropdown__btn')

  // Set BG to dropdown items
  document.querySelectorAll('.dropdown__link').forEach(function(thumb) {
    thumb.parentElement.style.backgroundImage=`url('./img/dropdown/${thumb.innerHTML}.jpg')`
  });

  // Set BG to gallery items
  document.querySelectorAll('.gallery__slide').forEach(function(slide) {
    if (window.innerWidth <= 576) {slide.style.backgroundImage=`url('../img/gallery/320/${slide.getAttribute('data-set')}.jpg')`}
      else {slide.style.backgroundImage=`url('../img/gallery/${slide.getAttribute('data-set')}.jpg')`};
  });

  // get open/close function to dropdown
  document.addEventListener('click', function(event) {
    if (hasClass(event.target.classList, 'dropdown__btn')) {
      if (hasClass(event.target.classList, 'is-active')) {
        dropdownBtns.forEach(function(del) {del.classList.remove('is-active')});
      } else {
        dropdownBtns.forEach(function(del) {del.classList.remove('is-active')});
        event.target.classList.add('is-active');
      }
    } else {
      dropdownBtns.forEach(function(del) {del.classList.remove('is-active')});
    };
  });

    // get open/close function to search
  const searchOpen = document.querySelector('.header__search-clicker');
  searchOpen.addEventListener('click', function(event) {
    const searchModal = document.querySelector('.header__search');
    const searchInput = document.querySelector('.search__input');
    const searchCancel = document.querySelector('.search__cancel');
    if (hasClass(event.target.classList, 'is-active')) {
    } else {
      searchOpen.classList.add('is-active');
      searchOpen.setAttribute('tabindex', '-1');
      searchInput.focus();
    }
    searchModal.addEventListener('submit', function() {
      searchOpen.classList.remove('is-active');
      searchOpen.setAttribute('tabindex', '0');
      searchInput.value="";
    })
    searchCancel.addEventListener('click', function() {
      searchOpen.classList.remove('is-active');
      searchOpen.setAttribute('tabindex', '0');
      searchInput.value="";
    })
  });

  // get open/close function to burger menu
  const burgerOpen = document.querySelector('.burger__opener')
  burgerOpen.addEventListener('click', function() {
    const burgerClose = document.querySelector('.burger-closer')
    const menu = document.querySelector('.header__menu')
    menu.classList.add('is-active');
    document.body.style.overflow = "hidden";
    burgerClose.addEventListener('click', function() {
      menu.classList.remove('is-active');
      document.body.style.overflow = "auto";
    })
  });

  // get open/close function to accordion
  const accs = document.querySelectorAll(".accordion__btn");
  accs.forEach(function(acc) {
    acc.addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {panel.style.maxHeight = null}
        else {panel.style.maxHeight = '500px'};
    });
  });

  // get author changing for accordion
  document.querySelector('.accordion').addEventListener('click', function(event) {
   if (event.target.className === "panel__link") {
    if (event.target.textContent === "Доменико Гирландайо") {
      document.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-girlandayo.jpg")
      document.querySelector(".card__pic").setAttribute("alt", "Доменико Гирландайо")
      document.querySelector(".card__title").textContent = "Доменико Гирландайо"
      document.querySelector(".card__date").textContent = "2&nbsp;июня 1448&nbsp;&mdash; 11&nbsp;января 1494."
      document.querySelector(".card__text").innerHTML = "Один из&nbsp;ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и&nbsp;сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в&nbsp;течение года овладевал профессиональными навыками. Автор фресковых циклов, в&nbsp;которых выпукло, со&nbsp;всевозможными подробностями показана домашняя жизнь библейских персонажей (в&nbsp;их&nbsp;роли выступают знатные граждане Флоренции в&nbsp;костюмах того времени)."
    } else {
      document.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-placeholder.jpg")
      document.querySelector(".card__pic").setAttribute("alt", "Неизвестный художник")
      document.querySelector(".card__title").textContent = "Что мы о нём знаем?"
      document.querySelector(".card__date").textContent = ""
      document.querySelector(".card__text").innerHTML = `Пока ничего... Зато мы точно знаем, что в галерее есть на что посмотреть!<br><a href="#gallery" class="link-placeholder">В галерею</a>`
    }
  }
  })


  // get show-more btn for events
  function showMore() {
    const eventCards = document.querySelectorAll('.events__card');
    let visibles = -1;
    for(let i = 0; i < eventCards.length; i++) {
      if (eventCards[i].style.display === "block") visibles = i;
    }
    for(let i = visibles+1; i < visibles+4; i++) {
      if (eventCards[i]) eventCards[i].style.display = "block";
    }
  }

  showMore();
  document.querySelector('.events__btn').addEventListener('click', function() {
    showMore();
  })
})
