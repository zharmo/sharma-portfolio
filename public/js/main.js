// Back to top button
window.addEventListener('scroll', function() {
  const btn = document.querySelector('.back-to-top');
  if (btn) {
    if (window.scrollY > 300) btn.style.display = 'block';
    else btn.style.display = 'none';
  }
});