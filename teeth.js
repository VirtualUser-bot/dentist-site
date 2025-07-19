// teeth.js
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const teethCount = Math.floor(Math.random() * 3) + 6; // 6-8 зубів
    
    for (let i = 0; i < teethCount; i++) {
        const tooth = document.createElement('div');
        tooth.className = 'tooth';
        tooth.innerHTML = '🦷';
        
        // Випадкові початкові позиції
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const animationDuration = 15 + Math.random() * 10;
        const delay = Math.random() * 5;
        
        tooth.style.cssText = `
            left: ${startX}%;
            top: ${startY}%;
            animation-duration: ${animationDuration}s;
            animation-delay: ${delay}s;
        `;
        
        header.appendChild(tooth);
    }
});
