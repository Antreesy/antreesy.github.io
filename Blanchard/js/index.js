window.addEventListener('DOMContentLoaded', function() {
  function hasClass(array, classSearched) {
    for (let i = 0; i < array.length; ++i) {
      if (array[i] === classSearched) return true;
    }
    return false;}

  let dropdownBtns = document.querySelectorAll('.dropdown__btn');

  // Set BG to gallery items
  document.querySelectorAll('.gallery__slide').forEach(function(slide) {
    if (window.innerWidth <= 576) {
      slide.style.backgroundImage=`url('./img/gallery/320/${slide.getAttribute('data-set')}.jpg')`;
    } else {
      slide.style.backgroundImage=`url('./img/gallery/${slide.getAttribute('data-set')}.jpg')`;
    }
  });

  // get open/close function to dropdown
  document.addEventListener('click', function(event) {
    if (hasClass(event.target.classList, 'dropdown__btn')) {
      // Set BG to dropdown items
      document.querySelectorAll('.dropdown__link').forEach(function(thumb) {
        thumb.parentElement.style.backgroundImage=`url('./img/dropdown/${thumb.innerHTML}.jpg')`;
      });

      if (hasClass(event.target.classList, 'is-active')) {
        dropdownBtns.forEach(function(del) {del.classList.remove('is-active');});
      } else {
        dropdownBtns.forEach(function(del) {del.classList.remove('is-active');});
        event.target.classList.add('is-active');
      }
    } else {
      dropdownBtns.forEach(function(del) {del.classList.remove('is-active');});
    }
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
    });
    searchCancel.addEventListener('click', function() {
      searchOpen.classList.remove('is-active');
      searchOpen.setAttribute('tabindex', '0');
      searchInput.value="";
    });
  });

  // get open/close function to burger menu
  const burgerOpen = document.querySelector('.burger__opener');
  burgerOpen.addEventListener('click', function() {
    const burgerClose = document.querySelector('.burger-closer');
    const menu = document.querySelector('.header__menu');
    menu.classList.add('is-active');
    document.body.style.overflow = "hidden";
    burgerClose.addEventListener('click', function() {
      menu.classList.remove('is-active');
      document.body.style.overflow = "auto";
    });
  });

  // get tabs change
  const flags = document.querySelectorAll('.flag')
  const accs =  document.querySelectorAll('.tab__accordion')
  function changeAcc(flags) {
    countryFlag = document.querySelector('.flag.is-active').getAttribute("data-set")
    accs.forEach((acc) => {
      acc.style.display = (acc.getAttribute("data-target") === countryFlag) ? "block" : "none"
    })
  }

  changeAcc(flags);
  flags.forEach((flag) => {
    flag.addEventListener('click', (event)=> {
      flags.forEach((flag)=>{flag.classList.remove("is-active")});
      event.target.classList.add("is-active");
      changeAcc(flags);
    })
  })

  // open first accordion
  const activeAcc = document.querySelectorAll(".accordion__btn.active")
  activeAcc.forEach((activeAcc)=>{
    let panel = activeAcc.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = '100%';
    }
  });


  // get open/close function to accordion
  const accsBtn = document.querySelectorAll(".accordion__btn");
  accsBtn.forEach(function(acc) {
    acc.addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = '100%';
      }
    });
  });

  // get author changing for accordion
  document.querySelector('.accordion').addEventListener('click', function(event) {
   if (event.target.className === "panel__link") {
     console.log('link')
    if (event.target.textContent === "Доменико Гирландайо") {
      console.log('true')
      document.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-girlandayo.jpg");
      document.querySelector(".card__pic").setAttribute("alt", "Доменико Гирландайо");
      document.querySelector(".card__title").textContent = "Доменико Гирландайо";
      document.querySelector(".card__date").textContent = "2&nbsp;июня 1448&nbsp;&mdash; 11&nbsp;января 1494.";
      document.querySelector(".card__text").innerHTML = "Один из&nbsp;ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и&nbsp;сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в&nbsp;течение года овладевал профессиональными навыками. Автор фресковых циклов, в&nbsp;которых выпукло, со&nbsp;всевозможными подробностями показана домашняя жизнь библейских персонажей (в&nbsp;их&nbsp;роли выступают знатные граждане Флоренции в&nbsp;костюмах того времени).";
    } else {
      console.log('false')
      document.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-placeholder.jpg");
      document.querySelector(".card__pic").setAttribute("alt", "Неизвестный художник");
      document.querySelector(".card__title").textContent = "Что мы о нём знаем?";
      document.querySelector(".card__date").textContent = "";
      document.querySelector(".card__text").innerHTML = `Пока ничего... Зато мы точно знаем, что в галерее есть на что посмотреть!<br><a href="#gallery" class="link-placeholder">В галерею</a>`;
    }
  }
  });

  // EVENTS
  const params = {
    cardsContainer : document.querySelectorAll('.events__wrapper-container'),
    cardsWrap : document.querySelectorAll('.events__wrapper'),
    slides : document.querySelectorAll('.events__slide'),
    cards : document.querySelectorAll('.events__card'),
    btn : document.querySelector('.events__btn'),
    btnWrap : document.querySelector('.events__btn-wrapper'),
  }

  //check width
  // function getWindowWidth() {
  //   return Math.max(
  //     document.body.scrollWidth,
  //     document.documentElement.scrollWidth,
  //     document.body.offsetWidth,
  //     document.documentElement.offsetWidth,
  //     document.body.clientWidth,
  //     document.documentElement.clientWidth
  //   );
  // }

  // function for big screens
  function desktopShowMore(params) {
    let perView = (window.innerWidth <= 768) ? 2 : 3;
    let visibles = -1;
    for(let i = 0; i < params.cards.length; i++) {
      if (params.cards[i].style.display === "flex") visibles = i;
    }
    for(let i = visibles+1; i < visibles+1+perView; i++) {
      if (params.cards[i]) params.cards[i].style.display = "flex";
    }
    visibles += perView;
    if (visibles >= params.cards.length-1) params.btn.style.display = "none";
  }

  // function for mobiles
  function activateMobileSlider(params) {
    const pagination = document.createElement("div");
    pagination.classList.add("swiper-pagination");
    pagination.classList.add("events__pagination");
    params.btnWrap.append(pagination);

    params.swiperEvents = new Swiper(".events__wrapper-container", {
      pagination: {
        el: '.events__btn-wrapper .swiper-pagination',
        clickable: 'true',
      },

      on: {
        beforeInit() {
          document.querySelectorAll(`.events__slide`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        },

        beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
          });

          this.pagination.el.remove();
        }
      }
    });
  }




  if (window.innerWidth <= 576) {
    params.btn.style.display = "none";
    for (let i = 0; i < params.cards.length; i++) {
      params.cards[i].style.display = "flex";}
    activateMobileSlider(params);
  } else {
    desktopShowMore(params);
    params.btn.addEventListener('click', function() {
      desktopShowMore(params);
    })
  }
});
