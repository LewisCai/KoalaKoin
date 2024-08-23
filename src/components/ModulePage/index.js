import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.scss';

const ModulePage = () => {
  const { moduleId } = useParams(); // Get the moduleId from the URL
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/modules/${moduleId}`);
        const moduleContent = response.data.ModuleContent[`Module ${moduleId.substring(1)}`];
        setModuleData(moduleContent);

        const firstLessonKey = Object.keys(moduleContent.Lessons)[0];
        const firstLesson = moduleContent.Lessons[firstLessonKey];
        setSelectedLesson(firstLesson);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]); // Refetch when moduleId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!moduleData || !moduleData.Lessons) return <div>Error: Module data is missing or incomplete.</div>;

  const lessons = Object.keys(moduleData.Lessons);

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
            <div key={idx}>
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

  return (
    <div className="module-page">
      <div className="module-sidebar">
        <h3>{moduleData.Title}</h3>
        <ul>
          {lessons.map((lessonKey, index) => {
            const lesson = moduleData.Lessons[lessonKey];
            return (
              <li
                key={index}
                className={selectedLesson === lesson ? 'active' : ''}
                onClick={() => setSelectedLesson(lesson)}
              >
                {`${lessonKey.replace('_', '.')}: ${lesson.Title}`}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="module-content">
        {selectedLesson ? (
          <>
            <h3>{selectedLesson.Title}</h3>
            {Object.keys(selectedLesson.Sections).map((sectionKey, idx) => {
              const section = selectedLesson.Sections[sectionKey];
              return (
                <div key={idx}>
                  <h4>{section.Title}</h4>
                  <div>
                    {section.Subsections && Object.entries(section.Subsections).map(([subsectionKey, subsectionContent], idx) => (
                      <div key={idx}>
                        <h5>{subsectionKey}</h5>
                        {renderContent(subsectionContent)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p>Select a section to view its content</p>
        )}
      </div>
    </div>
  );
};

export default ModulePage;
