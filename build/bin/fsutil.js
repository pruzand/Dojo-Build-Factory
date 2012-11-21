var isWindows = /win/.test(process.platform),
	fs = require("fs");

exports.getFilename = function(filename){
	if(/\//.test(filename)){
		return filename.match(/^.*\/([^\/]+)$/)[1];
	}
	return filename;
};

var getFilepath = exports.getFilepath = function(filename){
	if(/\//.test(filename)){
		var result = filename.match(/^(.*)\/[^\/]+$/)[1];
		// if result=="", then must have been something like "/someFile"
		return result.length ? result : "/";
	}
	return "";
};

exports.getFiletype = function(filename, trimDot){
	var match = filename.match(/(\.([^\/]*))$/);
	return (match && (trimDot ? match[2] : match[1])) || "";
};

var cleanupPath = exports.cleanupPath = function(path){
	// change any falsy to ""
	path = path || "";

	// change all backslashes to forward slashes for those with bad habits from windows
	path = path.replace(/\\/g, "/");

	// remove any trailing "/" to be less sensitive to careless user input
	// but remember "/" is not a trailing slash--it's the root
	if(path.length>1 && path.charAt(path.length-1)=="/"){
		path = path.substring(0, path.length-1);
	}
	return path;
};

var catPath = exports.catPath = function(lhs, rhs){
	if(arguments.length>2){
		for(var args = [], i = 1; i<arguments.length; args.push(arguments[i++]));
		return catPath(lhs, catPath.apply(this, args));
	}else if(!rhs || !rhs.length){
		return lhs;
	}else if(!lhs || !lhs.length){
		return rhs;
	}else{
		return (lhs + "/" + rhs).replace(/\/\/\/?/g, "/");
	}
};

var compactPath = exports.compactPath = function(path){
	var result = [],
		segment, lastSegment;
	path = path.replace(/\\/g, '/').split('/');
	while(path.length){
		segment = path.shift();
		if(segment==".." && result.length && lastSegment!=".."){
			result.pop();
			lastSegment = result[result.length - 1];
		}else if(segment!="."){
			result.push(lastSegment = segment);
		}// else ignore "."
	}
	return result.join("/");
};

var isAbsolutePathRe = isWindows ?
	// for windows, starts with "\\" or a drive designator (anything other than "/" or "\" followed by a ":")
	/^((\\\\)|([^\/\\]+\:))/ :
	// for unix, starts with "/"
	/^\//;

var isAbsolutePath = exports.isAbsolutePath = function(path){
	return path && path.length && isAbsolutePathRe.test(path);
};

exports.normalize = function(filename){
	return isWindows ? filename.replace(/\//g, "\\") : filename;
};

exports.getAbsolutePath = function(src, base){
	src = cleanupPath(src);
	if(!isAbsolutePath(src)){
		src = catPath(base, src);
	}
	return compactPath(src);
};

exports.computePath = function(path, base){
	path = cleanupPath(path);
	return compactPath(isAbsolutePath(path) ? path : catPath(base, path));
};

exports.getTimestamp = function(ts){
	var f = function(i){ return "-" + (i<10 ? "0" + i : i); };
	return ts.getFullYear() + f(ts.getMonth()+1) + f(ts.getDate()) + f(ts.getHours()) + f(ts.getMinutes()) + f(ts.getSeconds());
};

var dirExists = exports.dirExists = function(filename){
	try{
		return fs.statSync(filename).isDirectory();
	}catch(e){
		return false;
	}
};

var fileExists = exports.fileExists = function(filename){
	try{
		return fs.statSync(filename).isFile();
	}catch(e){
		return false;
	}
};

var checkedDirectories = {};

var clearCheckedDirectoriesCache = function(){
	checkedDirectories = {};
};
var ensureDirectory = exports.ensureDirectory = function(path){
	if(!checkedDirectories[path]){
		if(!dirExists(path)){
			ensureDirectory(getFilepath(path));
			try{
				fs.mkdirSync(path, 0755);
			}catch(e){
				//squelch
			}
		}
		checkedDirectories[path] = 1;
	}
};

exports.ensureDirectoryByFilename = function(filename){
	ensureDirectory(getFilepath(filename));
};

exports.readAndEval = function(filename, type){
	try{
		if(fileExists(filename)){
			return eval("(" + fs.readFileSync(filename, "utf8") + ")");
		}
	}catch(e){
		console.log("failedReadAndEval", ["filename", filename, "type", type, "error", e]);
	}
	return {};
};

exports.maybeRead = function(filename){
	try{
		if(fileExists(filename)){
			return fs.readFileSync(filename, "utf8");
		}
	}catch(e){
	}
	return 0;
};
