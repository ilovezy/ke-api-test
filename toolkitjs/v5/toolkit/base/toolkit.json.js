// --------------------------------
// Toolkit.json
// --------------------------------
(function($) {
	if (!$ || !window.Toolkit) return;
	// ----------------------------	
	Toolkit.namespace('Toolkit.json');
	// ----------------------------
	Toolkit.json.parse = function(data) {
		return (new Function("return " + data))();
	};
	Toolkit.json.stringify = function(obj) {
		var m = {'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"' :'\\"','\\':'\\\\'}, 
		s = {
			'array': function(x){var a=['['],b,f,i,l=x.length,v;for(i=0;i<l;i+=1){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=','}a[a.length]=v;b=true}}}a[a.length]=']';return a.join('')},
			'boolean': function(x){return String(x)},
			'null': function(x){return 'null'},
			'number': function(x){return isFinite(x)?String(x):'null'},
			'object': function(x){if(x){if(x instanceof Array){return s.array(x)}var a=['{'],b,f,i,v;for(i in x){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=','}a.push(s.string(i),':',v);b=true}}}a[a.length]='}';return a.join('')}return'null'},
			'string': function(x){if(/["\\\x00-\x1f]/.test(x)){x=x.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c}c=b.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16)})}return'\"'+x+'\"'}
		};
		return s.object(obj);
	};
	// ----------------------------
})(jQuery);