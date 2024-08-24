import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.scss';

const ModulePage = () => {
  const { moduleId } = useParams(); // Get the moduleId from the URL
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLessonKey, setSelectedLessonKey] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/modules/${moduleId}`);
        const moduleContent = response.data.ModuleContent[`Module ${moduleId.substring(1)}`];
        setModuleData(moduleContent);

        const firstLessonKey = Object.keys(moduleContent.Lessons)[0];
        setSelectedLessonKey(firstLessonKey);

        const firstLesson = moduleContent.Lessons[firstLessonKey];
        const firstSectionKey = Object.keys(firstLesson.Sections)[0];
        const firstSection = firstLesson.Sections[firstSectionKey];
        setSelectedSection(firstSection);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]); // Refetch when moduleId changes

  const handleNextLesson = () => {
    const lessonKeys = Object.keys(moduleData.Lessons);
    const currentIndex = lessonKeys.indexOf(selectedLessonKey);
    if (currentIndex < lessonKeys.length - 1) {
      setSelectedLessonKey(lessonKeys[currentIndex + 1]);
      setSelectedSection(Object.values(moduleData.Lessons[lessonKeys[currentIndex + 1]].Sections)[0]);
    }
  };

  const handlePreviousLesson = () => {
    const lessonKeys = Object.keys(moduleData.Lessons);
    const currentIndex = lessonKeys.indexOf(selectedLessonKey);
    if (currentIndex > 0) {
      setSelectedLessonKey(lessonKeys[currentIndex - 1]);
      setSelectedSection(Object.values(moduleData.Lessons[lessonKeys[currentIndex - 1]].Sections)[0]);
    }
  };

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    } else if (Array.isArray(content)) {
      return (
        <ul>
          {content.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    } else if (typeof content === 'object' && content !== null) {
      return (
        <div>
          {Object.entries(content).map(([key, value], idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              <strong>{key}:</strong>
              <div style={{ paddingLeft: '15px' }}>{renderContent(value)}</div>
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!moduleData || !moduleData.Lessons) return <div>Error: Module data is missing or incomplete.</div>;

  const selectedLesson = moduleData.Lessons[selectedLessonKey];

  return (
    <div className="module-page">
      <div className="module-sidebar">
        <div className="module-header">
          <h3>{moduleData.Title}</h3>
        </div>
        <div className="lesson-navigation">
          <button onClick={handlePreviousLesson}>&lt;</button>
          <h4>{selectedLesson.Title}</h4>
          <button onClick={handleNextLesson}>&gt;</button>
        </div>
        <ul className="sections-list">
          {Object.keys(selectedLesson.Sections).map((sectionKey, idx) => {
            const section = selectedLesson.Sections[sectionKey];
            return (
              <li
                key={idx}
                className={selectedSection === section ? 'active' : ''}
                onClick={() => setSelectedSection(section)}
              >
                {section.Title}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="module-content">
        {selectedSection ? (
          <>
            <h3>{selectedSection.Title}</h3>
            <div>
              {selectedSection.Subsections && Object.entries(selectedSection.Subsections).map(([subsectionKey, subsectionContent], idx) => (
                <div key={idx}>
                  <h5>{subsectionKey}</h5>
                  {renderContent(subsectionContent)}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Select a section to view its content</p>
        )}
      </div>
    </div>
  );
};

export default ModulePage;
