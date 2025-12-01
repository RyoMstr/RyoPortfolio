document.addEventListener("DOMContentLoaded", () => {

    // Update year
    document.getElementById('year').textContent = new Date().getFullYear();

    // ---- REVEAL FUNCTION ----
    function reveal(el) { if (el) el.classList.add("show"); }

    // ---- Scroll-based reveal for elements with data-animate ----
    const animatedElements = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("show"); });
    });
    animatedElements.forEach(el => observer.observe(el));

    // ---- Button triggers for manual reveal ----
    document.querySelectorAll("[data-reveal-btn]").forEach(btn => {
        const targetId = btn.getAttribute("data-reveal-btn");
        const targetEl = document.getElementById(targetId);
        btn.addEventListener("click", () => reveal(targetEl));
    });

    // ---- Hologram card hover effect ----
    document.querySelectorAll('.holo-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(900px) rotateY(${x / 20}deg) rotateX(${-y / 25}deg)`;
        });
        card.addEventListener('mouseleave', () =>
            card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)'
        );
    });

    // ---- Neon profile hover tilt ----
    const profileImg = document.querySelector(".hero-img img");
    if (profileImg) {
        profileImg.addEventListener("mousemove", e => {
            const rect = profileImg.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            profileImg.style.transform = `rotateY(${x / 25}deg) rotateX(${-y / 25}deg)`;
        });
        profileImg.addEventListener("mouseleave", () => {
            profileImg.style.transform = "rotateY(0deg) rotateX(0deg)";
        });
    }

    // ---- Smooth scroll helper ----
    document.querySelectorAll("[data-scroll]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // ---- Contact Form (demo) ----
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const msg = document.getElementById('message').value.trim();
        if (!name || !email || !msg) { formStatus.textContent = 'Please complete all required fields.'; return; }
        formStatus.textContent = 'Sending...';
        setTimeout(() => { formStatus.textContent = `Thanks ${name}! Your message was sent (demo).`; contactForm.reset(); }, 900);
    });
    document.getElementById('resetBtn').addEventListener('click', () => { contactForm.reset(); formStatus.textContent = ''; });

    // ---- Particle background ----
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = innerWidth;
        let h = canvas.height = innerHeight;
        const particles = [];
        const colors = ['#00f0ff', '#ff00d0', '#8ae0ff'];

        function rand(min, max) { return Math.random() * (max - min) + min; }
        function initParticles(n = 80) { particles.length = 0; for (let i = 0; i < n; i++) { particles.push({ x: rand(0, w), y: rand(0, h), r: rand(0.6, 2.2), vx: rand(-0.3, 0.3), vy: rand(-0.2, 0.2), col: colors[Math.floor(Math.random() * colors.length)] }); } }
        function draw() {
            ctx.clearRect(0, 0, w, h); particles.forEach(p => { ctx.beginPath(); ctx.fillStyle = p.col; ctx.globalAlpha = 0.12; ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0; });
            for (let i = 0; i < particles.length; i++) { for (let j = i + 1; j < particles.length; j++) { const a = particles[i], b = particles[j]; const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy); if (d < 120) { ctx.beginPath(); ctx.strokeStyle = a.col; ctx.globalAlpha = 0.03 * (1 - d / 120); ctx.lineWidth = 1; ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.globalAlpha = 1; } } }
            requestAnimationFrame(draw);
        }
        function resize() { w = canvas.width = innerWidth; h = canvas.height = innerHeight; initParticles(Math.max(60, Math.floor(w * h / 90000))); }
        window.addEventListener('resize', resize);
        initParticles(); draw();
    }

});

// Neon profile hover 3D tilt
const profileImg = document.getElementById("profileImg");
if(profileImg){
  profileImg.addEventListener("mousemove", e => {
    const rect = profileImg.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    profileImg.style.transform = `rotateY(${x/25}deg) rotateX(${-y/25}deg)`;
  });
  profileImg.addEventListener("mouseleave", () => {
    profileImg.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}


// Hologram project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    card.style.transform = `perspective(900px) rotateY(${x/25}deg) rotateX(${-y/25}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () =>
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)'
  );
});
