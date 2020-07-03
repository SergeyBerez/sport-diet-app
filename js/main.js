//== block fixed time
const time = document.querySelector('.header-time');
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
const inputsParamAntrop = document.querySelectorAll('.input-param');

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

// page-app-programm  sum total ccal in svg
const resultTotalKkal = document.querySelector('.insert-ccal-circle');
const btnProfile = document.querySelector('.button-profile');

// ==== for modal user page-app-profile
const settingUser = document.querySelector('.fa-cog');
const setKkal = document.querySelector('.change-kkal-link');
//=====  page total-profile-settings=>> page profile-settings

const inptsValueSetting = document.querySelectorAll('.value-setting');
const selectContry = document.querySelector('#select-country');

// setInterval(function () {
//   time.textContent = new Date().toLocaleTimeString();
// }, 1000);

//  handlers inpunts from page anthropometry
let dataLocalStorage = JSON.parse(localStorage.getItem('user')) || [
  {
    id: 0,
    male: false,
    Female: true,
    birthday: '11:11:2000',
    height: 100,
    weight: 40,
  },
];
let objCcal = {};

// show ccal in diagram page-app-porgramm
if (resultTotalKkal) {
  let str = JSON.parse(localStorage.getItem('user')) || [];

  resultTotalKkal.textContent = `${(str[0].weight * str[0].height) / 2}`;
}

// show and hide modal in page predRegist-anthropometry
if (inpMan !== null) {
  inputsParamAntrop.forEach(elem => {
    elem.addEventListener('click', function (e) {
      console.log(this);
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
    let id = new Date().getTime();
    objCcal.id = id;
    objCcal.birthday = str;
    inptPersonBirthday.nextElementSibling.textContent = '';
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
    inpPersonHeight.nextElementSibling.textContent = '';
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
    inpPersonWeight.nextElementSibling.textContent = '';
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
  if (buttonAntrop) {
    buttonAntrop.addEventListener('click', function (e) {
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
      inputsParamAntrop.forEach(elem => {
        if (elem.value == '') {
          e.preventDefault();

          elem.classList.add('error');
          elem.nextElementSibling.textContent = 'заполните данные';
        } else {
          elem.classList.remove('error');
          elem.nextElementSibling.textContent = '';
        }
      });

      dataLocalStorage.push(objCcal);
      localStorage.setItem('user', JSON.stringify(dataLocalStorage));
    });
  }

  // ==========show ang hide modal window setkkal in page profile
}
if (setKkal) {
  setKkal.addEventListener('click', function (e) {
    document.querySelector('.overlay').classList.toggle('show-modal');
  });

  btnProfile.addEventListener('click', function (e) {
    document.querySelector('.overlay').classList.toggle('show-modal');
  });
}

//=============== drow circle and amount kkal in circle
let circle = document.querySelector('.circle');

if (circle) {
  let i = 0;
  let int = setInterval(function () {
    i += 10;
    if (i == 100) {
      clearInterval(int);
    }

    let valEl = parseFloat(i);

    valEl = (valEl * 408) / 100;
    let { male, Female, birthday, height, weight } = dataLocalStorage[0];

    circle.innerHTML = `<svg width="160" height="160"><circle transform="rotate(-90)" r="65" cx="-80" cy="80" /><circle transform="rotate(-90)" style="stroke-dasharray: 
    ${valEl}px 408px;" r="65" cx="-80" cy="80" />
    <text class="svg-text" text-anchor="middle" x="80" y="80" >${
      ((weight * height) / 1000) * i
    }</text>
                <text text-anchor="middle" x="80" y="100">kkal</text>
    </svg>
   `;
  }, 100);
}
console.log();

if (inptsValueSetting.length) {
  // let str = JSON.parse(localStorage.getItem('user')) || [];
  // console.log(inptsValueSetting);

  let { male, Female, birthday, height, weight } = dataLocalStorage[0];

  inpMan.checked = male;
  inpFemale.checked = Female;
  inptsValueSetting[0].value = birthday;
  inptsValueSetting[1].value = height;
  inptsValueSetting[2].value = weight;

  inptsValueSetting.forEach(el => {
    console.log(el);
  });
}

//
// var dataset = [
//   {
//     value: 5,
//     color: '#dc3912',
//   },
//   {
//     value: 40,
//     color: '#ff9900',
//   },
//   {
//     value: 30,
//     color: '#109618',
//   },
//   {
//     value: 25,
//     color: '#990099',
//   },
// ];

// var maxValue = 25;
// var container = document.querySelector('.container-svg');

// var addSector = function (data, startAngle, collapse) {
//   var sectorDeg = 3.6 * data.value;
//   var skewDeg = 90 + sectorDeg;
//   var rotateDeg = startAngle;
//   if (collapse) {
//     skewDeg++;
//   }
//   let sector = document.querySelector('.sector');

//   sector.style.background = data.color;
//   sector.style.transform ='rotate(' + rotateDeg + 'deg) skewY(' + skewDeg + 'deg)';
//   var sector = $('<div>', {
//     class: 'sector',
//   }).css({
//     background: data.color,
//     transform:
//   });
//   container.append(sector);

//   return startAngle + sectorDeg;
// };

// dataset.reduce(function (prev, curr) {
//   return (function addPart(data, angle) {
//     if (data.value <= maxValue) {
//       return addSector(data, angle, false);
//     }

//     return addPart(
//       {
//         value: data.value - maxValue,
//         color: data.color,
//       },
//       addSector(
//         {
//           value: maxValue,
//           color: data.color,
//         },
//         angle,
//         true,
//       ),
//     );
//   })(curr, prev);
// }, 0);

const selectSingle = document.querySelector('.__select');

if (selectSingle) {
  const selectSingle_title = selectSingle.querySelector('.__select__title');
  const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
  // Toggle menu
  selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
      selectSingle.setAttribute('data-state', '');
    } else {
      selectSingle.setAttribute('data-state', 'active');
    }
  });

  // Close when click to option
  for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', evt => {
      selectSingle_title.textContent = evt.target.textContent;
      selectSingle.setAttribute('data-state', '');
    });
  }
}

// window.addEventListener('load', function (e) {
//   const block = document.querySelector('.block');
//   block.classList.add('block');
//   console.log(111);
// });

let blcInput = document.querySelector('.block-input-ul');
let ulBlock = document.querySelector('.ul-bolck-select');
blcInput.addEventListener('click', function (e) {
  ulBlock.classList.toggle('show-modal-ul');
});
