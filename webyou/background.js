var curr_domain = "";
var curr_domain_old = "";

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
  	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var data_url = tabs[0].url;
    // console.log(data_url);
    curr_domain=data_url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
    console.log(curr_domain);
    if(curr_domain!=curr_domain_old) {
      	console.log(curr_domain);
      	$.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/get_url", 
            data: curr_domain,
            success: function(msg){
            	console.log(data);
           },
           error: function(){
                if(typeof(Me.config.onError) == "function"){
                    Me.config.onError();
                }
           }
         });
      	curr_domain=curr_domain_old

      }


   // chrome.tabs.sendMessage(activeTab.id, {"message": "new_tab"});
  });

  }
})




