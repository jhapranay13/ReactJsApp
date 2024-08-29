import classes from '../QuizApp.module.css'

export const QuizStartBanner = ({startQuizHandler}) => {

    return (
        <div className={classes["start-quiz"]}>
            <p className={classes["start-quiz-text"]}>Welcome To quiz app</p>
            <p className={classes["start-quiz-subtext"]}>You have 20 seconds to answer each question. Question and answers appear in random order.</p>
            <button className={classes["start-quiz-btn"]} onClick={startQuizHandler}>Start Quiz</button>
        </div>
    );
};