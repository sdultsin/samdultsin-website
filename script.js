// Console log to verify JavaScript is loaded
console.log("Website loaded successfully!");

// Toggle accordion service cards
function toggleService(element) {
    const serviceCard = element.parentElement;
    const isActive = serviceCard.classList.contains('active');
    
    // Close all other accordions
    document.querySelectorAll('.service.accordion').forEach(card => {
        card.classList.remove('active');
    });
    
    // Toggle current accordion
    if (!isActive) {
        serviceCard.classList.add('active');
    }
}