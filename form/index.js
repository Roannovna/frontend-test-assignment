const form = document.querySelector(".form");
const nameInput = document.getElementById("input__name");
const checkbox = document.getElementById("input__checkbox");
const submitButton = document.querySelector(".form__button--submit");
const nameError = document.getElementById("name-error");
const checkboxError = document.getElementById("checkbox-error");
const emptyError = document.getElementById("empty-error");

function validateName() {
  const value = (nameInput?.value || "").trim();
  const min = parseInt(nameInput?.getAttribute("minlength") || "0", 10);
  const pattern = nameInput?.getAttribute("pattern") || "";
  if (!value) {
    nameError.textContent = "Введите имя";
    return false;
  }
  if (min && value.length < min) {
    nameError.textContent = `Минимум ${min} символа`;
    return false;
  }
  if (pattern) {
    let re;
    try {
      re = new RegExp(pattern);
    } catch (e) {
      re = null;
    }
    if (re && !re.test(value)) {
      const msg = nameInput?.dataset?.errorMessage || "Недопустимые символы";
      nameError.textContent = msg;
      return false;
    }
  }
  nameError.textContent = "";
  return true;
}

function validateCheckbox() {
  if (!checkbox?.checked) {
    checkboxError.textContent = "Нужно согласие";
    return false;
  }
  checkboxError.textContent = "";
  return true;
}

function updateSubmitState() {
  const ok = validateName() && validateCheckbox();
  submitButton.disabled = !ok;
  emptyError.textContent = "";
}

nameInput?.addEventListener("input", () => {
  validateName();
  updateSubmitState();
});

checkbox?.addEventListener("change", () => {
  validateCheckbox();
  updateSubmitState();
});

form?.addEventListener("submit", (e) => {
  const valid = validateName() && validateCheckbox();
  if (!valid) {
    e.preventDefault();
    emptyError.textContent = "Заполните обязательные поля";
    submitButton.disabled = true;
  } else {
    emptyError.textContent = "";
  }
});

updateSubmitState();
