export const drop = () => {
  const fileInputs = document.querySelectorAll('[name="upload"]');

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(item => {
    fileInputs.forEach(input => {
      input.addEventListener(item, preventDefaults, false);
    });
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  function highLight(item) {
    item.closest('.file_upload').style.border = '5px solid yellow';
    item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,0.7)';
  }
  function unHighLight(item) {
    item.closest('.file_upload').style.border = 'none';

    if (item.closest('.calc_form')) {
      item.closest('.file_upload').style.backgroundColor = '#fff';
    } else {
      item.closest('.file_upload').style.backgroundColor = '#ededed';
    }
  }

  ['dragenter', 'dragover'].forEach(item => {
    fileInputs.forEach(input => {
      input.addEventListener(item, () => highLight(input), false);
    });
  });

  ['drop', 'dragleave'].forEach(item => {
    fileInputs.forEach(input => {
      input.addEventListener(item, () => unHighLight(input), false);
    });
  });

  fileInputs.forEach(input => {
    input.addEventListener('drop', ev => {
      input.files = ev.dataTransfer.files;
      let dots;
      const arr = input.files[0].name.split('.');
      arr[0].length > 6 ? (dots = '...') : (dots = '.');
      input.previousElementSibling.textContent =
        arr[0].substring(0, 6) + dots + arr[1];
    });
  });
};
