const game=(function() {
    const gameboard=[];
    let currentPlayer=1;
    for(let i=0;i<3;i++){
        gameboard[i]=[];
        for(let j=0;j<3;j++){
            gameboard[i][j]=0;
        }
    }
    const playRound=(row,column)=>{
        if(checkValid(row,column)){
            gameboard[row][column]=currentPlayer;
            if(checkWin(currentPlayer)){
                let winner= (currentPlayer==1)?'X':'O';
                displayBoard();
                console.log(`Game Over! ${winner} Wins`);
                return true;
            } 
            else if(checkGameOver()){
                displayBoard();
                console.log(`Game Over! It's a Draw`);
                return true;
            }
            changePlayer();
            return false;
        }
    };

    const displayBoard=()=>{
        console.log("Current Board:");
        for(let i=0;i<3;i++){
            let rowstate="";
            for(let j=0;j<3;j++){
                if(gameboard[i][j]==1) rowstate+="X ";
                else if(gameboard[i][j]==-1) rowstate+="O ";
                else rowstate+=". ";
            }
            console.log(rowstate);
        }
    }

    const changePlayer=()=>currentPlayer=-currentPlayer;

    const checkValid=(row,column)=>{
        if(row>=3 || row<0 && column>=3 || column<0) return false;
        else if(gameboard[row][column]!=0) return false;
        else return true;
    }

    const checkWin=(player)=>{
        for(let i=0;i<3;i++){
            let rowsum=gameboard[i].reduce((acc,current)=>acc+current,0);
            if(rowsum==3*player) return true;
        }

        for(let i=0;i<3;i++){
            let colsum=0;
            for(let j=0;j<3;j++){
                colsum+=gameboard[j][i];
            }
            if(colsum==3*player) return true;
        }

        let diagsum=0;
        for(let i=0;i<3;i++) diagsum+=gameboard[i][i];
        if(diagsum==3*player) return true;

        diagsum=0;
        for(let i=0;i<3;i++) diagsum+=gameboard[i][2-i];
        if(diagsum==3*player) return true;
        return false;
    };

    const checkGameOver=function(){
        let empty=0;
        for(let i=0;i<3;i++){
            let emptysqrs=gameboard[i].filter((value)=>value==0);
            empty+=emptysqrs.length;
        }
        return empty==0;
    };

    const resetBoard=()=>{
        for(let i=0;i<3;i++){
            gameboard[i]=[];
            for(let j=0;j<3;j++){
                gameboard[i][j]=0;
            }
        }
    };

    const getCurrentPlayer=()=>{
        if(currentPlayer==1) return 'X';
        else return 'O';
    };

    return {playRound, displayBoard, getCurrentPlayer, checkGameOver, resetBoard};

})();

let gameover=false;
/*while(!gameover){
    game.displayBoard();
    let input=prompt(`${game.getCurrentPlayer()}'s turn\nEnter Row and Column seperated by space (1-indexed)`).split(' ');
    gameover=game.playRound(parseInt(input[0])-1,parseInt(input[1])-1);

}*/