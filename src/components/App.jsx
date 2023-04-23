import { useState } from 'react';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { FeedbackOptions } from './Feedback/Feedback';
import { Statistics } from './Statistics/Statistics';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const updateFeedback = key => {
  if(key === 'good'){
    setGood(prevState => prevState + 1);
  }
  if(key === 'neutral'){
    setNeutral(prevState => prevState + 1);
  }
  if(key === 'bad'){
    setBad(prevState => prevState + 1);
  }
  };

  const countPositiveFeedback = () => {
    return countTotalFeedback() ? ((good / countTotalFeedback()) * 100).toFixed(0) : '0';
  };

  const totalAnswers = countTotalFeedback();
  const positivePercentage = countPositiveFeedback();

  return (
    <>
      <Section title="Please leave your feedback">
        <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={updateFeedback} />
      </Section>
      <Section title="Statistics">
        {!totalAnswers ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalAnswers}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </>
  );
};
// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   countTotalFeedback = () => {
//     const answers = Object.values(this.state);
//     return answers.reduce((acc, answer) => acc + answer, 0);
//   };

//   updateFeedback = key => {
//     this.setState(prevState => ({ [key]: prevState[key] + 1 }));
//   };

//   countPositiveFeedback = () => {
//     return this.countTotalFeedback()
//       ? ((this.state.good / this.countTotalFeedback()) * 100).toFixed(0)
//       : '0';
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const totalAnswers = this.countTotalFeedback();
//     const positivePercentage = this.countPositiveFeedback();
//     const options = Object.keys(this.state);

//     return (
//       <>
//         <Section title="Please leave your feedback">
//           <FeedbackOptions
//             options={options}
//             onLeaveFeedback={this.updateFeedback}
//           />
//         </Section>
//         <Section title="Statistics">
//           {!totalAnswers ? (
//             <Notification message="There is no feedback" />
//           ) : (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={totalAnswers}
//               positivePercentage={positivePercentage}
//             />
//           )}
//         </Section>
//       </>
//     );
//   }
// }