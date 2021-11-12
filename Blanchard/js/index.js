window.addEventListener('DOMContentLoaded', function() {

  //header
  function headerInit() {
    const dropdownBtns = document.querySelectorAll('.dropdown__btn');
    function hasClass(array, classSearched) {
      for (let i = 0; i < array.length; ++i) {
        if (array[i] === classSearched) return true;
      }
      return false;
    };

    // get open/close function to dropdown
    document.addEventListener('click', function(event) {
      if (hasClass(event.target.classList, 'dropdown__btn')) {
        // Set BG to dropdown items
        document.querySelectorAll('.dropdown__link').forEach(function(thumb) {
          thumb.parentElement.style.backgroundImage=`url('./img/dropdown/${thumb.innerHTML}.jpg')`;
        });

        if (hasClass(event.target.classList, 'is-active')) {
          dropdownBtns.forEach(function(del) {del.classList.remove('is-active')});
        } else {
          dropdownBtns.forEach(function(del) {del.classList.remove('is-active')});
          event.target.classList.add('is-active');
        }
      } else {
        dropdownBtns.forEach(function(del) {del.classList.remove('is-active')});
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
  };
  headerInit();

  //hero
  const swiperHero = new Swiper('.hero__swiper', {
    loop: true,
    autoplay: {
    delay: 5000,
    },
  });

  // gallery
  function galleryInit(){
    // init swiper
    const swiperGallery = new Swiper(".gallery__swiper", {
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 0,
          grid: {
            rows: 1,
          },
        },
      // when window width is > 576px
        577: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34,
          grid: {
            rows: 2,
          },
        },
        1025: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
          grid: {
            rows: 2,
          },
        }
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      }
      })

    // init choices
    const element = document.querySelector('#gallery__select');
    const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: '',
    })

    // fill images
    document.querySelectorAll('.gallery__slide').forEach(function(slide) {
      if (window.innerWidth <= 576) {
        slide.style.backgroundImage=`url('./img/gallery/320/${slide.getAttribute('data-set')}.jpg')`;
      } else {
        slide.style.backgroundImage=`url('./img/gallery/${slide.getAttribute('data-set')}.jpg')`;
      };
    });
  };
  galleryInit();

  // accordion
  function accordionInit() {
  // get tabs change
  const flags = document.querySelectorAll('.flag');
  const accs =  document.querySelectorAll('.tab__accordion');
  function changeAcc(flags) {
    const countryFlag = document.querySelector('.flag.is-active').getAttribute("data-set")
    // const countryPos = document.querySelector('.flag.is-active').getAttribute("data-num")
    accs.forEach((acc) => {
      if (acc.getAttribute("data-target") === countryFlag) {
        acc.classList.add("is-active");
        acc.classList.remove("visually-hidden");
      } else {
        acc.classList.remove("is-active");
        acc.classList.add("visually-hidden");
      }
    });
  };
  changeAcc(flags);

  flags.forEach((flag) => {
    flag.addEventListener('click', (event)=> {
      flags.forEach((flag)=>{flag.classList.remove("is-active")});
      event.target.classList.add("is-active");
      changeAcc(flags);
    })
  })

    function getAccHeight() {
      const allAccs = document.querySelectorAll(".tab__accordion.is-active .accordion__btn");
      const allPans = document.querySelectorAll(".accordion.is-active .panel");
      let accHeight = 0;
      allAccs.forEach((acc)=>{
        accHeight += acc.offsetHeight;
      });
      allPans.forEach((pan)=>{
        accHeight += pan.offsetHeight;
      });
      console.log(accHeight);
      return accHeight;
    }


    // open first accordion
    const activeTab = document.querySelector(".tab__accordion.is-active");
    const activeAcc = document.querySelectorAll(".accordion__btn.active");
    activeAcc.forEach((activeAcc)=>{
      let panel = activeAcc.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = '100%';
      }
    })
    activeTab.style.height = `${getAccHeight()}px`;

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
        activeTab.style.height = `${getAccHeight()}px`;
      });
    })
    window.addEventListener("resize", function () {
      activeTab.style.height = `${getAccHeight()}px`; // check at resize
    });


    // get author changing for accordion
    document.querySelector('.tab__accordion-wrapper').addEventListener('click', function(event) {
      if (event.target.className === "panel__link") {
      if (event.target.textContent === "Доменико Гирландайо") {
        document.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-girlandayo.jpg");
        document.querySelector(".card__pic").setAttribute("alt", "Доменико Гирландайо");
        document.querySelector(".card__title").textContent = "Доменико Гирландайо";
        document.querySelector(".card__date").textContent = "2&nbsp;июня 1448&nbsp;&mdash; 11&nbsp;января 1494.";
        document.querySelector(".card__text").innerHTML = "Один из&nbsp;ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и&nbsp;сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в&nbsp;течение года овладевал профессиональными навыками. Автор фресковых циклов, в&nbsp;которых выпукло, со&nbsp;всевозможными подробностями показана домашняя жизнь библейских персонажей (в&nbsp;их&nbsp;роли выступают знатные граждане Флоренции в&nbsp;костюмах того времени).";
      } else {
        document.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-placeholder.jpg");
        document.querySelector(".card__pic").setAttribute("alt", "Неизвестный художник");
        document.querySelector(".card__title").textContent = "Что мы о нём знаем?";
        document.querySelector(".card__date").textContent = "";
        document.querySelector(".card__text").innerHTML = `Пока ничего... Зато мы точно знаем, что в галерее есть на что посмотреть!<br><a href="#gallery" class="link-placeholder">В галерею</a>`;
      }
    };
    });
  };
  accordionInit();

  //events
  function eventsInit() {
    const MOBILE_WIDTH = 576;
    const DESKTOP_WIDTH = 769;
    const btn = document.querySelector(".events__btn");

    const sliderMobileParams = {
      paginationClassName: "events__pagination",
      cardsContainerName: "events__wrapper-container",
      cardsWrapName: "events__wrapper",
      card: "events__slide",
      hiddenClass: "is-hidden",
      eventsSlider: false,
    };

    function getWindowWidth() {
      return Math.max(
        // document.body.scrollWidth,
        // document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      );
    }

    function activateMobileSlider(params) {
      const pagination = document.createElement("div");
      pagination.classList.add("swiper-pagination");
      pagination.classList.add(params.paginationClassName);
      params.cardsContainer.append(pagination);
      params.cardsContainer.classList.add("swiper-container");
      params.cardsWrap.classList.add("swiper-wrapper");

      params.eventsSlider = new Swiper(`.${params.cardsContainerName}`, {
        pagination: {
          el: `.events__pagination`,
          clickable: true,
        },
        on: {
          beforeInit() {
            document.querySelectorAll(`.${params.card}`).forEach((el) => {
              el.classList.add("swiper-slide");
            });
          },
          beforeDestroy() {
            this.slides.forEach((el) => {
              el.classList.remove("swiper-slide");
              el.removeAttribute("role");
              el.removeAttribute("aria-label");
            });
            let pagin = document.querySelectorAll(".swiper-pagination")
            pagin.forEach((pagin) => {pagin.parentNode.removeChild(pagin)})
          }
        }
      });
    }

    function destroyMobileSlider(params) { // ??
      params.eventsSlider.destroy(true, true);
      params.cardsContainer.classList.remove("swiper-container");
      params.cardsWrap.classList.remove("swiper-wrapper");
      params.cardsWrap.removeAttribute("aria-live");
      params.cardsWrap.removeAttribute("id");
    }

    function setHiddenCards(params, currentWidth) { // ??
      const cards = document.querySelectorAll(`.${params.card}`);
      let quantity = cards.length;

      if (currentWidth <= MOBILE_WIDTH) {quantity = cards.length;}
      if (currentWidth > MOBILE_WIDTH && currentWidth < DESKTOP_WIDTH) {quantity = 2;}
      if (currentWidth >= DESKTOP_WIDTH) {quantity = 3;}

      cards.forEach((card, i) => {
        card.classList.remove(params.hiddenClass);
        if (i >= quantity) {
          card.classList.add(params.hiddenClass);
        }
      });
    }

    function showCards(e) { // ??
      const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);
      e.target.style = "display: none";
      cards.forEach((card) => {
        card.classList.remove(sliderMobileParams.hiddenClass);
      });
    }

    function checkWindowWidthMobile(params) {
      const currentWidth = getWindowWidth();
      btn.style = ""; // reset button style ???
      params.cardsContainer = document.querySelector(
        `.${params.cardsContainerName}`); // swiper
      params.cardsWrap = document.querySelector(
        `.${params.cardsWrapName}`); // swiper wrapper

      setHiddenCards(params, currentWidth);

      if (
        currentWidth <= MOBILE_WIDTH &&
        (!params.eventsSlider || params.eventsSlider.destroyed) // check swiper doesn't exist
      ) {
        activateMobileSlider(params);
        btn.classList.add(params.hiddenClass);
      } else if (currentWidth > MOBILE_WIDTH && params.eventsSlider) { //check swiper exist
        destroyMobileSlider(params);
        btn.classList.remove(params.hiddenClass);
      }
    }

    checkWindowWidthMobile(sliderMobileParams); // check at start
    btn.addEventListener("click", showCards);
    window.addEventListener("resize", function () {

      checkWindowWidthMobile(sliderMobileParams); // check at resize
    });
  };
  eventsInit();

})
