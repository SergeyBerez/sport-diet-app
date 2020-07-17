'use strict';
// document.addEventListener('touchmove', function (e) {
//   e.preventDefault();
// });
window.addEventListener('load', function () {
  // window.scrollTo(0, 0);
  // == form create user param
  const formParam = document.querySelector('.form-param-anthropometry');
  const link = document.querySelector('[href="./predRegist-totalKkal.html"]');

  // ==auth form
  const formAuth = document.querySelector('.form-regist');
  const btnLogin = document.querySelector('.button-login');
  const name = document.querySelector('[name="name"]');
  const email = document.querySelector('[name="email"]');
  const password = document.querySelector('[name="password"]');

  // == activ tab page add workout
  const blockIcon = document.querySelector('.list-choose-workout');
  const iconCheck = document.querySelectorAll('.icon-active');
  const dataEqualWorkuot = document.querySelectorAll(
    '.item-choose-workout span ',
  );

  //== block fixed time
  // const time = document.querySelector('.header-time');
  //======= for  modal  element
  const btnChancelAll = document.querySelectorAll('.button-chancel');
  const btnBirthd = document.querySelector('.button-birthday');
  const buttonHight = document.querySelector('.button-height');
  const buttonWeight = document.querySelector('.button-weight');

  // inputs modal andselect-ul custom
  const selectHeight = document.querySelector('#input-data-height');
  const selectWeight = document.querySelector('#input-data-weight');
  const selecWeightgr = document.querySelector('#input-data-weight-gr');
  const metricsFut = document.querySelector('.metrics-fut');
  const metricsCm = document.querySelector('.metrics-sm');
  const inputBirthd = document.querySelector('.input-data-birthday');
  const inputHeight = document.querySelector('.input-data-height');
  const inputWeight = document.querySelector('.input-data-weight');

  // ===== 3 inpunts from page anthropometry-predRegist
  // const formParam = document.querySelector('.form-param');
  const inputsParamAntrop = document.querySelectorAll('.input-param');

  const inptPersonBirthday = document.querySelector('[name="person-birthday"]');
  const inpPersonHeight = document.querySelector('[name="person-height"]');
  const inpPersonWeight = document.querySelector('[name="person-weight"]');
  // ===============check box
  const inpMan = document.querySelector('#inp-man');
  const inpFemale = document.querySelector('#inp-female');
  const buttonAntrop = document.querySelector('.button-antrop');

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

  //  =====handlers inpunts from page anthropometry
  let objCcal = getLocalStorage();

  console.log(objCcal);
  function renderUserData() {
    if (
      (Object.keys(objCcal).length != 0 && buttonAntrop) ||
      (Object.keys(objCcal).length != 0 && inptsValueSetting)
    ) {
      inpMan.checked = objCcal.male;
      inpFemale.checked = objCcal.Female;
      inptPersonBirthday.value = objCcal.birthday;
      inpPersonHeight.value = objCcal.height;
      inpPersonWeight.value = objCcal.weight;
    }

    // inpMan.checked = objCcal.male;
    // inpFemale.checked = objCcal.Female;
    // inptsValueSetting[0].value = objCcal.birthday;
    // inptsValueSetting[1].value = objCcal.height;
    // inptsValueSetting[2].value = objCcal.weight;
  }
  if (inpMan) {
    renderUserData();
  }

  // let male = objCcal.male || false;
  // let Female = objCcal.Female || false;
  // let birthday = objCcal.birthday || '';
  // let height = objCcal.height || '';
  // let weight = objCcal.weight || '';

  let { male, Female, birthday, height, weight } = objCcal;

  // show ccal in diagram page-app-porgramm

  if (spanShowTotalCcal) {
    // let str = JSON.parse(localStorage.getItem('user')) || [];
    // let { male, Female, birthday, height, weight } = objCcal[0];

    spanShowTotalCcal.textContent = `${weight * 30}`;
  }

  //=====handle li and set value in the page predRegist-anthropometry
  if (inpMan !== null) {
    //  ------open and hide modal overlay when click on input
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
    });

    // click select on height in modal
    selectHeight.addEventListener('click', function (e) {
      inpPersonHeight.classList.remove('error');
      inpPersonHeight.nextElementSibling.textContent = '';
      objCcal.height = +e.target.textContent;

      for (const elem of selectHeight.querySelectorAll('li')) {
        elem.style.background = '';
      }

      e.target.style.background = 'green';
      inpPersonHeight.value = `${objCcal.height} ${metricsCm.textContent}`;
    });

    //=== handler events click select on Weight in modal
    selectWeight.addEventListener('click', function (e) {
      inpPersonWeight.classList.remove('error');
      inpPersonWeight.nextElementSibling.textContent = '';
      objCcal.weight = +e.target.textContent;

      for (const elem of selectWeight.querySelectorAll('li')) {
        elem.style.background = '';
      }
      e.target.style.background = 'green';
      inpPersonWeight.value = `${objCcal.weight} кг`;
    });

    selecWeightgr.addEventListener('click', function (e) {
      console.log(11);
      for (const elem of selecWeightgr.querySelectorAll('li')) {
        elem.style.background = '';
      }
      e.target.style.background = 'green';
      // inpPersonWeight.value = e.target.textContent;
      // objCcal.weight += +e.target.textContent;
      // console.log(objCcal);
    });

    metricsFut.addEventListener('click', function (e) {
      if (metricsCm.textContent == 'СМ') {
        metricsCm.textContent = 'Fut';
        renderFut();
      } else {
        metricsCm.textContent = 'СМ';
        renderCm();
      }
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
    //---------close  modal
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
      let date = new Date().getTime();
      objCcal.date = date;
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
    function renderCm() {
      selectHeight.textContent = '';
      metricsFut.textContent = 'Fut';
      for (let i = 150; i < 220; i++) {
        let li = `<li>${i}</li>`;

        selectHeight.insertAdjacentHTML('beforeend', li);
      }
    }
    renderCm();

    function renderFut() {
      let h = 3.9;
      metricsFut.textContent = 'Cм';
      selectHeight.textContent = '';
      for (let i = 0; i < 36; i++) {
        h += 0.1;

        let li = `<li>${h.toFixed(1)}</li>`;

        selectHeight.insertAdjacentHTML('beforeend', li);
      }
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

    // validation   ===========checked box add obj male femail
    inpMan.addEventListener('click', function (e) {
      male = true;
      Female = false;
      objCcal.male = true;
      objCcal.Female = false;
      inpFemale.nextElementSibling.classList.remove('error-icon');
      // if (!inpFemale.checked) {
      //   objCcal.Female = false;
      //   inpFemale.nextElementSibling.classList.remove('error-icon');
      // }
    });
    inpFemale.addEventListener('click', function (e) {
      Female = true;
      male = false;
      objCcal.male = false;
      inpMan.nextElementSibling.classList.remove('error-icon');

      objCcal.Female = true;
      // if (!inpMan.checked) {
      //   objCcal.male = false;
      //   inpMan.nextElementSibling.classList.remove('error-icon');
      // }
    });

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
    // let { male, Female, birthday, height, weight } = objCcal[0];
    let circle = document.querySelector('.unit-green');
    let percent = `${weight * 30}` / 100;
    let totalCcal = `${weight * 30}`;
    spanShowSumTotalCcal.textContent = 0;
    for (let i = 0; i <= totalCcal; i++) {
      spanShowSumTotalCcal.textContent = i;
      if (Number.isInteger(i / percent)) {
        circle.style.strokeDasharray = `${i / percent} 100`;
      }
    }
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
  //     let { male, Female, birthday, height, weight } = objCcal[0];

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
  if (blockIcon) {
    blockIcon.addEventListener('click', function (e) {
      for (const elem of iconCheck) {
        elem.classList.remove('active-blue');
      }
      if (e.target.tagName == 'I' || e.target.tagName == 'DIV') {
        e.target.closest('div').classList.add('active-blue');
      }
    });
  }

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

  //const url = 'https://sport-app-3af9a.firebaseio.com/';

  function createUserParam(user) {
    // user.id = null;
    return fetch('https://sport-app-3af9a.firebaseio.com/userparams.json', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        user.id = response.name;
        return user;
      })
      .then(user => {
        addLocalStorage(user);
        window.location.href = link;
      });
  }
  function addLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  function getLocalStorage(user) {
    return JSON.parse(localStorage.getItem('user')) || {};
  }

  function AuthWithEmailPassword(email, password) {
    const API_KEY = "AIzaSyAFZnyGJA5RGOPCD1o11PBPYOdyqXln5ns";
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
  }

  if (formAuth) {
    formAuth.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log(email.value, password.value);
      AuthWithEmailPassword(email.value, password.value);
    });
  }

  // ======calculate  user kkcal form ang execute   createUserParam(objCcal) go next page
  if (formParam) {
    formParam.addEventListener('submit', function (e) {
      e.preventDefault();
      inpMan.checked = male;
      inpFemale.checked = Female;

      if (!inpMan.checked && !inpFemale.checked) {
        inpMan.nextElementSibling.classList.add('error-icon');
        inpFemale.nextElementSibling.classList.add('error-icon');
      }
      let err = 0;
      inputsParamAntrop.forEach(elem => {
        if (elem.value == '') {
          elem.classList.add('error');
          elem.nextElementSibling.textContent = 'заполните данные';
        } else {
          elem.classList.remove('error');
          elem.nextElementSibling.textContent = '';
          err += 1;
        }
      });
      if (err == 3) {
        buttonAntrop.disabled = true;
        createUserParam(objCcal);
      }
    });
  }

  var firebaseConfig = {
    apiKey: 'AIzaSyAFZnyGJA5RGOPCD1o11PBPYOdyqXln5ns',
    authDomain: 'sport-app-3af9a.firebaseapp.com',
    databaseURL: 'https://sport-app-3af9a.firebaseio.com',
    projectId: 'sport-app-3af9a',
    storageBucket: 'sport-app-3af9a.appspot.com',
    messagingSenderId: '952427490535',
    appId: '1:952427490535:web:17b8f5c820039530b4c642',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


   
  

  
});
