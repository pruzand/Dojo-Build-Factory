var profile = (function(){
/*	
	function use(){
		var t = [];
		for(var i=0;i<arguments.length;++i)
			t.push(__layersFeatures[arguments[i]]);
		return Array.prototype.concat.apply([], t);
	};
	*/
	return {
		staticHasFeatures: {
	        // The trace & log APIs are used for debugging the loader, so we don�t need them in the build
	        'dojo-trace-api':0,
	        'dojo-log-api':0,
	        // This causes normally private loader data to be exposed for debugging, so we don�t need that either
	        'dojo-publish-privates':0,
	        // We aren�t loading tests in production
	        'dojo-test-sniff':0,
	        // no sync loader
			'dojo-sync-loader':0
	    },

		layers: {
			"dojo/dojo" : {
				customBase: true,
				boot: true,
				include: [
					"dojo/dojo"
				]
		    },
		    
		    "dojo/mobile-ui-layer":{
		    	include: use("mobile"),
				exclude: [
				    "dojo/core-web-layer"
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
			}
			
		}
	};	
})();