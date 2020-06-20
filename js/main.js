const btnChancelAll = document.querySelectorAll('.button-chancel');
const buttonConfirmAll = document.querySelectorAll('.button-confirm');
const btnBirthd = document.querySelector('.button-birthday');
const overlay = document.querySelector('.overlay');
const inptPersonBirthday = document.querySelector('[ name="person-birthday"]');
const personHeight = document.querySelector('[name="person-height"]');
const personWeight = document.querySelector('[name="person-weight"]');
const inputBirthd = document.querySelector('.input-data-birthday');

inptPersonBirthday.addEventListener('click', function (e) {
  let tag = e.target.dataset.birthday;
  document.querySelector(`.${tag}`).parentElement.classList.toggle('hide');
});
personHeight.addEventListener('click', function (e) {
  let tag = e.target.dataset.height;
  console.log(document.querySelector(`.${tag}`).parentElement);
  document.querySelector(`.${tag}`).parentElement.classList.toggle('hide');
});
personWeight.addEventListener('click', function (e) {
  let tag = e.target.dataset.weight;
  document.querySelector(`.${tag}`).parentElement.classList.toggle('hide');
});

btnChancelAll.forEach(element => {
  element.addEventListener('click', function (e) {
    e.target.closest('.overlay').classList.toggle('hide');
  });
});
// buttonConfirmAll.forEach(element => {
//   element.addEventListener('click', function (e) {
//     console.log(e.target.parentElement);
//   });
// });
btnBirthd.addEventListener('click', function (e) {
  inptPersonBirthday.value = '';
  let str = inputBirthd.value.replace(
    /(\w+)-(\w+)-(\w+)/g,
    (match, p1, p2, p3) => {
      return `${p3}-${p2}-${p1}`;
    },
  );
 inptPersonBirthday.value = str;
if (inptPersonBirthday.value != '') {
    e.target.parentElement.closest('.overlay').classList.toggle('hide');
  }
});
// btnChancelAll.addEventListener('click', function (e) {
//   console.log(111);
//   overlay.classList.toggle('hide');
// });
