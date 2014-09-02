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
        // e.target should be $(.sudoku_cell h2)
        sudokuView.clearHighLightAll();
        if (e.target.className == 'preset' || 'need_to_fill') {
            console.log('hereee');
            var currentTile = $(e.target);
            sudokuView.highlightTile(currentTile);
        }
    });
    $('#selection').on('click', function(e) {
        // e.target is .number h2
        var currentTile = $('.cell_onclick');// h2.cell_onclick
        
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
                    sudokuView.highlightSameVal(currentTile);
                    sudokuView.clearHighLightRelated();
                    if (sudokuDataModel.validSudoku()) alert("Congratulations");
                }
                else {
                    sudokuDataModel.editData(row, col, curValue);
                    //sudokuView.highlightWrong(currentTile);
                }
            }
        }
    });

    $('#options').on('click', function(e) {
        if (e.target.className == 'btnOption') {
            var id = e.target.id;
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
                        sudokuView.clearView(null, null, currentTile);
                        sudokuDataModel.resetData(row, col);
                        break;
                    case 'clearRow' : 
                        console.log('clearr');
                        sudokuView.clearView(row, null, null);
                        sudokuDataModel.resetData(row, null);
                        break;
                    case 'clearCol' : 
                        sudokuView.clearView(null, col, null);
                        sudokuDataModel.editData(null, col);
                        break;
                }
            }
        }
        
    });
});