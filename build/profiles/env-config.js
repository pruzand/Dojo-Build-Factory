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
	"localeList"			  : null,
	"webkitMobile"			  : true,
	
	"preloadLocalizations"	  : 0,
	
	// now a typical loader packages configuration
	packages:[
		{ name:"dojo"		 , location:"./src/dojo"		},
		{ name:"dojox"		 , location:"./src/dojox"		},
		{ name:"dijit"		 , location:"./src/dijit"		}
	]
}