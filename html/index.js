document.addEventListener('DOMContentLoaded', () => {
    // Start showcase animations from the beginning when hovering
    document.querySelectorAll('.anim').forEach(img => 
        img.addEventListener('mouseenter', () => img.src = img.src));

    // Prevent simple crawlers from scraping my email.
    const mail = 'mail';
    const me = 'jack';
    const domain = 'foltz.io';
    document.querySelector('#secret').href = `${mail}to:${me}@${domain}`;
});
