
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    if(changeInfo.url !== undefined && changeInfo.url.length>0){
        saveNewUrl(tab);    
    }
})

chrome.tabs.onCreated.addListener(function(tab){
    saveNewUrl(tab);
})

function saveNewUrl(tab){
	
	var xhr = new XMLHttpRequest();
	//xhr.onreadystatechange = handleStateChange;
	xhr.open("POST", "http://localhost:8181/api/tab/event");
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send(JSON.stringify(tab));
}
