var profile = (function(){
	return {
		staticHasFeatures: {
			
	        // The trace & log APIs are used for debugging the loader, so we don�t need them in the build
	        'dojo-trace-api':0,
	        // Disables the logging code of the loader
	        'dojo-log-api':0,
	        // This causes normally private loader data to be exposed for debugging, so we don�t need that either
	        'dojo-publish-privates':0,
	        // no sync loader. Enable if legacy api support like dojo.require() is needed. 
			'dojo-sync-loader':0,
			// needed by flattened nls bundle support
	        'dojo-v1x-i18n-Api':1,
			// Disables some of the error handling when loading modules.
	        'config-dojo-loader-catches': 0,
            
	        'dojo-timeout-api': 0,
            //'dojo-sniff': 0, // if false, baseUrl must be set
            'dojo-cdn': 0,
            'ie-event-behavior': 0,
			// Removes support for module unloading
			'dojo-undef-api': 0,
	        // We aren�t loading tests in production
	        'dojo-test-sniff':0,
			// Don't add replacement console
			'dojo-guarantee-console': 0,
			// Disables Firebug Lite for browsers that don't have a developer console
			'dojo-firebug': 0,
			// Disables support for RequireJS
			'dojo-requirejs-api': 0

			// Disables some diagnostic information ?
			// 'dojo-debug-messages': 0,
			// Assumes that all modules are AMD ?
			// 'dojo-amd-factory-scan': 0,

		},

		layers: {
			"dojo/dojo" : {
				customBase: true,
				boot: true,
				include: [
					"dojo/dojo",
					"dojo/i18n"
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
