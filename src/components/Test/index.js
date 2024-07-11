import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';


const questions = [
  {
    question: "When shopping for non-essential items, how do you decide on a purchase?",
    options: [
      "I carefully plan and research before buying",
      "I sometimes plan but often decide on the spot",
      "I often make spontaneous purchases without much thought",
      "I usually buy on impulse if something catches my eye"
    ],
  },
  {
    question: "How often do you regret your purchases?",
    options: [
      "Rarely or never",
      "Occasionally",
      "Frequently",
      "Almost Always"
    ],
  },
  {
    question: "How do you handle unexpected expenses?",
    options: [
      "I use my savings",
      "I sometimes use savings, sometimes use credit",
      "I often rely on credit or loans",
      "I handle it reactively with no plans"
    ],
  },
  {
    question: "How do you feel about paying full price for items?",
    options: [
      "I try to avoid it and look for discounts or deals",
      "I sometimes pay full price if it's necessary",
      "Why wait for a discount?",
      "I want it, I got it"
    ],
  },
  {
    question: "How often do you review your spending habits?",
    options: [
      "Regularly",
      "Occasionally",
      "Rarely",
      "Never"
    ],
  },
  {
    question: "How do you prioritise your expenses?",
    options: [
      "Needs and Save over Wants",
      "Balancing between needs and wants",
      "Wants over needs"
    ],
  },
  {
    question: "How do you spend your salary?",
    options: [
      "Save half, spend half",
      "Save most of it, spend the rest",
      "Spend most of it, save the rest",
      "Who needs saving?"
    ],
  },
  {
    question: "How do you feel about impulse buying?",
    options: [
      "I avoid it as much as I can",
      "I sometimes indulge but I try to limit it",
      "I frequently make impulse purchases",
      "I love the dopamine it gives me"
    ],
  },
  {
    question: "How do you typically respond to sales and promotions?",
    options: [
      "I avoid them unless I need something specific",
      "I check them out but only buy what I need",
      "I often buy items on sale even if I don't need them",
      "I can't resist a good deal and buy spontaneously"
    ],
  },
  {
    question: "How often do you create a budget for your expenses?",
    options: [
      "Rarely",
      "Always",
      "Never",
      "Sometimes"
    ],
  },
  {
    question: "When you think about money, what comes to mind first?",
    options: [
      "Keeping my money safe and sound",
      "Playing it safe, but I'm open to some growth",
      "Calculated risks, higher returns",
      "I'm going all in!"
    ],
  },
  {
    question: "How do handle news that may predict a loss for your portfolio?",
    options: [
      "Sell it all",
      "Rebalance the portfolio to minimise the risk",
      "Hold steady and buy a bit more",
      "Dive in and buy more cause prices are low"
    ],
  },
  {
    question: "Your friend just earned $100,000 from investing in a new cryptocurrency. What do you do?",
    options: [
      "I'm not jumping in",
      "Lets me watch it out for a bit before investing",
      "Maybe I should put a bit in",
      "Lets goooo! All innnn!"
    ],
  },
  {
    question: "Which of these quotes resonates with you the most?",
    options: [
      "\"Better safe than sorry.\"",
      "\"Look before you leap.\"",
      "\"No risk, no gain.\"",
      "\"Go big or go home!\""
    ],
  },
  {
    question: "High-yield savings is enough?",
    options: [
      "Yeah, perfect for my needs",
      "Good but I do like a bit of investing",
      "I'd mix it with riskier options",
      "Boring! High returns please!!!"
    ],
  },
  {
    question: "Your ideal investment timeframe is:",
    options: [
      "Forever, no rush",
      "Several years, steady growth",
      "A few years, let's see some returns",
      "As quickly as possible, let's cash in!"
    ],
  },
  {
    question: "\"High Risk, High Rewards\"?",
    options: [
      "More like high risk, high stress",
      "Maybe but be careful",
      "Let's explore my options",
      "Bring it on!"
    ],
  },
  {
    question: "You're given $10,000 to invest. What do you do?",
    options: [
      "Invest in safe options",
      "Keep it in my saving accounts for now",
      "Half safe, half risky",
      "Free money anyway so high risk all the way"
    ],
  },
  {
    question: "Do you ever check your investment portfolio?",
    options: [
      "Rarely",
      "Every few months",
      "Monthly",
      "Daily"
    ],
  },
  {
    question: "How do you prefer earning your money?",
    options: [
      "Climbing the corporate ladder!!!",
      "A stable job and side gigs",
      "Freelancing",
      "Running my own business"
    ],
  },
  {
    question: "How do you feel about job security?",
    options: [
      "I need a stable job to be able to sleep at night!",
      "Important, but I don't mind a bit of uncertainty",
      "Some security is for sure nice, but I want to try out new opportunity",
      "I want flexibility"
    ],
  },
  {
    question: "How would you describe your source of income?",
    options: [
      "A full-time job",
      "I have a job and do a bit of side hustle",
      "Multiple part-time jobs",
      "I run my own business"
    ],
  },
  {
    question: "Will you want to run your own business?",
    options: [
      "I don't think I'm made for it",
      "Not now I would say",
      "Yeah, I'm planning to in the future",
      "I'm running one"
    ],
  },
  {
    question: "What would you be most comfortable with?",
    options: [
      "\"Workin' nine to five, what a way to make a livin'\"",
      "A full-time job and some freelance work",
      "Mostly freelance work",
      "Full-time freelancing or running my own business"
    ],
  },
  {
    question: "Will you do job-hopping for better income?",
    options: [
      "Probably not",
      "Maybe if the offer is good",
      "For sure"
    ],
  },
  {
    question: "Which of these options do you relate to the most?",
    options: [
      "Stable work, stable life",
      "Don't put all your eggs in one basket",
      "God favors the bold",
      "No guts, no glory"
    ],
  },
  {
    question: "Pick one option",
    options: [
      "Climbing the ladder is the way to go",
      "Be my own boss"
    ],
  },
  {
    question: "What is your preferred income variability?",
    options: [
      "One consistent source is good",
      "Some variability but prefer stability",
      "More variability, more opportunity",
      "More variability, more earning"
    ],
  },
  {
    question: "How do you typically find new work opportunities?",
    options: [
      "Climbing the ladder at my current place",
      "Networking",
      "Actively seeking and applying for jobs",
      "Create new business and ventures"
    ],
  },
  {
    question: "How do you save?",
    options: [
      "I have a strict savings plan and I follow it religiously",
      "I save regularly but sometimes miss a few months",
      "I save when I have extra money",
      "Whatever is left after my spending"
    ],
  },
  {
    question: "When you receive your paycheck, what is your first thought?",
    options: [
      "Set aside a portion for savings immediately",
      "Pay all my bills and then save",
      "Spend first, and save what's left",
      "Spend it all"
    ],
  },
  {
    question: "Do you have an emergency fund?",
    options: [
      "Yes",
      "No",
      "You only live once so why bother?"
    ],
  },
  {
    question: "Do you budget?",
    options: [
      "Yeah, I have a detailed budget and I stick to it",
      "Most of the time",
      "I occasionally do it but rarely follow it",
      "Too restrictive for me"
    ],
  },
  {
    question: "What is your saving goal?",
    options: [
      "Long-term savings and substantial emergency fund",
      "Saving enough for major purchases like a house down payment",
      "Saving for immediate needs and short-term goals",
      "Putting money aside whenever I can"
    ],
  },
  {
    question: "Are you happy with your savings now?",
    options: [
      "Yes",
      "I'm comfortable",
      "Not really",
      "No"
    ],
  },
  {
    question: "You make an extra $200 this week:",
    options: [
      "Save all of it",
      "Save most of it but have some fun",
      "Spend most of it",
      "It's free money"
    ],
  },
  {
    question: "Will you be able to survive for 3 months just on your savings?",
    options: [
      "Yes",
      "No"
    ],
  },
  {
    question: "Would you consider yourself a good saver?",
    options: [
      "Yes",
      "Maybe",
      "No"
    ],
  },
];

