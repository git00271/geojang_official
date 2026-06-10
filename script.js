/**
 * 거장수산 (GEOJANG FISHERIES) - Premium Official Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== 1. NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run initially in case of refresh
    
    
    // ===== 2. MOBILE HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };
    
    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when resizing beyond mobile view
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    
    // ===== 3. AUTOMATIC FADE-UP ANIMATION TRIGGER (Intersection Observer) =====
    // Add fade-up class programmatically to key components for clean HTML
    const animateTargets = [
        '.section-header',
        '.about-img-wrap',
        '.about-content',
        '.service-card',
        '.pillar',
        '.portfolio-item',
        '.menu-card',
        '.phase-card',
        '.product-card',
        '.team-card',
        '.contact-info',
        '.contact-form',
        '.haccp-note'
    ];
    
    animateTargets.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('fade-up');
            // Distribute animation delays for sequential grids
            if (selector === '.service-card' || selector === '.pillar' || selector === '.portfolio-item' || selector === '.menu-card' || selector === '.phase-card' || selector === '.product-card' || selector === '.team-card') {
                const delayIndex = (index % 4) + 1; // max 4 delay classes
                el.classList.add(`delay-${delayIndex}`);
            }
        });
    });
    
    // Observer options
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // triggers when 10% of element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once animated, no need to observe again
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-up elements
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(el => observer.observe(el));
    
    
    // ===== 4. SMOOTH SCROLL FOR ALL ANCHORS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight + 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ===== 5. CONTACT FORM VALIDATION & SUBMISSION =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const inquiryType = document.getElementById('inquiry-type').value;
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name) {
                showToast('이름 또는 상호명을 입력해 주세요.', 'error');
                return;
            }
            if (!phone) {
                showToast('연락처를 입력해 주세요.', 'error');
                return;
            }
            if (!inquiryType) {
                showToast('문의 유형을 선택해 주세요.', 'error');
                return;
            }
            
            // Phone pattern check (simple check for numbers and dashes)
            const phoneRegex = /^[0-9\-+\s]{9,15}$/;
            if (!phoneRegex.test(phone)) {
                showToast('올바른 연락처 형식을 입력해 주세요.', 'error');
                return;
            }
            
            // Simulate successful submission (Since no backend)
            const submitButton = document.getElementById('form-submit');
            const originalBtnText = submitButton.innerHTML;
            
            // Loading state
            submitButton.disabled = true;
            submitButton.innerHTML = `<span>전송 중...</span><span class="btn-arrow">⏳</span>`;
            
            setTimeout(() => {
                // Restore button
                submitButton.disabled = false;
                submitButton.innerHTML = originalBtnText;
                
                // Show success modal/alert
                showSuccessModal(name);
                
                // Clear form
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Toast Notification Creator
    const showToast = (message, type = 'info') => {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-container');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toastContainer = document.createElement('div');
        toastContainer.className = `toast-container toast-${type}`;
        toastContainer.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;
        
        document.body.appendChild(toastContainer);
        
        // Add toast styling dynamically to head if not present
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.innerHTML = `
                .toast-container {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background-color: #1F2937;
                    border-left: 4px solid #FF5E13;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                    border-radius: 4px;
                    padding: 16px 24px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease-out;
                    color: #fff;
                }
                .toast-error {
                    border-left-color: #EF4444;
                }
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .toast-icon {
                    font-size: 1.1rem;
                }
                .toast-message {
                    font-size: 0.95rem;
                    font-weight: 500;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Auto remove toast
        setTimeout(() => {
            toastContainer.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                toastContainer.remove();
            }, 500);
        }, 3000);
    };
    
    // Success Modal Overlay
    const showSuccessModal = (clientName) => {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-success-icon">🎉</span>
                    <h2>상담 신청 완료</h2>
                </div>
                <div class="modal-body">
                    <p><strong>${clientName}</strong>님, 거장수산에 문의해 주셔서 대단히 감사합니다.</p>
                    <p>작성해 주신 연락처로 F&B 및 숙성회 전문 디렉터가 신속히 연락해 드리겠습니다. (보통 24시간 이내 연락)</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-close-btn" id="modal-close-btn">확인</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalOverlay);
        document.body.style.overflow = 'hidden'; // Lock scrolling
        
        // Modal style
        if (!document.getElementById('modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.innerHTML = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(7, 11, 20, 0.85);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10001;
                    animation: fadeIn 0.3s ease;
                }
                .modal-content {
                    background-color: #111827;
                    border: 1px solid rgba(255, 94, 19, 0.3);
                    border-radius: 16px;
                    padding: 40px;
                    width: 90%;
                    max-width: 500px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.5);
                    animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    text-align: center;
                }
                .modal-header {
                    margin-bottom: 20px;
                }
                .modal-success-icon {
                    font-size: 3.5rem;
                    display: block;
                    margin-bottom: 15px;
                }
                .modal-content h2 {
                    color: #fff;
                    font-size: 1.8rem;
                }
                .modal-body {
                    margin-bottom: 30px;
                    color: #9CA3AF;
                    line-height: 1.6;
                }
                .modal-body p {
                    margin-bottom: 12px;
                }
                .modal-body strong {
                    color: #FF5E13;
                }
                .modal-close-btn {
                    background: linear-gradient(135deg, #FF8E53 0%, #FF5E13 100%);
                    color: #fff;
                    font-weight: 600;
                    padding: 12px 30px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    width: 100%;
                }
                .modal-close-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(255, 94, 19, 0.25);
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleUp {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        const closeBtn = modalOverlay.querySelector('#modal-close-btn');
        closeBtn.addEventListener('click', () => {
            modalOverlay.remove();
            document.body.style.overflow = 'auto'; // Unlock scroll
        });
    };
});
