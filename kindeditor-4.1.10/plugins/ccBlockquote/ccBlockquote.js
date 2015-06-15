// cc kindeditor blockquote

KindEditor.plugin('ccBlockquote', function(K) {
    var self = this,
        name = 'ccBlockquote';
    self.clickToolbar(name, function(K) {
        var lang = self.lang(name + '.'),
            // html = [
            //     '<div style="padding: 10px 20px">',
            //     '<input type="text" class="form-control"  />',
            //     '</div>'
            // ].join(), // 其实直接用 + 连接就行了
            
            html = '<div style="padding: 10px 20px"><textarea class="ke-textarea" style="width: 100%;height: 300px" />', 
            dialog = self.createDialog({
                name: name,
                width: 600,
                title: self.lang(name),
                body: html,
                yesBtn: {
                    name: self.lang('yes'),
                    click: function(e) {
                        var type = textarea.val();
                        html = '<blockquote>' + K.escape(type) + '</blockquote>';

                        if (K.trim(type) === '') {
                            alert(lang.pleaseInput);
                            textarea[0].focus();
                            return;
                        }

                        self.insertHtml(html).hideDialog().focus()
                    }
                }
            }),
            textarea = K('textarea', dialog.div);

        textarea[0].focus();
    })
})
