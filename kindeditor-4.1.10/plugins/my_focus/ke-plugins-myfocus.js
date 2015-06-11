/**
 * @author jiangsk540
 * @email  jiangsk540@gmail.com
 * @copyright(c) 2011-4-26
 */
KE.util.loadStyle(KE.scriptPath+"plugins/my_focus/myfocus-toolbar-icon.css");
KE.lang.myfocus	=	"插入myFocus插件(焦点图显示)";
KE.plugin.myfocus	=	{
	scriptPath		:	KE.scriptPath+"plugins/my_focus",
	getMyFocusImage	:	function(config){
		return '<img src="'+this.scriptPath+'/blank.gif"'
		+' class="c-ke-myfocus" '
		+' width="'+config.width+'"'
		+' height="'+config.height+'"'
		+' kesrctag="'+encodeURIComponent(config.kesrctag)+'"'
		+'/>';
	},
	getSelectedNode : function(id) {
		var g = KE.g[id];
		var startNode = g.keRange.startNode;
		var endNode = g.keRange.endNode;
		if (!KE.browser.WEBKIT && !g.keSel.isControl) return;
		if (startNode.nodeType != 1) return;
		if (startNode.tagName.toLowerCase() != 'img') return;
		if (startNode != endNode) return;
		if (startNode.className.match(/^c-ke-myfocus/i)) return startNode;
	},
	requireMyFocus	:	function(){
		return  '<script type="text/javascript" src="'+KE.myFocusPath+'">/*MYFOCUS_MODULE*/</script><script type="text/javascript">;;;myFocus.create=function (config) {if (!config) {return false;}var i, l, items, tmp, html, fixedSize;config.id = "myfocus" + (new Date).getTime();fixedSize = config.fixedSize ? " width=\\"" + config.width + "\\" height=\\"" + config.height + "\\" " : "";html = "" + "<div id=\\"" + config.id + "\\">" + "\\t<div class=\\"loading\\"><span>\\u8BF7\\u7A0D\\u5019...</span></div>" + "\\t<ul class=\\"pic\\">";items = config.items;for (i = 0, l = items.length; i < l; i++) {tmp = items[i];html += "<li>" + "<a href=\\"" + decodeURIComponent(tmp.link) + "\\">" + "<img src=\\"" + decodeURIComponent(tmp.src) + "\\"" + " alt=\\"" + decodeURIComponent(tmp.title) + "\\"" + " text=\\"" + decodeURIComponent(tmp.explain) + "\\"" + fixedSize + "/>" + "</a>" + "</li>";}html += "</ul></div>";document.write(html);myFocus.set(config);}/*MYFOCUS_MODULE*/</script>';
	},
	init	:	function(id){
		var self,editor
		self 	=	this;
		editor	=	KE.g[id];
		editor.getHtmlHooks.push(function(html) {
			if(/<img[^>]*class="?c-ke-myfocus"?[^>]*>/i.test(html)){
				html	=	self.requireMyFocus()+html.replace(/<script.*?\/\*MYFOCUS_MODULE\*\/<\/script>/ig,"");
				html 	=	html.replace(/<img[^>]*class="?c-ke-myfocus"?[^>]*>/ig, function(imgStr) {
					var width,height;
					width 	=	width 	||	(imgStr.match(/style=(['"]?).*?width:\s*(\d+)\1/i))?RegExp.$2:0;
					height 	=	height 	||	(imgStr.match(/style=(['"]?).*?height:\s*(\d+)\1/i))?RegExp.$2:0;
					width 	= 	width 	||	(imgStr.match(/width=(['"]?)(\d*)\1/i) ? RegExp.$2 : 100);
					height	= 	height 	|| 	(imgStr.match(/height=(['"]?)(\d*)\1/i) ? RegExp.$2 : 100);
					if (imgStr.match(/kesrctag="([^"]+)"/i)) {
						var tmp;
						tmp	=	decodeURIComponent(RegExp.$1);
						tmp	= 	tmp.replace(/width:\d+/ig,"width:"+width);
						tmp =	tmp.replace(/height:\d+/ig,"height:"+height);	
						return tmp;
					}else{
						return imgStr;
					}
					
				});
			}else{
				html 	=	html.replace(/<script.*?\/\*MYFOCUS_MODULE\*\/<\/script>/ig,"");
			}
			return html;
		});
		editor.setHtmlHooks.push(function(html) {
			return html.replace(/<script[^>]*>\s*myFocus.create\(([\S\s]*?)\);\s*<\/script>/ig, function() {
				var obj;
				try{
					obj =	eval("("+arguments[1]+")");
				}catch(e){
					obj =	{};
				}
				html=self.getMyFocusImage({
					width 	:	obj.width,
					height 	:	obj.height,
					kesrctag:	arguments[0]
				});
				return html;
			});
		});
	},
	click	:	function(id){
		KE.util.selection(id);
		this.dialog = new KE.dialog({
			id : id,
			cmd : 'myfocus',
			file : 'my_focus/myfocus.html',
			width : 400,
			height : 250,
			loadingMode : true,
			title : KE.lang['myfocus'],
			yesButton : KE.lang['yes'],
			noButton : KE.lang['no']
		});
		this.dialog.show();
	},
	check:function(id,width,height,tabRows){
		var i,l,tmp;
		KE.util.selection(id);
		var dialogWin = this.dialog.iframe.contentWindow;
		if (!width.value.match(/^\d*$/)) {
			alert(KE.lang['invalidWidth']);
			width.focus();
			return false;
		}
		if (!height.value.match(/^\d*$/)) {
			alert(KE.lang['invalidHeight']);
			height.focus();
			return false;
		}
		if(tabRows.length<2){
			alert("请指定至少一张显示的图片!");
			dialogWin.addRow();	
			return;
		}
		for(i=1,l=tabRows.length;i<l;i++){
			tmp 	=	tabRows[i]._fields.imgsrc;
			if (!tmp.value.match(/^.{3,}$/)) {
				alert(KE.lang['invalidUrl']);
				dialogWin.showCfg.call(tabRows[i],"urlbox")
				tmp.focus();
				return false;
			}
		}
		return true;	
	},
	exec:function(id){
		var i,l,self,dialogDoc,width,height,fixedSize,pattern,listtab,tabRows,html,kesrctag,mfId,items,tmp,tmp1;
		self 		=	this;
		mfId 		=	"myFocus_"+new Date().getTime();
		dialogDoc 	=	KE.util.getIframeDoc(this.dialog.iframe);
		width 		=	KE.$("width",dialogDoc);
		height 		=	KE.$("height",dialogDoc);
		fixedSize 	=	KE.$("fixedSize",dialogDoc);
		pattern  	=	KE.$("pattern",dialogDoc);
		listtab		=	KE.$("listtab",dialogDoc);
		tabRows 	=	listtab.rows; 
		if(!self.check(id,width,height,tabRows))return;
		items 		=	[];
		for(i=1,l=tabRows.length;i<l;i++){
			tmp 	=	tabRows[i]._fields;
			tmp1	=	'{'
			+'src:"'+encodeURIComponent(tmp.imgsrc.value)+'",'
			+'title:"'+encodeURIComponent(tmp.title.value)+'",'
			+'link:"'+encodeURIComponent(tmp.link.value)+'",'
			+'explain:"'+encodeURIComponent(tmp.explain.value)+'"'
			+"}"
			items.push(tmp1);
		}
		
		kesrctag	=	""
		+'<script type="text/javascript">'
		+'myFocus.create({'
		+'width:'+width.value+','
		+'height:'+height.value+','
		+'pattern:"'+pattern.value+'",'
		+'fixedSize:'+(fixedSize.checked?'true':'false')+','
		+'items:['+items.join(",")+']'
		+'});'
		+"</script>";		
		html 		=	self.getMyFocusImage({
			width 	:	~~width.value||100,
			height 	:	~~height.value||100,
			kesrctag:	kesrctag
		});
		KE.util.insertHtml(id,html);
		this.dialog.hide();
		KE.util.focus(id);
	}
}