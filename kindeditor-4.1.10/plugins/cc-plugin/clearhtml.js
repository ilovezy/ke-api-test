
// cc at 2015-6-9

KindEditor.plugin('clearhtml', function(K){
    var self = this, name = 'clearhtml';

    self.clickToolbar(name, function(){
        self.focus()
        var html = self.html()
        html = html.replace(/(<script[^>]*>)(\s\S*?)(<\/script>)/ig, ''); // 去掉 script 标签
        html = html.replace(/(<script[^>]>)(\s\S*?)(<\/style>)/ig, ''); // 去掉 style 标签
        html = K.formatHtml(html, {
            a: ['href', 'target'], 
            embed: [], 
            img: [], 
            table: []
            'td, th': [], 
            '': []
        })

        self.html(html)
        self.cmd.selection(true)
        self.addBookmark()
    })
})






