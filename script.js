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

});

// 4. CATEGORY FILTERING FOR EXPLORE PAGE
function filterExplore(category) {
  const filterButtons = document.querySelectorAll('#categoryFilters button');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.target) {
      window.event.target.classList.add('active');
    }
  }

  const items = document.querySelectorAll('.explore-item-section');
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// 5. MODAL SEARCH PLACEHOLDER
function openSearch() {
  const query = prompt("What would you like to search on Sidhu's Views?");
  if (query) {
    alert("Searching for: " + query + "\n(Filter applied on explore page)");
  }
}
