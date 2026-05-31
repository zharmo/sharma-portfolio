// Confirm delete actions
document.querySelectorAll('.btn-danger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (!confirm('Are you sure?')) e.preventDefault();
  });
});