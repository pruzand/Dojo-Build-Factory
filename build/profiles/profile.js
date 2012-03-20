var profile = {
	"action"				  : "release",

	// point basePath to ~/dev
	"basePath"				  : "../../",

	"selectorEngine"		  : "acme",
	"optimize"				  : "shrinksafe",
	"layerOptimize"			  : "shrinksafe",
	"stripConsole"			  : "normal",
	"copyTests"				  : false,
	
	"cssImportIgnore"		  : "../dijit.css",
	"cssOptimize"			  : "comments.keepLines",

	"localeList"			  : "en",
	
	// now a typical loader packages configuration
	packages:[
		{ name:"dojo"		 , location:"../dojo"		},
		{ name:"dojox"		 , location:"../dojox"		},
		{ name:"dijit"		 , location:"../dijit"		}
	],
	
	layers: {
		"dojo/dojo" : {
			customBase: true,
			include: [
				"dojo/dojo",
				"dojo/main",
				"dojo/_base/config",
				"dojo/_base/loader",
				"dojo/_base/kernel",				//gfx
				"dojo/_base/array",					//gfx
				"dojo/_base/window",
				"dojo/_base/xhr",
				"dojo/cldr/supplemental",			//mobile
				"dojo/cldr/nls/gregorian",			//mobile
				"dojo/colors",						//gfx
				"dojo/date",						//mobile
				"dojo/date/locale",					//mobile
				"dojo/dom",
				"dojo/dom-class",
				"dojo/dom-construct",
				"dojo/dom-geometry",
				"dojo/dom-style",
				"dojo/fx",
				"dojo/fx/easing",					//charting
				"dojo/i18n",						//charting,mobile
				"dojo/loadInit",
				"dojo/NodeList-fx",
				"dojo/on",
				"dojo/parser",
				"dojo/regexp",						//mobile
				"dojo/store/Memory",				//mobile
				"dojo/text",
				"dojo/window",
				"dojo/selector/acme",
				"dojo/data/util/filter",			//mobile
				"dojo/store/util/SimpleQueryEngine", //mobile
				"dojo/store/util/QueryResults",		//mobile
				"dojox/fx",							//gfx
				"dojox/xml/DomParser",
				"dojox/css3/fx",					//mobile
				"dojox/css3/transit",				//mobile
				"dojox/css3/transition",			//mobile
				"dojox/html/metrics",				//gfx

				// Common UI Framework (Abstract) - Needed by both dijit and dojox/mobile
				"dijit/dijit",						//mobile
				"dijit/_WidgetBase",				//mobile
				"dijit/_TemplatedMixin",			//mobile
				"dijit/_WidgetsInTemplateMixin",	//mobile
				"dijit/_Contained",					//mobile
				"dijit/_Container",					//mobile
				"dijit/_BidiSupport",				//charting
				"dijit/place",						//mobile
				"dijit/registry",					//mobile,charting
				"dijit/form/Button",				//charting
				"dijit/form/_ButtonMixin",			//mobile
				"dijit/form/_FormWidget",			//mobile
				"dijit/form/_FormValueWidget",		//mobile
				"dijit/form/_ListBase",				//mobile
				"dijit/form/_TextBoxMixin",			//mobile
				"dijit/layout/_LayoutWidget",		//mobile
				"dijit/form/_AutoCompleterMixin",	//mobile
				"dijit/form/CheckBox",				//charting
				"dijit/form/nls/ComboBox",			//mobile	
				"dijit/form/_ComboBoxMenuMixin",	//mobile
				"dijit/form/_ExpandingTextAreaMixin",//mobile
				"dijit/form/_CheckBoxMixin",		//charting
				"dijit/form/DataList",				//mobile
				"dijit/form/_RadioButtonMixin",		//mobile
				"dijit/form/ToggleButton",			//charting
				"dijit/form/_ToggleButtonMixin",	//charting
				"dijit/Tooltip"						//charting
			],
			exclude: []
		},
		"dojox/mobile" : {
			include: [
				"dojox/mobile",
				"dojox/mobile/_base",
				"dojox/mobile/_ComboBoxMenu",
//				"dojox/mobile/_compat",
//				"dojox/mobile/compat",	// Including this loads IE/FF support
//				"dojox/mobile/deviceTheme",	 // Including this loads dynamic theming support
				"dojox/mobile/_DataListMixin",
				"dojox/mobile/_ItemBase",
				"dojox/mobile/_ListTouchMixin",
				"dojox/mobile/_ScrollableMixin",
				"dojox/mobile/scrollable",
				"dojox/mobile/sniff",
				"dojox/mobile/Button",
				"dojox/mobile/Carousel",
				"dojox/mobile/CheckBox",
				"dojox/mobile/ComboBox",
				"dojox/mobile/common",
				"dojox/mobile/ContentPane",
				"dojox/mobile/EdgeToEdgeCategory",
				"dojox/mobile/EdgeToEdgeDataList",
				"dojox/mobile/EdgeToEdgeList",
				"dojox/mobile/ExpandingTextArea",
				"dojox/mobile/FixedSplitter",
				"dojox/mobile/FixedSplitterPane",
				"dojox/mobile/FlippableView",
				"dojox/mobile/Heading",
				"dojox/mobile/i18n",
				"dojox/mobile/IconContainer",
				"dojox/mobile/IconItem",
				"dojox/mobile/iconUtils",
				"dojox/mobile/ListItem",
				"dojox/mobile/Opener",
				"dojox/mobile/Overlay",
				"dojox/mobile/PageIndicator",
				"dojox/mobile/Pane",
				"dojox/mobile/RadioButton",
				"dojox/mobile/RoundRect",
				"dojox/mobile/RoundRectCategory",
				"dojox/mobile/RoundRectDataList",
				"dojox/mobile/RoundRectList",
				"dojox/mobile/ScrollableView",
				"dojox/mobile/Slider",
				"dojox/mobile/SpinWheel",
				"dojox/mobile/SpinWheelDatePicker",
				"dojox/mobile/SpinWheelSlot",
				"dojox/mobile/SpinWheelTimePicker",
				"dojox/mobile/SwapView",
				"dojox/mobile/Switch",
				"dojox/mobile/TabBar",
				"dojox/mobile/TabBarButton",
				"dojox/mobile/TextArea",
				"dojox/mobile/TextBox",
				"dojox/mobile/ToggleButton",
				"dojox/mobile/ToolBarButton",
				"dojox/mobile/Tooltip",
				"dojox/mobile/transition",
				"dojox/mobile/TransitionEvent",
				"dojox/mobile/View",
				"dojox/mobile/ViewController",
				"dojox/mobile/SimpleDialog" //1.8
			],
			exclude: [
				"dojo/dojo",
				"dojo/cldr/supplemental",
				"dojo/cldr/nls/gregorian",
				"dojo/date",
				"dojo/date/locale",
				"dojo/i18n",
				"dojo/regexp",
				"dojo/store/Memory",
				"dijit/form/_AutoCompleterMixin",
				"dijit/form/nls/ComboBox",
				"dijit/form/_ComboBoxMenuMixin",
				"dijit/form/DataList",
				"dijit/form/_ExpandingTextAreaMixin",
				"dijit/form/_RadioButtonMixin",
				"dojox/gfx",
				"dojox/charting",
				"dojo/store/util/SimpleQueryEngine",
				"dojo/store/util/QueryResults",
				"dojo/data/util/filter"
			]
		},

		"dojox/gfx": {
			include: [
				"dojox/gfx",
				"dojox/gfx/_base",
				"dojox/gfx/arc",
				"dojox/gfx/attach",
				"dojox/gfx/_gfxBidiSupport",
				"dojox/gfx/renderer",
				"dojox/gfx/svg_attach",
				"dojox/gfx/canvas_attach",
				"dojox/gfx/canvasWithEvents",
				"dojox/gfx/decompose",
				"dojox/gfx/fx",
				"dojox/gfx/gradient",
				"dojox/gfx/gradutils",
				"dojox/gfx/matrix",
				"dojox/gfx/Moveable",
				"dojox/gfx/Mover",
				"dojox/gfx/path",
				"dojox/gfx/shape",
				"dojox/gfx/svg",
				"dojox/gfx/utils",
				"dojox/gfx/VectorText",
				"dojox/gfx/move"
// Force old IE support to demand load
//				"dojox/gfx/vml_attach",
//				"dojox/gfx/silverlight_attach",
			],
			exclude: [
				"dojo/dojo",
				"dojox/html/metrics",
				"dojox/mobile",
				"dojox/charting"
			]
		},
		"dojox/charting": {
			include: [
				"dojox/color/_base",				//charting
				"dojox/color/Palette",				//charting
				"dojox/html/metrics",				//gfx
				"dojox/lang/functional",			//charting
				"dojox/lang/functional/array",		//charting
				"dojox/lang/functional/fold",		//charting
				"dojox/lang/functional/lambda",		//charting
				"dojox/lang/functional/object",		//charting
				"dojox/lang/functional/reversed",	//charting
				"dojox/lang/functional/scan",		//charting
				"dojox/lang/functional/sequence",	//charting
				"dojox/lang/utils",					//charting
				"dojox/gesture/tap",				//charting
				"dojox/gesture/Base",				//charting
				"dojox/string/BidiEngine",			//charting
				"dojox/charting/BidiSupport",
				"dojox/charting/Chart",
				"dojox/charting/Chart2D",
				"dojox/charting/Element",
				"dojox/charting/Series",
				"dojox/charting/StoreSeries",
				"dojox/charting/Theme",
				"dojox/charting/action2d/_IndicatorElement",
				"dojox/charting/action2d/Base",
				"dojox/charting/action2d/ChartAction",
				"dojox/charting/action2d/Highlight",
				"dojox/charting/action2d/Magnify",
				"dojox/charting/action2d/MouseIndicator",
				"dojox/charting/action2d/MouseZoomAndPan",
				"dojox/charting/action2d/MoveSlice",
				"dojox/charting/action2d/PlotAction",
				"dojox/charting/action2d/Shake",
				"dojox/charting/action2d/Tooltip",
				"dojox/charting/action2d/TouchIndicator",
				"dojox/charting/action2d/TouchZoomAndPan",
				"dojox/charting/axis2d/Base",
				"dojox/charting/axis2d/common",
				"dojox/charting/axis2d/Default",
				"dojox/charting/axis2d/Invisible",
				"dojox/charting/plot2d/_PlotEvents",
				"dojox/charting/plot2d/Areas",
				"dojox/charting/plot2d/Bars",
				"dojox/charting/plot2d/Base",
				"dojox/charting/plot2d/Bubble",
				"dojox/charting/plot2d/Candlesticks",
				"dojox/charting/plot2d/ClusteredBars",
				"dojox/charting/plot2d/ClusteredColumns",
				"dojox/charting/plot2d/Columns",
				"dojox/charting/plot2d/common",
				"dojox/charting/plot2d/Default",
				"dojox/charting/plot2d/Grid",
				"dojox/charting/plot2d/Lines",
				"dojox/charting/plot2d/Markers",
				"dojox/charting/plot2d/MarkersOnly",
				"dojox/charting/plot2d/OHLC",
				"dojox/charting/plot2d/Pie",
				"dojox/charting/plot2d/Scatter",
				"dojox/charting/plot2d/Spider",
				"dojox/charting/plot2d/Stacked",
				"dojox/charting/plot2d/StackedAreas",
				"dojox/charting/plot2d/StackedBars",
				"dojox/charting/plot2d/StackedColumns",
				"dojox/charting/plot2d/StackedLines",
				"dojox/charting/scaler/common",
				"dojox/charting/scaler/linear",
				"dojox/charting/scaler/primitive",
				"dojox/charting/themes/common",
				"dojox/charting/themes/Julie",
				"dojox/charting/themes/gradientGenerator",
				"dojox/charting/widget/BidiSupport",
				"dojox/charting/widget/Chart",
				"dojox/charting/widget/Chart2D",
				"dojox/charting/widget/Legend",
				"dojox/charting/widget/SelectableLegend",
				"dojox/charting/widget/Sparkline"
			],
			exclude: [
				"dojo/dojo",
				"dojo/i18n",
				"dojox/mobile",
				"dojox/gfx",
				"dojox/gfx/_base",
				"dojox/gfx/_gfxBidiSupport",
				"dojox/gfx/fx",
				"dojox/gfx/gradutils",
				"dojox/gfx/matrix",
				"dojox/gfx/renderer",
				"dojox/gfx/shape"]
		}
	}
	
};
