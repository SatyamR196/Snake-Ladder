let p1=document.querySelector(".p1");
let p2=document.querySelector(".p2");
let btn=document.querySelector(".menu button");
let whoseChance = document.querySelector(".chance");
const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.roll');

let diceNum=document.querySelector("h4");
let L1=0,L2=0;
let turn=true;

function Dice(){
    let num=Math.floor(Math.random()*6)+1;
    rollDice(num);
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

whoseChance.innerHTML=`<b>Player 1 Turn</b>`;
whoseChance.style.color="green";

btn.addEventListener("click",function(){
    btn.disabled = true;
    let rolledNumber = Dice();
    // console.log(`Turn = ${turn}`);
    setTimeout(() => {
        // console.log(`Turn (inside set interval)= ${turn}`);
        whoseChance.innerHTML=`<b>Player ${turn ? 1 : 2} Turn</b>`;
        whoseChance.style.color=turn ? "green" : "brown";
    }, 4100);
    setTimeout(() => {
        if(turn){
            turn=false;
            let new1 = L1+rolledNumber;
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
            let new2 = L2+rolledNumber;
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
    }
    , 4050); // Match dice roll duration    
    setTimeout(() => {
        btn.disabled = false; // Re-enable button after animation
        whoseChance.innerHTML=`<b>Player ${turn ? 2 : 1} Turn</b>`;
        whoseChance.style.color=turn ? "brown" : "green";
    }, 4050); // Adjust this time to match the animation duration
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

const rollDice = random => {

    dice.style.animation = 'rolling 3s';

    setTimeout(() => {

        switch (random) {
            case 1:
                dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;

            case 6:
                dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;

            case 2:
                dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;

            case 5:
                dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;

            case 3:
                dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;

            case 4:
                dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;

            default:
                break;
        }

        dice.style.animation = 'none';

    }, 3050);

}
