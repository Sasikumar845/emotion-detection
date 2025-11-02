
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-slate-800/50 p-8 rounded-lg border border-slate-700 backdrop-blur-sm animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-slate-100 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">About This Application</h2>
      
      <div className="space-y-6 text-slate-300">
        <p>
          The AI Emotion Detector is a web application designed to analyze text and identify the underlying emotions. Using advanced Natural Language Processing (NLP), it provides insights into the emotional tone of any given piece of text, from a simple sentence to a lengthy paragraph.
        </p>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-slate-200">How It Works</h3>
          <p>
            When you enter text and click "Detect Emotion," the application sends your input to a powerful AI model. The model processes the language, context, and sentiment to determine the probabilities of various emotions being present. The results are then visualized in a clear bar chart, making it easy to understand the emotional composition of the text.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-slate-200">Technology Stack</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <span className="font-semibold text-blue-400">React & TypeScript:</span> For building a robust and type-safe user interface.
            </li>
            <li>
              <span className="font-semibold text-teal-400">Tailwind CSS:</span> For creating a modern, responsive, and visually appealing design without custom CSS.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Google Gemini API:</span> The state-of-the-art AI model that performs the core NLP task of emotion detection.
            </li>
             <li>
              <span className="font-semibold text-pink-400">Recharts:</span> A composable charting library to visualize the emotion analysis results effectively.
            </li>
          </ul>
        </div>

        <p>
          This project demonstrates the power of integrating modern frontend technologies with advanced AI capabilities to create practical and insightful tools.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
