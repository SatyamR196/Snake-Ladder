let p1=document.querySelector(".p1");
let p2=document.querySelector(".p2");
let btn=document.querySelector(".menu button");
let diceNum=document.querySelector("h4");
let L1=0,L2=0;
let turn=true;

function Dice(){
    let num=Math.floor(Math.random()*6)+1;
    console.log(`DICE = ${num}`);
    diceNum.innerHTML=`<b>${num}</b>`;
    return num;
}

function updateL(player,L){
    let row=Math.ceil((101-L)/10);
    let col;
    if(row%2==0){
        col=L-((10-row)*10);
    }
    else{
        col=10+1-(L-((10-row)*10));
    }

    player.style.gridRow=row;
    player.style.gridColumn=col;
}

btn.addEventListener("click",function(){
    if(turn){
        turn=false;
        let new1 = L1+Dice();
        if(new1 < 100){
            L1=new1;
        }
        else if(new1==100){
            L1=100;
            reset();
            alert("Game over ! Player 1 Won");
        }
        else{
            L1=L1;
        }

        if(L1!=0){
        L1=ladder(L1);
        L1=snake(L1);
        console.log(`L1 = ${L1}`);
        updateL(p1,L1);
        }
    }
    else{
        turn =true;
        let new2 = L2+Dice();
        if(new2 < 100){
            L2=new2;
        }
        else if(new2==100){
            L2=100;
            reset();
            alert("Game over ! Player 2 Won");
        }
        else{
            L2=L2
        }
        if(L2!=0){
            L2=ladder(L2);
            L2=snake(L2);
            console.log(`L2 = ${L2}`);
            updateL(p2,L2);
        }
    }
});

function ladder(L1){
    if(L1==1){ return 38;}
    else if(L1==4) { return 14;}
    else if(L1==9) { return 31;}
    else if(L1==21) { return 42;}
    else if(L1==28) { return 84;}
    else if(L1==51) { return 67;}
    else if(L1==72) { return 91;}
    else if(L1==80) { return 99;}
    else{
        return L1;
    }
}
function snake(L1){
    if(L1==17){ return 7;}
    else if(L1==54) { return 34;}
    else if(L1==62) { return 19;}
    else if(L1==64) { return 60;}
    else if(L1==87) { return 36;}
    else if(L1==93) { return 73;}
    else if(L1==95) { return 75;}
    else if(L1==98) { return 79;}
    else{
        return L1;
    }
}

function reset() {
    turn = true;
    L1=0;
    L2=0;
    updateL(p1,1);
    updateL(p2,1);
}
