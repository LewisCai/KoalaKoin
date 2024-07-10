import React, { useState } from 'react';
import './index.scss';

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
      "Never",
      "Always",
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
      "Better safe than sorry.",
      "Look before you leap.",
      "No risk, no gain.",
      "Go big or go home!"
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
];

const Test = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  
    const questionsPerPage = 3;
    const totalPages = Math.ceil(questions.length / questionsPerPage);
  
    const handleOptionChange = (questionIndex, optionIndex) => {
      const newAnswers = [...answers];
      newAnswers[questionIndex] = optionIndex;
      setAnswers(newAnswers);
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
  
    const renderQuestions = () => {
      const startIndex = currentPage * questionsPerPage;
      const endIndex = startIndex + questionsPerPage;
      return questions.slice(startIndex, endIndex).map((q, index) => (
        <div key={startIndex + index} className="question-block">
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
  
    const getProgress = () => {
      const answeredQuestions = answers.filter(answer => answer !== null).length;
      return (answeredQuestions / questions.length) * 100;
    };
  
    return (
      <div className="test-page">
        <div className="test-container">
          <h1 className="title">KoKoPersonalities</h1>
          {renderQuestions()}
          <div className="navigation-buttons">
            {currentPage < totalPages - 1 && areAllQuestionsAnswered() && (
              <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            )}
            {currentPage === totalPages - 1 && areAllQuestionsAnswered() && (
              <button onClick={() => alert('Test submitted!')}>Submit</button>
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
