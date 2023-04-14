export const accordion = (triggersSelector, contentsSelector) => {
  const btns = document.querySelectorAll(triggersSelector);
  const blocks = document.querySelectorAll(contentsSelector);

  blocks.forEach(item => {
    item.classList.add('animated', 'fadeInDown');
  });

  btns.forEach(item => {
    item.addEventListener('click', function () {
      if (!this.classList.contains('active')) {
        btns.forEach(item => {
          item.classList.remove('active', 'active-style');
        });
        this.classList.add('active', 'active-style');
      }
    });
  });
};
