// TestResult.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTestResult } from '../../TestResultContext'; // Correct relative path
import "./index.scss";
import SpendingHabitPage from "../SpendingHabitPage";
import EarningHabitPage from "../EarningHabitPage";
import InvestingHabitPage from "../InvestingHabitPage";
import SavingHabitPage from "../SavingHabitPage";
import PersonalityPage from "../PersonalityPage"; // Import PersonalityPage

const TestResult = () => {
  const location = useLocation();
  const { resultCategories } = location.state || {
    resultCategories: {
      frugalImpulsive: 0,
      conservativeAggressive: 0,
      traditionalEntrepreneurial: 0,
      saverAdHoc: 0
    }
  }; // Default resultCategories if not provided
  const { setTestResult } = useTestResult();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setTestResult(resultCategories);
  }, [resultCategories, setTestResult]);

  const determinePersonalityType = () => {
    const { frugalImpulsive, conservativeAggressive, traditionalEntrepreneurial, saverAdHoc } = resultCategories;

    const spending = frugalImpulsive > 50 ? 'Frugal' : 'Impulsive';
    const investing = conservativeAggressive > 50 ? 'Conservative' : 'Aggressive';
    const earning = traditionalEntrepreneurial > 50 ? 'Traditional' : 'Entrepreneurial';
    const saving = saverAdHoc > 50 ? 'Saver' : 'Ad-hoc';

    const key = `${spending.charAt(0)}${investing.charAt(0)}${earning.charAt(0)}${saving.charAt(0)}`;

    const personalityTypes = {
      FCTS: {
        name: "The Careful Planner",
        description: "They are meticulous in their spending, value monetary stability, and prioritise long-term financial security."
      },
      FCTA: {
        name: "The Cautious Saver",
        description: "They plan their finances carefully but are flexible with their savings approach."
      },
      FCES: {
        name: "The Secure Entrepreneur",
        description: "They balance cautious investments with innovative income strategies."
      },
      FCEA: {
        name: "The Cautious Innovator",
        description: "They are innovative yet cautious, combining entrepreneurship with flexible savings."
      },
      FATS: {
        name: "The Frugal Risk-Taker",
        description: "They manage to balance risk-taking investments with careful spending and consistent saving."
      },
      FATA: {
        name: "The Adventurous Saver",
        description: "They embrace risk in investments while being flexible in their saving habits."
      },
      FAES: {
        name: "The Strategic Builder",
        description: "They combine aggressive investment strategies with entrepreneurial ventures and disciplined saving."
      },
      FAEA: {
        name: "The Bold Innovator",
        description: "They are bold and innovative, willing to take risks and adapt their savings as needed."
      },
      ICTS: {
        name: "The Impulsive Planner",
        description: "They enjoy spontaneous spending but prefer security in investments and saving."
      },
      ICTA: {
        name: "The Spontaneous Saver",
        description: "They balance impulsive spending with cautious investments and flexible saving."
      },
      ICES: {
        name: "The Balanced Risk-Taker",
        description: "They manage impulsive spending while maintaining conservative investments and consistent savings."
      },
      ICEA: {
        name: "The Risk-Taking Innovator",
        description: "They combine impulsive spending with cautious investment strategies and flexible savings."
      },
      IATS: {
        name: "The Adventurous Planner",
        description: "They take risks in investments while maintaining a structured approach to saving."
      },
      IATA: {
        name: "The Bold Saver",
        description: "They are bold and adventurous, balancing high-risk investments with flexible saving habits."
      },
      IAES: {
        name: "The Dynamic Entrepreneur",
        description: "They are dynamic and driven, combining aggressive investments with entrepreneurial income and disciplined saving."
      },
      IAEA: {
        name: "The Fearless Innovator",
        description: "They are fearless and innovative, taking risks in both investments and earnings while adapting their savings flexibly."
      }
    };

    const personality = personalityTypes[key] || { name: "Undefined", description: "Undefined" };

    return {
      ...personality,
      key
    };
  };

  const personality = determinePersonalityType();

  const detailedDescriptions = {
    frugalImpulsive: {
      Frugal: "Frugal spenders are disciplined, cost-conscious and they prefer making their purchases carefully. They value savings and avoid unnecessary spending, focusing on long-term financial stability.",
      FrugalTags: "#Budget-conscious, #disciplined, #cost-saving.",
      Impulsive: "Impulsive spenders tend to make spontaneous purchases without thinking much. They struggle with sticking to a budget and often are highly influenced by sales and promotions.",
      ImpulsiveTags: "#spontaneous, #reactive."
    },
    conservativeAggressive: {
      Conservative: "Conservative investors prioritise security and stability. Preferring low-risk investments. They like their investments to be predictable and are cautious about where they put their money, valuing long-term capital preservation.",
      ConservativeTags: "#Budget-conscious, #disciplined, #cost-saving.",
      Aggressive: "Aggressive investors are bold and willing to take significant risks for the chance of high returns.",
      AggressiveTags: "#spontaneous, #reactive."
    },
    traditionalEntrepreneurial: {
      Traditional: "Traditional earners seek stability and consistency in their income, typically through having a steady paycheck and an established career path.",
      TraditionalTags: "#climbingtheladder, #salary, #stability.",
      Entrepreneurial: "Entrepreneurial earners are innovative and driven to create their own opportunities in life. They embrace the uncertainty of self-employment and business ventures, seeking a diverse and dynamic income stream.",
      EntrepreneurialTags: "#start-up, #freelancing, #creatingmyownlife."
    },
    saverAdHoc: {
      Saver: "Savers are methodical when it comes to putting money aside regularly. They prioritise building a financial safe haven and work towards clear savings goals.",
      SaverTags: "#security, #emergency, #savingforlife.",
      AdHoc: "Ad-hoc savers are flexible and less structured in their saving approach. They save whenever possible and prioritise immediate needs and wants before saving.",
      AdHocTags: "#YOLO, #enjoyinglife, #flexible."
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <PersonalityPage 
            personality={personality} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
          />
        );
      case 1:
        return (
          <SpendingHabitPage 
            resultCategories={resultCategories} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            detailedDescriptions={detailedDescriptions} 
          />
        );
      case 2:
        return (
          <InvestingHabitPage 
            resultCategories={resultCategories} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            detailedDescriptions={detailedDescriptions} 
          />
        );
      case 3:
        return (
          <EarningHabitPage 
            resultCategories={resultCategories} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            detailedDescriptions={detailedDescriptions} 
          />
        );
      case 4:
        return (
          <SavingHabitPage 
            resultCategories={resultCategories} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            detailedDescriptions={detailedDescriptions} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="testresult-page">
      {renderPageContent()}
    </div>
  );
};

export default TestResult;
