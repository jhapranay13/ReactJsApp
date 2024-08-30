import { useCallback, useRef, useState } from 'react';
import { quizData } from '../../data/Data';
import classes from './QuizApp.module.css'
import { QuizQuesCard } from './quizQuesCard/QuizQuesCard';
import { QuizStartBanner } from './quizStartBanner/QuizStartBanner';


export const QuizApp = () => {
    const [startQuiz, setStartQuiz] = useState(false);
    const [endQuiz, setEndQuiz] = useState(false);
    const [quizQuesAns, setQuizQuesAns] = useState([]);
    const [quizQuesNumber, setQuizQuesNumber] = useState(0);
    const [quizQuesTimer, setQuizQuesTimer] = useState();
    const ref = useRef();
    
    const startQuizHandler = (event) => {
        const cpyQizData = [...quizData];
        cpyQizData.sort((a, b) => {
            return (Math.random() - 0.5);
        });

        for (const ques of cpyQizData) {
            ques.ans.sort((a, b) => {
                return (Math.random() - 0.5);
            });
        }
        setQuizQuesAns((prevState) => {return [...cpyQizData]});
        setStartQuiz((prevState)=> {
            return true;
        });
    };

    const onSubmitAnswerHandler = (event) => {
        let timer = quizQuesTimer;

        if (timer) {
            clearInterval(timer);
        }
        if (quizQuesNumber >= quizQuesAns.length - 1) {
            setEndQuiz(() => true);
        } else {
            setQuizQuesNumber((prevNumber) => prevNumber + 1);
        }
    }

    const timerControl = useCallback( () => {
        ref.current.style.width = 100+ '%';

        let elapsedTime = 0;
        let timer = quizQuesTimer;

        timer = setInterval(
            () => {
                elapsedTime += 100;
                let percent = (elapsedTime / 20000 * 100);
                ref.current.style.width = 100 - percent + '%';

                if (elapsedTime >= 20000) {
                    clearInterval(timer);

                    if (quizQuesNumber >= quizQuesAns.length - 1) {
                        setEndQuiz(() => true);
                    } else {
                        setQuizQuesNumber((prevNumber) => prevNumber + 1);
                    }
                    return;
                }
            },
            100
        );
        setQuizQuesTimer((prevTimer) => {
            clearInterval(prevTimer);
            return timer;
        });  
    }, [quizQuesAns, quizQuesNumber]);

    return (
        <div className={classes["quiz-container"]}>
            {!startQuiz ? <QuizStartBanner startQuizHandler={startQuizHandler}></QuizStartBanner> : null}
            
            {startQuiz && !endQuiz && quizQuesAns ? <QuizQuesCard ref={ref} quesAns={quizQuesAns[quizQuesNumber]}  onSubmitAnswerHandler={onSubmitAnswerHandler} timerControl={timerControl}/> : null}
            { !endQuiz ? null :
            <div className={classes["end-quiz"]}>
                <p className={classes["end-quiz-text"]}>Congratulation, You are done with the quiz!!</p>
            </div>
            }
        </div>
    );
};