document.addEventListener('touchmove', function (e) {
  e.preventDefault();
});
window.addEventListener('load', function () {
  window.scrollTo(0, 0);
  // == activ tab page add workout
  const blockIcon = document.querySelector('.list-choose-workout');
  const iconCheck = document.querySelectorAll('.icon-active');
  const dataEqualWorkuot = document.querySelectorAll(
    '.item-choose-workout span ',
  );

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

  const inptPersonBirthday = document.querySelector(
    '[ name="person-birthday"]',
  );
  const inpPersonHeight = document.querySelector('[name="person-height"]');
  const inpPersonWeight = document.querySelector('[name="person-weight"]');
  // ===============check box
  const inpMan = document.querySelector('#inp-man');
  const inpFemale = document.querySelector('#inp-female');
  const buttonAntrop = document.querySelector('.button-antrop a');
  //select-ul custom
  const selectHeight = document.querySelector('#input-data-height');
  const selectWeight = document.querySelector('#input-data-weight');
  const selecWeightgr = document.querySelector('#input-data-weight-gr');

  // page-app-programm  show total ccal in svg
  const spanShowTotalCcal = document.querySelector('.show-ccal-svg');
  const btnProfile = document.querySelector('.button-profile');
  //// page-app-notasion  sum total ccal in svg

  const spanShowSumTotalCcal = document.querySelector('.sum-ccal-svg');
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
      height: 150,
      weight: 70,
    },
  ];
  let objCcal = {};

  // show ccal in diagram page-app-porgramm

  if (spanShowTotalCcal) {
    // let str = JSON.parse(localStorage.getItem('user')) || [];
    let { male, Female, birthday, height, weight } = dataLocalStorage[0];

    spanShowTotalCcal.textContent = `${(height - 100) * weight}`;
  }

  //=====handle li and set value in the page predRegist-anthropometry
  if (inpMan !== null) {
    inputsParamAntrop.forEach(elem => {
      elem.addEventListener('click', function (e) {
        let strParam = e.target
          .getAttribute('name')
          .split('-')
          .slice(1)
          .join('');

        document
          .querySelector(`.modal-data-${strParam}`)
          .parentNode.classList.toggle('show-modal');
      });

      selectHeight.addEventListener('click', function (e) {
        inpPersonHeight.classList.remove('error');
        inpPersonHeight.nextElementSibling.textContent = '';
        objCcal.height = +e.target.textContent;
        inpPersonHeight.value = `${objCcal.height} cm`;
      });
      selectWeight.addEventListener('click', function (e) {
        inpPersonWeight.classList.remove('error');
        inpPersonWeight.nextElementSibling.textContent = '';
        objCcal.weight = +e.target.textContent;
        inpPersonWeight.value = `${objCcal.weight} кг`;
      });
      selecWeightgr.addEventListener('click', function (e) {
        // inpPersonWeight.value = e.target.textContent;
        // objCcal.weight += +e.target.textContent;
        // console.log(objCcal);
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
      console.log(inptPersonBirthday.nextElementSibling);
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
        e.target.parentElement
          .closest('.overlay')
          .classList.toggle('show-modal');
      }
    });

    // set value height:
    buttonHight.addEventListener('click', function (e) {
      if (inpPersonHeight.value != '') {
        e.target.parentElement
          .closest('.overlay')
          .classList.toggle('show-modal');
      }
    });

    // set value weight
    buttonWeight.addEventListener('click', function (e) {
      console.log(1);

      //inpPersonWeight.value = inputWeight.value;
      // inpPersonWeight.value = `${selectWeight.value}.${selecWeightgr.value} kg`;
      // objCcal.weight = +selectWeight.value;

      if (inpPersonWeight.value != '') {
        e.target.parentElement
          .closest('.overlay')
          .classList.toggle('show-modal');
      }
    });

    //  ========== render li in modal window
    // selectHeight.addEventListener('click', function (e) {
    //   console.log(e.target.textContent);
    // });

    for (let i = 150; i < 220; i++) {
      let li = `<li>${i}</li>`;

      selectHeight.insertAdjacentHTML('beforeend', li);
    }
    for (let i = 40; i < 170; i++) {
      let li = `<li>${i}</li>`;

      selectWeight.insertAdjacentHTML('afterbegin', li);
    }
    let j = 0;
    for (let i = 0; i < 9; i++) {
      j += 100;
      let li = `<li>${j}</li>`;

      selecWeightgr.insertAdjacentHTML('afterbegin', li);
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

    // ======calculate  user kkcal day set local storage  // ang go next page
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

  // show ccal in diagram page-app-porgramm
  if (spanShowSumTotalCcal) {
    // let { male, Female, birthday, height, weight } = dataLocalStorage[0];
    // let circle = document.querySelector('.unit-green');
    // let percent = `${(height - 100) * weight}` / 100;
    // let totalCcal = `${(height - 100) * weight}`;
    // for (let i = 0; i <= totalCcal; i++) {
    //   spanShowSumTotalCcal.textContent = totalCcal;
    //   if (Number.isInteger(i / percent)) {
    //     circle.style.strokeDasharray = `${i / percent} 100`;
    //   }
    // }
  }

  //circle.style.strokeDasharray = `100 100`;

  //     ${valEl}px 408px;
  // if (circle) {
  //   let i = 0;
  //   let int = setInterval(function () {
  //     i += 10;
  //     if (i == 100) {
  //       clearInterval(int);
  //     }

  //     let valEl = parseFloat(i);

  //     valEl = (valEl * 408) / 100;
  //     let { male, Female, birthday, height, weight } = dataLocalStorage[0];

  //     circle.innerHTML = `<svg width="160" height="160"><circle transform="rotate(-90)" r="65" cx="-80" cy="80" /><circle transform="rotate(-90)" style="stroke-dasharray:
  //     ${valEl}px 408px;" r="65" cx="-80" cy="80" />
  //     <text class="svg-text" text-anchor="middle" x="80" y="80" >${
  //       ((weight * height) / 1000) * i
  //     }</text>
  //                 <text text-anchor="middle" x="80" y="100">kkal</text>
  //     </svg>
  //    `;
  //   }, 100);
  // }

  if (inptsValueSetting.length) {
    let str = JSON.parse(localStorage.getItem('user')) || [];
    console.log(inptsValueSetting);

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

  // ======== dropdown for select
  const selectSingle = document.querySelector('.__select');

  if (selectSingle) {
    const selectSingle_title = selectSingle.querySelector('.__select__title');
    const selectSingle_labels = selectSingle.querySelectorAll(
      '.__select__label',
    );
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

  // check icon in page workout
  blockIcon.addEventListener('click', function (e) {
    for (const elem of iconCheck) {
      elem.classList.remove('active-blue');
    }
    if (e.target.tagName == 'I') {
   
      e.target.closest('div').classList.add('active-blue');
    }
  });

  // let blcInput = document.querySelector('.block-input-ul');
  // let ulBlock = document.querySelector('.ul-bolck-select');
  // blcInput.addEventListener('click', function (e) {
  //   ulBlock.classList.toggle('show-modal-ul');
  // });
  const slider = document.querySelector('.swiper-container');
  if (slider) {
    var mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        prevEl: '.arrow-right',
        nextEl: '.arrow-left',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      loop: true,

      breakpoints: {
        540: {
          slidesPerView: 1,
        },
      },
    });
  }
});
