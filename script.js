// Enregistrement du Service Worker pour la PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log(
          "Service Worker enregistré avec succès:",
          registration.scope,
        );
      })
      .catch((error) => {
        console.error("Échec du chargement du Service Worker:", error);
      });
  });
}
// VALIDATION DU FORMULAIRE D'INSCRIPTION
const form = document.getElementById('signup-form');

const errorMessages = {
  name: "Veuillez entrer votre nom complet.",
  email: "Veuillez entrer une adresse e-mail valide.",
  phone: "Veuillez entrer un numéro de téléphone valide (ex: 514-123-4567).",
  company: "Veuillez entrer le nom de votre entreprise.",
  role: "Veuillez sélectionner un poste.",
  password: "Le mot de passe doit contenir au moins 8 caractères.",
  'confirm-password': "Les mots de passe ne correspondent pas.",
  terms: "Vous devez accepter les conditions pour continuer."
};

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  input.classList.add('signup-form__input--invalid', 'border-red-500');
  error.textContent = message;
  error.classList.remove('hidden');
}

function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  input.classList.remove('signup-form__input--invalid', 'border-red-500');
  error.classList.add('hidden');
  error.textContent = '';
}

function validateForm() {
  let isValid = true;

  const name = document.getElementById('name').value.trim();
  if (name.length < 2) {
    showError('name', errorMessages.name);
    isValid = false;
  } else {
    clearError('name');
  }

  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('email', errorMessages.email);
    isValid = false;
  } else {
    clearError('email');
  }

  const phone = document.getElementById('phone').value.trim();
  const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    showError('phone', errorMessages.phone);
    isValid = false;
  } else {
    clearError('phone');
  }

  const company = document.getElementById('company').value.trim();
  if (company.length < 2) {
    showError('company', errorMessages.company);
    isValid = false;
  } else {
    clearError('company');
  }

  const role = document.getElementById('role').value;
  if (role === '') {
    showError('role', errorMessages.role);
    isValid = false;
  } else {
    clearError('role');
  }

  const password = document.getElementById('password').value;
  if (password.length < 8) {
    showError('password', errorMessages.password);
    isValid = false;
  } else {
    clearError('password');
  }

  const confirmPassword = document.getElementById('confirm-password').value;
  if (confirmPassword !== password || confirmPassword === '') {
    showError('confirm-password', errorMessages['confirm-password']);
    isValid = false;
  } else {
    clearError('confirm-password');
  }

  const terms = document.getElementById('terms').checked;
  if (!terms) {
    showError('terms', errorMessages.terms);
    isValid = false;
  } else {
    clearError('terms');
  }

  return isValid;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateForm()) {
    form.submit();
  }
});