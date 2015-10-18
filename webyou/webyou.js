$(document).ready(function(){
	var personality_array =[];
	var class_array = [];
	console.log("Printing shit")
	chrome.storage.local.get('user_personality', function(result){
	    first_time = 1;
	    personality_array = result['user_personality'];
	  });


	 chrome.storage.local.get('user_history', function(result){
	    first_time = 1;
	     class_array = result['user_history'];
	  });

	  console.log(class_array);

	});
	
	