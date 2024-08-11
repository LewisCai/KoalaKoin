import React, { useEffect, useState } from 'react';
import './index.scss'; 
import blueLogo from '../../assets/images/bluelogo.png'; 
import goalsImage from '../../assets/images/whitelogo.png'; 
import koalaImage from '../../assets/images/koalaimage.png'; 
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Home = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [profileComplete, setProfileComplete] = useState(null);

  useEffect(() => {
    const checkProfile = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get('https://www.koalakoin.org/api/check-profile', {
            params: { email: user.email },
          });
          
          const { name, age, gender } = response.data;
          if (!name || !age || !gender) {
            navigate('/complete-profile');
          } else {
            setProfileComplete(true);
          }
        } catch (error) {
          console.error('Error checking profile:', error);
        }
      }
    };

    checkProfile();
  }, [isAuthenticated, user, navigate]);

  const navigateToTest = () => {
    if (profileComplete) {
      navigate('/test'); // Programmatically navigate to the test page
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // You might want to show a spinner or some other loading indicator
  }

  return (
    <div className="scroll-container">
      <div id="section1" className="section">
        <div className="content-wrapper">
          <p className="small-text">Welcome to KoalaKoin.</p> {/* Small introductory text */}
          <h1 className="headline">Take The KoKoPersonalities Test</h1> {/* Main headline */}
          <p className="description">KoKoPersonalities Test can help you understand your personality when it comes to financial responsibility.</p> {/* Description text */}
          <button className="test-button" onClick={navigateToTest}>Get Tested</button> {/* Button for the call-to-action */}
        </div>
      </div>

      <div id="section2" className="section">
        <div className="content">
          <div className="text-content">
            <p className="small-text">YOUR DREAM OUR MISSION</p> {/* Small introductory text */}
            <h1 className="headline">What is KoalaKoin</h1> {/* Headline for section 2 */}
            <p className="description">A financial literacy platform for Australians</p> {/* Description for section 2 */}
            <p className="description2">KoalaKoin is a financial literacy platform designed to empower young Australians with essential financial literacy skills, enabling them to make informed and responsible financial decisions throughout their lives. Our mission is to make financial literacy highly accessible, fun and relevant for young Australians.</p> {/* Description for section 2 */}
          </div>
          <div className="image-content">
            <img src={koalaImage} alt="Koala" className="KoalaImage" />
          </div>
        </div>
      </div>

      <div id="section3" className="section">
        <div className="content">
          <div className="image-content">
            <img src={goalsImage} alt="Background" className="image" />
          </div>
          <div className="text-content">
            <h1 className="headline">Company Background</h1> {/* Headline for section 3 */}
            <p className="description">KoalaKoin is designed to be a unique educational initiative, making financial literacy highly accessible, fun and relevant for young Australians. Our approach will be a combination of interactive digital content, real-world simulations and community engagement to create a comprehensive learning experience. In targeting high school students and young adults, we aim to create a movement toward financial confidence and competence from a young age.</p> {/* Description for section 3 */}
          </div>
        </div>
      </div>

      <div id="section4" className="section">
        <div className="content">
          <div className="text-content">
            <h1 className="headline">Company Goals</h1> {/* Headline for section 4 */}
            <p className="description">Our goal is to empower young Australians with essential financial literacy skills, enabling them to make informed and responsible financial decisions throughout their lives. In 5 years, we aim to be the leading financial literacy platform for young Australians, reaching over one million users nationwide, with engaging, practical and impactful financial education.</p> {/* Description for section 4 */}
          </div>
          <div className="image-content">
            <img src={blueLogo} alt="Goals" className="image" />
          </div>
        </div>
      </div>

      <div id="section5" className="section">
        <div className="footer-content">
          <p className="footer-copyright">©2024 KoalaKoins Limited</p>
          <div className="footer-links">
            {/* Add your footer links here */}
          </div>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/profile.php?id=61563041034763" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/koala_koin" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://x.com/koala_koin" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
