
chrome.identity.getAuthToken({interactive: true
}, function(token) {
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }
    log("hello");
    var x = new XMLHttpRequest();
    x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
    x.setRequestHeader('Authorization',
                           'Bearer ' + token);
    x.onload = function() {
        alert(x.response);
        
    };
    x.send();
});