$(document).ready(function() {
    var initData = [[6,'.',2,'.','.','.','.','.',7],
                    [8,9,'.',2,'.','.','.',6,'.'],
                    ['.',5,4,'.',6,'.',8,'.',2],
                    ['.',7,'.',6, '.',5,4,'.','.'],
                    [4,'.','.',3,'.',9, '.','.',6],
                    [9,6,'.','.','.','.',2,'.',5],
                    ['.',4,'.','.',7,'.','.',5,3],
                    ['.',8,'.','.','.','.',9,4,'.'],
                    ['.', '.',3,'.','.',6,7,'.',8]];
    var sudokuDataModel = new SudokuDataModel(initData);
    var sudokuView = new SudokuView();
    sudokuView.initView(initData);

    $('#board_wrapper').on('click', function(e) {
        var currentTile = $(e.target);
        if (currentTile.length > 0) {
            sudokuView.highlightTile(currentTile);
        }
    });
    $('#selection').on('click', function(e) {
        // e.target is number h2
        var currentTile = $('.cell_onclick');// h2.cell_onclick
        console.log(e.target.nodeName);
        if (e.target && e.target.className == 'selectable_number') {
            if (currentTile.length > 0 && currentTile.hasClass('need_to_fill')) {
                var newValue = $(e.target).html();
                var curValue = currentTile.html();
                var row = currentTile.data('row');
                var col = currentTile.data('col');
                // edit data to test if this number is valid in data
                sudokuDataModel.editData(row, col, newValue);
                var valid = sudokuDataModel.isValid(row, col);
                console.log(newValue, valid);
                if (valid) {
                    sudokuView.updateTile(currentTile, newValue);
                    if (sudokuDataModel.validSudoku()) alert("Congratulations");
                }
                else sudokuDataModel.editData(row, col, curValue);
            }
        }
        sudokuView.clearHighLight();
    });

    $('.btnoption').on('click', function() {
        var id = $(this).attr('id');
        var currentTile = $('.cell_onclick');
        if (id == 'clearAll') {
            var initData = sudokuDataModel.getOriginData();
            console.log(initData);
            sudokuView.initView(initData);
            sudokuDataModel.resetAll();
        } 
        else if (currentTile.length == 0 ){
            alert("select a tile to clear");
        }
        else {
            var row = currentTile.data('row');
            var col = currentTile.data('col');
            console.log(row, col,'test');   
            switch(id) {
                case 'clearTile': 
                    sudokuView.clearview(null, null, currentTile);
                    sudokuDataModel.resetData(row, col);
                    break;
                case 'clearRow' : 
                    sudokuView.clearview(row, null, null);
                    sudokuDataModel.resetData(row, null);
                    break;
                case 'clearCol' : 
                    sudokuView.clearview(null, col, null);
                    sudokuDataModel.editData(null, col);
                    break;
            }
        }
    });
});