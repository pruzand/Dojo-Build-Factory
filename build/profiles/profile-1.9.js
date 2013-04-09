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
			// needed to support legacy i18n api
			'dojo-v1x-i18n-Api':1,
			// Disables some of the error handling when loading modules.
			'config-dojo-loader-catches': 0,
			// Disables code dealing with modules that don't load
			'dojo-timeout-api': 0,
			// Disable support for legacy IE event behaviour API (attachEvent versus attachEventListener).
			'ie-event-behavior': 0,
			// We aren�t loading tests in production
			'dojo-test-sniff':0,
			// Don't add replacement console
			'dojo-guarantee-console': 0

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

			"dojo/dnd-layer":{
				include: use("dojo_dnd"),
				exclude: [
					"dojo/core-web-layer"
				]
			},

			"dojo/dojo-datasources-layer":{
				include: use("dojo_datasources"),
				exclude: [
					"dojo/core-web-layer"
				]
			},

			"dojo/mobile-ui-layer":{
				include: use("mobile"),
				exclude: [
					"dojo/core-web-layer",
					"dojo/mobile-bidi-layer"
				]
			},

			"dojo/mobile-bidi-layer":{
				include: use("mobile_bidi"),
				exclude: [
					"dojo/core-web-layer",
					"dojox/mobile/ListItem",
					"dojox/mobile/RoundRectList",
					"dojo/mobile-ui-layer"
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
					"dojo/graphics-layer",
					"dojo/charting-bidi-layer"
				]
			},

			"dojo/charting-bidi-layer": {
				include: use("charting_bidi"),
				exclude: [
					"dojo/core-web-layer",
					"dojo/mobile-ui-layer",
					"dojo/graphics-layer",
					"dojo/charting-layer"
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
					"dojo/core-web-layer",
					"dojo/dnd-layer",
					"dojo/dojo-datasources-layer",
					"dojo/html",
					"dojo/nls/colors"
				]
			},

			"dojo/dijit-editor":{
				include: use("dijit_editor"),
				exclude: [
					"dojo/core-web-layer",
					"dojo/dijit-layer"
				]
			},

			"dojo/gridx-desktop-layer":{
				include: use("gridx_desktop"),
				exclude: [
					"dojo/core-web-layer",
					"dojo/dijit-layer"
				]
			},

			"dojo/gridx-mobile-layer":{
				include: use("gridx_mobile"),
				exclude: [
					"dojo/core-web-layer",
					"dojo/mobile-ui-layer",
					"dojo/dijit-layer"
				]
			}
		}
	};	
})();
