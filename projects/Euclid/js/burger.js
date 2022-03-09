window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.nav-toggle').addEventListener('click', function() {
    this.classList.toggle('opened');
    document.querySelector('.burger__nav').classList.toggle('burger__nav_active');
  });
});
