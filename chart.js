(function () {
    'use strict';
    
    jQuery.prototype.chart = function () {
        this.each(function (index , element) {
            var $el = $(element),
                $elChildren = $(element).children().filter(function (i) {
                    return i > 0;
                }),
                length = $elChildren.length,
                list = [],
                minValue = +Infinity , maxValue = -Infinity,
                position = (Number($el.attr('data-oo-position') || 10)) / 100,
                $tooltip = $el.find('.oo-tooltip'),
                child , value , item , data , i,
                hoverIndex;
                

            
            for (i = 0; i < length ; i++) {
                child = $($elChildren[i]);
                value = Number(child.attr('data-oo-value'));
                data = child.attr('data-oo-data');
                
                if (data) {
                    data = data.split(',');
                }
                
                list.push({
                    value: value,
                    child: child,
                    data: data
                });
                
                if (value < minValue) minValue = value;
                if (value > maxValue) maxValue = value;
                
            }
            
            minValue -= (maxValue * position);
            
            
            i = list.length;
            
            while (i--) {
                item = list[i];
                value = ((item.value - minValue)  / (maxValue - minValue)) * 100;
                item.child.find('div').css('height' , (value || 1) + '%');
            }
            
            $elChildren.on('mousemove' , function (e) {
                $tooltip.css({
                    display: 'block',
                    top: e.pageY - 7 - $tooltip.outerHeight(),
                    left: e.pageX - $tooltip.outerWidth() / 2
                });
                hoverIndex = $(this).index() - 1;
                item = list[hoverIndex];
  
                if (!item.data) {
                    item.data = [item.value];
                }
                
                $tooltip.find('span').each(function (i , element) {
                    if (item.data[i])
                        $(this).html(item.data[i]);
                });                  

            });
            
            
            
            $elChildren.on('mouseleave' , function () {
                $tooltip.css('display' , 'none');           
            });
            
            
            
        });
    }
    
})();