// cc at 2015-6-9

var menu = K.menu({
    width: 200, 
    x: 100, 
    y: 200, 
    z: 1000, 
    centerLineMode: false
})

K.each(('9px, 10px, 20px, 24px, 30px').split(','), function(i, val){
    menu.addItem({
        title: '<span style="font-size: "' + val + '">' + val + '</span>', 
        click: function(){
            console.log(val)
        }, 
        height: parseInt(val, 10) + 12, 
        checked: val === '12px'
    })
})

