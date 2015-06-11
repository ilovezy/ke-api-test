
KindEditor.plugin('ccPlugin', function(K){
    var editor = this, name = 'ccPlugin'

    editor.clickToolbar(name, function(){
        editor.insertHtml('<p class="text-info">fdasfaf</p>');
        console.log(editor)
    })
})
