//======= for  modal  element
const btnChancelAll = document.querySelectorAll('.button-chancel');
const btnBirthd = document.querySelector('.button-birthday');
const buttonHight = document.querySelector('.button-height');
const buttonWeight = document.querySelector('.button-weight');
// inputs modal
const inputBirthd = document.querySelector('.input-data-birthday');
const inputHeight = document.querySelector('.input-data-height');
const inputWeight = document.querySelector('.input-data-weight');

// ===== 3 inpunts from page anthropometry-predRegist
const inptPersonBirthday = document.querySelector('[ name="person-birthday"]');
const inpPersonHeight = document.querySelector('[name="person-height"]');
const inpPersonWeight = document.querySelector('[name="person-weight"]');
// check box
const inpMan = document.querySelector('#inp-man');
const inpFemale = document.querySelector('#inp-female');
const buttonAntrop = document.querySelector('.button-antrop a');
//select
const selectHeight = document.querySelector('#input-data-height');
//  handlers inpunts from page anthropometry
//render select

if (inpMan !== null) {
  inptPersonBirthday.addEventListener('click', function (e) {
    let tag = e.target.dataset.birthday;
    document.querySelector(`.${tag}`).parentElement.classList.toggle('hide');
  });
  inpPersonHeight.addEventListener('click', function (e) {
    let tag = e.target.dataset.height;

    document.querySelector(`.${tag}`).parentElement.classList.toggle('hide');
  });
  inpPersonWeight.addEventListener('click', function (e) {
    let tag = e.target.dataset.weight;
    document.querySelector(`.${tag}`).parentElement.classList.toggle('hide');
  });

  // =======handlers modal inpunt
  //close  modal
  btnChancelAll.forEach(element => {
    element.addEventListener('click', function (e) {
      e.target.closest('.overlay').classList.toggle('hide');
    });
  });
  // set value birthday
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

  // set value height:
  buttonHight.addEventListener('click', function (e) {
    selectHeight.value;
    // inpPersonHeight.value = '';
    inpPersonHeight.value = selectHeight.value;
    if (selectHeight.value != '') {
      e.target.parentElement.closest('.overlay').classList.toggle('hide');
    }
  });

  // set value weight
  buttonWeight.addEventListener('click', function (e) {
    inpPersonWeight.value = '';
    inpPersonWeight.value = inputWeight.value;

    if (inpPersonWeight.value != '') {
      e.target.parentElement.closest('.overlay').classList.toggle('hide');
    }
  });

  //  ========== render  select Height
  for (let i = 100; i < 200; i++) {
    let op = document.createElement('option');
    op.value = i;
    op.textContent = i;

    selectHeight.insertAdjacentElement('afterbegin', op);
  }

  // validation   ===========checked box
  inpMan.addEventListener('click', function (e) {
    console.log(inpMan.checked);
  });
  inpFemale.addEventListener('click', function (e) {
    console.log(inpFemale.checked);
  });

  buttonAntrop.addEventListener('click', function (e) {
    if (!inpMan.checked && !inpFemale.checked) {
      // e.preventDefault();
    }
    if (
      inpPersonHeight.value == '' ||
      inpPersonWeight.value == '' ||
      inptPersonBirthday.value == ''
    ) {
      // e.preventDefault();
    }
  });
}
