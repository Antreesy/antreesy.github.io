window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.work-section__btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path;
      document.querySelectorAll('.work-section__slider').forEach(function(tabContent) {
        tabContent.classList.remove('work-section__slider-active');
      })
      document.querySelectorAll('.work-section__btn').forEach(function(tabContent) {
        tabContent.classList.remove('work-section__btn-active');
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('work-section__slider-active')
      document.querySelector(`[data-path="${path}"]`).classList.add('work-section__btn-active')
    })
  })
})
