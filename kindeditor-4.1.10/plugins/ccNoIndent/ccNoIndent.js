
KindEditor.plugin('ccNoIndent', function(K){
    var editor = this, name = 'ccNoIndent'

    editor.clickToolbar(name, function(){
        console.log(editor);
        K('#showText').html('editor.text() = ' + editor.text());
        K('#showHtml').html('editor.html() = ' + editor.html());
        K('#showSelectedHtml').html('editor.selectedHtml() = ' + editor.selectedHtml());
        console.log(editor.count()) // 编辑框里的字符数量，注意是源代码的字符数量
        console.log(editor.isEmpty()) // 编辑器是否为空，其实就是 editor.count() === 0 ？
        editor.insertHtml('<div>insertHtml</div>')
        editor.focus() // 光标会停留在编辑器里面最后
    })
})

