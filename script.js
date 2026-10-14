/* 
  SIDHU'S VIEWS - MAIN JAVASCRIPT
  Handles Preloader Removal, AOS Animations, Category Filters, Search, and Dark Mode Toggle
*/

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. PRELOADER HIDE
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(function() {
      preloader.classList.add('fade-out');
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 500);
    }, 300);
  }

  // 2. INITIALIZE AOS ANIMATION LIBRARY
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60
    });
  }

  // 3. DARK MODE TOGGLE
  const darkToggle = document.getElementById('darkModeToggle');
  if (darkToggle) {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('theme', 'light');
        darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  }

  // 4. REGISTER SERVICE WORKER FOR PWA INSTALLATION
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      reg.update();
      console.log('PWA Service Worker registered and update checked successfully');
    }).catch(function(err) {
      console.log('Service Worker registration failed:', err);
    });
  }

  // 5. NAVBAR CATEGORY DROPDOWN CLICK HANDLER (FOR EXPLORE PAGE)
  document.querySelectorAll('a[href*="explore.html?cat="], a[href*="?cat="]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const match = href.match(/cat=([a-z0-9_-]+)/i);
      if (match && match[1]) {
        const cat = match[1];
        const isExplorePage = window.location.pathname.endsWith('explore.html') || 
                             window.location.pathname.endsWith('explore') ||
                             document.getElementById('categoryFilters');
        if (isExplorePage) {
          e.preventDefault();
          filterExplore(cat);
          if (window.history && window.history.pushState) {
            window.history.pushState({ category: cat }, '', `explore.html?cat=${cat}`);
          }
          const targetSec = document.getElementById(cat) || document.getElementById('categoryFilters');
          if (targetSec) {
            targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  });

  // 6. POPSTATE HANDLER FOR BROWSER BACK/FORWARD
  window.addEventListener('popstate', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || 'all';
    filterExplore(catParam);
  });

  // 7. CHECK URL PARAMS FOR CATEGORY FILTER ON LOAD
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  const hashParam = window.location.hash.replace('#', '');
  const targetCat = catParam || hashParam;

  if (targetCat && ['lifestyle', 'crafts', 'decor', 'travel', 'stories', 'all'].includes(targetCat)) {
    filterExplore(targetCat);
    setTimeout(function() {
      const targetSec = document.getElementById(targetCat) || document.getElementById('categoryFilters');
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  }

});

// 8. CATEGORY FILTERING FOR EXPLORE PAGE
function filterExplore(category) {
  // Normalize category name
  if (category === 'stories') category = 'travel';

  // Update active state on button group
  const filterButtons = document.querySelectorAll('#categoryFilters button');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      const bCat = btn.getAttribute('data-cat') || '';
      if (bCat === category || (category === 'all' && bCat === 'all')) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Toggle category sections
  const items = document.querySelectorAll('.explore-item-section');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-category') || '';
    const matches = (category === 'all' || itemCat.split(' ').includes(category) || item.id === category);

    if (matches) {
      item.style.display = 'block';
      // Reset any row display styles that may have been altered by search
      item.querySelectorAll('.row.g-4').forEach(r => r.style.display = '');
      // Force all AOS children inside the visible section to immediately show!
      item.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('aos-animate');
      });
    } else {
      item.style.display = 'none';
    }
  });

  // Refresh AOS engine
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// 9. LIVE SEARCH FOR EXPLORE PAGE
function searchArticles() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  const filter = input.value.toLowerCase().trim();
  const sections = document.querySelectorAll('.explore-item-section');

  if (filter === '') {
    // Restore current active category filter
    const activeBtn = document.querySelector('#categoryFilters button.active');
    const currentCat = activeBtn ? (activeBtn.getAttribute('data-cat') || 'all') : 'all';
    filterExplore(currentCat);
    return;
  }

  sections.forEach(sec => {
    const rows = sec.querySelectorAll('.row.g-4');
    let hasMatch = false;

    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      if (text.includes(filter)) {
        row.style.display = 'flex';
        hasMatch = true;
      } else {
        row.style.display = 'none';
      }
    });

    if (hasMatch) {
      sec.style.display = 'block';
      sec.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
    } else {
      sec.style.display = 'none';
    }
  });
}
