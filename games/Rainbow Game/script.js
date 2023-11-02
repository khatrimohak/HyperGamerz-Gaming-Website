const squares=document.querySelectorAll(".square");
const answerDisplay=document.querySelector(".correct");
const colourDisplay=document.querySelector("h1");
const button=document.querySelector("button");
let colours=[]
GenerateRandomColour();
assign_colours();
CheckColour();
function GenerateRandomColour(){
    for(let i=0; i<squares.length; i++){
        colours.push(
            `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
            )},${Math.floor(Math.random() * 255)})`
        );
    } 
}

function assign_colours(){
    colours.forEach((colour, index) =>{
        squares[index].style.background=colour;
        squares[index].setAttribute("data-colour", colour);
    });
}

function getRandomPickedColour(){
    const randomColour=colours[Math.floor(Math.random() * colours.length)];
    colourDisplay.textContent=randomColour;
    return randomColour;
}
function CheckColour(){
    squares.forEach(square =>{
        square.addEventListener('click', e =>{
          if(e.target.dataset.colour===pickedColour){
            answerDisplay.textContent="Correct";
          } else{
            answerDisplay.textContent="Wrong";
            e.target.classList.add("fade");
          }
        });
    })
}
let pickedColour=getRandomPickedColour();
function reset(){
    colours=[]
    GenerateRandomColour();
    squares.forEach((square) =>square.classList.remove('fade'));
    assign_colours();
    CheckColour();
    pickedColour=getRandomPickedColour();
}

button.addEventListener("click", reset);