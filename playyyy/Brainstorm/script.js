let quiz=document.querySelector(".quiz");
let result=document.querySelector(".result");
let quest=document.querySelector(".quest");
let ans=document.querySelector(".ans");
let submit=document.querySelector(".submit");
let next=document.querySelector(".next");
let score=document.querySelector(".score");
let reset=document.querySelector(".reset");
let prevScore=~~localStorage.getItem('score');
score.textContent=`Score : ${prevScore}`;
        function gq() {
            let op=['+', '-', '*', '/'];
            let r1=~~(Math.random() * 5) + 5;
            let r2=~~(Math.random() * 5);
            let rop=~~(Math.random() * 4);
            quest.textContent = `${r1} ${op[rop]} ${r2}`;
        }
        gq();

        quiz.addEventListener('submit', (e) => {
            e.preventDefault();
            submit.style.display = "none";
            next.style.display = "block";
            let cans = ~~Function('return ' + quest.textContent)().toFixed();
            if (cans == ans.value) {
                result.textContent = 'Great, Score Added!';
                let scr = prevScore + 5;
                prevScore = scr;
                localStorage.setItem("score", prevScore);
                score.textContent = `Score : ${prevScore}`;
            } else {
                result.textContent = `Oops! Correct ans is ${cans}`;
                let scr = prevScore - 5;
                prevScore = scr;
                localStorage.setItem("score", prevScore);
                score.textContent = `Score : ${prevScore}`;
            }
        })
        next.addEventListener('click', () => {
            gq();
            result.textContent = 'Give Your Best!!';
            quiz.reset();
            next.style.display = "none";
            submit.style.display = "block";
        })
        reset.addEventListener('click', () => {
            localStorage.removeItem('score');
            location.reload();
        })