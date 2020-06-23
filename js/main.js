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
const inputsAntrop = document.querySelectorAll('.input-param');
const inptPersonBirthday = document.querySelector('[ name="person-birthday"]');
const inpPersonHeight = document.querySelector('[name="person-height"]');
const inpPersonWeight = document.querySelector('[name="person-weight"]');
// ===============check box
const inpMan = document.querySelector('#inp-man');
const inpFemale = document.querySelector('#inp-female');
const buttonAntrop = document.querySelector('.button-antrop a');
//select
const selectHeight = document.querySelector('#input-data-height');
const selectWeight = document.querySelector('#input-data-weight');
const selecWeightgr = document.querySelector('#input-data-weight-gr');

// page total ccacl
const resultTotalKkal = document.querySelector('.result-totalKkal');
//  handlers inpunts from page anthropometry

let objCcal = {};
// if (resultTotalKkal) {
//   let str = JSON.parse(localStorage.getItem('user'));

//   resultTotalKkal.textContent = `${(str.weight * str.height) / 2}`;
// }
if (inpMan !== null) {
  inputsAntrop.forEach(elem => {
    elem.addEventListener('click', function (e) {
      let strParam = e.target.getAttribute('name').split('-').slice(1).join('');

      document
        .querySelector(`.modal-data-${strParam}`)
        .parentNode.classList.toggle('show-modal');
    });
  });
  //===============another approach
  // inptPersonBirthday.addEventListener('click', function (e) {
  //   let tag = e.target.dataset.birthday;
  //   document
  //     .querySelector(`.${tag}`)
  //     .parentElement.classList.toggle('show-modal');
  // });
  // inpPersonHeight.addEventListener('click', function (e) {
  //   let tag = e.target.dataset.height;

  //   document
  //     .querySelector(`.${tag}`)
  //     .parentElement.classList.toggle('show-modal');
  // });
  // inpPersonWeight.addEventListener('click', function (e) {
  //   let tag = e.target.dataset.weight;
  //   document
  //     .querySelector(`.${tag}`)
  //     .parentElement.classList.toggle('show-modal');
  // });

  // =======handlers modal inpunt
  //close  modal
  btnChancelAll.forEach(element => {
    element.addEventListener('click', function (e) {
      e.target.closest('.overlay').classList.toggle('show-modal');
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
    inptPersonBirthday.classList.remove('error');
    objCcal.birthday = str;
    inptPersonBirthday.previousElementSibling.textContent = '';
    if (inptPersonBirthday.value != '') {
      e.target.parentElement.closest('.overlay').classList.toggle('show-modal');
    }
  });

  // set value height:
  buttonHight.addEventListener('click', function (e) {
    inpPersonHeight.value = '';
    inpPersonHeight.value = `${selectHeight.value} cm`;
    objCcal.height = +selectHeight.value;
    inpPersonHeight.classList.remove('error');
    inpPersonHeight.previousElementSibling.textContent = '';
    if (selectHeight.value != '') {
      e.target.parentElement.closest('.overlay').classList.toggle('show-modal');
    }
  });

  // set value weight
  buttonWeight.addEventListener('click', function (e) {
    inpPersonWeight.value = '';
    //inpPersonWeight.value = inputWeight.value;
    inpPersonWeight.value = `${selectWeight.value}.${selecWeightgr.value} kg`;
    objCcal.weight = +selectWeight.value;
    inpPersonWeight.classList.remove('error');
    inpPersonWeight.previousElementSibling.textContent = '';
    if (selectHeight.value != '') {
      e.target.parentElement.closest('.overlay').classList.toggle('show-modal');
    }
  });

  //  ========== render  select Height
  for (let i = 100; i < 220; i++) {
    let op = document.createElement('option');
    op.value = i;
    op.textContent = i;

    selectHeight.insertAdjacentElement('afterbegin', op);
  }
  for (let i = 40; i < 170; i++) {
    let op = document.createElement('option');
    op.value = i;
    op.textContent = i;
    selectWeight.insertAdjacentElement('afterbegin', op);
  }
  let j = 100;
  for (let i = 0; i < 9; i++) {
    let op = document.createElement('option');

    op.value = j;
    op.textContent = j;
    j += 100;
    selecWeightgr.insertAdjacentElement('afterbegin', op);
  }

  // validation   ===========checked box
  inpMan.addEventListener('click', function (e) {
    objCcal.male = true;
    objCcal.Female = false;
  });
  inpFemale.addEventListener('click', function (e) {
    objCcal.Female = true;
    objCcal.male = false;
  });

  // ======calculate  user kkcal day  // ang go next page

  buttonAntrop.addEventListener('click', function (e) {
    console.log(objCcal);
    if (!inpMan.checked && !inpFemale.checked) {
      e.preventDefault();
      inpMan.addEventListener('click', function (e) {
        objCcal.male = true;
        if (!inpFemale.checked) {
          objCcal.Female = false;
          inpFemale.nextElementSibling.classList.remove('error-icon');
        }
      });
      inpFemale.addEventListener('click', function (e) {
        objCcal.Female = true;
        if (!inpMan.checked) {
          objCcal.male = false;
          inpMan.nextElementSibling.classList.remove('error-icon');
        }
      });

      if (!inpMan.checked) {
        inpMan.nextElementSibling.classList.add('error-icon');
      }
      if (!inpFemale.checked) {
        inpFemale.nextElementSibling.classList.add('error-icon');
      }
    }
    inputsAntrop.forEach(elem => {
      if (elem.value == '') {
        e.preventDefault();
        elem.classList.add('error');
        elem.previousElementSibling.textContent = 'заполните данные';
      } else {
        elem.classList.remove('error');
        elem.previousElementSibling.textContent = '';
      }
    });

    localStorage.setItem('user', JSON.stringify(objCcal));
  });
}
//=============== amount kkal in circle

const circle = document.querySelector('.progress-ring-circle');
if (circle) {
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    let str = JSON.parse(localStorage.getItem('user'));
    resultTotalKkal.textContent = `${
      (((str.weight * str.height) / 10) * percent) / 10
    }`;
  }
  let i = 0;
  
  const interV = setInterval(function () {
    i += 10;
    if (i == 100) {
      clearInterval(interV);
    }

    setProgress(i);
  }, 100);
}

// var progress = 30;
// var progressEl = document.querySelector('.progress');
// var increaseProgress = function () {
//   progress = progress + 10;
//   progressEl.style.transform = 'rotate(' + progress + 'deg)';
// };
