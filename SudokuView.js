function SudokuView() {
    this.updateTile = function(tile, value) {
        tile.html(value);
        tile.data('val', value).attr('data-val', value);
        this.updateOptDataCount(value, -1);
        //jQuery itself uses the .data() method to save information under the names 'events' and 'handle', 
        //It won't change the one in html. use only data/attr cause some error in both highlight and validation
    }
    this.highlightTile = function(element) {
        element.addClass('cell_onclick');
        if (element.data('val') != '&nbsp;') 
            this.highlightSameVal(element);
        else {
            $('.sudoku_tile').find('[data-row=' + element.data('row') + ']').addClass('cell_related');
            $('.sudoku_tile').find('[data-col=' + element.data('col') + ']').addClass('cell_related');
            element.removeClass('cell_related');
        }
    }
    this.highlightSameVal = function(element) {
        $('.sudoku_tile').find('[data-val=' + element.data('val') + ']').addClass('cell_sameVal');
    }
    this.highlightWrong = function(element) {
        $('.sudoku_tile').find('[data-row=' + element.data('row') + ']').addClass('wrong')
        .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function (e) {
            $('.wrong').removeClass('wrong');
        });
        $('.sudoku_tile').find('[data-col=' + element.data('col') + ']').addClass('wrong')
        .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function (e) {
            $('.wrong').removeClass('wrong');
        });
    }
    this.clearView = function(row, col, element) {
        if (element != null && element.hasClass('need_to_fill')) {
            // update number option data-count
            var dataVal = element.data('val');
            this.updateOptDataCount(dataVal, 1);
            element.html('&nbsp;').data('val', '&nbsp;');
        } 
        else if (row != null || col != null) {
            var rowOrCol = row == null ? col : row;
            var rowOrColStr = row == null ? 'col' : 'row';
            var tileToReset = $('.need_to_fill[data-' + rowOrColStr + '=' + rowOrCol + ']');
            // the result jquery returned is an ARRAY-LIKE obj!!!
            var numberOptArr = Array.prototype.map.call(tileToReset, function(tile) {
                return $(tile).html()
            }).filter(function(string) {
                return string != '&nbsp;'
            });
            var that = this; // keep pointing to SudokuView obj
            numberOptArr.map(function(number) {
                // for each tile value, update regarding number option data-count
                that.updateOptDataCount(number, 1);
            });
            tileToReset.html('&nbsp;').data('val','&nbsp;').attr('data-val', '&nbsp;');
        }
        this.clearHighLightAll();
    }

    this.clearAllView = function() {
        $('.need_to_fill').html('&nbsp;').data('val','&nbsp;');
        this.clearHighLightAll();
    }

    this.clearHighLightAll = function() {
        $('.cell_onclick').removeClass('cell_onclick');
        $('.cell_related').removeClass('cell_related');
        $('.cell_sameVal').removeClass('cell_sameVal');
    }
    this.clearHighLight = function() {
        for (var i = 0; i < arguments.length; i++) {
            console.log('.' + arguments[i]);
            $('.' + arguments[i]).removeClass(arguments[i]);
        }
    }
    this.clearHighLightRelated = function() {
        $('.cell_related').removeClass('cell_related');
    }
    this.updateOptDataCount = function(number, flag) {
        var numberOpt = $('.number h2:contains(' + number +')');
        var dataCount = numberOpt.data('count');
        numberOpt.data('count', dataCount + flag).attr('data-count', dataCount + flag);
        if (dataCount + flag == 0) $(numberOpt).parent().addClass('done');
        else $(numberOpt).parent().removeClass('done');
    }

    this.initView = function (data){
        this.clearHighLightAll();
        var elemIndex = 0;
        var allTiles = $('.sudoku_tile');
        $('.number h2').data('count', 9).attr('data-count', 9);
        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                var value = data[row][col];
                var className;
                if (typeof value == 'number') {
                    className = 'preset';
                    this.updateOptDataCount(data[row][col], -1);
                }
                else {
                    className = 'need_to_fill';
                    value = '&nbsp;'
                }
                $(allTiles[elemIndex]).children('h2').addClass(className).html(value).data('val', value).attr('data-val', value);
                elemIndex++; 
            }
        }
    }
    
}