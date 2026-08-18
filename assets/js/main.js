/* ==========================================================================
   turfz — Core Interactive Engine (main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initRTLToggle();
  initSlotPicker();
  initFormValidation();
  initTurfFilters();
  initCountdownTimer();
});

/* ==========================================
   1. NAVBAR & HAMBURGER DRAWER (<1024px)
   ========================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const toggleBtn = document.querySelector('.hamburger-toggle');
  const closeBtn = document.querySelector('.drawer-close');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
}

/* ==========================================
   2. THEME SWITCHER (DARK / LIGHT)
   ========================================== */
function initThemeToggle() {
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('turfz_theme') || 'dark';

  setTheme(savedTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('turfz_theme', theme);

  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
      } else {
        icon.className = 'fa-solid fa-moon';
      }
    }
  });
}

/* ==========================================
   3. RTL LAYOUT SWITCHER (Step 5)
   ========================================== */
function initRTLToggle() {
  const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
  const savedRTL = localStorage.getItem('turfz_rtl') === 'true';

  setRTL(savedRTL);

  rtlBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentRTL = document.documentElement.getAttribute('dir') === 'rtl';
      setRTL(!currentRTL);
    });
  });
}

function setRTL(isRTL) {
  if (isRTL) {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl');
  } else {
    document.documentElement.removeAttribute('dir');
    document.body.classList.remove('rtl');
  }
  localStorage.setItem('turfz_rtl', isRTL);
}

/* ==========================================
   4. INTERACTIVE SLOT PICKER MATRIX
   ========================================== */
function initSlotPicker() {
  const dayChips = document.querySelectorAll('.day-chip');
  const slotBtns = document.querySelectorAll('.slot-btn:not(.disabled)');
  const summaryBox = document.querySelector('.selected-slot-summary');
  const priceDisplay = document.querySelector('.total-booking-price');

  let selectedDay = 'Today';
  let selectedSlot = null;
  const baseRate = 1200;

  dayChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dayChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedDay = chip.dataset.day || chip.querySelector('.day-name')?.innerText || 'Selected Day';
      updateSummary();
    });
  });

  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(s => s.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSlot = btn.dataset.time || btn.innerText;
      updateSummary();
    });
  });

  function updateSummary() {
    if (summaryBox) {
      if (selectedSlot) {
        summaryBox.innerHTML = `<i class="fa-solid fa-calendar-check"></i> Selected: <strong>${selectedDay} at ${selectedSlot}</strong>`;
        if (priceDisplay) priceDisplay.innerText = `₹${baseRate}`;
      } else {
        summaryBox.innerHTML = `Select a slot above to book`;
        if (priceDisplay) priceDisplay.innerText = `₹0`;
      }
    }
  }
}

/* ==========================================
   5. CLIENT-SIDE FORM VALIDATION ENGINE (STEP 12)
   ========================================== */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        const errorEl = input.parentElement.querySelector('.form-error') || createErrorEl(input);
        
        // Basic required check
        if (input.hasAttribute('required') && !input.value.trim()) {
          showError(input, errorEl, 'This field is required');
          isValid = false;
        } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
          showError(input, errorEl, 'Please enter a valid email address');
          isValid = false;
        } else if (input.type === 'password' && input.value && input.value.length < 8) {
          showError(input, errorEl, 'Password must be at least 8 characters');
          isValid = false;
        } else if (input.id === 'confirmPassword' || input.name === 'confirmPassword') {
          const pass = form.querySelector('input[type="password"]');
          if (pass && input.value !== pass.value) {
            showError(input, errorEl, 'Passwords do not match');
            isValid = false;
          } else {
            clearError(input, errorEl);
          }
        } else if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) {
          showError(input, errorEl, 'You must accept the terms');
          isValid = false;
        } else {
          clearError(input, errorEl);
        }
      });

      if (isValid) {
        showSuccessMessage(form);
      }
    });
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function createErrorEl(input) {
    const div = document.createElement('div');
    div.className = 'form-error';
    div.style.color = '#FF5252';
    div.style.fontSize = '0.8rem';
    div.style.marginTop = '0.3rem';
    input.parentElement.appendChild(div);
    return div;
  }

  function showError(input, errorEl, msg) {
    input.style.borderColor = '#FF5252';
    errorEl.innerText = msg;
  }

  function clearError(input, errorEl) {
    input.style.borderColor = 'rgba(0, 230, 118, 0.5)';
    errorEl.innerText = '';
  }

  function showSuccessMessage(form) {
    const successBox = form.querySelector('.form-success-alert') || document.createElement('div');
    successBox.className = 'form-success-alert';
    successBox.style.background = 'rgba(0, 230, 118, 0.15)';
    successBox.style.border = '1px solid #00E676';
    successBox.style.color = '#00E676';
    successBox.style.padding = '1rem';
    successBox.style.borderRadius = '10px';
    successBox.style.marginTop = '1rem';
    successBox.style.textAlign = 'center';
    successBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Action completed successfully!';
    
    if (!form.querySelector('.form-success-alert')) {
      form.appendChild(successBox);
    }
    
    setTimeout(() => {
      if (form.getAttribute('data-redirect')) {
        window.location.href = form.getAttribute('data-redirect');
      }
    }, 1500);
  }
}

/* ==========================================
   6. TURF DIRECTORY FILTERS (services.html)
   ========================================== */
function initTurfFilters() {
  const sportFilter = document.getElementById('filterSport');
  const priceFilter = document.getElementById('filterPrice');
  const venueCards = document.querySelectorAll('.venue-card[data-sport]');

  if (sportFilter && venueCards.length) {
    sportFilter.addEventListener('change', filterVenues);
  }
  if (priceFilter && venueCards.length) {
    priceFilter.addEventListener('input', filterVenues);
  }

  function filterVenues() {
    const selectedSport = sportFilter ? sportFilter.value.toLowerCase() : 'all';
    const maxPrice = priceFilter ? parseInt(priceFilter.value) : 5000;

    const priceValueDisplay = document.getElementById('priceValueDisplay');
    if (priceValueDisplay) priceValueDisplay.innerText = `₹${maxPrice}`;

    venueCards.forEach(card => {
      const sport = card.dataset.sport ? card.dataset.sport.toLowerCase() : '';
      const price = card.dataset.price ? parseInt(card.dataset.price) : 0;

      const matchesSport = selectedSport === 'all' || sport === selectedSport;
      const matchesPrice = price <= maxPrice;

      if (matchesSport && matchesPrice) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }
}

/* ==========================================
   7. COUNTDOWN TIMER (coming-soon.html)
   ========================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl) return;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 18);

  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.innerText = d.toString().padStart(2, '0');
    hoursEl.innerText = h.toString().padStart(2, '0');
    minsEl.innerText = m.toString().padStart(2, '0');
    secsEl.innerText = s.toString().padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}
