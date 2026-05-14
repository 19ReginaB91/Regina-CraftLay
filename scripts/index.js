/**
 * Handles the theme switching logic with a "burst" animation
 * @param {string} themeName - The name of the theme file to load (e.g., 'violet')
 */
function changeTheme(themeName) {
    const overlay = document.getElementById('theme-overlay');
    const themeLink = document.getElementById('theme-link');
    
    // Define explosion colors for each theme
    const colors = { 
        violet: '#2a1b4d', 
        nude: '#f5ece5', 
        bold: '#051a10' 
    };

    // Set the overlay color based on selected theme
    overlay.style.backgroundColor = colors[themeName];

    // Trigger CSS animation class
    overlay.classList.add('is-animating');

    // Wait for the animation to cover the screen before switching CSS
    setTimeout(() => {
        themeLink.href = `css/style-${themeName}.css`;
        
        // Remove animation class to reset for next switch
        setTimeout(() => {
            overlay.classList.remove('is-animating');
        }, 500);
    }, 800);
}

// Burger menu toggle logic
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
});