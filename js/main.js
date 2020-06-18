const btnChancel = document.querySelectorAll('.button-chancel');
const overlay = document.querySelector('.overlay');
const personBirthday = document.querySelector('[ name="person-birthday"]');
const personHeight = document.querySelector('[name="person-height"]');
const personWeight = document.querySelector('[name="person-weight"]');

personBirthday.addEventListener('click', function (e) {
  let tag = e.target.dataset.birthday;

  document.querySelector(`.${tag}`).parentElement.classList.toggle('hide');
});
personHeight.addEventListener('click', function (e) {
  let tag = e.target.dataset.height;
  document.querySelector(`.${tag}`).parentElement.classList.toggle('hide');
});
personWeight.addEventListener('click', function (e) {
  let tag = e.target.dataset.weight;
  document.querySelector(`.${tag}`).parentElement.classList.toggle('hide');
});

btnChancel.forEach(element => {
  element.addEventListener('click', function (e) {
    e.target.closest('.overlay').classList.toggle('hide');
  });
});

// btnChancel.addEventListener('click', function (e) {
//   console.log(111);
//   overlay.classList.toggle('hide');
// });
