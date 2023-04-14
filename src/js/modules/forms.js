import IMask from 'imask';
import { postData } from '../services/requests';

export const forms = () => {
  const form = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');
  const textAreas = document.querySelectorAll('textarea');
  const upload = document.querySelectorAll('[name="upload"]');
  const phoneInputs = document.querySelectorAll('input[name="phone"]');
  const nameInputs = document.querySelectorAll('input[name="name"]');
  const messageInputs = document.querySelectorAll('input[name="message"]');
  const mailInputs = document.querySelectorAll('input[name="email"]');

  const maskNumberOptions = {
    mask: '+{7} (000) 000-00-00',
  };
  const maskNameOptions = {
    mask: /[^a-zA-Z]+/g,
  };
  const maskMessageOptions = {
    mask: /[^a-zA-Z]+/g,
  };
  const maskMailOptions = {
    mask: /[a-zA-Z0-9@\-.]/i,
  };

  phoneInputs.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, '');
      let mask = IMask(item, maskNumberOptions);
    });
  });

  mailInputs.forEach(item => {
    item.addEventListener('input', () => {
      if (item.value.match(/@\w+\./gi)) {
        item.style.border = '1px solid green';
      } else {
        item.style.border = '1px solid red';
      }
      let mask = IMask(item, maskMailOptions);
    });
  });

  nameInputs.forEach(item => {
    item.addEventListener('input', () => {
      if (item.value.match(/[a-zA-Z]+/g)) {
        item.style.border = '1px solid red';
        item.placeholder = 'Только русские буквы';
      } else {
        item.style.border = '1px solid green';
      }
      let mask = IMask(item, maskNameOptions);
    });
  });

  messageInputs.forEach(item => {
    item.addEventListener('input', () => {
      if (item.value.match(/[a-zA-Z]+/g)) {
        item.style.border = '1px solid red';
        item.placeholder = 'Только русские буквы';
      } else {
        item.style.border = '1px solid green';
      }
      let mask = IMask(item, maskMessageOptions);
    });
  });

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся.',
    failure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png',
  };

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php',
  };

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
    upload.forEach(item => {
      item.previousElementSibling.textContent = 'Файл не выбран';
    });
    textAreas.forEach(item => {
      item.value = '';
    });
  };

  upload.forEach(item => {
    item.addEventListener('input', () => {
      console.log(item.files[0]);
      let dots;
      const arr = item.files[0].name.split('.');
      arr[0].length > 6 ? (dots = '...') : (dots = '.');

      item.previousElementSibling.textContent =
        arr[0].substring(0, 6) + dots + arr[1];
    });
  });

  form.forEach(item => {
    item.addEventListener('submit', ev => {
      ev.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');

      item.parentNode.appendChild(statusMessage);
      item.style.display = 'none';

      if (item.classList.contains('data-form')) {
        let h4 = document.createElement('h4');
        h4.textContent = 'Остались вопросы? Закажите обратный звонок';
        statusMessage.appendChild(h4);
      }

      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(item);
      let api;
      item.closest('.popup-design') || item.classList.contains('calc_form')
        ? (api = path.designer)
        : (api = path.question);
      console.log(api);

      postData(api, formData)
        .then(res => {
          console.log(res);
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            item.style.animationDuration = '0.4s';
            item.style.display = 'block';
          }, 10000);
        });
    });
  });
};
