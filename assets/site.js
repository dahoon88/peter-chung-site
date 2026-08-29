/* Hyung-Eun (Peter) Chung — site behaviour
   1) Record dropdown: hover on pointer devices, click/tap and keyboard everywhere.
   Record dropdown only. */

(function () {
  'use strict';

  /* ---------- Record dropdown ---------- */
  var group = document.querySelector('.nav__group');
  if (group) {
    var trigger = group.querySelector('.nav__link');
    var hoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var closeTimer = null;

    function open() {
      window.clearTimeout(closeTimer);
      group.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
    function close() {
      group.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function closeSoon() {
      closeTimer = window.setTimeout(close, 180);
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      group.classList.contains('is-open') ? close() : open();
    });

    if (hoverable) {
      group.addEventListener('mouseenter', open);
      group.addEventListener('mouseleave', closeSoon);
    }

    group.addEventListener('focusin', open);
    group.addEventListener('focusout', function (e) {
      if (!group.contains(e.relatedTarget)) close();
    });
    document.addEventListener('click', function (e) {
      if (!group.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && group.classList.contains('is-open')) {
        close();
        trigger.focus();
      }
    });
  }

})();
