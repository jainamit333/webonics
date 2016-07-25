	var isLogined = false;
	var id = null;
	var email = null;
	var like = true;
	var likeCount = 1;
	var unlikeCount =0;
	var tags = [];
	var notes = "";
	var tabObjct=null;

	chrome.tabs.getCurrent( function(tab) {  
		tabObjct = tab;
	});

	chrome.storage.sync.get('info',function(valueOfId){

		if(valueOfId.info.id.length == 0){
			login_me();
		}else{
			isLogined = true;
			id = valueOfId.info.id;
			email = valueOfId.info.email;
			loadData();
		}
		
	});
	//alert(JSON.stringify());
	$(document).ready(function(){
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
	    					savePageData();
	    				}
	    		}
	    	}
		});
		$('#note-textarea').focusout(function(){
			if($('#note-textarea').val()!== notes){
				notes= $('#note-textarea').val();
				//push data to server
				savePageData();
			}
		});
		$('#red-heart').click(function(){
				like=false;
				$('#red-heart').toggle();
				$('#grey-heart').toggle();
				likeCount--;
				$('#like-count').innerText(likeCount);
				savePageData();
		});
		$('#grey-heart').click(function(){
				like=true;
				$('#red-heart').toggle();
				$('#grey-heart').toggle();
				likeCount++;
				$('#like-count').innerText(likeCount);
				savePageData();
		});
		$('#login').click(function(){
			login_me();
			loadData();
		});
	});

	

	function savePageData(){
		var reqestParam = {
			"user_id":id,
			"user_email":email,
			"tab_details":tabObjct,
			"like":like,
			"tags":tags,
			"notes":notes
		};

		var xhr = new XMLHttpRequest();
		//xhr.onreadystatechange = handleStateChange;
		xhr.open("POST", "http://localhost:8181/api/tab/userPageInfo");
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(JSON.stringify(reqestParam));
	}

	function loadData(){
		if(isLogined){

			if(like){
				$("#red-heart").hide();
			}else{
				$("#grey-heart").hide();	
			}
			getPageDataFromApi();
			getUserPageData();

		}else{
			$('#is_logined').hide();
			$('#is_not_logined').show();
		}
	}

	function login_me(){

		chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
	  			chrome.identity.getProfileUserInfo(function(userInfo){  
	  				if(userInfo.id.length>0){
	  					id = userInfo.id;
	  					email = userInfo.email;
	  					chrome.storage.sync.set({'info': userInfo}, function() {
	          				message('Ids saved');
	    				});	
	    				isLogined = true;
	    				loadData();
	  				}
	  			});
			});
	}

	function getPageDataFromApi(){

		var reqestParan = {
			"user_id": id,
			"current_tab_url" : tabObjct.url
		}	
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:8181/api/tab/data");
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function() {
 			 if (xhr.readyState == 4) {
    			 var response = xhr.responseText;
  			}
		}
		xhr.send(JSON.stringify(reqestParan));

	}
	function getUserPageData(){

		var reqestParan = {
			"user_id": id,
			"current_tab_url" : tabObjct.url
		}	
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:8181/api/tab/userdata");
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function() {
 			 if (xhr.readyState == 4) {
    			 var response = xhr.responseText;
  			}
		}
		xhr.send(JSON.stringify(reqestParan));
	}