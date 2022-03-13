(()=>{
    // eslint-disable-next-line no-undef
    new Swiper('#swiper-layout', {
        loop: true,
      
        pagination: {
          el: '.swiper-pagination',
        },
      });

      // eslint-disable-next-line no-undef
      new Swiper('#swiper-js', {
        loop: true,
      
        pagination: {
          el: '.swiper-pagination',
        },
      });

      // eslint-disable-next-line no-undef
      new PageScroll('#pagescroll', {
        animDuration: 500,
        easing: 'ease-in-out', 
        controlColor: 'rgba(0,0,0,0)', 
        nav: [
          document.getElementById('hero-link'), 
          document.getElementById('skills-link'), 
          document.getElementById('projects-link'), 
          document.getElementById('contacts-link'), 
      ]
    })
})()