import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './index.scss';

const ModulePage = () => {
  const { moduleId } = useParams();
  const location = useLocation();
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

        const params = new URLSearchParams(location.search);
        const lessonKey = params.get('lesson') || Object.keys(moduleContent.Lessons)[0];
        setSelectedLessonKey(lessonKey);

        const selectedLesson = moduleContent.Lessons[lessonKey];
        if (selectedLesson) {
          const firstSectionKey = Object.keys(selectedLesson.Sections)[0];
          const firstSection = selectedLesson.Sections[firstSectionKey];
          setSelectedSection(firstSection);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId, location.search]);

  const handleNextLesson = () => {
    const lessonKeys = Object.keys(moduleData?.Lessons || {});
    const currentIndex = lessonKeys.indexOf(selectedLessonKey);
    if (currentIndex < lessonKeys.length - 1) {
      const nextLessonKey = lessonKeys[currentIndex + 1];
      setSelectedLessonKey(nextLessonKey);
      const nextSection = Object.values(moduleData.Lessons[nextLessonKey].Sections)[0];
      setSelectedSection(nextSection);
    }
  };

  const handlePreviousLesson = () => {
    const lessonKeys = Object.keys(moduleData?.Lessons || {});
    const currentIndex = lessonKeys.indexOf(selectedLessonKey);
    if (currentIndex > 0) {
      const previousLessonKey = lessonKeys[currentIndex - 1];
      setSelectedLessonKey(previousLessonKey);
      const previousSection = Object.values(moduleData.Lessons[previousLessonKey].Sections)[0];
      setSelectedSection(previousSection);
    }
  };

  const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val);

  const renderContent = (content, depth = 0) => {
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
    } else if (isObject(content)) {
      const isDeepestLevel = Object.values(content).every(val => !isObject(val));

      return (
        <div>
          {Object.entries(content).map(([key, value], idx) => (
            <div key={idx} style={isDeepestLevel ? { marginBottom: '20px' } : { marginBottom: '10px' }}>
              {isDeepestLevel ? (
                <div className="card">
                  <h5>{key}</h5>
                  <div className="card-content">{renderContent(value, depth + 1)}</div>
                </div>
              ) : (
                <>
                  <h5>{key}</h5>
                  <div style={{ paddingLeft: depth === 0 ? '15px' : '0' }}>{renderContent(value, depth + 1)}</div>
                </>
              )}
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
        {selectedLesson && (
          <div className="lesson-navigation">
            <button onClick={handlePreviousLesson}>&lt;</button>
            <h4>{selectedLesson.Title}</h4>
            <button onClick={handleNextLesson}>&gt;</button>
          </div>
        )}
        <ul className="sections-list">
          {selectedLesson && Object.keys(selectedLesson.Sections).map((sectionKey, idx) => {
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
            <div className="cards-container">
              {selectedSection.Subsections && renderContent(selectedSection.Subsections, 1)}
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
