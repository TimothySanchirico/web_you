var class_array;
var personal_array;
chrome.storage.local.get(function(res){
	console.log(res.user_personality);
	class_array = res.user_history;
	personal_array = res.user_personality;
	draw_class_shit(class_array);
	draw_personal_shit(personal_array);

	
});

/*

chrome.storage.local.get(function(res){
	console.log(res); });

*/
function draw_class_shit(class_array){
	var w = 300,
	h = 300;

var colorscale = d3.scale.category10();

//Legend titles
// var LegendOptions = ['Smartphone','Tablet'];
var sum = 0;


for(var i = 0; i < class_array.length; i++){
	sum += class_array[i];
	console.log(class_array[i]);
}

for(var i = 0; i < class_array.length; i++){
	class_array[i] = class_array[i] / sum;
}

//Data
var d = [
		  [
			{axis:"Social",value: class_array[0]},
			{axis:"Education",value: class_array[1]},
			{axis:"Business",value: class_array[2]},
			{axis:"Programming",value: class_array[3]},
			{axis:"Sports",value: class_array[4]},
			{axis:"Politics",value:  class_array[5]},
			{axis:"News",value:  class_array[6]},
			{axis:"Religion",value:  class_array[7]},
			{axis:"Food",value:  class_array[8]},
			{axis:"Shopping",value:  class_array[9]},
			{axis:"Travel",value:  class_array[10]},
			{axis:"Video games",value:  class_array[11]},
			{axis:"Other", value:  class_array[12]}
			
		  ]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

}


function draw_personal_shit(personal_array){
	var w = 300,
	h = 300;

var colorscale = d3.scale.category10();

var sum = 0;


for(var i = 0; i < personal_array.length; i++){
	sum += personal_array[i];
	console.log(personal_array[i]);
}

for(var i = 0; i < personal_array.length; i++){
	personal_array[i] = personal_array[i] / sum;
}

// Openness, Extraversion, Neuroticism, Concientiousness, Agreeableness 
//Data
var d = [
		  [
			{axis:"Neuroticism",value: personal_array[2]},
			{axis:"Openness",value: personal_array[0]},
			{axis:"Extroversion",value: personal_array[1]},
			{axis:"Agreeableness",value: personal_array[4]},
			{axis:"Conscienciousness", value: personal_array[3]}
		  ]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart2", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body2')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)
}