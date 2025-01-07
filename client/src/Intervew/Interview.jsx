import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstanceFlask from '../utils/axiosinstanceflask';
import Navbar from '../Navbar/Navbar';
import './interveiw.css'
import bot from './mock.gif'
import videoSrc from './mock.mp4'

const Interview = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [currentResponse, setCurrentResponse] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const recognitionRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    useEffect(() => {
        if (location.state?.questions) {
            setQuestions(location.state.questions);
            startInterview(location.state.questions);
        } else {
            console.error('No questions received');
        }
    }, [location.state]);

    const speakQuestion = (text,videoRef) => {
        const utterance = new SpeechSynthesisUtterance(text);

         utterance.onstart = () => {
            if (videoRef.current) {
                console.log("Playing video");
                videoRef.current.play();
            } else {
                console.error("Video element is not available.");
            }
        };

         utterance.onend = () => {
        if (videoRef.current) {
            console.log("Stopping video");
            videoRef.current.pause();
            videoRef.current.currentTime = 0;  // Optionally reset the video to the beginning
        } else {
            console.error("Video element is not available.");
        }
    };
        window.speechSynthesis.speak(utterance);
           
        
        
    };

    const initSpeechRecognition = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
            console.log("Listening for answer...");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            console.log('Transcript received:', transcript);
            setCurrentResponse(transcript);
            console.log('Updated currentResponse:', transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
            console.log('Speech recognition ended');
        };

        recognitionRef.current = recognition;
    };

    const toggleListenForAnswer = () => {
        if (!recognitionRef.current) {
            initSpeechRecognition();
        }
        if (isListening) {
            recognitionRef.current.stop();
            console.log("Stopped listening");
        } else {
            recognitionRef.current.start();
            console.log("Started listening");
        }
    };

    const saveResponse = async () => {
        console.log('Preparing to save currentResponse:', currentResponse);
        try {
            const currentQuestion = questions[currentQuestionIndex];
            await axiosInstanceFlask.post('/save-response', {
                question: currentQuestion,
                response: currentResponse,
            });
            console.log('Response saved successfully:', currentResponse);
        } catch (error) {
            console.error('Error sending response:', error);
        }
    };

    const handleNextQuestion = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        console.log('Current response before moving to the next question:', currentResponse);
        saveResponse();

        // Add question and response to responses array
        setResponses((prevResponses) => [
            ...prevResponses,
            { question: questions[currentQuestionIndex], response: currentResponse }
        ]);

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentResponse(''); // Clear current response for the next question
            console.log('Cleared currentResponse for next question');
            askQuestion(currentQuestionIndex + 1);
        } else {
            handleFinish();
        }
    };

    const startInterview = (questions) => {
        if (questions.length > 0) {
            askQuestion(0);
        }
    };

    const askQuestion = (index) => {
        if (index < questions.length) {
            speakQuestion(questions[index],videoRef);
        }
    };

    const handleFinish = () => setIsCompleted(true);

    const handleOverview = () => {
        navigate('/overview', { state: { responses } });
    };

    const handleResults = async () => {
        try {
            const response = await axiosInstanceFlask.post('/result');
            const totalScore = parseInt(response.data, 10);
            navigate('/results', { state: { totalScore } });
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

//     return (
//         <div>
//             <Navbar />
//             <div className="interview-container min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-5">
//                     {isCompleted ? (
//                         <div>
//                             <button onClick={handleOverview} className="bg-blue-500 text-white rounded p-2 mt-4">
//                                 View Overview
//                             </button>
//                             <button onClick={handleResults} className="bg-purple-500 text-white rounded p-2 mt-4 ml-2">
//                                 View Results
//                             </button>
//                         </div>
//                     ) : (
//                         <>
//                             <h1 className="text-xl font-bold mb-4">Interview Questions</h1>
//                             <div>
//                                 <p className="mb-4">{questions[currentQuestionIndex]}</p>
//                                 <button onClick={toggleListenForAnswer} className="bg-blue-500 text-white rounded p-2">
//                                     {isListening ? 'Stop Listening' : 'Start Listening'}
//                                 </button>
//                                 <button onClick={handleNextQuestion} className="bg-green-500 text-white rounded p-2 ml-4">
//                                     Next Question
//                                 </button>
//                                 <div className="mt-4">
//                                     <h3 className="font-semibold">Your Response:</h3>
//                                     <p><strong>{currentResponse}</strong></p>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };



 return (
        <div>
            <Navbar />
            <div className="interview-container min-h-screen bg-gray-100 flex flex-col justify-between items-center">
                {isCompleted ? (
                    <div className="flex flex-col items-center justify-start h-full pt-16 space-y-6">
                        <button
                            onClick={handleOverview}
                            className="bg-blue-500 text-white rounded-md px-6 py-2 shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
                            aria-label="View Overview"
                        >
                            View Overview
                        </button>
                        <button
                            onClick={handleResults}
                            className="bg-purple-500 text-white rounded-md px-6 py-2 shadow-md hover:bg-purple-600 transition-transform transform hover:scale-105"
                            aria-label="View Results"
                        >
                            View Results
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col justify-start items-center h-3/4 space-y-4 px-4 w-full max-w-screen-md pt-7">
                            <h1 className="text-2xl md:text-3xl font-bold text-center">Interview Questions</h1>
                            <p className="text-lg md:text-xl text-center">
                                {questions[currentQuestionIndex]}
                            </p>
                        </div>
                         {/* <div className="vedio-container">
                         <img src={bot}  alt='imageai'/>
                         <vedio src={vedioSrc} >
                         </vedio>
                        </div>  */}

                              <div className="video-container">
                                <video 
                                    ref={videoRef}
                                    src={videoSrc}
                                    className="vedio "
                                    autoPlay// Ensure muted for autoplay without user interaction  object-cover rounded-md
                                >
                                    Your browser does not support the video tag.
                                </video>
                                </div>
                        <div className="px-6  bg-gray-50 shadow-inner w-full max-w-screen-md">
                            <h3 className="font-medium text-md md:text-lg">Your Response:</h3>
                            <p className="text-gray-800 border p-3 rounded-md bg-white">
                                {currentResponse || "No response yet"}
                            </p>
                        </div>
                        <div className="flex justify-around items-center   w-full max-w-screen-md mb-7">
                            <button
                                onClick={toggleListenForAnswer}
                                className="bg-blue-500 text-white rounded-md px-6 py-2 shadow-sm hover:bg-blue-600 transition-transform transform hover:scale-105"
                                aria-label={isListening ? "Stop Listening" : "Start Listening"}
                            >
                                {isListening ? "Stop Listening" : "Start Listening"}
                            </button>
                            <button
                                onClick={handleNextQuestion}
                                className="bg-green-500 text-white rounded-md px-6 py-2 shadow-sm hover:bg-green-600 transition-transform transform hover:scale-105"
                                aria-label="Next Question"
                                
                            >
                                Next Question
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Interview;