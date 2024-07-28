document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleButton');

  // Durumu almak ve buton metnini güncellemek için depolama API'sini kullanın
  chrome.storage.sync.get(['bottomBarEnabled'], function(result) {
    toggleButton.textContent = result.bottomBarEnabled ? 'Hide Bottom Bar' : 'Show Bottom Bar';
  });

  toggleButton.addEventListener('click', function() {
    chrome.storage.sync.get(['bottomBarEnabled'], function(result) {
      const newStatus = !result.bottomBarEnabled;
      chrome.storage.sync.set({ bottomBarEnabled: newStatus }, function() {
        toggleButton.textContent = newStatus ? 'Hide Bottom Bar' : 'Show Bottom Bar';
        
        // İçerik scriptine mesaj göndererek durumu güncelle
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { bottomBarEnabled: newStatus });
        });
      });
    });
  });
});

