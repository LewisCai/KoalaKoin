import './index.scss'; // Import the CSS file for styling
import blueLogo from '../../assets/images/bluelogo.png'; // Replace with your image path
import goalsImage from '../../assets/images/whitelogo.png'; // Adjust the path if necessary
import koalaImage from '../../assets/images/koalaimage.png'; // Adjust the path if necessary

const Home = () => {
  const navigateToTest = () => {
    //window.location.href = 'https://www.koalakoin.org/test/'; // Replace with the actual URL of the new page
    window.location.href = '/test'; // Replace with the actual URL of the new page
  };

  return (
    <div class="scroll-container">
      <div id="section1" className="section">
        <div class="content-wrapper">
          <p class="small-text">Welcome to KoalaKoin.</p> {/* Small introductory text */}
          <h1 class="headline">Take The KoKoPersonalities Test</h1> {/* Main headline */}
          <p class="description">KoKoPersonalities Test can help you understand your personality when it comes to financial responsibility.</p> {/* Description text */}
          <button className="test-button" onClick={navigateToTest}>Get Tested</button> {/* Button for the call-to-action */}
          </div>
      </div>

      <div id="section2" className="section">
        <div class="content">
          <div class="text-content">
            <p class="small-text">YOUR DREAM OUR MISSION</p> {/* Small introductory text */}
            <h1 class='headline'>What is KoalaKoin</h1> {/* Headline for section 2 */}
            <p class="description">A financial literacy platform for Australians</p> {/* Description for section 2 */}
            <p class="description2">KoalaKoin is a financial literacy platform designed to empower young Australians with essential financial literacy skills, enabling them to make informed and responsible financial decisions throughout their lives. Our mission is to make financial literacy highly accessible, fun and relevant for young Australians.</p> {/* Description for section 2 */}
          </div>
          <div class="image-content">
            <img src={koalaImage} alt="Koala" class="KoalaImage" />
          </div>
        </div>
      </div>

      <div id="section3" className="section">
        <div class="content">
          <div class="image-content">
            <img src={goalsImage} alt="Background" class="image" />
          </div>
          <div class="text-content">
            <h1 class='headline'>Company Background</h1> {/* Headline for section 3 */}
            <p class="description">KoalaKoin is designed to be a unique educational initiative, making financial literacy highly accessible, fun and relevant for young Australians. Our approach will be a combination of interactive digital content, real-world simulations and community engagement to create a comprehensive learning experience. In targeting high school students and young adults, we aim to create a movement toward financial confidence and competence from a young age.</p> {/* Description for section 3 */}
          </div>
        </div>
      </div>

        <div id="section4" className="section">
          <div class="content">
            <div class="text-content">
              <h1 class='headline'>Company Goals</h1> {/* Headline for section 4 */}
              <p class="description">Our goal is to empower young Australians with essential financial literacy skills, enabling them to make informed and responsible financial decisions throughout their lives. In 5 years, we aim to be the leading financial literacy platform for young Australians, reaching over one million users nationwide, with engaging, practical and impactful financial education.</p> {/* Description for section 4 */}
            </div>
            <div class="image-content">
              <img src={blueLogo} alt="Goals" class="image" />
            </div>
          </div>
        </div>

        <div id="section5" class="section">

        <div class="footer-content">
            <p class="footer-copyright">©2024 KoalaKoins Limited</p>
            <div class="footer-links">
                <a href="#">Contact</a>
                <a href="#">Terms & Conditions</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Join Us!</a>
            </div>
            <div class="footer-social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
        </div>
            </div>
        </div>
    </div>
  );
};

export default Home;
