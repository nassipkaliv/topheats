document.addEventListener('DOMContentLoaded', function() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
      const hiddenEvents = document.querySelectorAll('.hidden-event');
      hiddenEvents.forEach((event, index) => {
        setTimeout(() => {
          event.classList.remove('hidden-event');
          event.classList.add('show-event');
        }, index * 100);
      });
      setTimeout(() => {
        this.style.display = 'none';
      }, hiddenEvents.length * 100);
    });
  }
});
