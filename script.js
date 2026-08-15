/* ==========================================
   Sidhu's Views — Premium JavaScript
   Version 2.0
   Features: AOS, Swiper, Navbar, Counter,
   Typewriter, Back to Top, Ripple, Floating Feathers
   ========================================== */

/* ==============================
   PRELOADER
   ============================== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
      setTimeout(() => { preloader.style.display = 'none'; }, 600);
    }, 2000);
  }
});

/* ==============================
   INIT AOS (Animate On Scroll)
   ============================== */
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic'
});

/* ==============================
   STICKY NAVBAR
   ============================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ==============================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight + 50;
      const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });

      // Close mobile menu if open
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler) toggler.click();
      }
    }
  });
});

/* ==============================
   COUNTER ANIMATION
   ============================== */
const counters = document.querySelectorAll('.counter');

const startCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  counter.innerText = '0';

  const update = () => {
    const current = +counter.innerText.replace(/,/g, '');
    const increment = target / 100;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(update, 20);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };

  update();
};

// Use IntersectionObserver to trigger counters when visible
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/* ==============================
   BACK TO TOP BUTTON
   ============================== */
const topBtn = document.createElement('button');
topBtn.innerHTML = '↑';
topBtn.id = 'topBtn';
topBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(topBtn);

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==============================
   TYPEWRITER EFFECT
   ============================== */
const heroHeading = document.querySelector('.hero-text h1');
if (heroHeading) {
  const originalText = heroHeading.textContent;
  heroHeading.innerHTML = '';
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < originalText.length) {
      heroHeading.innerHTML += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 60);
    }
  }

  // Start typewriter after a short delay
  setTimeout(typeWriter, 500);
}

/* ==============================
   RIPPLE BUTTON EFFECT
   ============================== */
document.querySelectorAll('.btn, .submit-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255,255,255,.35);
      border-radius: 50%;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      transform: scale(0);
      pointer-events: none;
      transition: transform .6s, opacity .6s;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(2.5)';
      ripple.style.opacity = '0';
    });

    setTimeout(() => ripple.remove(), 700);
  });
});

/* ==============================
   FLOATING FEATHER EFFECT
   ============================== */
setInterval(() => {
  const feather = document.createElement('div');
  feather.innerHTML = '<i class="fas fa-feather-alt"></i>';
  feather.style.cssText = `
    position: fixed;
    left: ${Math.random() * window.innerWidth}px;
    bottom: -50px;
    font-size: ${14 + Math.random() * 20}px;
    color: rgba(44, 94, 67, 0.15);
    pointer-events: none;
    z-index: 0;
    transition: all 6s cubic-bezier(.4,0,.2,1);
    user-select: none;
    transform: translateX(0);
  `;
  document.body.appendChild(feather);

  requestAnimationFrame(() => {
    feather.style.bottom = '110%';
    feather.style.transform = `translateX(${Math.random() * 40 - 20}px) rotate(${Math.random() * 30 - 15}deg)`;
    feather.style.opacity = '0';
  });

  setTimeout(() => feather.remove(), 6500);
}, 3500);

/* ==============================
   CONTACT FORM HANDLER
   ============================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
    const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
    const subject = this.querySelector('input[placeholder="Subject"]').value.trim();
    const messageContent = this.querySelector('textarea').value.trim();

    if (!name || !email || !messageContent) {
      alert('Please fill all required fields.');
      return;
    }

    // Build WhatsApp message
    let message = `✉️ *New Contact Form Message*\n\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📧 *Email:* ${email}\n`;
    message += `📝 *Subject:* ${subject}\n`;
    message += `💬 *Message:* ${messageContent}\n`;

    const encoded = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/9195601461999?text=${encoded}`;

    window.open(whatsappURL, '_blank');

    // Show success feedback
    const btn = this.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Sent!';
    btn.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
    }, 4000);

    this.reset();
  });
}

/* ==============================
   DARK MODE TOGGLE
   ============================== */
const darkToggle = document.getElementById('darkModeToggle');
if (darkToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/* ==============================
   WELCOME LOG
   ============================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    console.log('✍️ Welcome to Sidhu\'s Views!');
    console.log('✉️ contact@sidhusviews.com');
  }, 1000);
});

/* ==============================
   SCROLL PROGRESS TRACKER
   ============================= */
const scrollProgress = document.createElement('div');
scrollProgress.id = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  scrollProgress.style.width = scrolled + '%';
});

/* ==============================
   SITE-WIDE CLIENT-SIDE SEARCH
   ============================== */
