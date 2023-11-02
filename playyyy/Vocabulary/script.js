let word;

const words=["sheep", "cat", "dog", "cow", "fish", "bear", "horse", "deer", "monkey", "black", "pineapple", "mango", "twelve", "white", 
    "rabbit", "onion", "apple", "banana", "fourteen", "guava", "ginger", "cherry", "strawberry", "rose", "grapes", "orange", "nineteen", 
    "twenty", "corn", "sunflower", "lotus", "thirteen", "blue", "seventeen", "red", "yellow", "green", "snake", "lily", "cauliflower",
    "pink", "tomato", "potato", "turtle", "rat", "eighteen", "whale", "purple", "jasmine", "daisy", "beans", "ladyfinger", "tulip", "cabbage", 
    "india", "china", "canada", "pakistan", "kerala", "punjab", "bihar", "europe", "goa", "singapore", "carrot", "spinach", "garlic", 
    "america", "agra", "amritsar", "assam", "madhya pradesh", "goat", "pig", "donkey", "camel", "giraffe", "fox", "tiger", "elephant", 
    "wolf", "duck", "chicken", "lion", "france", "germany", "gujarat", "haryana", "sikkim", "nepal", "bangalore", "mumbai", "belgium", 
    "austria", "hyderabad", "australia", "japan", "russia", "denmark", "spain"]

    document.getElementById('btn').addEventListener('click', function(){
        num=Math.floor(Math.random()*(100))
        word=words[num]

        let vc=new SpeechSynthesisUtterance()
        vc.text=word
        vc.pitch=50;
        speechSynthesis.speak(vc)
    })

    document.getElementById('sub').addEventListener('click', function(){
        if(document.getElementById('inp').value==word){
            alert("CORRECT WORD, Excellent!!")
        }
        
        else{
            alert(`Oops, INCORRECT WORD\nIt was ${word}`)
        }

        document.getElementById('inp').value=''     
    })

    document.getElementById('speak').addEventListener('click', function(){
        let vc=new SpeechSynthesisUtterance()
        vc.text=word
        vc.pitch=20;
        speechSynthesis.speak(vc)
    })

    