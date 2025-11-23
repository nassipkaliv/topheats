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

  const athletes = [
    { name: 'Екимовский Ярослав Викторович', disabled: true, subtitle: '(уже в раунде)' },
    { name: 'Зинчук Денис Сергеевич', disabled: true, subtitle: '(уже в раунде)' },
    { name: 'Ковалевский Владимир Олегович', disabled: false },
    { name: 'Копров Павел Александрович', disabled: false },
    { name: 'Кравченко Алексей Александрович', disabled: false },
    { name: 'Кушниренко Владимир Владимирович', disabled: false },
    { name: 'Чупраков Михаил Владимирович', disabled: false }
  ];

  const roundBlockInputs = document.querySelectorAll('.round-block-input');

  roundBlockInputs.forEach(input => {
    const parent = input.parentElement;

    const autocomplete = document.createElement('div');
    autocomplete.className = 'athlete-autocomplete';
    parent.appendChild(autocomplete);

    input.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();

      if (query.length === 0) {
        autocomplete.classList.remove('active');
        return;
      }
      const filtered = athletes.filter(athlete =>
        athlete.name.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        autocomplete.classList.remove('active');
        return;
      }
      autocomplete.innerHTML = filtered.map(athlete => {
        const itemClass = athlete.disabled ? 'athlete-autocomplete-item disabled' : 'athlete-autocomplete-item';
        const subtitle = athlete.subtitle ? `<div class="athlete-autocomplete-subtitle">${athlete.subtitle}</div>` : '';

        return `
          <div class="${itemClass}" data-name="${athlete.name}">
            ${athlete.name}
            ${subtitle}
          </div>
        `;
      }).join('');

      autocomplete.classList.add('active');
      const items = autocomplete.querySelectorAll('.athlete-autocomplete-item:not(.disabled)');
      items.forEach(item => {
        item.addEventListener('click', function() {
          input.value = this.dataset.name;
          autocomplete.classList.remove('active');
        });
      });
    });
    document.addEventListener('click', function(e) {
      if (!parent.contains(e.target)) {
        autocomplete.classList.remove('active');
      }
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        autocomplete.classList.remove('active');
      }
    });
  });

  const roundTitles = document.querySelectorAll('.round-head-row .round-title');
  const roundMapping = {
    'Раунд 1': 'round1',
    'Четвертьфинал': 'quarterfinal',
    'Полуфинал': 'semifinal',
    'Финал': 'final'
  };

  roundTitles.forEach(title => {
    title.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        return;
      }
      const roundName = this.textContent.trim();
      const containerId = roundMapping[roundName];

      if (!containerId) {
        return;
      }
      roundTitles.forEach(t => {
        t.classList.remove('active');
        t.classList.add('disabled');
      });
      this.classList.add('active');
      this.classList.remove('disabled');
      const allContainers = document.querySelectorAll('.round-container');
      allContainers.forEach(container => {
        container.classList.remove('active');
        container.classList.add('disabled');
      });
      const targetContainer = document.getElementById(containerId);
      if (targetContainer) {
        targetContainer.classList.remove('disabled');
        targetContainer.classList.add('active');
      }
    });
  });
});
