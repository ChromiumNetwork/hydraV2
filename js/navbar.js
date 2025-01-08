document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('popup'); // Ensure this is the correct ID
  const supportButton = document.querySelector('.settings-item'); // Button to show modal
  const closeModalButtons = document.querySelectorAll('#close-modal, #close-footer');

  // Show modal when clicking "Support Me"
  supportButton.addEventListener('click', () => {
    modal.classList.add('show'); // Display modal
  });

  // Close modal when clicking close buttons
  closeModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      modal.classList.remove('show'); // Hide modal
    });
  });

  // Optional: Close modal when clicking outside the modal container
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('show'); // Hide modal
    }
  });
});

