(function(){
	
	var fs = require("fs"), 
		path = require("path"),
		fht = require("./fileHandleThrottle"),
		fsutil = require("./fsutil"),
		config = require("./config");
	
	var	LOG = 0 ? console.log : function(){};
	

	function extractLayersData(){
		// extract layers data
		// returns:
		// {
		//		layersNames: ["foo", "bar",...,"mylayer"],
		//		layersFiles: ["dojo/foo,dojo/bar",...,"myapp/mylayer"]
		//		layersNls  : ["dojo/nls/foo", "dojo/nls/bar",...,"myapp/nls/mylayer"],
		//		layeredModules : ["dojox/charting/plot2d/ClusteredBars","dojox/charting/plot2d/Lines",...]
		//		uncompressedLayered :[dojox/charting/plot2d/ClusteredBars*.uncompressed.*,dojox/charting/plot2d/Lines*.uncompressed.*,...]

		var result = {}, reportFilename = config.tmpDir + "/build-report.txt";
		
		var report = fsutil.maybeRead(path.resolve(reportFilename));
		if (!report){
			LOG("cannot find " + reportFilename);
			return;
		}
		var rep = report.slice(report.indexOf("Layer Contents:")+"Layer Contents:".length, report.indexOf("Process "));
		var regexp = new RegExp("([-A-Za-z_/-A-Za-z_]*):","g");
		var layers = rep.match(regexp);
		var names = [];
		var nlsPaths = [];
		if(layers){
			for (var i=0;i<layers.length;++i){
				layers[i]= layers[i].slice(0,-1);
				names.push(layers[i].split("/").pop());
				var p = layers[i].lastIndexOf("/");
				nlsPaths.push(p !== -1 ? layers[i].slice(0,p)+"/nls/"+names[i] : names[i]);
			}
		}
		result.layersFiles = layers;	
		result.layersNames = names;	
		result.layersNls = nlsPaths;
		regexp = new RegExp("[-A-Za-z_/0-9]*[^.:\r\n\t]","g");
		var modules = rep.match(regexp);
		var uncompressedLayered = [];
		for (i=0;i<modules.length;++i){
			uncompressedLayered[i] = modules[i]+"*.uncompressed.*";
			//modules[i] = modules[i]+".*";
		}
		result.layeredModules = modules;    		
		result.uncompressedLayered = uncompressedLayered;
		regexp = new RegExp("[^\t\n]*/templates/.*\.html","g");
		result.layeredTemplates= rep.match(regexp);
		
		return result;
	}

	function copyLayers(){
		layersData.layersFiles.forEach(function(layer){
			LOG("copying " + layer+".js");
			// compressed
			var src = tmpPath + layer+".js";
			var srcFile = fs.createReadStream(src);
			var dest = targetPath +"compressed/"+layer+".js";
			fsutil.ensureDirectoryByFilename(dest);
			var destFile = fs.createWriteStream(dest);     
			srcFile.pipe(destFile);
			// uncompressed
			src = tmpPath + layer+".js.uncompressed.js";
			srcFile = fs.createReadStream(src);
			dest = targetPath + "uncompressed/"+layer+".js";
			fsutil.ensureDirectoryByFilename(dest);
			destFile = fs.createWriteStream(dest);
			srcFile.pipe(destFile);
		});
	}
	
	function copy(src, dest){
		LOG("copy "+src+" to " + dest);
		
		fht.enqueue(function(){
				var srcFile = fs.createReadStream(src);
				srcFile.on("error", function(er){
					LOG(er);
					fht.release();
				});
				fsutil.ensureDirectoryByFilename(dest);
				var destFile = fs.createWriteStream(dest);
				destFile.on("error", function(er){
					fht.release();
					LOG(er);
				});
				srcFile.pipe(destFile);
				srcFile.on("end", fht.release);
		});
	}
	
	function copyResources(dir, opt){
		var include = opt && opt.includes, exclude = opt && opt.excludes;
		var files = fs.readdirSync(path.resolve(tmpPath+dir));
		files.forEach(function(f){
			var src  = tmpPath+dir+"/"+f;
			if (fs.statSync(src).isDirectory()) return;
			LOG("res:" + f);
			if(exclude && exclude.test(f)) return;
			if(!include || include.test(f)){
				LOG("Copying " + src + "...");
				copy(src, targetPath+"compressed/"+dir+"/"+f);
				copy(src, targetPath+"uncompressed/"+dir+"/"+f);
			}
		});		
	}
	
	function copyMobileThemes(){
		LOG("Copying mobile themes...");
		config.mobileThemes.concat(config.mobileCompatThemes).forEach(function(f){
			var src  = tmpPath+ f;
			LOG("Copying " + src + "...");
			copy(src, targetPath + "compressed/" + f);
			copy(src, targetPath + "uncompressed/" + f);
		});
		
		LOG("Copying mobile compat resources...");
		config.mobileCompatResDirs.forEach(copyResources);
		["android","blackberry","iphone"].forEach(function(os){
			copyResources("dojox/mobile/themes/"+os+"/dijit", {excludes:/.less/});
			copyResources("dojox/mobile/themes/"+os+"/images");
		});
		copyResources("dojox/mobile/themes/common/dijit",{includes:/.css/}); 
		copyResources("dojox/mobile/themes/common/compat");
	}
	
	function getDirFiles(dir, prefix){
		var files=[],
			content = fs.readdirSync(dir);
		if(!content.length) return files;
		content.forEach(function(f){
			var fd = dir + "/" + f;
			if(fs.statSync(fd).isDirectory()){
				var res = getDirFiles(fd, (prefix ? prefix:"") + "/" + f);
				files.push.apply(files, res);
			}else{
				files.push((prefix ? prefix:"") + "/" + f);
			}
		});
		return files;
	}
	
	function copyLooseModules(){		
		var compressedCount = 0, uncompressedCount = 0,
			files = allFiles,
			layeredModules = layersData.layeredModules,
			layeredTemplates = layersData.layeredTemplates;
		//LOG("#files in tmpPath: " + files.length);
		files.forEach(function(f){
			var src = config.tmpDir + f;
			if(fs.statSync(src).isDirectory()) return;			
			
			var isJs = /.js$/.test(f),
				isLess = /.less/.test(f),
				nls = /\/nls\//.test(f),
				uncompressed = /.uncompressed.js/.test(f),
				mobile = /\/mobile\//.test(f);
			
			if(isLess || (!isJs && mobile)){
				//LOG("skipping " + f);
				return;
			}
			// in a layer ?
			if(isJs){
				for(var i=0;i<layeredModules.length;++i){
					if(f.indexOf(layeredModules[i]+".js") !== -1) {
						//LOG("skipping " + f + " (in layer)");
						return;
					}
				}
			}else{
				for(i=0;i<layeredTemplates.length;++i){
					if(layeredTemplates[i] == f){
						//LOG("skipping " + f + " (in layer)");
						return;
					}
				}
			}
			// compressed
			if(!uncompressed){
				++compressedCount;
				copy(src, targetPath + "compressed" + f);
			}
			// uncompressed
			if (!isJs || uncompressed){
				++uncompressedCount;
				copy(src, targetPath+"uncompressed"+(isJs ? f.replace(/(.*).uncompressed.js/,"$1") : f));
			}
		});
		//LOG("uncompressedCount:" + uncompressedCount);
		//LOG("compressedCount:" + compressedCount);

		// special case for mobile-ready dijits
		["dijit/ColorPalette.js","dijit/_PaletteMixin.js","dijit/Calendar.js","dijit/CalendarLite.js","dijit/typematic.js"]
			.forEach(function(f){
				copy(tmpPath+f, targetPath+"compressed/"+f);
				copy(tmpPath+f, targetPath+"uncompressed/"+f);
			});
	}

	function copyNlsBundes(){
		LOG("Copying Nls Bundles...");
		layersData.layersNls.forEach(function(file){
			var reg = new RegExp(file+"_(.*).js");
			var dir = fsutil.getFilepath(file);
			var files = fs.readdirSync(path.resolve(tmpPath+dir));
			files.forEach(function(f){
				if(reg.test(dir+"/"+f)){
					if(/.uncompressed.js/.test(f)){
						copy(tmpPath+dir+"/"+f, targetPath+"uncompressed/"+dir+"/"+ f.replace(/(.*).uncompressed.js/, "$1"));
					}else{
						copy(tmpPath+dir+"/"+f, targetPath+"compressed/"+dir+"/"+ f);
					}
				}
			});
		});
	}

	var tmpPath = "./"+config.tmpDir+"/",
		targetPath = "./"+config.targetDir+"/",
		allFiles = getDirFiles(config.tmpDir);


	// 1. extract layers data from build-report
	var layersData = extractLayersData();
	if (!layersData)
		return 1;
	// 2. copy Layers to compressed/ and uncompressed/
	copyLayers();
	// 3. copy mobile css/themes
	copyMobileThemes();
	// 4. copy loose modules
	copyLooseModules();
	// 5. copy nls bundles
	copyNlsBundes();
	

})();