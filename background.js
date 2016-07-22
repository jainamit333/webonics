
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    if(changeInfo.url !== undefined && changeInfo.url.length>0){
        saveNewUrl(tab);    
    }
    
})

chrome.tabs.onCreated.addListener(function(tab){
    saveNewUrl(tab);
})

function saveNewUrl(tab){

}
