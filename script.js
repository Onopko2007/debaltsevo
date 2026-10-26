'use strict';
const form = document.querySelector('#feedback-form');
if (form) {
 const message = form.elements.message, status = document.querySelector('#form-status'), download = document.querySelector('#download-message');
 let prepared = '';
 const invalidate = () => { prepared = ''; download.disabled = true; status.textContent = ''; };
 form.addEventListener('input', () => { for (const name of ['name','message']) form.elements[name].setCustomValidity(''); document.querySelector('#char-count').value = message.value.length; invalidate(); });
 form.addEventListener('submit', event => {
  event.preventDefault();
  form.elements.name.setCustomValidity(form.elements.name.value.trim().length < 2 ? 'Введите имя: не менее 2 значащих символов.' : '');
  message.setCustomValidity(message.value.trim().length < 10 ? 'Введите сообщение: не менее 10 значащих символов.' : '');
  if (!form.reportValidity()) return;
  prepared = 'Имя: ' + form.elements.name.value.trim() + '\nEmail: ' + form.elements.email.value.trim() + '\nТема: ' + (form.elements.topic.value.trim() || 'Без темы') + '\n\n' + message.value.trim();
  status.textContent = 'Форма проверена. Сообщение не отправлено: сервер не подключён. Вы можете скачать текст сообщения.';
  download.disabled = false;
 });
 form.addEventListener('reset', () => { invalidate(); document.querySelector('#char-count').value = '0'; for (const name of ['name','message']) form.elements[name].setCustomValidity(''); });
 download.addEventListener('click', () => { if (!prepared) return; const url = URL.createObjectURL(new Blob(['\uFEFF' + prepared], {type:'text/plain;charset=utf-8'})); const a = document.createElement('a'); a.href = url; a.download = 'message-debaltsevo.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); });
}
