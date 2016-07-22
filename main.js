

var isLogined = false;
var id = null;
var email = null;
var like = true;
var likeCount = 1;
var unlikeCount =0;
var tags = [];
var notes = "";
var currentTab = "";
var tabObjct=null;

chrome.storage.sync.get('info',function(valueOfId){

	if(valueOfId.info.id.length == 0){

		chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  			chrome.identity.getProfileUserInfo(function(userInfo){  
  				if(userInfo.id.length>0){
  					id = userInfo.id;
  					email = userInfo.email;
  					chrome.storage.sync.set({'info': userInfo}, function() {
          				message('Ids saved');
    				});	
    				isLogined = true;
  				}
  				
  			});
		});
	}else{
		isLogined = true;
		id = valueOfId.info.id;
		email = valueOfId.info.email;

	}
	
});
//alert(JSON.stringify());
$(document).ready(function(){
	if(like){
		$("#red-heart").hide();
	}else{
		$("#grey-heart").hide();	
	}
	
	$('#tag-input').bind('keyup', function(e) {
    	if ( e.keyCode === 13 ) { // 13 is enter key
    		if($('#tag-input').val().length>0){

    				var newTag = $('#tag-input').val();
    				$('#tag-input').val("");
    				if($.inArray(newTag,tags) < 0) {
    					tags.push(newTag);
    					$('#tag-holder-div').append('<span class="tag "> '+newTag+
    						' <img src="cross.png" class="cross-icon"></span>');	
    					//push data to server
    				}
    		}
    	}
	});
	$('#note-textarea').focusout(function(){
		if($('#note-textarea').val()!== notes){
			notes= $('#note-textarea').val();
			//push data to server
		}
	});
	$('#red-heart').click(function(){
			like=false;
			$('#red-heart').toggle();
			$('#grey-heart').toggle();
			likeCount--;
			$('#like-count').innerText(likeCount);
			savePageData()
	});
	$('#grey-heart').click(function(){
			like=true;
			$('#red-heart').toggle();
			$('#grey-heart').toggle();
			likeCount++;
			$('#like-count').innerText(likeCount);
	});


	loadData();
});

chrome.tabs.getSelected(null, function(tab) {
     
	tabObjct = tab;
	savePageData(tab);
        //alert(JSON.stringify(tab));
});

function savePageData(tab){

}

function loadData(){

}

