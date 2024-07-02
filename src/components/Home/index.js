import './index.scss'; // Import the CSS file for styling
import backgroundImage from '../../assets/images/bluelogo.png'; // Replace with your image path
import goalsImage from '../../assets/images/whitelogo.png'; // Adjust the path if necessary
import koalaImage from '../../assets/images/koalaimage.png'; // Adjust the path if necessary


const Home = () => {
    return (
        <div className="scroll-container">
            <div id="section1" className="section">
                <p className="small-text">Welcome to KoalaKoin.</p> {/* Small introductory text */}
                <h1 className="headline">Take the KoKoPersonalities test</h1> {/* Main headline */}
                <p className="description">KoKoPersonalities test can help you understand your personality when it comes to financial responsibility.</p> {/* Description text */}
                <button className="test-button">Get Tested</button> {/* Button for the call-to-action */}
            </div>
            <hr className="separator" />
            <div id="section2" className="section">
                <p className="small-text2">YOUR DREAM OUR MISSION</p> {/* Small introductory text */}
                <h1 className='headline2'>What is KoalaKoin</h1> {/* Headline for section 2 */}
                <p className="description2">A financial literacy platform for Australians</p> {/* Description for section 2 */}
                <img src={koalaImage} alt="Background" className="KoalaImage" />
            </div>
            <hr className="separator" />

            <div id="section3" className="section">
                <h1 className='headline2'>Company Background</h1> {/* Headline for section 3 */}
                <p className="description2">KoalaKoin is designed to be a unique educational initiative, making financial literacy highly accessible, fun and relevant for young Australians. Our approach will be a combination of interactive digital content, real-world simulations and community engagement to create a comprehensive learning experience. In targeting high school students and young adults, we aim to create a movement toward financial confidence and competence from a young age.</p> {/* Description for section 3 */}
                <img src={backgroundImage} alt="Background" className="image" />
            </div>
            <hr className="separator" />

            <div id="section4" className="section">
                <h1 className='headline2'>Company Goals</h1> {/* Headline for section 4 */}
                <p className="description2">Our goal is to empower young Australians with essential financial literacy skills, enabling them to make informed and responsible financial decisions throughout their lives. In 5 years, we aim to be the leading financial literacy platform for young Australians, reaching over one million users nationwide, with engaging, practical and impactful financial education.</p> {/* Description for section 4 */}
                <img src={goalsImage} alt="Goals" className="image" />
            </div>
        </div>
    );
};

export default Home; // Export the Home component as default