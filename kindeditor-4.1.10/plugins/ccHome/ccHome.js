// cc-home at-2015-6-9

KindEditor.plugin('ccHome', function(K){
    var editor = this, name = 'ccHome';

    // 点击图标执行
    editor.clickToolbar(name, function(){
        editor.insertHtml('ccHomePage: <a href="http://www.baidu.com" class="btn waves-effect waves-orange">你绝逼实在搞笑吧</a>')
    })
})

KindEditor.lang({
    ccHome: 'cc学习zyzy了'
})


















