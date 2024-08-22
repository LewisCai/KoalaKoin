import './index.scss';

const ModuleBase = ({ title, sections }) => {
  return (
    <div className="module-base">
      <h2>{title}</h2>
      <div className="module-content">
        {sections.map((section, index) => (
          <div key={index} className="module-section">
            <h3>{section.section_title}</h3>
            <p><strong>Summary:</strong> {section.section_summary}</p>
            
            {/* General Information */}
            <div className="section-content">
              <h4>General Information</h4>
              {Object.values(section.content.general_information).map((info, idx) => (
                <p key={idx}>{info}</p>
              ))}
            </div>

            {/* Key Points */}
            <div className="section-content">
              <h4>Key Points</h4>
              <ul>
                {Object.values(section.content.key_points).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Real-World Applications */}
            <div className="section-content">
              <h4>Real-World Applications</h4>
              <ul>
                {Object.values(section.content.real_world_applications).map((application, idx) => (
                  <li key={idx}>{application}</li>
                ))}
              </ul>
            </div>

            {/* Interactive Activities */}
            <div className="section-content">
              <h4>Interactive Activities</h4>
              {Object.values(section.content.interactive_activities).map((activity, idx) => (
                <p key={idx}>{activity}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleBase;
