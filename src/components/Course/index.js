import React from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const Course = () => {
  const navigate = useNavigate();

  const modules = [
    { id: 'M1', title: "Module 1: Introduction to Financial Literacy", lessons: [{ id: 'Lesson 1.1', title: "Lesson 1.1: Understanding Financial Literacy" }, { id: 'Lesson 1.2', title: "Lesson 1.2: Setting Financial Goals" }] },
    { id: 'M2', title: "Module 2: Budgeting and Saving", lessons: [{ id: 'Lesson 2.1', title: "Lesson 2.1: Creating a Budget" }, { id: 'Lesson 2.2', title: "Lesson 2.2: Strategies for Saving" }, { id: 'Lesson 2.3', title: "Lesson 2.3: Managing Expenses" }] },
    { id: 'M3', title: "Module 3: Understanding Income", lessons: [{ id: 'Lesson 3.1', title: "Lesson 3.1: Different Types of Income" }, { id: 'Lesson 3.2', title: "Lesson 3.2: Taxation Basics" }, { id: 'Lesson 3.3', title: "Lesson 3.3: Superannuation" }] },
    { id: 'M4', title: "Module 4: Banking and Financial Services", lessons: [{ id: 'Lesson 4.1', title: "Lesson 4.1: Types of Bank Accounts" }, { id: 'Lesson 4.2', title: "Lesson 4.2: Using Banking Services" }, { id: 'Lesson 4.3', title: "Lesson 4.3: Financial Products" }] },
    { id: 'M5', title: "Module 5: Credit and Debt Management", lessons: [{ id: 'Lesson 5.1', title: "Lesson 5.1: Understanding Credit" }, { id: 'Lesson 5.2', title: "Lesson 5.2: Managing Debt" }, { id: 'Lesson 5.3', title: "Lesson 5.3: Responsible Borrowing" }] },
    { id: 'M6', title: "Module 6: Investing Basics", lessons: [{ id: 'Lesson 6.1', title: "Lesson 6.1: Introduction to Investing" }, { id: 'Lesson 6.2', title: "Lesson 6.2: Risk and Return" }, { id: 'Lesson 6.3', title: "Lesson 6.3: Investing in the Australian Market" }] },
    { id: 'M7', title: "Module 7: Insurance and Risk Management", lessons: [{ id: 'Lesson 7.1', title: "Lesson 7.1: Introduction to Insurance" }, { id: 'Lesson 7.2', title: "Lesson 7.2: Choosing the Right Insurance" }, { id: 'Lesson 7.3', title: "Lesson 7.3: Managing Risk" }] },
    { id: 'M8', title: "Module 8: Consumer Rights and Protection", lessons: [{ id: 'Lesson 8.1', title: "Lesson 8.1: Understanding Consumer Rights" }, { id: 'Lesson 8.2', title: "Lesson 8.2: Avoiding Scams and Frauds" }, { id: 'Lesson 8.3', title: "Lesson 8.3: Resolving Disputes" }] },
    { id: 'M9', title: "Module 9: Planning for the Future", lessons: [{ id: 'Lesson 9.1', title: "Lesson 9.1: Financial Planning" }, { id: 'Lesson 9.2', title: "Lesson 9.2: Retirement Planning" }, { id: 'Lesson 9.3', title: "Lesson 9.3: Estate Planning" }] },
    { id: 'M10', title: "Module 10: Advanced Topics", lessons: [{ id: 'Lesson 10.1', title: "Lesson 10.1: Entrepreneurship" }, { id: 'Lesson 10.2', title: "Lesson 10.2: Real Estate Investment" }, { id: 'Lesson 10.3', title: "Lesson 10.3: Financial Technology (FinTech)" }] },
  ];

  const handleLessonClick = (moduleId, lessonKey) => {
    navigate(`/module/${moduleId}?lesson=${lessonKey}`);
  };

  return (
    <div className="course-container">
      {modules.map((module, index) => {
        const firstLessonId = module.lessons?.[0]?.id;

        return (
          <div key={index} className="module">
            {/* Redirect to the first lesson if it exists */}
            <h2 onClick={() => firstLessonId ? handleLessonClick(module.id, firstLessonId) : console.error('No lessons available')}>
              {module.title}
            </h2>
            <ul className="lessons">
              {module.lessons.map((lesson, idx) => (
                <li key={idx} onClick={() => handleLessonClick(module.id, lesson.id)}>{lesson.title}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
