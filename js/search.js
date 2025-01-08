document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('game-search');
  const searchResultsContainer = document.getElementById('search-results');
  const gameLinksContainer = document.getElementById('game-links');
  const searchBarContainer = document.getElementById('search-bar-container');
  const closeButton = document.getElementById('close-search'); // Close button
  const gamesCountHeading = document.getElementById('games-count-heading'); // Get the heading element
  let gamesData = [];

  // Fetch games data
  fetch('games/games.json') // Update this URL to your games.json
    .then(response => response.json())
    .then(games => {
      gamesData = games;
      displayAllGames(gamesData); // Display all games initially
      updateGamesCount(gamesData); // Update game count
    })
    .catch(error => {
      console.error('Error fetching game data:', error);
    });

  // Function to display all games
  function displayAllGames(games) {
    gameLinksContainer.innerHTML = ''; // Clear previous game links
    games.forEach(game => {
      const gameLink = document.createElement('a');
      gameLink.id = 'game-cover';
      gameLink.href = `games.html?game=${encodeURIComponent(game.url)}`; // Redirect through games.html
      gameLink.classList.add('game-link');

      const gameImage = document.createElement('img');
      gameImage.src = game.image;
      gameImage.alt = game.name;
      gameImage.classList.add('game-image');

      const gameName = document.createElement('span');
      gameName.textContent = game.name;

      gameLink.appendChild(gameImage);
      gameLink.appendChild(gameName);
      gameLinksContainer.appendChild(gameLink);
    });
  }

  // Function to update the game count in the heading
  function updateGamesCount(games) {
    const gameCount = games.length; // Get the number of games
    gamesCountHeading.textContent = `Go through our ${gameCount} games we have!`; // Update the heading text
  }

  // Function to search games as user types
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();
    if (query === '') {
      searchResultsContainer.style.display = 'none'; // Hide results if query is empty
      displayAllGames(gamesData); // Show all games
      updateGamesCount(gamesData); // Update game count after search clears
      return;
    }

    const filteredGames = gamesData.filter(game =>
      game.name.toLowerCase().includes(query)
    );

    // If no results, display a no-results message
    if (filteredGames.length === 0) {
      searchResultsContainer.innerHTML = '<p>No results found</p>';
      searchResultsContainer.style.display = 'block';
    } else {
      // Display filtered games
      searchResultsContainer.innerHTML = '';
      filteredGames.forEach(game => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.textContent = game.name;

        // Add a click event to the result item that redirects to games.html
        resultItem.addEventListener('click', () => {
          window.location.href = `games.html?game=${encodeURIComponent(game.url)}`;
        });

        searchResultsContainer.appendChild(resultItem);
      });
      searchResultsContainer.style.display = 'block';
    }

    updateGamesCount(filteredGames); // Update the count after filtering
  });

  // Show the search bar when the search button is clicked
  const searchTrigger = document.querySelector('.navbar-item-inner .link-text');
  searchTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    searchBarContainer.classList.add('active');
    searchInput.focus();
  });

  // Close the search bar when clicking the close button
  closeButton.addEventListener('click', () => {
    searchBarContainer.classList.remove('active');
    searchResultsContainer.style.display = 'none'; // Hide results when closing
  });

  // Close the search bar when clicking outside of the search bar
  document.addEventListener('click', (event) => {
    if (!searchBarContainer.contains(event.target) && !searchTrigger.contains(event.target)) {
      searchBarContainer.classList.remove('active');
      searchResultsContainer.style.display = 'none'; // Hide results when closing
    }
  });

  // Prevent the search bar from closing when clicking inside the search bar itself
  searchBarContainer.querySelector('.search-bar').addEventListener('click', (event) => {
    event.stopPropagation();
  });
});
