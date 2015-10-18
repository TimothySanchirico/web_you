var curr_domain = "";
var curr_domain_old = "";

function parse_response(response){
  class_list = response.split(':');
  for(var i = 0; i < class_list.length; i++){
     console.log(class_list[i]);
  }
 
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
  	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var data_url = tabs[0].url;
    // console.log(data_url);
    curr_domain=data_url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
    //console.log(curr_domain);
    if(curr_domain!=curr_domain_old) {
      	console.log(curr_domain);
        $.post('http://127.0.0.1:5000/get_url', {'current_domain':curr_domain}, 
            function(resp){
              parse_response(resp)
              // parse_response(resp);
              /* Parse the response "class:class:class" */
              /* Add to storage*/ 
        });
      	curr_domain=curr_domain_old;
      }
  });

  }
});

chrome.tabs.onActivated.addListener( function (info) {
  chrome.tabs.get(info.tabId, function(tab){
      var curr_url = tab.url;
      curr_domain=curr_url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
      if(curr_domain!=curr_domain_old) {
        // console.log(curr_domain);
        $.post('http://127.0.0.1:5000/get_url', {'current_domain':curr_domain}, 
            function(resp){
             parse_response(resp)
        });
        curr_domain=curr_domain_old;
      }
  });
})




