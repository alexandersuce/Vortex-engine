// Search function
document.querySelector('.search').addEventListener('input', function(e) {
    const searchValue = e.target.value.toLowerCase();
    
    // Simulating search functionality (you'd likely fetch real data here)
    const games = document.querySelectorAll('.game-card');
    games.forEach(game => {
        if (game.textContent.toLowerCase().includes(searchValue)) {
            game.style.display = 'block';
        } else {
            game.style.display = 'none';
        }
    });

    // Show search page if something is being searched
    if (searchValue) {
        document.getElementById('search-page').style.display = 'block';
    } else {
        document.getElementById('search-page').style.display = 'none';
    }
});
document.querySelectorAll('.game-card').forEach(function(card) {
    card.addEventListener('click', function() {
        const url = card.getAttribute('data-url');
        window.location.href = url;
    });
});
