/* 
  SIDHU'S VIEWS - MAIN JAVASCRIPT
  Handles Preloader Removal, AOS Animations, Category Filters, and Dark Mode Toggle
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
    // Check saved preference
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
    navigator.serviceWorker.register('sw.js').then(function() {
      console.log('PWA Service Worker registered successfully');
    }).catch(function(err) {
      console.log('Service Worker registration failed:', err);
    });
  }

  // 5. CHECK URL PARAMS FOR CATEGORY FILTER ON LOAD
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  const hashParam = window.location.hash.replace('#', '');
  const targetCat = catParam || hashParam;

  if (targetCat && ['lifestyle', 'crafts', 'decor', 'travel', 'stories'].includes(targetCat)) {
    filterExplore(targetCat);
  }

});

// 6. CATEGORY FILTERING FOR EXPLORE PAGE
function filterExplore(category) {
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

  const items = document.querySelectorAll('.explore-item-section');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-category') || '';
    if (category === 'all' || itemCat.split(' ').includes(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// 7. LIVE SEARCH FOR EXPLORE PAGE
function searchArticles() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  const filter = input.value.toLowerCase();
  const items = document.querySelectorAll('.explore-item-section');

  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    if (text.includes(filter)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
