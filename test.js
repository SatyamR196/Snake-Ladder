let p1=document.querySelector(".p1");
let p2=document.querySelector(".p2");
let btn=document.querySelector(".menu button");

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

btn.addEventListener("click", function(){
    btn.disabled = true;
    let rolledNumber = Dice(); // starts animation + returns number
    setTimeout(() => {
        if(turn){
            turn = false;
            let new1 = L1 + rolledNumber;
            if(new1 < 100){
                L1 = new1;
            } else if(new1 == 100){
                L1 = 100;
                reset();
                alert("Game over ! Player 1 Won");
            }

            if(L1 != 0){
                L1 = ladder(L1);
                L1 = snake(L1);
                console.log(`L1 = ${L1}`);
                animateStep(p1, L1);
            }
        } else {
            turn = true;
            let new2 = L2 + rolledNumber;
            if(new2 < 100){
                L2 = new2;
            } else if(new2 == 100){
                L2 = 100;
                reset();
                alert("Game over ! Player 2 Won");
            }

            if(L2 != 0){
                L2 = ladder(L2);
                L2 = snake(L2);
                console.log(`L2 = ${L2}`);
                animateStep(p2, L2);
            }
        }
    }, 4050); // Match dice roll duration
    setTimeout(() => {
        btn.disabled = false; // Re-enable button after animation
    }, 4050); // Adjust this time to match the animation duration
});

function animateStep(player, target) {
    let current = Number(player.style.gridRowStart) ? getCurrentCell(player) : 1;

    let steps = [];
    for (let i = current + 1; i <= target; i++) {
        steps.push(i);
    }

    let delay = 200; // ms per step
    steps.forEach((step, index) => {
        setTimeout(() => {
            updateL(player, step);
        }, delay * index);
    });
}

function getCurrentCell(player) {
    let row = parseInt(player.style.gridRow);
    let col = parseInt(player.style.gridColumn);

    let cellNum;
    if ((10 - row + 1) % 2 == 0) {
        cellNum = (10 - row) * 10 + col;
    } else {
        cellNum = (10 - row) * 10 + (11 - col);
    }

    return cellNum;
}


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

    dice.style.animation = 'rolling 4s';

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

    }, 4050);

}
