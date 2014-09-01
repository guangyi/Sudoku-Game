$(document).ready(function() {
<<<<<<< HEAD
    var initdata2 = [[6,'.',2,'.','.','.','.','.',7],
                    [8,9,'.',2,'.','.','.',6,'.'],
                    ['.',5,4,'.',6,'.',8,'.',2],
                    ['.',7,'.',6, '.',5,4,'.','.'],
                    [4,'.','.',3,'.',9, '.','.',6],
                    [9,6,'.','.','.','.',2,'.',5],
                    ['.',4,'.','.',7,'.','.',5,3],
                    ['.',8,'.','.','.','.',9,4,'.'],
                    ['.', '.',3,'.','.',6,7,'.',8]];
    var sudokudatamodel = new sudokudatamodel(initdata2);
    var sudokuview = new sudokuview();
    sudokuview.initview(initdata2);

    $('#board_wrapper').on('click', function(e) {
        var currenttile = $(e.target);
        if (currenttile.length > 0) {
            sudokuview.hightlightcell(currenttile);
        }
    });
    $('#selection').on('click', function(e) {
        // e.target is number h2
        var currenttile = $('.cell_onclick');// h2.cell_onclick
        console.log(e.target.nodename);
        if (e.target && e.target.classname == 'selectable_number') {
            if (currenttile.length > 0 && currenttile.hasclass('need_to_fill')) {
                var newvalue = $(e.target).html();
                var curvalue = currenttile.html();
                var row = currenttile.data('row');
                var col = currenttile.data('col');
                // edit data to test if this number is valid in data
                sudokudatamodel.editdata(row, col, newvalue);
                var valid = sudokudatamodel.isvalid(row, col);
                console.log(newvalue, valid);
                if (valid) {
                    sudokuview.updatetile(currenttile, newvalue);
                    if (sudokudatamodel.validsudoku()) alert("congratulations");
                }
                else sudokudatamodel.editdata(row, col, curvalue);
            }
        }
        sudokuview.clearheightlight();
    });

    $('.btnoption').on('click', function(
        var id = $(this).attr('id');
        var currenttile = $('.cell_onclick');
        if (id == 'clearall') {
            var initdata = sudokudatamodel.getorigindata();
            console.log(initdata);
            sudokuview.initview(initdata);
            sudokudatamodel.reset();
        } 
        else if (currenttile.length == 0 ){
            alert("select a tile to clear");
        }
        else {
            var row = currenttile.data('row');
            var col = currenttile.data('col');
            console.log(row, col,'test');   
            switch(id) {
                case 'cleartile': 
                    sudokuview.clearview(null, null, currenttile);
                    sudokudatamodel.cleardata(row, col);
                    break;
                case 'clearrow' : 
                    sudokuview.clearview(row, null, null);
                    sudokudatamodel.cleardata(row, null);
                    break;
                case 'clearcol' : 
                    sudokuview.clearview(null, col, null);
                    sudokudatamodel.editdata(null, col);
                    break;
            }
        }
    });
=======
	var initdata2 = [[6,'.',2,'.','.','.','.','.',7],
					[8,9,'.',2,'.','.','.',6,'.'],
					['.',5,4,'.',6,'.',8,'.',2],
					['.',7,'.',6, '.',5,4,'.','.'],
					[4,'.','.',3,'.',9, '.','.',6],
					[9,6,'.','.','.','.',2,'.',5],
					['.',4,'.','.',7,'.','.',5,3],
					['.',8,'.','.','.','.',9,4,'.'],
					['.', '.',3,'.','.',6,7,'.',8]];
	var sudokudatamodel = new sudokudatamodel(initdata2);
	var sudokuview = new sudokuview();
	sudokuview.initview(initdata2);

	$('#board_wrapper').on('click', function(e) {
		var currenttile = $(e.target);
		if (currenttile.length > 0) {
			sudokuview.hightlightcell(currenttile);
		}
	});
	$('#selection').on('click', function(e) {
		// e.target is number h2
		var currenttile = $('.cell_onclick');// h2.cell_onclick
		console.log(e.target.nodename);
		if (e.target && e.target.classname == 'selectable_number') {
			if (currenttile.length > 0 && currenttile.hasclass('need_to_fill')) {
				var newvalue = $(e.target).html();
				var curvalue = currenttile.html();
				var row = currenttile.data('row');
				var col = currenttile.data('col');
				// edit data to test if this number is valid in data
				sudokudatamodel.editdata(row, col, newvalue);
				var valid = sudokudatamodel.isvalid(row, col);
				console.log(newvalue, valid);
				if (valid) {
					sudokuview.updatetile(currenttile, newvalue);
					if (sudokudatamodel.validsudoku()) alert("congratulations");
				}
				else sudokudatamodel.editdata(row, col, curvalue);
			}
		}
		sudokuview.clearheightlight();
	});

	$('.btnoption').on('click', function(
		var id = $(this).attr('id');
		var currenttile = $('.cell_onclick');
		if (id == 'clearall') {
			var initdata = sudokudatamodel.getorigindata();
			console.log(initdata);
			sudokuview.initview(initdata);
			sudokudatamodel.reset();
		} 
		else if (currenttile.length == 0 ){
			alert("select a tile to clear");
		}
		else {
			var row = currenttile.data('row');
			var col = currenttile.data('col');
			console.log(row, col,'test');	
			switch(id) {
				case 'cleartile': 
					sudokuview.clearview(null, null, currenttile);
					sudokudatamodel.cleardata(row, col);
					break;
				case 'clearrow' : 
					sudokuview.clearview(row, null, null);
					sudokudatamodel.cleardata(row, null);
					break;
				case 'clearcol' : 
					sudokuview.clearview(null, col, null);
					sudokudatamodel.editdata(null, col);
					break;
			}
		}
	});
>>>>>>> b34f74579a5746fd62fd350c952e2b45eef3e215
});