export const mask = selector => {
  let setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('caracter', pos);
      range.moveStart('caracter', pos);
      range.select();
    }
  };

  function createMask(event) {
    let matrix = '+7 (___) ___ __ __';
    let i = 0;
    let def = matrix.replace(/\D/g, '');
    let value = this.value.replace(/\D/g, '');

    if (def.length >= value.length) {
      value = def;
    }

    this.value = matrix.replace(/./g, a => {
      return /[_\d]/.test(a) && i < value.length
        ? value.charAt(i++)
        : i >= value.length
        ? ''
        : a;
    });

    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
  }

  let inputs = document.querySelectorAll(selector);

  inputs.forEach(item => {
    item.addEventListener('input', createMask);
    item.addEventListener('focus', createMask);
    item.addEventListener('blur', createMask);
  });
};
