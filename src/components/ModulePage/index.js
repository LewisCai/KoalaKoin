import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.scss';

const ModulePage = () => {
    const [moduleData, setModuleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null); // State to track the selected lesson
    
    useEffect(() => {
        const fetchModuleData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/module1');
                setModuleData(response.data);

                const firstLessonKey = Object.keys(response.data.data)[0]; // Get the first lesson key
                const firstLesson = response.data.data[firstLessonKey]; // Get the first lesson

                setSelectedLesson(firstLesson); // Set the first lesson as default
                setSelectedSection(Object.values(firstLesson.sections)[0]); // Set the first section as default
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchModuleData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!moduleData || !moduleData.data) {
        return <div>Error: Module data is missing or incomplete.</div>;
    }

    const lessons = Object.keys(moduleData.data);

    return (
        <div className="module-page">
            <div className="module-sidebar">
                <h3>{moduleData.moduleName}</h3>
                <ul>
                    {lessons.map((lessonKey, index) => {
                        const lesson = moduleData.data[lessonKey];
                        return (
                            <li
                                key={index}
                                className={selectedLesson === lesson ? 'active' : ''}
                                onClick={() => {
                                    setSelectedLesson(lesson); // Set the selected lesson
                                    setSelectedSection(Object.values(lesson.sections)[0]); // Select the first section in the lesson
                                }}
                            >
                                {`${lessonKey.replace('_', '.')}: ${lesson.lesson_title}`}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="module-content">
                {selectedSection && selectedLesson ? (
                    <>
                        {/* Display the lesson title */}
                        <h3>{selectedLesson.lesson_title}</h3>

                        {/* Display the section summary */}
                        <p>{selectedSection.section_summary}</p>

                        {/* Display General Information */}
                        <div>
                            <h4>General Information</h4>
                            {selectedSection.content?.general_information && Object.values(selectedSection.content.general_information).map((info, idx) => (
                                <p key={idx}>{info}</p>
                            ))}
                        </div>

                        {/* Display Key Points */}
                        <div>
                            <h4>Key Points</h4>
                            {selectedSection.content?.key_points && (
                                <ul>
                                    {Object.values(selectedSection.content.key_points).map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Display Real-World Applications */}
                        <div>
                            <h4>Real-World Applications</h4>
                            {selectedSection.content?.real_world_applications && (
                                <ul>
                                    {Object.values(selectedSection.content.real_world_applications).map((application, idx) => (
                                        <li key={idx}>{application}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Display Interactive Activities */}
                        <div>
                            <h4>Interactive Activities</h4>
                            {selectedSection.content?.interactive_activities && Object.values(selectedSection.content.interactive_activities).map((activity, idx) => (
                                <p key={idx}>{activity}</p>
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
