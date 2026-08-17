/* ==========================================================================
   turfz — Dashboard Engine (dashboard.js - Step 9.9)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardTabs();
  initQRTicketModal();
  initSquadBuilder();
});

/* ==========================================
   1. DASHBOARD TAB SWITCHING
   ========================================== */
function initDashboardTabs() {
  const navItems = document.querySelectorAll('.dash-nav-item[data-tab]');
  const tabPanes = document.querySelectorAll('.dash-tab-pane');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = item.dataset.tab;

      navItems.forEach(i => i.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      // Add active state to all nav items that match this tab (handles both desktop sidebar and mobile drawer)
      document.querySelectorAll(`.dash-nav-item[data-tab="${targetTab}"]`).forEach(el => el.classList.add('active'));
      
      const pane = document.getElementById(`tab-${targetTab}`);
      if (pane) {
        pane.classList.add('active');
      }
      
      // Close mobile drawer if item was clicked inside it
      if (item.closest('.mobile-drawer')) {
        const closeBtn = document.querySelector('.drawer-close');
        if (closeBtn) closeBtn.click();
      }
    });
  });
}

/* ==========================================
   2. QR E-TICKET MODAL PREVIEW
   ========================================== */
function initQRTicketModal() {
  const ticketBtns = document.querySelectorAll('.view-ticket-btn');
  const modal = document.getElementById('ticketModal');
  const closeModal = document.querySelector('.close-ticket-modal');

  ticketBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'flex';
      }
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
}

/* ==========================================
   3. SQUAD MATCHMAKING BUILDER
   ========================================== */
function initSquadBuilder() {
  const addPlayerBtn = document.getElementById('addPlayerBtn');
  const squadList = document.getElementById('squadList');

  if (addPlayerBtn && squadList) {
    addPlayerBtn.addEventListener('click', () => {
      const playerCount = squadList.children.length + 1;
      const li = document.createElement('li');
      li.className = 'squad-member-item';
      li.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: rgba(255,255,255,0.04); border-radius: 8px; margin-bottom: 0.5rem; border: 1px solid var(--border-color);';
      li.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:32px; height:32px; border-radius:50%; background:var(--primary); color:#040914; display:flex; align-items:center; justify-content:center; font-weight:bold;">P${playerCount}</div>
          <span>Player #${playerCount} (Pending Invitation)</span>
        </div>
        <span class="badge badge-volt">Invited</span>
      `;
      squadList.appendChild(li);
    });
  }
}
