import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './index.scss';

// Import SliderComponent
import SliderComponent from '../Slider';

// Images for each type (replace with actual image paths)
import FrugalImage from "../../assets/images/Frugal.jpg";
import ImpulsiveImage from "../../assets/images/Impulsive.jpg";
import ConservativeImage from "../../assets/images/Conservative.jpg";
import AggressiveImage from "../../assets/images/Aggressive.jpg";
import TraditionalImage from "../../assets/images/Traditional.jpg";
import EntrepreneurialImage from "../../assets/images/Entrepreneurial.jpg";
import SaverImage from "../../assets/images/Saver.jpg";
import AdHocImage from "../../assets/images/AdHoc.jpg";

// Images for personality types (replace with actual image paths)
import FAEAImage from "../../assets/personalities/FAEA.jpg";
import FAESImage from "../../assets/personalities/FAES.jpg";
import FATAImage from "../../assets/personalities/FATA.jpg";
import FATSImage from "../../assets/personalities/FATS.jpg";
import FCEAImage from "../../assets/personalities/FCEA.jpg";
import FCESImage from "../../assets/personalities/FCES.jpg";
import FCTSImage from "../../assets/personalities/FCTS.jpg";
import FCTAImage from "../../assets/personalities/FCTA.jpg";
import IAEAImage from "../../assets/personalities/IAEA.jpg";
import IAESImage from "../../assets/personalities/IAES.jpg";
import IATAImage from "../../assets/personalities/IATA.jpg";
import IATSImage from "../../assets/personalities/IATS.jpg";
import ICEAImage from "../../assets/personalities/ICEA.jpg";
import ICESImage from "../../assets/personalities/ICES.jpg";
import ICTAImage from "../../assets/personalities/ICTA.jpg";
import ICTSImage from "../../assets/personalities/ICTS.jpg";

