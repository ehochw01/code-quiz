# code-quiz

The code quiz can be found at: https://ehochw01.github.io/code-quiz/

This project includes a javascript quiz game. The quiz starts when the start button is pushed. Then the screen is cleared and the first question appears, and a timer starts counting down from 75 seconds. When the user selects an answer, the screen is cleared and the next question appears. There is a total a five questions. If the user gets a question wrong, they lose 10 seconds off their time. After the 5 questions are answered, or the after time runs out, the questions are cleared and a form appears allowing the user to enter their initials. The user's final score is analogous to how much time they had left when they completed the quiz. Then when they submit their initials, an ordered highscore list appears with their score and initials added to it. They then have the option to go back and play again, or clear the highscore list.

I used a possibly overly-convoluted global questions object array so that the quiz will still work if questions want to be added later, or if questions want to be changed. 

I ran out of time to add styling, so for now it is just basic HTML. There is very minimal styling in the assets/style.css file.

Javscript can be found in assets/script.js.

