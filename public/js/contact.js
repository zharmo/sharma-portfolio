// Client-side validation for contact form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[action="/contact/send"]');
  if (form) {
    form.addEventListener('submit', (e) => {
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const message = form.querySelector('textarea[name="message"]').value.trim();
      if (!name || !email || !message) {
        alert('All fields are required');
        e.preventDefault();
      } else if (!email.includes('@')) {
        alert('Enter a valid email');
        e.preventDefault();
      }
    });
  }
});