const searchIndex = [
  { title: "Sidhu's Views Homepage", category: "General", url: "index.html", desc: "Premium personal online magazine. Curated Slow Living and Creative Coding." },
  { title: "About Gurdeep Sidhu", category: "Biography", url: "about.html", desc: "Founder & Creative Editor at Sidhu's Views. Exploring writing, design, and handmade fiber arts." },
  { title: "Explore Lifestyle & Design", category: "Discoveries", url: "explore.html", desc: "Curated insights on slow living, capsule wardrobes, interior styling, travel diaries, and recommendations." },
  { title: "Crochet & Handmade Studio", category: "Projects", url: "create.html", desc: "Detailed tutorials, difficulty specifications, pine woodworking, upcycled crafts, and digital code play." },
  { title: "Journal & Personal Diaries", category: "Writing", url: "journal.html", desc: "Long-form reflections, memoirs, opinion pieces, and archives of interesting internet discoveries." },
  { title: "My Creative Journey Milestones", category: "Timeline", url: "journey.html", desc: "A chronicle of Gurdeep Sidhu's creative growth, design milestones, and project completions." },
  { title: "Contact & Collaboration Inquiries", category: "Inquiries", url: "contact.html", desc: "Get in touch for custom crochet commissions, writing projects, and creative sandbox collaborations." },
  { title: "Living Intentionally: Slow Living Guide", category: "Lifestyle", url: "explore.html#lifestyle", desc: "Rhythms of slow living, morning routines, home space optimization, and productivity." },
  { title: "Aesthetic Curation: Minimalist Capsule Wardrobes", category: "Fashion", url: "explore.html#style", desc: "Building blocks of vintage capsule wardrobes, textures curation, and timeless dress philosophies." },
  { title: "Designing Cozy Interiors: Room Styling", category: "Home & Decor", url: "explore.html#decor", desc: "Interior styling principles, light alignments, plant decor, and vintage furniture placement." },
  { title: "Travel Journals: Visual Wanderlust Diaries", category: "Travel", url: "explore.html#travel", desc: "Visual photography records from trails and cozy coffee spots in Chandigarh and worldwide." },
  { title: "Tactile Fiber Crafting: Crochet Patterns", category: "Handmade", url: "create.html#handmade", desc: "Sweaters blueprints, stitching guides, wool weights, and pattern PDF downloads." },
  { title: "DIY Woodworking & Pine Assemblies", category: "DIY", url: "create.html#diy", desc: " pine woodworks tutorials, material sheets, and tools safety lists." },
  { title: "Digital Lab Sandbox: Code Widgets & AI Play", category: "Digital Lab", url: "create.html#digital", desc: "Generative AI api code, JavaScript animations, custom CSS, and workflow automation." },
  { title: "Memoirs: Personal Storytelling Archives", category: "Stories", url: "journal.html#stories", desc: "Childhood memories, reflections, and creative checkpoints." },
  { title: "Micro-Thoughts & Conceptual Notes", category: "Thoughts", url: "journal.html#thoughts", desc: "Observations and sudden inspirations written down on the go." }
];

const modalHTML = `
  <div class="search-modal" id="searchModal">
    <button class="search-modal-close" id="searchCloseBtn"><i class="fas fa-times"></i></button>
    <div class="search-container">
      <div class="search-input-wrapper">
        <i class="fas fa-search"></i>
        <input type="text" class="search-input" id="searchInput" placeholder="Search articles, patterns, projects..." autocomplete="off">
      </div>
      <ul class="search-results" id="searchResults"></ul>
    </div>
  </div>
`;

// Append search modal markup dynamically to body
const modalDiv = document.createElement('div');
modalDiv.innerHTML = modalHTML.trim();
document.body.appendChild(modalDiv.firstChild);

const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchCloseBtn = document.getElementById('searchCloseBtn');

function openSearch() {
  searchModal.classList.add('active');
  setTimeout(() => searchInput.focus(), 200);
}

function closeSearch() {
  searchModal.classList.remove('active');
  searchInput.value = '';
  searchResults.innerHTML = '';
}

if (searchCloseBtn) {
  searchCloseBtn.addEventListener('click', closeSearch);
}

searchModal.addEventListener('click', (e) => {
  if (e.target === searchModal) closeSearch();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchModal.classList.contains('active')) {
    closeSearch();
  }
});

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';

    if (!query) return;

    const filtered = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(query) ||
             item.category.toLowerCase().includes(query) ||
             item.desc.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      searchResults.innerHTML = `<li class="search-result-item text-muted">No matches found for "${e.target.value}"</li>`;
      return;
    }

    filtered.forEach(item => {
      const li = document.createElement('li');
      li.className = 'search-result-item';
      li.innerHTML = `
        <a href="${item.url}">
          <span>${item.category}</span>
          <h4>${item.title}</h4>
          <p class="small text-muted mb-0" style="font-size:12px; margin-top:4px;">${item.desc.substring(0, 100)}...</p>
        </a>
      `;
      searchResults.appendChild(li);
    });
  });
}

// Dynamically add search link to navigation menu
const navMenuList = document.querySelector('#navbar .navbar-nav');
if (navMenuList) {
  const searchLi = document.createElement('li');
  searchLi.className = 'nav-item';
  searchLi.innerHTML = `<a class="nav-link" href="#" id="searchNavTrigger"><i class="fas fa-search" style="font-size: 13px; margin-right: 4px;"></i> SEARCH</a>`;
  navMenuList.appendChild(searchLi);

  const searchNavTrigger = document.getElementById('searchNavTrigger');
  if (searchNavTrigger) {
    searchNavTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    });
  }
}

// Category filter logic for explore page
function filterExplore(category) {
  const sections = document.querySelectorAll('.explore-item-section');
  const buttons = document.querySelectorAll('#categoryFilters button');
  
  if (buttons.length > 0) {
    buttons.forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.target) {
      window.event.target.classList.add('active');
    }
  }

  sections.forEach(sec => {
    if (category === 'all' || sec.getAttribute('data-category') === category) {
      sec.style.display = 'block';
    } else {
      sec.style.display = 'none';
    }
  });
}
