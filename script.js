document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact');
  
  // Create toast message
  const toast = document.createElement('div');
  toast.classList.add('toast');
  document.body.appendChild(toast);


  // Form submission handling
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous error messages
    form.querySelectorAll('.error-message').forEach((el) => el.remove());

    // First Name validation
    const firstName = document.getElementById('first-name');
    if (!firstName.value.trim()) {
      isValid = false;
      showError(firstName, 'First name is required');
    }

    // Last Name validation
    const lastName = document.getElementById('last-name');
    if (!lastName.value.trim()) {
      isValid = false;
      showError(lastName, 'Last name is required');
    }

    // Email validation
    const email = document.getElementById('email');
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      isValid = false;
      showError(email, 'Invalid email format');
    }

    // Query Type validation
    const queryType = document.querySelector('input[name="query-type"]:checked');
    if (!queryType) {
      isValid = false;
      showError(
        document.querySelector('input[name="query-type"]'),
        'Please select a query type'
      );
    }

    // Message validation
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      isValid = false;
      showError(message, 'Message is required');
    }

    // Consent checkbox validation
    const consent = document.getElementById('consent');
    if (!consent.checked) {
      isValid = false;
      showError(consent, 'You must consent to being contacted');
    }

    if (isValid) {
      showToast('Form submitted successfully! 🎉');
      form.reset();

      // Focus on first element after reset
      firstName.focus();
    }
  });

  // Show error messages
  function showError(input, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    // Insert error message after input
    input.closest('.form-group')?.appendChild(errorMessage);

    // Screen reader announcement
    errorMessage.setAttribute('role', 'alert');
    errorMessage.setAttribute('aria-live', 'assertive');

    input.classList.add('input-error');
    input.focus();
  }

  // Show success toast
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    // Announce to screen readers
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