// Map personality keys to images
const personalityImages = {
  FAEA: FAEAImage,
  FAES: FAESImage,
  FATA: FATAImage,
  FATS: FATSImage,
  FCEA: FCEAImage,
  FCES: FCESImage,
  FCTS: FCTSImage,
  FCTA: FCTAImage,
  IAEA: IAEAImage,
  IAES: IAESImage,
  IATA: IATAImage,
  IATS: IATSImage,
  ICEA: ICEAImage,
  ICES: ICESImage,
  ICTA: ICTAImage,
  ICTS: ICTSImage,
};

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [testResultData, setTestResultData] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchTestResult = async () => {
      if (!user || !user.email) {
        console.error('User or email is undefined.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/get-test-result?email=${user.email}`);
        if (response.ok) {
          const data = await response.json();
          setTestResultData(data);
        } else {
          console.error('Failed to fetch test result:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching test result:', error);
      }
    };

    if (isAuthenticated) {
      fetchTestResult();
    }
  }, [isAuthenticated, user]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Define the renderResultCard function
  const renderResultCard = (type, title, imageSrc, score, description, additionalContent = null) => {
    const typeClass = `${title.toLowerCase()}-result-category`;
    const titleClass = `${title.toLowerCase()}-title`;
    const contentClass = `${title.toLowerCase()}-content`;
    const imageContainerClass = `${title.toLowerCase()}-image-container`;
    const textContainerClass = `${title.toLowerCase()}-text-container`;

    return (
      <div className={`result-card ${typeClass}`}>
        <p className={titleClass}>{title}: {type}</p>
        <div className={contentClass}>
          <div className={`${imageContainerClass} ${imageLoaded ? 'loaded' : ''}`}>
            <img
              src={imageSrc}
              alt={`${type} personality illustration`}
              onLoad={handleImageLoad}
            />
          </div>
          <div className={textContainerClass}>
            <p className="description">{description}</p>
            {additionalContent}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div className="scroll-container-profile">
        <div className="profile-container">
          <div className="profile-header">
            <img src={user.picture} alt={user.name} className="profile-picture" />
            <div className="profile-details">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              {testResultData && (
                <>
                  <p><strong>Name:</strong> {testResultData.name}</p>
                  <p><strong>Age:</strong> {testResultData.age}</p>
                  <p><strong>Gender:</strong> {testResultData.gender}</p>
                </>
              )}
            </div>
          </div>
          {testResultData && testResultData.resultCategories ? (
            <div className="test-result-container">
              <h3>Your Test Result</h3>
              <div className="test-result-summary">
                <p><strong>Personality Key:</strong> {testResultData.personalityKey}</p>
                <p><strong>Personality Type:</strong> {testResultData.personalityName}</p>

                {/* Personality Image with inline styling */}
                <div className="personality-image-container">
                  <img
                    src={personalityImages[testResultData.personalityKey]}
                    alt={`${testResultData.personalityKey} personality illustration`}
                    style={{ width: '300px', height: 'auto', margin: '20px 0' }} // Adjust width and height here
                  />
                </div>

                <p>{testResultData.personalityDescription}</p>
              </div>


              <div className="test-result-details">
                {renderResultCard(
                  testResultData.spendingType,
                  'Spending',
                  testResultData.spendingType === 'Frugal' ? FrugalImage : ImpulsiveImage,
                  testResultData.resultCategories.frugalImpulsive,
                  testResultData.spendingType === 'Frugal'
                    ? "Frugal spenders are disciplined, cost-conscious and they prefer making their purchases carefully."
                    : "Impulsive spenders tend to make spontaneous purchases without thinking much.",
                  <SliderComponent
                    label={testResultData.spendingType}
                    score={testResultData.spendingType === 'Frugal' ? testResultData.resultCategories.frugalImpulsive : 100 - testResultData.resultCategories.frugalImpulsive}
                    leftLabel="Frugal"
                    rightLabel="Impulsive"
                    fromLeft={testResultData.spendingType !== 'Frugal'}
                    color={"#ffa41c"}
                  />
                )}

                {renderResultCard(
                  testResultData.investingType,
                  'Investing',
                  testResultData.investingType === 'Conservative' ? ConservativeImage : AggressiveImage,
                  testResultData.resultCategories.conservativeAggressive,
                  testResultData.investingType === 'Conservative'
                    ? "Conservative investors prioritize security and stability. Preferring low-risk investments."
                    : "Aggressive investors are bold and willing to take significant risks for the chance of high returns.",
                  <SliderComponent
                    label={testResultData.investingType}
                    score={testResultData.investingType === 'Conservative' ? testResultData.resultCategories.conservativeAggressive : 100 - testResultData.resultCategories.conservativeAggressive}
                    leftLabel="Conservative"
                    rightLabel="Aggressive"
                    fromLeft={testResultData.investingType !== 'Conservative'}
                    color={"#3dd151"}
                  />
                )}

                {renderResultCard(
                  testResultData.earningType,
                  'Earning',
                  testResultData.earningType === 'Traditional' ? TraditionalImage : EntrepreneurialImage,
                  testResultData.resultCategories.traditionalEntrepreneurial,
                  testResultData.earningType === 'Traditional'
                    ? "Traditional earners seek stability and consistency in their income, typically through having a steady paycheck."
                    : "Entrepreneurial earners are innovative and driven to create their own opportunities in life.",
                  <SliderComponent
                    label={testResultData.earningType}
                    score={testResultData.earningType === 'Traditional' ? testResultData.resultCategories.traditionalEntrepreneurial : 100 - testResultData.resultCategories.traditionalEntrepreneurial}
                    leftLabel="Traditional"
                    rightLabel="Entrepreneurial"
                    fromLeft={testResultData.earningType !== 'Traditional'}
                    color={"#c937d6"}
                  />
                )}

                {renderResultCard(
                  testResultData.savingType,
                  'Saving',
                  testResultData.savingType === 'Saver' ? SaverImage : AdHocImage,
                  testResultData.resultCategories.saverAdHoc,
                  testResultData.savingType === 'Saver'
                    ? "Savers are methodical when it comes to putting money aside regularly. They prioritize building a financial safe haven."
                    : "Ad-hoc savers are flexible and less structured in their saving approach. They save whenever possible.",
                  <SliderComponent
                    label={testResultData.savingType}
                    score={testResultData.savingType === 'Saver' ? testResultData.resultCategories.saverAdHoc : 100 - testResultData.resultCategories.saverAdHoc}
                    leftLabel="Saver"
                    rightLabel="Ad-Hoc"
                    fromLeft={testResultData.savingType !== 'Saver'}
                    color={"#eb3131"}
                  />
                )}
              </div>


            </div>
          ) : (
            <p>No test result available. Please take the test to see your results.</p>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
