var score = 0;
var lastSwing = 0;
var size_of_heart=100;
var offset_x = 75;
var flag = true;
var lives;
var Game_Start = false;
var word;
var MisrepresentList;
var DifficultiesLevel;
const GoodWorods = ["Committed",
    "Flexible ",
    "Engaged",
    "Reliable",
    "Responsible",
    "Actively listen",
    "Respectful",
    "Helpful",
    "Cooperated",
    "Problem solvers",
    "Willing To Learn",
    "Knowledgeable",
    "Positive attitude",
    "Selfcontrol",
    "Sense of justice"
]

const NegtiveWords = ["Domination",
    "Selfish",
    "Ego",
    "Stressful",
    "Refuse feedback",
    "Micromanage",
    "Unethical",
    "Biased",
    "Blame",
    "Inconsistency",
    "Inconsideration",
    "Apathy",
    "Rudeness",
    "Aimless",
    "Low Tolerance"
]


function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    // textSize(width*0.09);
    // noLoop();
    smooth();
    InitialGame();
}

function InitialGame(){
    // GamepadButton(100,200);
    start_button = createButton('Start the game!');
    start_button.position(windowWidth/2,windowHeight/2-200);
    start_button.mousePressed(changeTostart);
    
    describe_button = createButton('Instructions');
    describe_button.position(windowWidth/2,windowHeight/2-100);
    describe_button.mousePressed(DisplayInstruction);

    difficulty_button = createButton('Choose Difficulties');
    difficulty_button.position(windowWidth/2,windowHeight/2);
    difficulty_button.mousePressed(DifficultiesSelect);

}

function DifficultiesSelect(){
    starter = createButton("starter");
    starter.position(windowWidth/5,windowHeight/10);
    junior = createButton("junior");
    junior.position(windowWidth/5,(windowHeight/10)*2);
    master = createButton("master");
    master.position(windowWidth/5,(windowHeight/10)*3);
    starter.mousePressed(() => {
        DifficultiesLevel = 50;
        starter.hide();
        junior.hide();
        master.hide();
    });
    junior.mousePressed(() => {
        DifficultiesLevel = 35;
        starter.hide();
        junior.hide();
        master.hide();
    });
    master.mousePressed(() => {
        DifficultiesLevel = 25;
        starter.hide();
        junior.hide();
        master.hide();
    });
}

function DisplayInstruction(){
    alert("In this game, you will learn what kinds personalities will be appreciated in teamwork!")
}

function changeTostart() {
    background(50,230,100);
    fill(0);
    lives=["life","life","life"];
    MisrepresentList = [];
    if(DifficultiesLevel==undefined){
        alert("Please select the game Level")
        return;
    }
    Game_Start=true;
    word = selectWord();
    start_button.hide();
    describe_button.hide();
    difficulty_button.hide();
    
  }

//Choose a word from words list
function selectWord(){
    var WhichArray =  Math.round(Math.random());
    var pick_num = Math.round(Math.random()*(GoodWorods.length-1));
    var word;
    if (WhichArray==0){
        word = GoodWorods[pick_num];
        flag=true;

    }else {
        word = NegtiveWords[pick_num];
        flag=false;
    }
    return word;
}   

//Draw hearts
function heart(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
  }


function draw() {
    if(Game_Start){

        if (lives.length==0) {
            Game_Start = false;
            InitialGame();
            alert("You have run out of your lives!");
            alert("Misreprents words: "+ MisrepresentList);
            fill(0);
            background(255,0,0);
            // return;
        };


        frameRate(30);

        background(50,230,100);
        fill(0);
        text("SCORE: "+score,20,120);
        


        fill(255,0,0);
        for(i=1; i<lives.length+1;i++){
            heart(1050+size_of_heart/2+ i*offset_x, 70, size_of_heart/2);
        }
 
        for (let i=0; i < 12; i++) {
            // draw holes for moles!
            fill(30);
            ellipse(width * 0.2 + width * 0.2 * (i%4), // x
                    height * 0.35 + height * 0.2 * floor(i/4), // y
                    width * 0.1, // w
                    height * 0.1 // h
                    );

            // draw moles!
            let x = width * 0.2 + width * 0.2 * (i%4) -height*0.05;
            let y = height * 0.35 + height * 0.2 * floor(i/4) -height*0.11;
            let w = height * 0.1;
            let h = height * 0.15;

            if(frameCount % DifficultiesLevel ==0) {
                word = selectWord();
            }

            if(tan((frameCount+999)/(i*0.89+50))>4) {
                fill(170,100,40);
                textSize(20);

                tempy = y+20;
            
                rect(x, y, w, h);
                if(word.length>=7){
                    tempx = x-20;
                    rect(tempx, y, word.length+w, h);
                    push();
                    fill(250);
                    text(word, tempx, tempy, word.length);
                    pop();
            
                }
                else{
                    rect(x, y,  word.length+w, h);
                    push();
                    fill(250);
                    text(word, x, tempy, word.length);
                    pop();
            
                }
            }



            // add points if moles are hit
            if(mouseX > x && mouseX < x+w &&
            mouseY > y && mouseY < y+h &&
            tan((frameCount+999)/(i*0.89+50))> 4 &&
            mouseIsPressed &&
            (frameCount - lastSwing) > 10
            ) {
                if(flag){
                    score ++;
                    lastSwing = frameCount;
                }
                
                else{
                    fill(0);
                    background(255,0,0);
                    alert(word+ " <-- is not a great word for teamwork!")
                
                    lives.pop();
                    lastSwing = frameCount;
                    MisrepresentList.push(word);
                }
                
                
            }
        }
    }
}
