const hours = document.querySelector(".hours");
const days = document.querySelector(".days");
const reguestForm = document.querySelector(".reguest-form");
const moreInfo = document.querySelector(".more-info");
const submitBtn = document.querySelector(".submit");
const commentsContainer = document.querySelector(".comments-container");
const heartBtn = document.querySelector(".heart-icon");

const name = reguestForm.querySelector('[name="name"]');
const surname = reguestForm.querySelector('[name="surname"]');
const phone = reguestForm.querySelector('[name="phone"]');
const category = reguestForm.querySelector("[name='category']");
const education = reguestForm.querySelector("[name='education']");
const nameError = reguestForm.querySelector(".name");
const surnameError = reguestForm.querySelector(".surname");
const phoneError = reguestForm.querySelector(".phone");
const educationError = reguestForm.querySelector(".education");
const successMessage = reguestForm.querySelector(".success-message");
const reguiredInputs = reguestForm.querySelectorAll(".reguired-input");
const phoneRegEx =
  /^\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

const educationTypesByCategory = {
  children: [
    "Scratch alqoritmik kodlaşdırma dili",
    "Web Proqramlaşdırma (Front end)",
    "Java Proqramlaşdırma dili",
  ],
  adult: [
    "PLC Avtomatika",
    "Nəzarət Ölçü Cihazları",
    "Elektrik Mühəndisliyi",
    "Web Proqramlaşdırma (Front end)",
    "Java Proqramlaşdırma dili",
    "SQL sorğu dili",
    "Python Proqramlaşdırma dili",
    "Autocad, Archicad, 3D Max təlimi",
    "Sosial Media Marketinq təlimi",
    "Qrafik Dizayn",
    "9-10-11-ci sinif abituriyentlər üçün İnformatika təlimi",
  ],
};

let nameBool = false;
let surnameBool = false;
let phoneBool = false;
let educationBool = false;
let slideNumber = 0;
let direction = 1;
let graphic = {};

document.addEventListener("DOMContentLoaded", () => {
  generate();
  commentsSlider();
});

//Saatlar, gunler ve telim novu elave edir
function generate() {
  addEducationTypesSelect();
  addHoursToGraphicTab();
  addDaysToGraphicTab();
  checkLimitDays();
}

document.querySelector(".hide-btn").addEventListener("click", () => {
  document.querySelector(".hide-btn").classList.toggle("active");
});


