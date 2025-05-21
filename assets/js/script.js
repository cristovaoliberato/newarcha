// Character data
const characters = [
    {
        name: 'AHCHA',
        description: 'Uma menina de 13 anos, órfã de pai e mãe, que mora com sua avó em Palmas. Determinada e corajosa, ela enfrenta o bullying com a ajuda de sua boneca Ê.',
        image: 'ahchaPerfil.png'
    },
    {
        name: 'Ê',
        description: 'A boneca de madeira ipê que AHCHA ganhou quando tinha 1 ano. Mais que um brinquedo, Ê é uma companheira especial que ajuda AHCHA em sua jornada.',
        image: 'ePerfil.png'
    },
    {
        name: 'Avó',
        description: 'A avó de AHCHA, que a criou após a perda dos pais. Uma figura amorosa e protetora que representa o lar e a segurança.',
        image: 'avoPerfil.png'
    },
    {
        name: 'Gangue das Lobas',
        description: 'Um grupo de garotas que pratica bullying contra AHCHA na escola. Representa os desafios e obstáculos que AHCHA precisa superar.',
        image: 'lobasPerfil.png'
    },
    {
        name: 'Mundo de AHCHA',
        description: 'O universo mágico onde AHCHA e Ê vivem suas aventuras, um lugar onde a imaginação e a realidade se misturam.',
        image: '5.png'
    }
];


// Slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.character-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const characterName = document.querySelector('.character-name');
    const characterText = document.querySelector('.character-text');
    const description = document.querySelector('.character-description');
    
    let currentIndex = 0;
    const slideCount = characters.length;
    let isAnimating = false;
    
    // Initialize positions
    function initializeSlider() {
        slides.forEach((slide, index) => {
            const position = index - currentIndex;
            updateSlidePosition(slide, position);
        });
        updateCharacterInfo();
    }
    
    // Update slide positions
    function updateSlidePosition(slide, position) {
        const centerX = track.offsetWidth / 2 - slide.offsetWidth / 2;
        let xPosition;
        
        if (position === 0) {
            xPosition = centerX;
            slide.classList.add('active');
            slide.classList.remove('prev', 'next');
        } else if (position === 1 || position === -slideCount + 1) {
            xPosition = centerX + 220;
            slide.classList.add('next');
            slide.classList.remove('active', 'prev');
        } else if (position === -1 || position === slideCount - 1) {
            xPosition = centerX - 220;
            slide.classList.add('prev');
            slide.classList.remove('active', 'next');
        } else if (position < -1) {
            xPosition = centerX - 440;
            slide.classList.remove('active', 'prev', 'next');
        } else {
            xPosition = centerX + 440;
            slide.classList.remove('active', 'prev', 'next');
        }
        
        slide.style.transform = `translateX(${xPosition}px) scale(${position === 0 ? 1.1 : 0.8})`;
        slide.style.zIndex = position === 0 ? 2 : 1;
        slide.style.opacity = Math.abs(position) <= 1 ? 0.7 : 0.4;
    }
    
    // Update character information
    function updateCharacterInfo() {
        description.classList.remove('active');
        setTimeout(() => {
            characterName.textContent = characters[currentIndex].name;
            characterText.textContent = characters[currentIndex].description;
            description.classList.add('active');
        }, 300);
    }
    
    // Navigation functions
    function moveSlides(direction) {
        if (isAnimating) return;
        isAnimating = true;
        
        description.classList.remove('active');
        currentIndex = (currentIndex + direction + slideCount) % slideCount;
        
        slides.forEach((slide, index) => {
            const position = (index - currentIndex + slideCount) % slideCount;
            updateSlidePosition(slide, position);
        });
        
        updateCharacterInfo();
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Function to move to a specific slide
    function moveToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        description.classList.remove('active');
        currentIndex = index;
        
        slides.forEach((slide, index) => {
            const position = (index - currentIndex + slideCount) % slideCount;
            updateSlidePosition(slide, position);
        });
        
        updateCharacterInfo();
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => moveSlides(-1));
    nextBtn.addEventListener('click', () => moveSlides(1));
    
    // Add click event listeners to slides
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (!slide.classList.contains('active')) {
                moveToSlide(index);
            }
        });
    });
    
    // Initialize slider
    initializeSlider();
    
    // Auto-play functionality
    let autoplayInterval;
    
    function startAutoplay() {
        if (autoplayInterval) return;
        autoplayInterval = setInterval(() => {
            if (!isAnimating) {
                moveSlides(1);
            }
        }, 5000);
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
    
    // Start autoplay and handle hover
    startAutoplay();
    
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
    prevBtn.addEventListener('mouseenter', stopAutoplay);
    prevBtn.addEventListener('mouseleave', startAutoplay);
    nextBtn.addEventListener('mouseenter', stopAutoplay);
    nextBtn.addEventListener('mouseleave', startAutoplay);
});

// Lightbox functionality
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const conceptImages = document.querySelectorAll('.concept-image');

    // Open lightbox
    conceptImages.forEach(image => {
        image.addEventListener('click', () => {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}); 