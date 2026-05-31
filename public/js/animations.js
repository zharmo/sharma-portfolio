// Simple scroll animations
window.addEventListener('scroll', () => {
  document.querySelectorAll('.card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
    }
  });
});
// Initial call
window.dispatchEvent(new Event('scroll'));