// अड़गड़नाथ महादेव मंदिर Website JavaScript

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animated counter for donations or visitors
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Today's special message
function getTodaysMessage() {
    const today = new Date();
    const day = today.getDay();
    const messages = {
        0: "आज रविवार है - सूर्य देव की कृपा के साथ भगवान शिव का आशीर्वाद लें",
        1: "आज सोमवार है - भगवान शिव का प्रिय दिन। विशेष पूजा और अभिषेक होगा",
        2: "आज मंगलवार है - हनुमान जी के साथ भगवान शिव की पूजा करें",
        3: "आज बुधवार है - बुध ग्रह की शांति के लिए विशेष प्रार्थना",
        4: "आज गुरुवार है - गुरु की कृपा और भगवान शिव का आशीर्वाद लें",
        5: "आज शुक्रवार है - माता लक्ष्मी और भगवान शिव की पूजा का दिन",
        6: "आज शनिवार है - शनि देव की कृपा के लिए विशेष पूजा"
    };
    return messages[day];
}

// Display today's message on page load
document.addEventListener('DOMContentLoaded', function() {
    const messageElements = document.querySelectorAll('.todays-message');
    messageElements.forEach(element => {
        element.textContent = getTodaysMessage();
    });
});

// Live time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('hi-IN');
    const dateString = now.toLocaleDateString('hi-IN');
    
    const timeElements = document.querySelectorAll('.live-time');
    timeElements.forEach(element => {
        element.innerHTML = `🕐 समय: ${timeString}<br>📅 दिनांक: ${dateString}`;
    });
}

// Update time every second
setInterval(updateTime, 1000);

// Spiritual quotes rotation
const spiritualQuotes = [
    "🕉️ ॐ नमः शिवाय 🕉️",
    "🙏 हर हर महादेव 🙏",
    "🔱 जय भोलेनाथ 🔱",
    "🌙 शिव शंकर भोले 🌙",
    "🕉️ महादेव की जय 🕉️"
];

function rotateQuotes() {
    const quoteElements = document.querySelectorAll('.rotating-quote');
    const randomQuote = spiritualQuotes[Math.floor(Math.random() * spiritualQuotes.length)];
    
    quoteElements.forEach(element => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.textContent = randomQuote;
            element.style.opacity = '1';
        }, 300);
    });
}

// Rotate quotes every 5 seconds
setInterval(rotateQuotes, 5000);

// Visitor counter (demo)
function initVisitorCounter() {
    const visitorCount = localStorage.getItem('templeVisitorCount') || Math.floor(Math.random() * 10000) + 50000;
    const newCount = parseInt(visitorCount) + 1;
    localStorage.setItem('templeVisitorCount', newCount);
    
    const counterElements = document.querySelectorAll('.visitor-counter');
    counterElements.forEach(element => {
        animateCounter(element, newCount - 1, newCount, 1000);
    });
}

// Initialize visitor counter on page load
document.addEventListener('DOMContentLoaded', initVisitorCounter);

// Donation amount selection
function selectDonationAmount(amount) {
    // Remove previous selections
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to clicked button
    event.target.classList.add('selected');
    
    // Store selected amount
    window.selectedDonationAmount = amount;
}

// Image lazy loading for gallery
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading on page load
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Festival countdown timer
function calculateDaysToShivratri() {
    const currentYear = new Date().getFullYear();
    let shivratri = new Date(currentYear, 1, 18); // Approximate date
    
    if (shivratri < new Date()) {
        shivratri = new Date(currentYear + 1, 1, 18);
    }
    
    const timeDiff = shivratri.getTime() - new Date().getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff;
}

// Display countdown
function updateCountdown() {
    const days = calculateDaysToShivratri();
    const countdownElements = document.querySelectorAll('.shivratri-countdown');
    
    countdownElements.forEach(element => {
        element.innerHTML = `🌙 महाशिवरात्रि में ${days} दिन शेष`;
    });
}

// Update countdown on page load
document.addEventListener('DOMContentLoaded', updateCountdown);

// Form validation
function validateContactForm(form) {
    const name = form.querySelector('#name').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const message = form.querySelector('#message').value.trim();
    
    if (!name) {
        alert('कृपया अपना नाम दर्ज करें।');
        return false;
    }
    
    if (!phone) {
        alert('कृपया अपना मोबाइल नंबर दर्ज करें।');
        return false;
    }
    
    if (phone.length < 10) {
        alert('कृपया सही मोबाइल नंबर दर्ज करें।');
        return false;
    }
    
    if (!message) {
        alert('कृपया अपना संदेश लिखें।');
        return false;
    }
    
    return true;
}

// Scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '🔺';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #ff9933, #138808);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Responsive navigation toggle
function createMobileNavToggle() {
    const nav = document.querySelector('nav');
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '☰';
    toggleBtn.style.cssText = `
        display: none;
        background: transparent;
        border: 2px solid white;
        color: white;
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 1.2rem;
        cursor: pointer;
        margin: 1rem auto;
    `;
    
    // Insert toggle button before nav
    nav.parentNode.insertBefore(toggleBtn, nav);
    
    toggleBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
    });
    
    // Show/hide based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            toggleBtn.style.display = 'block';
            nav.style.display = 'none';
        } else {
            toggleBtn.style.display = 'none';
            nav.style.display = 'block';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', createMobileNavToggle);

// Page load animation
function animateOnLoad() {
    const elements = document.querySelectorAll('.card, .festival-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Run animations on page load
document.addEventListener('DOMContentLoaded', animateOnLoad);

// Print functionality for important pages
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️ प्रिंट करें';
    printBtn.className = 'btn';
    printBtn.style.margin = '1rem';
    printBtn.addEventListener('click', () => window.print());
    
    // Add to specific pages
    if (window.location.pathname.includes('darshan') || 
        window.location.pathname.includes('contact')) {
        const main = document.querySelector('main');
        main.appendChild(printBtn);
    }
}

// Initialize print button
document.addEventListener('DOMContentLoaded', addPrintButton);

console.log('🕉️ अड़गड़नाथ महादेव मंदिर की वेबसाइट लोड हो गई। हर हर महादेव! 🕉️');
