// ==========================================
// ENREGISTREMENT DU SERVICE WORKER (PWA)
// ==========================================
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

// ==========================================
// VALIDATION DU FORMULAIRE D'INSCRIPTION
// ==========================================
const signupForm = document.getElementById('signup-form');

if (signupForm) {
  const signupErrorMessages = {
    name: "Veuillez entrer votre nom complet.",
    email: "Veuillez entrer une adresse e-mail valide.",
    phone: "Veuillez entrer un numéro de téléphone valide (ex: 514-123-4567).",
    company: "Veuillez entrer le nom de votre entreprise.",
    role: "Veuillez sélectionner un poste.",
    password: "Le mot de passe doit contenir au moins 8 caractères.",
    'confirm-password': "Les mots de passe ne correspondent pas.",
    terms: "Vous devez accepter les conditions pour continuer."
  };

  function showSignupError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    input.classList.add('signup-form__input--invalid', 'border-red-500');
    error.textContent = message;
    error.classList.remove('hidden');
  }

  function clearSignupError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    input.classList.remove('signup-form__input--invalid', 'border-red-500');
    error.classList.add('hidden');
    error.textContent = '';
  }

  function validateSignupForm() {
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    if (name.length < 2) {
      showSignupError('name', signupErrorMessages.name);
      isValid = false;
    } else {
      clearSignupError('name');
    }

    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showSignupError('email', signupErrorMessages.email);
      isValid = false;
    } else {
      clearSignupError('email');
    }

    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      showSignupError('phone', signupErrorMessages.phone);
      isValid = false;
    } else {
      clearSignupError('phone');
    }

    const company = document.getElementById('company').value.trim();
    if (company.length < 2) {
      showSignupError('company', signupErrorMessages.company);
      isValid = false;
    } else {
      clearSignupError('company');
    }

    const role = document.getElementById('role').value;
    if (role === '') {
      showSignupError('role', signupErrorMessages.role);
      isValid = false;
    } else {
      clearSignupError('role');
    }

    const password = document.getElementById('password').value;
    if (password.length < 8) {
      showSignupError('password', signupErrorMessages.password);
      isValid = false;
    } else {
      clearSignupError('password');
    }

    const confirmPassword = document.getElementById('confirm-password').value;
    if (confirmPassword !== password || confirmPassword === '') {
      showSignupError('confirm-password', signupErrorMessages['confirm-password']);
      isValid = false;
    } else {
      clearSignupError('confirm-password');
    }

    const terms = document.getElementById('terms').checked;
    if (!terms) {
      showSignupError('terms', signupErrorMessages.terms);
      isValid = false;
    } else {
      clearSignupError('terms');
    }

    return isValid;
  }

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateSignupForm()) {
      signupForm.submit();
    }
  });
}

// ==========================================
// VALIDATION DU FORMULAIRE DE CONNEXION
// ==========================================
const loginForm = document.getElementById('login-form');

if (loginForm) {
  const loginErrorMessages = {
    username: "Veuillez entrer votre nom d'utilisateur ou e-mail.",
    password: "Veuillez entrer votre mot de passe."
  };

  function showLoginError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    input.classList.add('login-form__input--invalid', 'border-red-500');
    error.textContent = message;
    error.classList.remove('hidden');
  }

  function clearLoginError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    input.classList.remove('login-form__input--invalid', 'border-red-500');
    error.classList.add('hidden');
    error.textContent = '';
  }

  function validateLoginForm() {
    let isValid = true;

    const username = document.getElementById('username').value.trim();
    if (username.length < 2) {
      showLoginError('username', loginErrorMessages.username);
      isValid = false;
    } else {
      clearLoginError('username');
    }

    const password = document.getElementById('password').value;
    if (password.length < 1) {
      showLoginError('password', loginErrorMessages.password);
      isValid = false;
    } else {
      clearLoginError('password');
    }

    return isValid;
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateLoginForm()) {
      loginForm.submit();
    }
  });
}