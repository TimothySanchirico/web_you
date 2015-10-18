var w = 300,
	h = 300;

var colorscale = d3.scale.category10();

//Legend titles
// var LegendOptions = ['Smartphone','Tablet'];

//Data
var d = [
		  [
			{axis:"Social",value:0.48},
			{axis:"Education",value:0.41},
			{axis:"Business",value:0.27},
			{axis:"Programming",value:0.28},
			{axis:"Sports",value:0.46},
			{axis:"Politics",value:0.29},
			{axis:"News",value:0.11},
			{axis:"Religion",value:0.14},
			{axis:"Food",value:0.05},
			{axis:"Shopping",value:0.19},
			{axis:"Travel",value:0.14},
			{axis:"Video games",value:0.06},
			{axis:"Other", value:0.03}
			
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