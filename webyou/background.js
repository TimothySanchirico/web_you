var currentTabId = null;
var startTime = null;
var curr_domain = null;
var curr_domain_old = null;

var personality_array;
var class_array;
var first_time = 0;



// Openness, Extraversion, Neuroticism, Concientiousness, Agreeableness : order of personality_array
function get_arrays(){
  chrome.storage.local.get('user_personality', function(result){
    first_time = 1;
    personality_array = result['user_personality'];
  });

  chrome.storage.local.get('user_history', function(result){
    first_time = 1;
     class_array = result['user_history'];
  });
  //check null case

  if(first_time == 0){
    personality_array = [];
    class_array = [];
    for(var i = 0; i < 5; i++){
      personality_array.push(0);
    }
    for(var i = 0; i < 13; i++){
      class_array.push(0);
    }

  }

}

function save_arrays(){
  //set the personality values
  chrome.storage.local.set({'user_personality': personality_array}, function(res){
    console.log(res);
  });
  chrome.storage.local.set({'user_history': class_array}, function(res){
    console.log(res);
  });
  // push them to content scripts
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {personality: personality_array, history: class_array}, function(response) {
      
    });
  });
}

// Openness, Extraversion, Neuroticism, Concientiousness, Agreeableness : order of personality_array

function personality_algorithm(classes){
  get_arrays();
  for(var i = 0; i < classes.length; i++){
    if(classes[i] == 'social'){
        class_array[0]++;
        personality_array[2] = personality_array[2] + 0.5;
        personality_array[3] = personality_array[3] + 0.5;
        personality_array[1] = personality_array[1] + 0.2;
        personality_array[0] = personality_array[0] + 0.2;

    }
    else if(classes[i] == 'educational'){
      class_array[1]++;
      personality_array[0] = personality_array[0] + 0.5;
      personality_array[1] = personality_array[1] + 0.5;
      personality_array[3] = personality_array[3] + 0.2;

    }
    else if(classes[i] == 'business'){
      class_array[2]++;
      personality_array[2] = personality_array[2] + 0.2;
      personality_array[3] = personality_array[3] + 0.5;
      personality_array[1] = personality_array[1] + 0.5;
    }
    else if(classes[i] == 'programming'){
      class_array[3]++;
      personality_array[2] = personality_array[2] + 0.5;
      personality_array[1] = personality_array[1] + 0.5;
      
    }
    else if(classes[i] == 'sports'){
      class_array[4]++;
      personality_array[1] = personality_array[1] + 0.5;
      personality_array[0] = personality_array[0] + 0.1;
    }
    else if(classes[i] == 'politics'){
      class_array[5]++;
        personality_array[2] = personality_array[2] + 0.5;
        personality_array[0] = personality_array[0] + 0.5;
      if (personality_array[4]>0.5){
        personality_array[4]=personality_array[4]-0.25;
      }
    }
    else if(classes[i] == 'news'){
      class_array[6]++;
      personality_array[3] = personality_array[3] + 0.5;
      personality_array[0] = personality_array[0] + 0.5;
    }
    else if(classes[i] == 'religion'){
      class_array[7]++;
      personality_array[3] = personality_array[3] + 1;
      personality_array[4] = personality_array[4] + 0.5;
    }
    else if(classes[i] == 'food'){
      class_array[8]++;
      personality_array[1] = personality_array[1] + 0.5;
      personality_array[0] = personality_array[0] + 0.5;
    }
    else if(classes[i] == 'shopping'){
      class_array[9]++;
      personality_array[2] = personality_array[2] + 0.5;
    }
    else if(classes[i] == 'travel'){
      class_array[10]++;
      personality_array[4] = personality_array[4] + 0.5;
      personality_array[1] = personality_array[1] + 0.5;
      personality_array[0] = personality_array[0] + 0.5;
    }
    else if(classes[i] == 'videogames'){
      class_array[11]++;
      personality_array[2] = personality_array[2] + 0.5;
      personality_array[1] = personality_array[1] + 0.5;
    }
    else if(classes[i] == 'other'){
      class_array[12] = class_array[12] + 0.1;
    }

  }
  save_arrays();

}




function parse_response(response){
  console.log("Response recieved")
  class_list = response.split(':');
  personality_algorithm(class_list);
 
}

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
  	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var data_url = tabs[0].url;
    curr_domain=extractDomain(data_url)
    if(curr_domain!=curr_domain_old) {
       console.log("OnUpdated Request fired........." + curr_domain)
        $.post('http://127.0.0.1:5000/get_url', {'current_domain':curr_domain}, 
            function(resp){
              // console.log(resp)
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
      curr_domain=extractDomain(curr_url)
      if(curr_domain!=curr_domain_old) {
        console.log("OnActivated Request fired.........")
        $.post('http://127.0.0.1:5000/get_url', {'current_domain':curr_domain}, 
            function(resp){
              // console.log(resp)
             parse_response(resp)
        });
        curr_domain=curr_domain_old;
      }
  });
});



function pause() {
  console.log("Pausing timers.");
  localStorage["paused"] = "true";
 }


 function resume() {
  console.log("Resuming timers.");
  localStorage["paused"] = "false";
}



function updateCounter() {
  /* Don't run if we are paused. */
  if (localStorage["paused"] == "true") {
    curr_domain = null;
    return;
  }
 
  if (currentTabId == null) {
    return;
  }
 
  chrome.tabs.get(currentTabId, function(tab) {
    /* Make sure we're on the focused window, otherwise we're recording bogus stats. */
    chrome.windows.get(tab.windowId, function(window) {
      if (!window.focused) {
        return;
      }
 
 
      /* We can't update any counters if this is the first time visiting any
       * site. This happens on browser startup. Initialize some variables so
       * we can perform an update next time. */
      if (!curr_domain_old) {
        curr_domain_old = curr_domain;
        startTime = new Date();
        return;
      }
 
      /* Update the time spent for this site by comparing the current time to
       * the last time we were ran. */
      var now = new Date();
      var delta = now.getTime() - startTime.getTime();
      // If the delta is too large, it's because something caused the update interval
      // to take too long. This could be because of browser shutdown, for example.
      // Ignore the delta if it is too large.
      if (delta < (updateCounterInterval + updateCounterInterval / 2)) {
        updateTime(curr_domain, delta/1000);
      } else {
        console.log("Delta of " + delta/1000 + " seconds too long; ignored.");
      }
 
      /* This function could have been called as the result of a tab change,
       * which means the site may have changed. */
      curr_domain_old = curr_domain;
      startTime = now;
    });
  });
}


function updateTime(site, seconds) {
  var sites = JSON.parse(localStorage.sites);
  if (!sites[site]) {
    sites[site] = 0;
  }
  sites[site] = sites[site] + seconds;
  localStorage.sites = JSON.stringify(sites);
}



