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

  const athleteToggles = document.querySelectorAll('.athlete-toggle');
  athleteToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      this.classList.toggle('toggled');
    });
  });
});
