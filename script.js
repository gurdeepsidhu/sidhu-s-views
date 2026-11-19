/* 
  SIDHU'S VIEWS - MAIN JAVASCRIPT (WORLD-CLASS EDITION v2.1.0)
  Preloader, Reading Progress, Scroll To Top, AOS Animations, Category Filters, Live Search & Dark Mode
*/

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. PRELOADER DISMISSAL WITH FAILSAFE TIMEOUT
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const dismissPreloader = function() {
      if (!preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
        setTimeout(function() {
          preloader.style.display = 'none';
        }, 400);
      }
    };
    // Dismiss shortly after DOMContentLoaded
    setTimeout(dismissPreloader, 200);
    // Extra safety listeners
    window.addEventListener('load', dismissPreloader);
    setTimeout(dismissPreloader, 1200); // Absolute fallback guarantee
  }

  // 2. SCROLL READING PROGRESS BAR
  let progressBar = document.getElementById('scrollProgress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    document.body.prepend(progressBar);
  }

  // 3. BACK TO TOP BUTTON INJECTION
  let backBtn = document.getElementById('backToTop');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.id = 'backToTop';
    backBtn.setAttribute('aria-label', 'Back to top');
    backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backBtn);
    
    backBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // SCROLL EVENT LISTENER (PROGRESS + BACK TO TOP)
  window.addEventListener('scroll', function() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    if (backBtn) {
      if (winScroll > 350) {
        backBtn.classList.add('show');
      } else {
        backBtn.classList.remove('show');
      }
    }
  }, { passive: true });

  // 4. INITIALIZE AOS ANIMATION LIBRARY
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50
    });
  }

  // 5. DARK MODE TOGGLE
  const darkToggle = document.getElementById('darkModeToggle');
  if (darkToggle) {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
      darkToggle.setAttribute('title', 'Switch to light mode');
    } else {
      darkToggle.setAttribute('title', 'Switch to dark mode');
    }

    darkToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkToggle.setAttribute('title', 'Switch to light mode');
      } else {
        localStorage.setItem('theme', 'light');
        darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkToggle.setAttribute('title', 'Switch to dark mode');
      }
    });
  }

  // 6. REGISTER SERVICE WORKER FOR PWA INSTALLATION
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      reg.update();
      console.log('PWA Service Worker registered and update checked successfully');
    }).catch(function(err) {
      console.log('Service Worker registration failed:', err);
    });
  }

  // 7. NAVBAR CATEGORY DROPDOWN CLICK HANDLER (FOR EXPLORE PAGE)
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

  // 8. POPSTATE HANDLER FOR BROWSER BACK/FORWARD
  window.addEventListener('popstate', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || 'all';
    filterExplore(catParam);
  });

  // 9. CHECK URL PARAMS FOR CATEGORY FILTER ON LOAD
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  const hashParam = window.location.hash.replace('#', '');
  const targetCat = catParam || hashParam;

  if (targetCat && ['lifestyle', 'crafts', 'decor', 'travel', 'journal', 'stories', 'all'].includes(targetCat)) {
    filterExplore(targetCat);
    setTimeout(function() {
      const targetSec = document.getElementById(targetCat) || document.getElementById('categoryFilters');
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  }

  // 10. SEARCH SHORTCUT (ESCAPE CLEARS SEARCH)
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        clearSearch();
      }
    });
  }

});

// 11. CATEGORY FILTERING FOR EXPLORE PAGE
function filterExplore(category) {
  // Normalize category name
  if (category === 'stories') category = 'journal';

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

  // Hide empty results message if visible
  const noRes = document.getElementById('noResultsMessage');
  if (noRes) noRes.style.display = 'none';

  // Clear search input when switching categories
  const searchInput = document.getElementById('searchInput');
  if (searchInput && searchInput.value) {
    searchInput.value = '';
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

// 12. LIVE SEARCH FOR EXPLORE PAGE (WITH NO-RESULTS FEEDBACK)
function searchArticles() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  const filter = input.value.toLowerCase().trim();
  const sections = document.querySelectorAll('.explore-item-section');
  const noRes = document.getElementById('noResultsMessage');

  if (filter === '') {
    if (noRes) noRes.style.display = 'none';
    // Restore current active category filter
    const activeBtn = document.querySelector('#categoryFilters button.active');
    const currentCat = activeBtn ? (activeBtn.getAttribute('data-cat') || 'all') : 'all';
    filterExplore(currentCat);
    return;
  }

  let totalMatches = 0;

  sections.forEach(sec => {
    const rows = sec.querySelectorAll('.row.g-4');
    let hasMatch = false;

    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      if (text.includes(filter)) {
        row.style.display = 'flex';
        hasMatch = true;
        totalMatches++;
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

  if (noRes) {
    if (totalMatches === 0) {
      noRes.style.display = 'block';
      const termSpan = document.getElementById('searchQueryTerm');
      if (termSpan) termSpan.textContent = filter;
    } else {
      noRes.style.display = 'none';
    }
  }

  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// 13. CLEAR SEARCH HELPER
function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) {
    input.value = '';
  }
  const noRes = document.getElementById('noResultsMessage');
  if (noRes) noRes.style.display = 'none';
  filterExplore('all');
}
