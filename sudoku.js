$(document).ready(function() {
    var initData = getInitData();
    var sudokuDataModel = new SudokuDataModel(initData);
    var sudokuView = new SudokuView();
    var modelView = new ModelView();
    sudokuView.initView(initData);

    $('#board_wrapper').on('click', function(e) {
        // when click on each tile, it will highlight related tiles
        // Either tiles in the same row and col, or tiles has same value
        if (e.target.className == 'preset' || 'need_to_fill') { 
            // e.target should be $(.sudoku_cell h2)
            var currentTile = $(e.target);
            sudokuView.clearHighLight('tile_related', 'tile_sameVal','tile_onclick');
            sudokuView.highlightTile(currentTile);
        }
    });
    $('#selection').on('click', function(e) {
        /** when click on numbers, it should select a tile to fill up first
        *   Get the value on that number, add it to data model, validate in current
        *   Situation, -- column, row and big unit, not the final answer.
        *  e.target is .number h2 **/
        var currentTile = $('.tile_onclick');
        if (e.target && e.target.className == 'selectable_number') {
            if (currentTile.length > 0 && currentTile.hasClass('need_to_fill')) {
                var newValue = $(e.target).html();
                var curValue = currentTile.html();
                var row = currentTile.data('row');
                var col = currentTile.data('col');
                // edit data to test if this number is valid in data
                sudokuDataModel.editData(row, col, newValue);
                var valid = sudokuDataModel.isValid(row, col);
                if (valid) {
                    // if this number is valid, update tile's content
                    // clear highlight tiles, only high the tiles with same value
                    sudokuView.updateTile(currentTile, newValue);
                    sudokuView.clearHighLight('tile_onclick', 'tile_related', 'tile_sameVal');
                    sudokuView.highlightSameVal(currentTile);
                    if (sudokuDataModel.validSudoku()) modelView.show(); // when finished, model show up
                } else {
                    // if not valid, revert data to previous one
                    // and highlight col and row to indicate it's wrong answer
                    sudokuDataModel.editData(row, col, curValue);
                    sudokuView.highlightWrong(currentTile);
                }
            } else {
                alert('Select a tile First');
            }
        }
    });
    $('#options').on('click', function(e) {
        // Four buttons allows user to clear a tile or a row or a col or ALL of tiles
        if (e.target.className == 'btn_option') {
            var id = e.target.id;
            var currentTile = $('.tile_onclick');
            if (id == 'clear_all') {
                var confirmed = confirm('Are you sure you want to clear ALL data?');
                if (confirmed) {
                    var initData = sudokuDataModel.getOriginData();
                    sudokuView.initView(initData);
                    sudokuDataModel.resetAll();
                }
            } else if (currentTile.length == 0 ){
                alert("select a tile to clear");
            } else {
                var row = currentTile.data('row');
                var col = currentTile.data('col');
                switch(id) {
                    case 'clear_tile': 
                        sudokuView.clearView(null, null, currentTile);
                        sudokuDataModel.resetData(row, col);
                        break;
                    case 'clear_row' : 
                        sudokuView.clearView(row, null, null);
                        sudokuDataModel.resetData(row, null);
                        break;
                    case 'clear_col' : 
                        sudokuView.clearView(null, col, null);
                        sudokuDataModel.editData(null, col);
                        break;
                }
            }
        }
    });
    $('.btn_option_new_game').on('click', function(e) {
        // When users solve the Sudoku, the model shows up
        // It allows user to either start a new game 
        // or just go back to see the result
        if (e.target && e.target.id == 'newGame') {
            modelView.startNewGame();
        } else if (e.target && e.target.id == 'cancel') {
            modelView.cancel();
        }
    });
});