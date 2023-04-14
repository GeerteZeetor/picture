export const filter = () => {
  const menu = document.querySelector('.portfolio-menu');
  const items = menu.querySelectorAll('li');
  const wrapper = document.querySelector('.portfolio-wrapper');
  const markAll = wrapper.querySelectorAll('.all');
  const no = document.querySelector('.portfolio-no');

  const typeFilter = markType => {
    markAll.forEach(item => {
      item.style.display = 'none';
      item.classList.remove('animated', 'fadeIn');
    });
    no.style.display = 'none';
    no.classList.remove('animated', 'fadeIn');

    if (markType) {
      markType.forEach(item => {
        item.style.display = 'block';
        item.classList.add('animated', 'fadeIn');
      });
    } else {
      no.style.display = 'block';
      no.classList.add('animated', 'fadeIn');
    }
  };

  function addEv() {
    items.forEach(item => {
      item.addEventListener('click', ev => {
        if (
          ev.target.classList.value === 'grandmother' ||
          ev.target.classList.value === 'granddad'
        ) {
          typeFilter();
        } else {
          typeFilter(wrapper.querySelectorAll(`.${ev.target.classList.value}`));
        }
      });
    });
  }

  addEv();

  menu.addEventListener('click', ev => {
    let target = ev.target;
    if (target && target.tagName === 'LI') {
      items.forEach(btn => btn.classList.remove('active'));
      target.classList.add('active');
    }
  });
};
