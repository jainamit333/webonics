chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  // Use the token.
  alert(token);
});