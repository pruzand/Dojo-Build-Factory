var profile = {
	"action"				  : "release",

	// point basePath to build/
	"basePath"				  : "../",
	"releaseDir"			  : "./tmp",
	"selectorEngine"		  : "acme",
	"optimize"				  : "closure",
	"layerOptimize"			  : "closure",
	"stripConsole"			  : "normal",
	"copyTests"				  : false,
	
	"cssImportIgnore"		  : "../dijit.css",
	"cssOptimize"			  : "comments.keepLines",
	"mini"					  : true,
	"webkitMobile"			  : true,
	// specificy a list of locale to generate flattened nls bundle, or set
	// it to null to rely on new 1.7 behavior
	"localeList"			  : "en-us,fr-fr",
	
	// comment out these options if you load the layers with <script> tag (and you should not!)
	// instead of require(..) them.
	//"insertAbsMids"			  : true,
	//"compat" : 1.6,
	//"noref" : true,
	
	packages:[
		{ name:"dojo"		 , location:"./src/dojo"		},
		{ name:"dojox"		 , location:"./src/dojox"		},
		{ name:"dijit"		 , location:"./src/dijit"		}
	]
}