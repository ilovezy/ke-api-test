
// ccTransform

KindEditor.plugin('ccTransform', function(K){
    var editor = this, name = 'ccTransform';

    editor.clickToolbar(name, function(){
        editor.insertHtml('<p>hello</p>');
    })
})


