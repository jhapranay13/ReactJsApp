import { forwardRef, useEffect } from 'react';
import classes from './QuizQuesCard.module.css';

export const QuizQuesCard = forwardRef(({quesAns, onSubmitAnswerHandler, timerControl}, ref) => {
    const answers = [];

    for (const ans of quesAns.ans) {
        answers.push(
            <div className={classes["quiz-answer-btn"]} key={Math.random()}>
                {ans}
            </div>
        );
    }
    useEffect(() => {
        timerControl();
    }, [quesAns]);
    return (
        <div className={classes["quiz-ques-card"]} onClick={onSubmitAnswerHandler}>
            <div className={classes["quiz-question"]}>
                <div className={classes["quiz-timer-container"]}>
                    <div ref={ref} className={classes["quiz-timer-line"]}></div>
                </div>
                <div className={classes["quiz-ques-container"]}>
                    {quesAns.ques}
                </div>
            </div>
            <div className={classes["quiz-answer"]}>
                    {answers}
            </div>
        </div>
    );
});
