// Course.js
import React from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const Course = () => {
  const navigate = useNavigate();

  const modules = [
    { id: 'M1', title: "Module 1: Introduction to Financial Literacy", lessons: ["Lesson 1.1: Understanding Financial Literacy", "Lesson 1.2: Setting Financial Goals"] },
    { id: 'M2', title: "Module 2: Budgeting and Saving", lessons: ["Lesson 2.1: Creating a Budget", "Lesson 2.2: Strategies for Saving", "Lesson 2.3: Managing Expenses"] },
    { id: 'M3', title: "Module 3: Understanding Income", lessons: ["Lesson 3.1: Different Types of Income", "Lesson 3.2: Taxation Basics", "Lesson 3.3: Superannuation"] },
    { id: 'M4', title: "Module 4: Banking and Financial Services", lessons: ["Lesson 4.1: Types of Bank Accounts", "Lesson 4.2: Using Banking Services", "Lesson 4.3: Financial Products"] },
    { id: 'M5', title: "Module 5: Credit and Debt Management", lessons: ["Lesson 5.1: Understanding Credit", "Lesson 5.2: Managing Debt", "Lesson 5.3: Responsible Borrowing"] },
    { id: 'M6', title: "Module 6: Investing Basics", lessons: ["Lesson 6.1: Introduction to Investing", "Lesson 6.2: Risk and Return", "Lesson 6.3: Investing in the Australian Market"] },
    { id: 'M7', title: "Module 7: Insurance and Risk Management", lessons: ["Lesson 7.1: Introduction to Insurance", "Lesson 7.2: Choosing the Right Insurance", "Lesson 7.3: Managing Risk"] },
    { id: 'M8', title: "Module 8: Consumer Rights and Protection", lessons: ["Lesson 8.1: Understanding Consumer Rights", "Lesson 8.2: Avoiding Scams and Frauds", "Lesson 8.3: Resolving Disputes"] },
    { id: 'M9', title: "Module 9: Planning for the Future", lessons: ["Lesson 9.1: Financial Planning", "Lesson 9.2: Retirement Planning", "Lesson 9.3: Estate Planning"] },
    { id: 'M10', title: "Module 10: Advanced Topics", lessons: ["Lesson 10.1: Entrepreneurship", "Lesson 10.2: Real Estate Investment", "Lesson 10.3: Financial Technology (FinTech)"] },
  ];

  const handleModuleClick = (moduleId) => {
    navigate(`/module/${moduleId}`);
  };

  const handleLessonClick = (lessonTitle) => {
    console.log(`Lesson clicked: ${lessonTitle}`);
    // Additional logic for lesson clicks if needed
  };

  return (
    <div className="course-container">
      {modules.map((module, index) => (
        <div key={index} className="module">
          <h2 onClick={() => handleModuleClick(module.id)}>{module.title}</h2>
          <ul className="lessons">
            {module.lessons.map((lesson, idx) => (
              <li key={idx} onClick={() => handleLessonClick(lesson)}>{lesson}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Course;
