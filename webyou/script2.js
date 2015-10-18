var w = 300,
	h = 300;

var colorscale = d3.scale.category10();

//Legend titles
// var LegendOptions = ['Smartphone','Tablet'];

//Data
var d = [
		  [
			{axis:"Neuroticism",value:0.99},
			{axis:"Openness",value:0.41},
			{axis:"Extroversion",value:0.27},
			{axis:"Agreeableness",value:0.28},
			{axis:"Conscienciousness", value:0.03}
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