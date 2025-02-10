document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('repos'); // Ensure this is the correct ID
    const supportButton = document.querySelector('.repo-list'); // Button to show modal
    const closeModalButtons = document.querySelectorAll('#close-modal1, #close-footer1');
  
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
  document.addEventListener('DOMContentLoaded', () => {
    const asset1Element = document.getElementById('asset1');
    const asset2Element = document.getElementById('asset2');

    fetch('games/status.txt')
        .then(response => response.text())
        .then(text => {
            const lines = text.split('\n');
            const statusMap = {};

            lines.forEach(line => {
                const [key, value] = line.split('=').map(s => s.trim());
                if (key && value) {
                    statusMap[key] = value;
                }
            });

            function updateStatus(element, status) {
                element.textContent = status;
                element.classList.remove('working', 'failing');

                if (status.toLowerCase() === 'working') {
                    element.classList.add('status', 'working');
                } else if (status.toLowerCase() === 'failing') {
                    element.classList.add('status', 'failing');
                }
            }

            if (statusMap['asset1']) updateStatus(asset1Element, statusMap['asset1']);
            if (statusMap['asset2']) updateStatus(asset2Element, statusMap['asset2']);
        })
        .catch(error => console.error('Error fetching asset status:', error));
});
  