function SudokuDataModel(initData) {
    var data = initData.map(function(arr) {
        return arr.slice();
    });// make a copy so it can revert
    this.editData = function(row, col, value) {
        if (row != null && col != null) {
            data[row][col] = value;
            saveDataToLocal(data);
        }
    }
    this.resetData = function(row, col) {
    	// reset Data to initial value
        if (row != null && col != null) data[row][col] = initData[row][col];
        else if (row != null) data[row] = initData[row].slice();
        else if (col != null) {
            for (var r = 0; r < 9; r++) {
                data[r][col] = initData[r][col];
            }
        }
        saveDataToLocal(data);
    }
    this.validSudoku = function() {
    	// Check if the whole Sudoku is valid
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                if (data[r][c] == '.') return false
                temp = this.isValid(r, c);
                if (!temp) return false 
            }
        }
        return true
    }
    this.isValid = function(row, col) {
        for (var r = 0; r < 9; r++) {
            if (r != row && data[r][col] == data[row][col]) return false

        }
        for (var c = 0; c < 9; c++) {
            if (c != col && data[row][c] == data[row][col]) return false
        }
        for (var r = Math.floor(row / 3) * 3; r < Math.floor(row / 3) * 3 + 3; r++) {
            for (var c = Math.floor(col / 3) * 3; c < Math.floor(col / 3) * 3 + 3; c++) {
                if (r != row && c != col && data[r][c] == data[row][col]) return false
            }
        }
        return true
    }
    this.resetAll = function() {
        data = initData;
        saveDataToLocal(data);
    }
    this.getOriginData = function() {
        return initData.map(function(arr) {
            return arr.slice();
        })
    }
    this.getCurrenData = function() {
        return data.map(function(arr) {
            return arr.slice();
        })
    }
    function saveDataToLocal(data) {
    	// This function save data to localStorage['sudokuCurrent']
    	// So it could allow use to continue with last time's result
    	localStorage['sudokuCurrent'] = JSON.stringify(data);
    }
}