window.addEventListener('DOMContentLoaded', function() {
  function hasClass(array, classSearched) {for (i = 0; i < array.length; ++i) {if (array[i] === classSearched) return true;};return false}
  let dropdownBtns = document.querySelectorAll('.dropdown__btn')
  // Set BG to dropdown items
  document.querySelectorAll('.dropdown__link').forEach(function(thumb) {
    thumb.parentElement.style.backgroundImage=`url('./img/dropdown/${thumb.innerHTML}.jpg')`
  })
  document.querySelectorAll('.gallery__slide').forEach(function(thumb) {
    if (window.innerWidth <= 576) {
      thumb.style.backgroundImage=`url('../img/gallery/320/${thumb.innerHTML}.jpg')`
    } else {
      thumb.style.backgroundImage=`url('../img/gallery/${thumb.innerHTML}.jpg')`
    }
  })

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
  })

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
  })

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
  })

  // get open/close function to accordion
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

})
