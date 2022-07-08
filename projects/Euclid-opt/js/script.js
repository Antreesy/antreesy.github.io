window.addEventListener('DOMContentLoaded', function () {
  
  const lazyLoadInstance = new LazyLoad({});

  // burger
  document.querySelector('.nav-toggle').addEventListener('click', function () {
    this.classList.toggle('opened');
    document.querySelector('.burger__nav').classList.toggle('burger__nav_active');
  });

  // tabs
  document.querySelectorAll('.work-section__btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path;
      document.querySelectorAll('.work-section__slider').forEach(function (tabContent) {
        tabContent.classList.remove('work-section__slider-active');
      });
      document.querySelectorAll('.work-section__btn').forEach(function (tabContent) {
        tabContent.classList.remove('work-section__btn-active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('work-section__slider-active');
      document.querySelector(`[data-path="${path}"]`).classList.add('work-section__btn-active');
    });
  });

  // swiper
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: 0,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: 'true',
    },
  });

  // accordion
  $(function () {
    $('#accordion').accordion({
      collapsible: true,
      heightStyle: 'content',
    });
  });
});
