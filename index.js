function load(){
    document.getElementById('popUpInput').style.display="none";
    var size;
    if(document.getElementById("size").value>2){
        size=document.getElementById("size").value;
    }else{
        size=3;
    }
    const grid = [];
    const GRID_LENGTH = size;
    let turn = 'X';

    function initializeGrid() {
        for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
            const tempArray = [];
            for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
                tempArray.push(0);
            }
            grid.push(tempArray);
        }
    }

    function getRowBoxes(colIdx) {
        let rowDivs = '';
        
        for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
            let additionalClass = 'darkBackground';
            let content = '';
            const sum = colIdx + rowIdx;
            if (sum%2 === 0) {
                additionalClass = 'lightBackground'
            }
            const gridValue = grid[colIdx][rowIdx];
            if(gridValue === 1) {
                content = '<span class="cross">X</span>';
            }
            else if (gridValue === 2) {
                content = '<span class="cross">O</span>';
            }
            rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
                additionalClass + '">' + content + '</div>';
        }
        return rowDivs;
    }

    function getColumns() {
        let columnDivs = '';
        for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
            let coldiv = getRowBoxes(colIdx);
            coldiv = '<div class="rowStyle">' + coldiv + '</div>';
            columnDivs = columnDivs + coldiv;
        }
        return columnDivs;
    }

    function renderMainGrid() {
        const parent = document.getElementById("grid");
        const columnDivs = getColumns();
        parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
    }
    let arr=[];
    for(let i=0;i<GRID_LENGTH;i++){
        for(let j=0;j<GRID_LENGTH;j++){
            arr.push(i+""+j);
        }
    }

    function onBoxClick() {
        var rowIdx = this.getAttribute("rowIdx");
        var colIdx = this.getAttribute("colIdx");
        if(!grid[colIdx][rowIdx]){
            let item= rowIdx+""+colIdx;
            let newValue = 1;
            grid[colIdx][rowIdx] = newValue;
            renderMainGrid();
            addClickHandlers();
            var index = arr.indexOf(item);
            if (index !== -1) arr.splice(index, 1);
            if(arr.length){
                checkWinner();
            }else{
                winner("Match Drawn");
            }
        }
    }
    function checkWinner(){
        let newValue = 2;
        let pos = arr[Math.floor(Math.random()*arr.length)];
        rowIdx = pos[0];
        colIdx = pos[1];
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
        var index = arr.indexOf(pos);
        if (index !== -1) arr.splice(index, 1);
        for(var i=0;i<GRID_LENGTH;i++){
            if(!grid[i].includes(2) && !grid[i].includes(0)){
                winner("Player Won !!!");
            }
            else if(!grid[i].includes(1) && !grid[i].includes(0)){
                winner("Computer Won !!!");
            }
        }
        for(var i=0;i<GRID_LENGTH;i++){
            let count = 0;
            let count1 = 0;
            for(var j=0;j<GRID_LENGTH;j++){
                if(grid[j][i] == 1){
                    count++;
                }
                if(grid[j][i] == 2){
                    count1++;
                }
            }
            if(count == GRID_LENGTH){
                winner("Player Won !!!");
            }
            if(count1 == GRID_LENGTH){
                winner("Computer Won !!!");
            }
        }
        let count = 0;
        let count1 = 0;

        for(var i=0;i<GRID_LENGTH;i++){
            if(grid[i][i] == 1){
                count++;
            }
            if(grid[i][i] == 2){
                count1++;
            }
        }
        if(count == GRID_LENGTH){
            winner("Player Won !!!");
        }
        if(count1 == GRID_LENGTH){
            winner("Computer Won !!!");
        }
        let count2 = 0;
        let count3 = 0;
        for(var i=0,j=GRID_LENGTH-1;i<GRID_LENGTH,j>=0;i++,j--){
                if(grid[i][j] == 1){
                    count2++;
                }
                if(grid[i][j] == 2){
                    count3++;
                }
            if(count2 == GRID_LENGTH){
                winner("Player Won !!!");
            }
            if(count3 == GRID_LENGTH){
                winner("Computer Won !!!");
            }
        }
        if(!arr.length){
            winner("Match Drawn");
        }
    }
    function addClickHandlers() {
        var boxes = document.getElementsByClassName("box");
        for (var idx = 0; idx < boxes.length; idx++) {
            boxes[idx].addEventListener('click', onBoxClick, false);
        }
    }

    function winner(result){
        document.getElementById('popUpContent').innerHTML='<p><span>'+result+'</span></p><button onclick="location.reload();">Play Again!!!</button>';
        document.getElementById('popUp').style.display="block";
    }

    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}
