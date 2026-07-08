$(document).ready(function () {

  /* ─── Sticky header ─── */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 20) {
      $('.header-area').addClass('sticky');
    } else {
      $('.header-area').removeClass('sticky');
    }
    updateActiveSection();
  });

  /* ─── Mobile menu toggle ─── */
  $('#menuToggle').on('click', function () {
    const nav = $('#navbar');
    const isOpen = nav.hasClass('open');
    nav.toggleClass('open');
    $(this).attr('aria-expanded', !isOpen);
    $(this).find('i').toggleClass('fa-bars fa-times');
  });

  /* ─── Close mobile menu on link click ─── */
  $('.nav-link').on('click', function () {
    $('#navbar').removeClass('open');
    $('#menuToggle').attr('aria-expanded', false);
    $('#menuToggle').find('i').removeClass('fa-times').addClass('fa-bars');
  });

  /* ─── Smooth scroll for nav links ─── */
  $('.nav-link').on('click', function (e) {
    e.preventDefault();
    const target = $(this).attr('href');

    if (target === '#home') {
      $('html, body').animate({ scrollTop: 0 }, 500);
    } else if ($(target).length) {
      const headerHeight = $('.header-area').outerHeight() + 16;
      const offset = $(target).offset().top - headerHeight;
      $('html, body').animate({ scrollTop: offset }, 500);
    }
  });

  /* ─── ScrollReveal ─── */
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({ distance: '40px', duration: 700, delay: 100, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', reset: false });

    sr.reveal('[data-reveal="left"]',  { origin: 'left' });
    sr.reveal('[data-reveal="right"]', { origin: 'right' });
    sr.reveal('[data-reveal="up"]',    { origin: 'bottom', interval: 80 });
    sr.reveal('.section-label',        { origin: 'top', distance: '20px' });
  }

  /* ─── Initial active link ─── */
  updateActiveSection();
});

/* ─── Active section detection ─── */
function updateActiveSection() {
  var scrollPos = $(window).scrollTop();
  var headerH = $('.header-area').outerHeight() + 10;

  if (scrollPos < 80) {
    setActive('#home');
    return;
  }

  var found = false;
  $('section[id], div[id="home"]').each(function () {
    var id = '#' + $(this).attr('id');
    var top = $(this).offset().top - headerH;
    var bottom = top + $(this).outerHeight();
    if (scrollPos >= top && scrollPos < bottom) {
      setActive(id);
      found = true;
      return false;
    }
  });

  if (!found && scrollPos + $(window).height() >= $(document).height() - 10) {
    setActive('#contact');
  }
}

function setActive(id) {
  $('.nav-link').removeClass('active');
  $('.nav-link[href="' + id + '"]').addClass('active');
}
