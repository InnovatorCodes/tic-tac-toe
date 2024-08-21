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
                document.querySelector('.result').textContent=`Player ${winner} Wins`;
                return true;
            } 
            else if(checkGameOver()){
                document.querySelector('.result').textContent=`Game Over! It's a Draw`;
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
            if(rowsum==3*player){
                for(let j=0;j<3;j++) grid.querySelectorAll('.square')[i*3+j].classList.add('winsq');
                return true;
            } 
        }

        for(let i=0;i<3;i++){
            let colsum=0;
            for(let j=0;j<3;j++){
                colsum+=gameboard[j][i];
            }
            if(colsum==3*player){
                for(let j=0;j<3;j++) grid.querySelectorAll('.square')[j*3+i].classList.add('winsq');
                return true;
            } 
        }

        let diagsum=0;
        for(let i=0;i<3;i++) diagsum+=gameboard[i][i];
        if(diagsum==3*player){
            console.log('hi');
            for(let j=0;j<3;j++) grid.querySelectorAll('.square')[j*3+j].classList.add('winsq');
            return true;
        }

        diagsum=0;
        for(let i=0;i<3;i++) diagsum+=gameboard[i][2-i];
        if(diagsum==3*player){
            for(let j=0;j<3;j++) grid.querySelectorAll('.square')[j*3+(2-j)].classList.add('winsq');
            return true;
        }
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
        currentPlayer=1;
    };

    const getCurrentPlayer=()=>{
        return currentPlayer;
    };

    return {playRound, displayBoard, getCurrentPlayer, checkGameOver, resetBoard};

})();

const startbtn=document.querySelector('button');
const grid=document.querySelector('.grid');
const result=document.querySelector('.result');
const restartbtn=document.querySelector('.restart');
startbtn.addEventListener('click',()=>{
    startbtn.classList.add('displayoff');
    grid.classList.remove('displayoff');
    result.classList.remove('displayoff');
    document.querySelector('.main').style.padding='10px';
    for(let i=0;i<9;i++){
        const div=document.createElement('div');
        div.classList.add('square');
        div.dataset.index=`${i}`;
        grid.append(div);
        restartbtn.classList.remove('displayoff');
        result.textContent=`Player X's Turn`;
    }
})

let gameover=false;
grid.addEventListener('click',(event)=>{
    let target=event.target;
    if(target instanceof HTMLImageElement) target=target.parentNode;
    if(!target.classList.contains('filled') && !gameover){
        target.classList.add('filled');
        let player=game.getCurrentPlayer();
        const image=document.createElement('img');
        if(player==1) image.src='./images/x.png';
        else image.src='./images/o.png';
        target.appendChild(image);
        let row=parseInt(target.dataset.index);
        let col=row%3;
        row=Math.floor(row/3);
        gameover=game.playRound(row,col);
        player=(game.getCurrentPlayer()==1)?'X':'O';
        if(!gameover)result.textContent=`Player ${player}'s Turn`;
    }
    
})

restartbtn.addEventListener('click',()=>{
    grid.querySelectorAll('.square').forEach((square)=>{
        if(square.hasChildNodes()) square.removeChild(square.firstChild);
        square.classList.remove('winsq');
        square.classList.remove('filled');
        game.resetBoard();
        gameover=false;
        result.textContent="Player X's Turn";
    })
})