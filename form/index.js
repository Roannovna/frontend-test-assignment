const form = document.querySelector(".form");
const nameInput = document.getElementById("input__name");
const checkbox = document.getElementById("input__checkbox");
const submitButton = document.querySelector(".form__button--submit");
const nameError = document.getElementById("name-error");
const checkboxError = document.getElementById("checkbox-error");
const emptyError = document.getElementById("empty-error");

function validateName(showMessage = true) {
  const value = (nameInput?.value || "").trim();
  const min = parseInt(nameInput?.getAttribute("minlength") || "0", 10);
  const pattern = nameInput?.getAttribute("pattern") || "";
  if (!value) {
    if (showMessage) nameError.textContent = "Введите имя";
    return false;
  }
  if (min && value.length < min) {
    if (showMessage) nameError.textContent = `Минимум ${min} символа`;
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
      if (showMessage) nameError.textContent = msg;
      return false;
    }
  }
  if (showMessage) nameError.textContent = "";
  return true;
}

function validateCheckbox(showMessage = true) {
  if (!checkbox?.checked) {
    if (showMessage) checkboxError.textContent = "Нужно согласие";
    return false;
  }
  if (showMessage) checkboxError.textContent = "";
  return true;
}

function updateSubmitState() {
  const ok = validateName(false) && validateCheckbox(false);
  submitButton.disabled = !ok;
  emptyError.textContent = "";
}

nameInput?.addEventListener("input", () => {
  validateName(true);
  updateSubmitState();
});

checkbox?.addEventListener("change", () => {
  validateCheckbox(true);
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
