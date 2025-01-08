// Wait for the entire page to load
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const tipText = [
    "I try to update the games!",
    "any recommendations? send me a email about a game!",
    "DXWare is a good service!",
    "Pro Tip: get better lol",
    "Fun Fact: i like brawl stars ",
  ];

  // Function to show a random tip
  function showRandomTip() {
    const randomIndex = Math.floor(Math.random() * tipText.length);
    document.getElementById('tip-of-the-day').textContent = tipText[randomIndex];
  }

  // Display a random tip
  showRandomTip();

  // Fade out the preloader after 3 seconds
  setTimeout(() => {
    preloader.style.opacity = '0'; // Fade out
    setTimeout(() => {
      preloader.style.display = 'none'; // Completely hide the preloader
    }, 1000); // Match this timeout with the fade-out duration
  }, 2500); // Preloader is visible for 3 seconds
});
