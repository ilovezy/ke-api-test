/**
 * @author jiangsk540
 * @email  jiangsk540@gmail.com
 * @copyright(c) 2011-4-26
 */
var KE=window.top.KE;
KE.event.ready(function(){
	var tab,tr,box,sel,tmp,allowFileManager,URL;
	id	= 	KE.util.getParam(location.href, 'id');
	tab	=	KE.$("listtab",document);
	box =	KE.$("listbox",document);
	URL = 	showFileManager.URL = 	KE.$("url",document);
	showFileManager._lisTimer 	=	setInterval(function(){
		if(URL.value&&URL.lis){
			URL.lis.imgview.src = 	URL.lis.imgsrc.value = URL.value
			URL.value			= 	"";
		}
	},500);
	allowFileManager 	= (typeof KE.g[id].allowFileManager == 'undefined') ? false : KE.g[id].allowFileManager;
	if(!allowFileManager){
		KE.$("open-file-manager-btn",document).style.display="none";
		showFileManager	=	function(){};
	}
	tr	=	tab.rows[0];
	window.addRow 	=	function addRow(){
		var clone;
		clone 	=	tr.cloneNode(true);
		clone._fields=null;
		tab.appendChild(clone);
		showCfg.call(clone,"textbox");
		clone.style.display	=	"";
		box.scrollTop=box.scrollHeight;
		return clone;
	}
	sel = 	KE.plugin['myfocus'].getSelectedNode(id);
	if (sel) {
		tmp = decodeURIComponent(sel.getAttribute("kesrctag"));
		try {
			tmp = eval("(" + /<script[^>]*?>\s*myFocus.create\(([\S\s]*?)\);\s*<\/script>/i.exec(tmp)[1] + ")");
		} 
		catch (e) {
			tmp = {};
		}
		KE.$("width", document).value = sel.width || 100;
		KE.$("height", document).value = sel.height || 100;
		KE.$("fixedSize", document).checked = tmp.fixedSize ? true : false;
		KE.$("pattern", document).value = tmp.pattern || "mF_fscreen_tb";
		tmp = tmp.items || [];
		for (var i = 0, l = tmp.length,row,item; i < l; i++) {
			item	=	tmp[i];
			row 	=	addRow()._fields;
			row.title.value 	=	decodeURIComponent(item.title);
			row.link.value 		=	decodeURIComponent(item.link);
			row.explain.value	=	decodeURIComponent(item.explain);
			row.imgsrc.value 	=	decodeURIComponent(item.src);
			row.imgview.src 	=	decodeURIComponent(item.src)||"unknow";
		}
	}
	if(tab.rows.length<2){
		addRow();
	}
	KE.util.hideLoadingPage(id);	
},window,document);
function showCfg(show){
	var i,l,fields,tmp;
	show 		=	show?show.toLowerCase():"textbox"
	this.fields	=	fields 	=	showCfg.init.call(this,this._fields);
	fields.textbox.display 	=	show=="textbox"?"block":"none";
	fields.urlbox.display 	=	show=="urlbox"?"block":"none";
	if(show=="textbox"){
		replaceImg.call(fields.imgview,fields.imgsrc.value);
	}
}
showCfg.init	=	function(fields){
	if(!fields){
		var cfgTd,tmp1;
		fields 	=	this._fields	=	{};
		cfgTd	=	this.cells[1];
		tmp 	=	cfgTd.childNodes;
		for(i=0,l=tmp.length;i<l;i++){
			tmp1=	tmp[i];
			if(tmp1&&tmp1.className){
				if(tmp1.className=="urlbox"){
					fields.urlbox =	tmp1.style;
				}else if(tmp1.className=="textbox"){
					fields.textbox=	tmp1.style;
				}
			}
		}
		tmp 	=	this.getElementsByTagName("INPUT");
		for(i=0,l=tmp.length;i<l;i++){
			tmp1=	tmp[i];
			if(tmp1&&tmp1.name){
				fields[tmp1.name]	=	tmp1;
			}
		}
		fields.imgview	 	=	this.getElementsByTagName("IMG")[0];
		fields.explain 		=	this.getElementsByTagName("TEXTAREA")[0];
	}
	return fields;
}
function replaceImg(src){
	this.style.height="auto";
	this.removeAttribute("width");
	this.removeAttribute("height");
	src = src||"blank.gif";
	this.src 		=	src;
	this.className 	=	src=="blank.gif"?"default":"change";
	this.style.width="100px";
	if(src=="blank.gif"){
		this.style.height	=	"70px";
		this.className 		=	"default";
	}
}
function delRow(row){
	row.fields=	null;
	row.parentNode.removeChild(row);
}
function showFileManager(){
	var inputid,fields;
	fields 	=	this._fields;
	showFileManager.URL.lis	=	this._fields;
	inputid 	=	"";
	//fields.url.lis	=	this.	
	/*inputid 	=	fields.imgsrc.id;
	if(!inputid){
		inputid =	fields.imgsrc.id 	=	"imgsrc"+new Date().getTime();
	}*/
	fileManager = new KE.dialog({
		id : id,
		cmd : 'file_manager',
		file : 'file_manager/file_manager.html?type=image&id=' + id + '&ver=' + KE.version+"&inputid="+inputid,
		width : 500,
		height : 400,
		loadingMode : true,
		title : KE.lang.fileManager,
		noButton : KE.lang.no,
		afterHide : function() {
			fileManager = null;
		}
	});
	fileManager.show();
	
}