const Test = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate


  const questionsPerPage = 5;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const questionRefs = useRef(questions.map(() => React.createRef()));

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
    calculateScore(newAnswers);
  
    // Scroll to the next question if it exists
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      const nextQuestionRef = questionRefs.current[nextQuestionIndex]?.current;
      if (nextQuestionRef) {
        const rect = nextQuestionRef.getBoundingClientRect();
        const offset = window.scrollY + rect.top - 100; // Adjust the 100 value to fine-tune the scroll distance
  
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const areAllQuestionsAnswered = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    for (let i = startIndex; i < endIndex; i++) {
      if (answers[i] === null) {
        return false;
      }
    }
    return true;
  };

  const calculateScore = (answers) => {
    const totalQuestions = answers.length;
    let totalScore = 0;

    answers.forEach((answer) => {
      if (answer !== null) {
        const questionOptionsLength = questions[answers.indexOf(answer)].options.length;
        const maxIndex = questionOptionsLength - 1;
        totalScore += ((maxIndex - answer) / maxIndex) * 100;
      }
    });

    setScore(totalScore / totalQuestions);
  };

  const renderQuestions = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return questions.slice(startIndex, endIndex).map((q, index) => (
      <div
        key={startIndex + index}
        className="question-block"
        ref={questionRefs.current[startIndex + index]}
      >
        <p className="question">{q.question}</p>
        <div className="options">
          {q.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                name={`question-${startIndex + index}`}
                value={optionIndex}
                checked={answers[startIndex + index] === optionIndex}
                onChange={() => handleOptionChange(startIndex + index, optionIndex)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (areAllQuestionsAnswered()) {
      window.scrollBy({
        top: 100, // Adjust this value to control how far down you scroll
        behavior: 'smooth'
      });
    }
  }, [answers, currentPage]); // Add dependencies to trigger the effect when answers or currentPage change

  const getProgress = () => {
    const answeredQuestions = answers.filter(answer => answer !== null).length;
    return (answeredQuestions / questions.length) * 100;
  };

  const handleSubmit = () => {
    // Navigate to the result page
    navigate('/testresult', { state: { score } });
  };

  return (
    <div className="test-page">
      <div className="test-container">
        <h1 className="title">KoKoPersonalities</h1>
        {renderQuestions()}
        <div className="navigation-buttons">
          {currentPage < totalPages - 1 && areAllQuestionsAnswered() && (
            <button onClick={handleNextPage}>Next</button>

          )}
          {currentPage === totalPages - 1 && areAllQuestionsAnswered() && (
            <button onClick={handleSubmit}>Submit</button>
        )}
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${getProgress()}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Test;
