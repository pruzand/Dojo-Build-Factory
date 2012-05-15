var profile = (function(){
	return {
		staticHasFeatures: {
	        // The trace & log APIs are used for debugging the loader, so we don�t need them in the build
	        'dojo-trace-api':0,
	        'dojo-log-api':0,
	        // This causes normally private loader data to be exposed for debugging, so we don�t need that either
	        'dojo-publish-privates':0,
	        // We aren�t loading tests in production
	        'dojo-test-sniff':0
	        // no sync loader
			//'dojo-sync-loader':0,
			//'dojo-v1x-i18n-Api':0, // see http://bugs.dojotoolkit.org/ticket/14831
			//'dojo-xhr-factory':0 // see http://bugs.dojotoolkit.org/ticket/14831
	    },

		layers: {
			"dojo/dojo" : {
				customBase: true,
				boot: true,
				include: [
					"dojo/dojo",
					// http://bugs.dojotoolkit.org/ticket/14947
					"dojo/i18n"
				],
				exclude: [
			      	"dojo/_base/json",
			    	"dojo/on",
			    	"dojo/json",
			    	"dojo/has",
			    	"dojo/dom-form",
			    	"dojo/_base/sniff",
			    	"dojo/_base/xhr",
			    	"dojo/io-query",
			    	"dojo/_base/Deferred",
			    	"dojo/_base/window",
			    	"dojo/dom",
			    	"dojo/_base/kernel",
			    	"dojo/_base/lang",
			    	"dojo/_base/array",
			    	"dojo/_base/config"
				]
		    },
		    
		    "dojo/mobile-ui-layer":{
		    	include: use("mobile"),
				exclude: [
				    "dojo/core-web-layer"
				]
			},
			
			"dojo/mobile-compat-layer":{
				include: use("mobile_compat"),
				exclude: [
				    "dojo/core-web-layer",
				    "dojo/mobile-ui-layer"
				]
			},
			
			"dojo/core-web-layer": {
				include: use("dojo_core_web", "common_ui")
			},
	
			"dojo/graphics-layer": {
				include: use("graphics"),
				exclude: [
				    "dojo/core-web-layer"
				]
			},
			
			"dojo/charting-layer": {
				include: use("charting"),
				exclude: [
					"dojo/core-web-layer",
					"dojo/mobile-ui-layer",
					"dojo/graphics-layer"
				]
			},
			
			"dojo/calendar-layer": {
				include: use("calendar"),
				exclude:[
					"dojo/core-web-layer",
					"dojo/mobile-ui-layer"
				]
			},
			
			"dojo/treemap-layer": {
				include: use("treemap"),
				exclude:[
					"dojo/core-web-layer"
				]
			},
			
			"dojo/dgauges-layer":{
				include: use("dgauges"),
				exclude:[
					"dojo/core-web-layer",
					"dojo/mobile-ui-layer",
					"dojo/graphics-layer"
				]
			},
			
			"dojo/dijit-layer":{
				include: use("dijit"),
				exclude:[
				    "dojo/data/util/filter",
				    "dojo/data/util/sorter",
					"dojo/core-web-layer",
					"dojo/dnd/autoscroll",
					"dojo/dnd/Avatar",
					"dojo/dnd/common",
					"dojo/dnd/Manager",
					"dojo/dnd/move",
					"dojo/dnd/Moveable",
					"dojo/dnd/Mover",
					"dojo/dnd/TimedMoveable",
					"dojo/html",
					"dojo/nls/colors",
					"dojo/store/Memory",
					"dojo/store/util/QueryResults",
					"dojo/store/util/SimpleQueryEngine"
				]
			}
		}
	};	
})();
