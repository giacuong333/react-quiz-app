import { useState, useEffect } from "react";
import styles from "./index.module.sass";
import { Button } from "react-bootstrap";
import { data } from "./data.js";

function Quizz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isSelectedAnswer, setIsSelectedAnswer] = useState(null);

  useEffect(() => {
    setQuestion(data[index]);
    resetAnswer();
  }, [index]);

  function handleNext() {
    setIndex((prev) => prev + 1);
    setIsSelectedAnswer(null);
  }

  function checkAnswer(event, answer) {
    const currentElement = event.target;
    setIsSelectedAnswer(answer);

    if (question.ans === answer) {
      currentElement.classList.add(styles.correct);
      setCorrectAnswer((prevCorrectAnswer) => prevCorrectAnswer + 1);
    } else {
      currentElement.classList.add(styles.incorrect);
    }
  }

  function resetAnswer() {
    const answers = document.querySelectorAll(`.${styles.OutlineDarkBtn}`);
    answers.forEach((item) => item.classList.remove(styles.correct, styles.incorrect));
  }

  function handleBack() {
    resetAnswer();
    setIndex(0);
    setCorrectAnswer(0);
  }

  return (
    <div className={styles.quizApp}>
      <h4>Quiz app</h4>

      {index < data.length && question ? (
        <>
          <div className={styles.questions}>
            <p>
              {index + 1}. {question.question}
            </p>
            <ul className={styles.questionList}>
              <li className={styles.questionListItem}>
                <Button
                  onClick={(event) => checkAnswer(event, 1)}
                  className={styles.OutlineDarkBtn}
                  variant="outline-dark"
                  disabled={isSelectedAnswer && "disabled"}>
                  {question.option1}
                </Button>
              </li>
              <li className={styles.questionListItem}>
                <Button
                  onClick={(event) => checkAnswer(event, 2)}
                  className={styles.OutlineDarkBtn}
                  variant="outline-dark"
                  disabled={isSelectedAnswer && "disabled"}>
                  {question.option2}
                </Button>
              </li>
              <li className={styles.questionListItem}>
                <Button
                  onClick={(event) => checkAnswer(event, 3)}
                  className={styles.OutlineDarkBtn}
                  variant="outline-dark"
                  disabled={isSelectedAnswer && "disabled"}>
                  {question.option3}
                </Button>
              </li>
              <li className={styles.questionListItem}>
                <Button
                  onClick={(event) => checkAnswer(event, 4)}
                  className={styles.OutlineDarkBtn}
                  variant="outline-dark"
                  disabled={isSelectedAnswer && "disabled"}>
                  {question.option4}
                </Button>
              </li>
            </ul>
          </div>
          <Button variant="primary" className={styles.primaryBtn} onClick={handleNext}>
            Next
          </Button>

          <p className={styles.numberOfPages}>
            {index + 1} of {data.length} questions
          </p>
        </>
      ) : (
        <>
          <p>
            Your scored is {correctAnswer} out of {data.length}
          </p>
          <Button variant="primary" className={styles.primaryBtn} onClick={handleBack}>
            Reset
          </Button>
        </>
      )}
    </div>
  );
}

export default Quizz;