const acc = document.querySelectorAll(".accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

heartBtn.addEventListener("click", () => {
  heartBtn.classList.toggle("active");
  if (heartBtn.classList.contains("active")) {
    heartBtn.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
  } else {
    heartBtn.innerHTML = `<i class="fa fa-info" aria-hidden="true"></i>`;
  }
});

//More-info bloku gosterir
window.addEventListener("click", (e) => {
  if (
    !e.target.closest(".about-btn") &&
    !e.target.closest(".questions-btn") &&
    !e.target.closest(".comments-btn") &&
    !e.target.closest(".about-developia")
  ) {
    moreInfo.classList.remove("active");
  } else if (!e.target.closest(".about-developia")) {
    moreInfo.classList.toggle("active");
    showContentForSidebar(e);
  }
});

function showContentForSidebar(e) {
  const contents = document.querySelectorAll(".content");
  for (let i = 0; contents.length > i; i++) {
    contents[i].classList.remove("show-content");
  }

  if (e.target.closest(".about-btn")) {
    moreInfo
      .querySelector(".about-developia-info")
      .classList.add("show-content");
  } else if (e.target.closest(".questions-btn")) {
    moreInfo.querySelector(".questions").classList.add("show-content");
  } else if (e.target.closest(".comments-btn")) {
    moreInfo.querySelector(".comments").classList.add("show-content");
  }
}

category.addEventListener("change", (e) => {
  generateEducationOptions();
});

function addDaysToGraphicTab() {
  let day = "";
  for (let i = 0; i < 7; i++) {
    day += `
          <label class="day">
            <input type="checkbox" name="${i}" value="${
      i + 1
    }" class="for-check-day"/>
            <div>${i + 1}</div>
          </label>
        `;
  }
  days.innerHTML = day;
}

function addHoursToGraphicTab() {
  let hour = "";
  let hoursLine = "";
  for (let i = 0; i < 7; i++) {
    hoursLine = "";
    for (let j = 0; j < 11; j++) {
      hoursLine += `
        <label>
          <input type="checkbox" name="${i}" value="${
        9 + j
      }" disabled="true" class="for-check"/>
          <div>${9 + j}</div>
        </label>
      `;
    }
    hour += `
      <div class="hour">
        ${hoursLine}
      </div>
    `;
  }
  hours.innerHTML = hour;
}

function addEducationTypesSelect() {
  let categoryOptions = "";
  //Telim tipini secmek ucun selectler elave edilir
  categoryOptions += `<option selected disabled value="defaultValue">Kateqoriya</option>`;
  for (let category in educationTypesByCategory) {
    categoryOptions += `
      <option value=${category}>
        ${category == "children" ? "Uşaqlar" : "Böyüklər"}
      </option>
    `;
  }
  category.innerHTML = categoryOptions;
}

function generateEducationOptions() {
  education.disabled = false;
  let selectedCategory = category.value;
  let educationOptions = "";
  //Telim tipini secmek ucun selectler elave edilir
  educationOptions += `<option selected disabled value="defaultValue">Təlimi seçin</option>`;
  for (let educationType of educationTypesByCategory[selectedCategory]) {
    educationOptions += `
      <option value=${educationType.replaceAll(/\s/g, "-")}>
        ${educationType}
      </option>
    `;
  }
  education.innerHTML = educationOptions;
}

// function commentsSlider() {
//   if (commentsContainer.scrollTop == commentsContainer.getBoundingClientRect().height * 12) {
//     direction = -1;
//   } else if (commentsContainer.scrollTop == 0) {
//     direction = 1;
//   }
//   setTimeout(() => {
//     console.log('Heloo')
//     commentsContainer.scrollBy(
//       0, direction * commentsContainer.getBoundingClientRect().height
//     );
//     slideNumber = slideNumber + direction;
//     commentsSlider();
//   }, 5000);
// }

function checkLimitDays() {
  const daysBtn = document.querySelectorAll(".for-check-day");
  for (let i = 0; i < daysBtn.length; i++) {
    daysBtn[i].addEventListener("click", (e) => {
      const checkedCount = document.querySelectorAll(
        ".for-check-day:checked"
      ).length;
      const hours = document.querySelectorAll(".for-check[name='" + i + "']");
      if (e.target.checked) {
        for (let btn of hours) {
          btn.disabled = false;
        }
      } else {
        for (let btn of hours) {
          btn.disabled = true;
          btn.checked = false;
        }
      }
    });
  }
}

// Inputlarin validasiyasi
phone.addEventListener("input", () => {
  checkPhone();
});

name.addEventListener("input", () => {
  checkName();
});

surname.addEventListener("input", () => {
  checkSurname();
});

education.addEventListener("change", () => {
  checkEducation();
});

function checkPhone() {
  if (phoneRegEx.test(phone.value) == false) {
    phoneError.textContent = "Yanlış telefon nömrəsi. Format: 055 555 55 55";
    phoneError.classList.add("visible");
    phoneBool = false;
  } else {
    phoneBool = true;
    phoneError.classList.remove("visible");
  }
}

function checkName() {
  if (name.value.length == 0) {
    nameError.textContent = "Ad daxil edin";
    nameError.classList.add("visible");
    nameBool = false;
  } else {
    nameBool = true;
    nameError.classList.remove("visible");
  }
}

function checkSurname() {
  if (surname.value.length == 0) {
    surnameError.textContent = "Soyad daxil edin";
    surnameError.classList.add("visible");
    surnameBool = false;
  } else {
    surnameBool = true;
    surnameError.classList.remove("visible");
  }
}

function checkEducation() {
  if (category.value == "defaultValue" || education.value == "defaultValue") {
    educationError.textContent = "Təlim növü seçilməyib";
    educationError.classList.add("visible");
    educationBool = false;
  } else {
    educationBool = true;
    educationError.classList.remove("visible");
  }
}

reguestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const hoursBtn = document.querySelectorAll(".for-check");
  const daysBtn = document.querySelectorAll(".for-check-day");
  if (nameBool && surnameBool && phoneBool && educationBool) {
    for (let i = 0; i < daysBtn.length; i++) {
      if (daysBtn[i].checked) {
        graphic[i + 1] = [];
      }
    }
    for (let i = 0; i < hoursBtn.length; i++) {
      if (hoursBtn[i].checked) {
        graphic[+hoursBtn[i].name + 1].push(hoursBtn[i].value);
      }
    }
    let userInfo = {
      name: name.value,
      surname: surname.value,
      phone: phone.value,
      educationType: education.value,
      email: reguestForm.querySelector('[name="email"]').value,
      extra: reguestForm.querySelector('[name="extra"]').value,
      graphic: graphic,
    };

    // ---------Send-------------
    successMessage.classList.add("success");
    setTimeout(() => {
      successMessage.classList.remove("success");
    }, 3000);
    console.log(userInfo);
    // --------------------------

    graphic = {};
    for (let btn of daysBtn) {
      btn.disabled = false;
      btn.checked = false;
    }
    for (let btn of hoursBtn) {
      btn.disabled = true;
      btn.checked = false;
    }
  } else {
    checkPhone();
    checkName();
    checkSurname();
    checkEducation();
  }
});
