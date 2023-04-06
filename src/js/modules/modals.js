export const modals = () => {
  let btnPressed = false;

  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    destroy = false
  ) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    const windows = document.querySelectorAll('[data-modal]');

    trigger.forEach(item => {
      item.addEventListener('click', ev => {
        btnPressed = true;
        if (ev.target) {
          ev.preventDefault();
        }
        if (destroy) {
          item.remove();
        }
        windows.forEach(item => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn');
        });
        modal.style.display = 'block';
        document.body.style.padding = '0 calc(20px - (100vw - 100%)) 0 0';
        document.body.classList.add('modal-open');
      });
    });

    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    });

    modal.addEventListener('click', ev => {
      if (ev.target === modal) {
        windows.forEach(item => {
          item.style.display = 'none';
        });
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
    });
  }

  function showModalByTime(modalSelector, time) {
    setTimeout(() => {
      let display;
      document.querySelectorAll('[data-modal]').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      });
      if (!display) {
        document.querySelector(modalSelector).style.display = 'block';
        document.body.style.padding = '0 calc(20px - (100vw - 100%)) 0 0';
        document.body.classList.add('modal-open');
      }
    }, time);
  }

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      let scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      if (
        !btnPressed &&
        window.scrollY + document.documentElement.clientHeight >= scrollHeight
      ) {
        document.querySelector(selector).click();
        console.log(document.querySelector(selector));
      }
    });
  }

  showModalByTime('.popup-consultation', 60000);
  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal(
    '.button-consultation',
    '.popup-consultation',
    '.popup-consultation .popup-close'
  );
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift');
};
