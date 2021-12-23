window.addEventListener('DOMContentLoaded', function() {

  // common functions
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
  const MOBILE_WIDTH = 576;
  const DESKTOP_WIDTH = 769;

  //header
  function headerInit() {
    const dropdownBtns = document.querySelectorAll('.dropdown__btn');
    function hasClass(array, classSearched) {
      for (let i = 0; i < array.length; ++i) {
        if (array[i] === classSearched) return true;
      }
      return false;
    }

    // get open/close function to dropdown and search
    const searchOpen = document.querySelector('.header__search-clicker');
    document.addEventListener('click', function(event) {
      const searchModal = document.querySelector('.header__search');
      const searchInput = document.querySelector('.search__input');
      // const searchCancel = document.querySelector('.search__cancel');
      searchModal.addEventListener('submit', function() {
        searchOpen.classList.remove('search-is-active');
        searchOpen.removeAttribute('tabindex');
        searchInput.value="";
      });

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

      if (event.target !== searchModal && event.target !== searchInput && hasClass(searchOpen.classList, 'search-is-active')) {
        searchOpen.classList.remove('search-is-active');
        searchOpen.removeAttribute('tabindex');
        searchInput.value="";
      } else if (event.target === searchOpen && !hasClass(event.target.classList, 'search-is-active')) {
        searchOpen.classList.add('search-is-active');
        searchOpen.setAttribute('tabindex', '-1');
        searchInput.focus();
      }

    });


    // get open/close function to burger menu
    const burgerOpen = document.querySelector('.burger__opener');
    burgerOpen.addEventListener('click', () => {
      const burgerClose = document.querySelector('.burger-closer');
      const menu = document.querySelector('.header__menu');
      const navLink = document.querySelectorAll('.nav__link');
      menu.classList.add('is-active');
      document.body.style.overflow = "hidden";
      burgerClose.addEventListener('click', () => {
        menu.classList.remove('is-active');
        document.body.style.overflow = "auto";
      });
      navLink.forEach((link) => {
        link.addEventListener('click', () => {
          menu.classList.remove('is-active');
          document.body.style.overflow = "auto";
        })
      })
    });
  }
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
      slidesPerView: 1,
      // spaceBetween: 0,
      grid: {
        rows: 1,
        fill: "row",
      },

      navigation: {
        nextEl: '.gallery-button-next',
        prevEl: '.gallery-button-prev',
      },
      pagination: {
        el: '.gallery-pagination',
        type: 'fraction',
      },

      breakpoints: {
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
    })

    // init choices
    const element = document.querySelector('#gallery__select');
    const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: '',
    })
  }
  galleryInit();

  // accordion
  function accordionInit() {
  // get tabs change
  const flags = document.querySelectorAll('.flag');
  const accs =  document.querySelectorAll('.tab__accordion');
  function changeAcc() {
    const countryFlag = document.querySelector('.flag.is-active').getAttribute("data-set")
    // const countryPos = document.querySelector('.flag.is-active').getAttribute("data-num")
    accs.forEach((acc) => {
      if (acc.getAttribute("data-target") === countryFlag) {
        acc.classList.add("is-active");
        acc.classList.remove("visually-hidden");
        acc.style.width = 100 + "%";
      } else {
        acc.classList.remove("is-active");
        acc.classList.add("visually-hidden");
        acc.style.width = null;
      }
    });
  }
  changeAcc();

  flags.forEach((flag) => {
    flag.addEventListener('click', (event)=> {
      flags.forEach((flag)=>{flag.classList.remove("is-active")});
      event.target.classList.add("is-active");
      changeAcc();
    })
  })

    // open first accordion
    const activeTab = document.querySelectorAll(".accordion__wrap.is-active");
    activeTab.forEach(acc => {
      const panel = acc.querySelector(".accordion__panel")

      if (acc.classList.contains('is-active')) {
        panel.style.maxHeight = panel.children[0].scrollHeight + 40 + "px";
      } else {
        panel.style.maxHeight = null;
      }
    })

    // get open/close function to accordion
    const accTab = document.querySelectorAll(".accordion__wrap")
    accTab.forEach(acc => {
      const btn = acc.querySelector(".accordion__btn")
      btn.addEventListener('click', (el) => {
        const elem = el.currentTarget.parentNode
        const panel = elem.querySelector(".accordion__panel")

        elem.classList.toggle('is-active');
        if (elem.classList.contains('is-active')) {
          panel.style.maxHeight = panel.scrollHeight + 40 + "px";
        } else {
          panel.style.maxHeight = null;
        }
      })
    })

    // get author changing for accordion
    document.querySelectorAll('.panel__link').forEach(link => {
      link.addEventListener('click', (event) => {
        if (event.target.textContent === "Доменико Гирландайо") {
          document.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-girlandayo.jpg");
          document.querySelector(".card__pic").setAttribute("alt", "Доменико Гирландайо");
          document.querySelector(".card__title").textContent = "Доменико Гирландайо";
          document.querySelector(".card__date").innerHTML = "2&nbsp;июня 1448&nbsp;&mdash; 11&nbsp;января 1494.";
          document.querySelector(".card__text").innerHTML = `Один из&nbsp;ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и&nbsp;сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в&nbsp;течение года овладевал профессиональными навыками. Автор фресковых циклов, в&nbsp;которых выпукло, со&nbsp;всевозможными подробностями показана домашняя жизнь библейских персонажей (в&nbsp;их&nbsp;роли выступают знатные граждане Флоренции в&nbsp;костюмах того времени).`;
        } else {
          document.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-placeholder.jpg");
          document.querySelector(".card__pic").setAttribute("alt", "Неизвестный художник");
          document.querySelector(".card__title").textContent = "Что мы о нём знаем?";
          document.querySelector(".card__date").textContent = "";
          document.querySelector(".card__text").innerHTML = `Пока ничего... Зато мы точно знаем, что в галерее есть на что посмотреть!<br><a href="#gallery" class="link-placeholder">В галерею</a>`;
        }
      });
    })
  }
  accordionInit();

  //events
  function eventsInit() {
    const btn = document.querySelector(".events__btn");

    const sliderMobileParams = {
      paginationClassName: "events__pagination",
      cardsContainerName: "events__wrapper-container",
      cardsWrapName: "events__wrapper",
      card: "events__slide",
      hiddenClass: "is-hidden",
      eventsSlider: false,
    };

    function activateMobileSlider(params) {
      const pagination = document.createElement("div");
      pagination.classList.add("events__pagination");
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
            let pagin = document.querySelectorAll(".events__pagination")
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
  }
  eventsInit();

  // books
  function booksInit(){
    // init swiper

    {
      const MOBILE_WIDTH = 576;
  
      const sliderMobileParams = {
        paginationClassName: "books__pagination",
        cardsContainerName: "books__wrapper-container",
        cardsWrapName: "books__swiper-wrapper",
        card: "books__book",
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
        pagination.classList.add("books__pagination");
        pagination.classList.add("swiper-pagination");
        pagination.classList.add(params.paginationClassName);
        params.cardsContainer.append(pagination);
        params.cardsContainer.classList.add("swiper-container");
        params.cardsWrap.classList.add("swiper-wrapper");
  
        params.eventsSlider = new Swiper(`.${params.cardsContainerName}`, {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34,
    
          navigation: {
            nextEl: '.books-button-next',
            prevEl: '.books-button-prev',
          },
          pagination: {
            el: '.books-pagination',
            type: 'fraction',
          },
    
          breakpoints: {
            769: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 50,
            },
            1025: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 50,
            }
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
              let pagin = document.querySelectorAll(".books__pagination")
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
        params.eventsSlider = false;
      }
  
      function checkWindowWidthMobile(params) {
        const currentWidth = getWindowWidth();
        params.cardsContainer = document.querySelector(
          `.${params.cardsContainerName}`); // swiper
        params.cardsWrap = document.querySelector(
          `.${params.cardsWrapName}`); // swiper wrapper
  
        if (
          currentWidth > MOBILE_WIDTH &&
          (!params.eventsSlider || params.eventsSlider.destroyed) // check swiper doesn't exist
        ) {
          activateMobileSlider(params);
        } else if (currentWidth <= MOBILE_WIDTH && params.eventsSlider) { //check swiper exist
          destroyMobileSlider(params);
        }
      }
  
      checkWindowWidthMobile(sliderMobileParams); // check at start
      window.addEventListener("resize", function () {
        checkWindowWidthMobile(sliderMobileParams); // check at resize
      });
    }

    // checkbox dropdown window
    checkboxOpener = document.querySelector(".books__checkwrap-text");
    checkBoxMain = document.querySelector(".books__checkwrap-main");
    checkBoxDouble = document.querySelector(".books__checkwrap-dropdown");

    checkboxOpener.addEventListener("click", () => {
      checkBoxDouble.classList.toggle("is-active")
    })

    checkBoxMain.querySelectorAll(".books__checkbox").forEach(elem => {
      elem.addEventListener("change", () => {
        id = elem.getAttribute("id").split("-").pop();
        mainId = document.querySelector(`#main-${id}`);
        doubleId = document.querySelector(`#double-${id}`);
        if (doubleId.checked !== elem.checked) {
          doubleId.checked = elem.checked
        }
        mainId.parentNode.parentNode.classList.toggle("visible")
      })
    })

    checkBoxDouble.querySelectorAll(".books__checkbox").forEach(elem => {
      elem.addEventListener("change", () => {
        id = elem.getAttribute("id").split("-").pop();
        mainId = document.querySelector(`#main-${id}`);
        doubleId = document.querySelector(`#double-${id}`);
        if (mainId.checked !== elem.checked) {
          mainId.checked = elem.checked
        }
        mainId.parentNode.parentNode.classList.toggle("visible")
      })
    })

  }
  booksInit();

    // projects
    function projectsInit(){
      // init swiper
      const swiperProjects = new Swiper(".projects__swiper", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // width: 450,

        navigation: {
          nextEl: '.projects-button-next',
          prevEl: '.projects-button-prev',
        },

        breakpoints: {
          577: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 34,
          },
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 50,
          },
          1025: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
          }
        },
      })

      tippy('#tip-1', {
        content: 'Пример современных тенденций - современная методология разработки',
      });
      tippy('#tip-2', {
        content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
      });
      tippy('#tip-3', {
        content: 'В стремлении повысить качество',
      });

      // Set BG to dropdown items
      // document.querySelectorAll('.projects__slide').forEach(function(thumb) {
      //   thumb.style.backgroundImage=`url('./img/projects/${thumb.getAttribute("data-set")}.jpg')`;
      // });

    }
    projectsInit();

    function contactsInit(){
      // Функция ymaps.ready() будет вызвана, когда
      // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
      ymaps.ready(init);
      function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
          // Координаты центра карты.
          // Порядок по умолчанию: «широта, долгота».
          // Чтобы не определять координаты центра карты вручную,
          // воспользуйтесь инструментом Определение координат.
          center: [55.763,37.618],
          controls: ['smallMapDefaultSet'],
          // Уровень масштабирования. Допустимые значения:
          // от 0 (весь мир) до 19.
          zoom: 14
        });
  
        myMap.controls.remove('zoomControl');
        myMap.controls.remove('fullscreenControl');
        myMap.controls.remove('typeSelector');
        myMap.controls.remove('searchControl');
        myMap.controls.remove('geolocationControl');
  
        var myPlacemark = new ymaps.Placemark([55.75846806898367,37.60108849999989], {}, {
          iconLayout: 'default#image',
          iconImageHref: '/img/marker.svg',
          iconImageSize: [20, 20],
          // iconImageOffset: [-3, -42]
        })
        myMap.geoObjects.add(myPlacemark);  

        async function checkWindowWidthMobile() {
          const currentWidth = getWindowWidth();
    
          if (currentWidth <= MOBILE_WIDTH) {
            await myMap.setCenter([55.763,37.608], 14, {
              checkZoomRange: true
            });
          } else if (currentWidth > MOBILE_WIDTH && currentWidth <= DESKTOP_WIDTH) {
            await myMap.setCenter([55.763,37.616], 14, {
              checkZoomRange: true
            });
          } else {
            await myMap.setCenter([55.763,37.618], 14, {
              checkZoomRange: true
            });     
          }
        }
    
        checkWindowWidthMobile(); // check at start
        window.addEventListener("resize", function () {
          checkWindowWidthMobile(); // check at resize
        });
      }
    }
    contactsInit()

})
