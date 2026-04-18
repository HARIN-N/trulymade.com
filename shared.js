// Shared navigation and footer injector
function injectNav(activePage) {
    const pages = {
        home: 'index.html',
        product: 'product.html',
        ingredients: 'ingredients.html',
        play: 'play.html',
        reviews: 'reviews.html',
        how: 'how-it-works.html',
        order: 'order.html'
    };

    const navHTML = `
    <div id="cursor"></div>
    <div id="cursor-follower"></div>
    <div class="scroll-progress" id="scrollProgress"></div>

    <div class="mobile-menu" id="mobileMenu">
        <button class="mobile-menu-close" onclick="closeMobileMenu()">✕</button>
        <a href="index.html" onclick="closeMobileMenu()">Home</a>
        <a href="product.html" onclick="closeMobileMenu()">The Spread</a>
        <a href="ingredients.html" onclick="closeMobileMenu()">Ingredients</a>
        <a href="play.html" onclick="closeMobileMenu()">Play & Win</a>
        <a href="reviews.html" onclick="closeMobileMenu()">Reviews</a>
        <a href="how-it-works.html" onclick="closeMobileMenu()">How It Works</a>
        <a href="order.html" class="nav-cta" style="margin-top:1rem" onclick="closeMobileMenu()">Order Now</a>
    </div>

    <nav id="mainNav">
        <a href="index.html" class="nav-logo">trulymade<span>.</span></a>
        <ul class="nav-links">
            <li><a href="product.html" ${activePage==='product'?'class="active"':''}>The Spread</a></li>
            <li><a href="ingredients.html" ${activePage==='ingredients'?'class="active"':''}>Ingredients</a></li>
            <li><a href="play.html" ${activePage==='play'?'class="active"':''}>Play & Win</a></li>
            <li><a href="reviews.html" ${activePage==='reviews'?'class="active"':''}>Reviews</a></li>
            <li><a href="how-it-works.html" ${activePage==='how'?'class="active"':''}>How It Works</a></li>
        </ul>
        <a href="order.html" class="nav-cta">Order Now</a>
        <button class="nav-hamburger" onclick="openMobileMenu()" aria-label="Menu">
            <span></span><span></span><span></span>
        </button>
    </nav>
    `;

    const footerHTML = `
    <footer>
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="index.html" class="logo">trulymade<span>.</span></a>
                <p>Premium dry fruit spreads crafted with love, science and the finest natural ingredients. No compromises. No shortcuts.</p>
            </div>
            <div class="footer-col">
                <h4>Explore</h4>
                <ul>
                    <li><a href="product.html">The Spread</a></li>
                    <li><a href="ingredients.html">Ingredients</a></li>
                    <li><a href="play.html">Play & Win</a></li>
                    <li><a href="reviews.html">Reviews</a></li>
                    <li><a href="how-it-works.html">How It Works</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Order</h4>
                <ul>
                    <li><a href="order.html">Order Now</a></li>
                    <li><a href="order.html#upi">Pay via UPI</a></li>
                    <li><a href="order.html#cod">Cash on Delivery</a></li>
                    <li><a href="mailto:hello@trulymade.in">hello@trulymade.in</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <span class="footer-copy">© 2025 trulymade. All rights reserved.</span>
            <span class="fssai-badge">FSSAI Licensed · Lab Tested</span>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Cursor logic
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
    function animateCursor() { fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12; follower.style.left = fx + 'px'; follower.style.top = fy + 'px'; requestAnimationFrame(animateCursor); }
    animateCursor();
    document.querySelectorAll('a,button,.size-card,.quiz-opt,.pay-btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
    });

    // Scroll progress
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('mainNav');
        if (window.scrollY > 80) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
        const prog = document.getElementById('scrollProgress');
        const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        prog.style.width = scrollPct + '%';
    });

    // Reveal on scroll
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
}

function openMobileMenu() { document.getElementById('mobileMenu').classList.add('open'); }
function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

// Confetti
function launchConfetti(parentEl) {
    const colors = ['#6b8c3e','#c9a84c','#a8c46e','#d4813a','#f5f0e8'];
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.style.cssText = `position:absolute;left:${Math.random()*100}%;top:${Math.random()*30}%;background:${colors[Math.floor(Math.random()*colors.length)]};width:${Math.random()*10+5}px;height:${Math.random()*10+5}px;animation:confettiFall ${Math.random()*1.5+2}s ease-out ${Math.random()*0.5}s forwards;border-radius:${Math.random()>.5?'50%':'2px'};pointer-events:none;`;
        parentEl.appendChild(p);
        setTimeout(() => p.remove(), 3500);
    }
}
