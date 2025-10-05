import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle, User, Thermometer, Heart, Brain, Stethoscope } from 'lucide-react';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: [],
    duration: '',
    severity: '',
    additionalInfo: ''
  });
  const [results, setResults] = useState(null);

  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Fatigue', 'Sore Throat',
    'Shortness of Breath', 'Muscle Pain', 'Nausea', 'Dizziness',
    'Chest Pain', 'Abdominal Pain', 'Runny Nose', 'Loss of Appetite',
    'Vomiting', 'Diarrhea', 'Joint Pain', 'Rash', 'Chills'
  ];

  const analyzeSymptoms = () => {
    setLoading(true);
    
    setTimeout(() => {
      const symptomSet = formData.symptoms.map(s => s.toLowerCase());
      const diseases = [];

      if (symptomSet.includes('fever') && symptomSet.includes('cough')) {
        if (symptomSet.includes('shortness of breath')) {
          diseases.push({ name: 'COVID-19', percentage: 78, severity: 'high' });
          diseases.push({ name: 'Pneumonia', percentage: 65, severity: 'high' });
        } else {
          diseases.push({ name: 'Common Cold', percentage: 72, severity: 'low' });
          diseases.push({ name: 'Influenza (Flu)', percentage: 68, severity: 'medium' });
        }
      }

      if (symptomSet.includes('headache') && symptomSet.includes('fever')) {
        diseases.push({ name: 'Viral Infection', percentage: 70, severity: 'medium' });
        if (symptomSet.includes('nausea')) {
          diseases.push({ name: 'Migraine', percentage: 55, severity: 'medium' });
        }
      }

      if (symptomSet.includes('sore throat') && symptomSet.includes('fever')) {
        diseases.push({ name: 'Strep Throat', percentage: 64, severity: 'medium' });
        diseases.push({ name: 'Tonsillitis', percentage: 58, severity: 'medium' });
      }

      if (symptomSet.includes('abdominal pain') && symptomSet.includes('nausea')) {
        diseases.push({ name: 'Gastroenteritis', percentage: 75, severity: 'medium' });
        if (symptomSet.includes('diarrhea')) {
          diseases.push({ name: 'Food Poisoning', percentage: 69, severity: 'medium' });
        }
      }

      if (symptomSet.includes('chest pain') && symptomSet.includes('shortness of breath')) {
        diseases.push({ name: 'Asthma', percentage: 62, severity: 'high' });
        diseases.push({ name: 'Anxiety', percentage: 48, severity: 'medium' });
      }

      if (diseases.length === 0) {
        diseases.push(
          { name: 'General Viral Infection', percentage: 65, severity: 'low' },
          { name: 'Stress-Related Symptoms', percentage: 42, severity: 'low' },
          { name: 'Minor Illness', percentage: 38, severity: 'low' }
        );
      }

      diseases.sort((a, b) => b.percentage - a.percentage);
      setResults(diseases.slice(0, 5));
      setLoading(false);
      setStep(4);
    }, 2500);
  };

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return 'severity-default';
    }
  };

  const renderStep1 = () => (
    <div className="step-container animate-fadeIn">
      <div className="step-header">
        <div className="icon-circle icon-bounce bg-gradient-blue-purple">
          <Stethoscope className="icon-large" />
        </div>
        <h2 className="step-title">Personal Information</h2>
        <p className="step-subtitle">Let's start with some basic details</p>
      </div>

      <div className="form-group">
        <div className="input-group">
          <label className="input-label">Full Name</label>
          <div className="input-with-icon">
            <User className="input-icon" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="text-input"
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="grid-two-col">
          <div className="input-group">
            <label className="input-label">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              className="text-input"
              placeholder="Age"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="text-input"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setStep(2)}
          disabled={!formData.name || !formData.age || !formData.gender}
          className="btn btn-primary btn-full"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="step-container animate-fadeIn">
      <div className="step-header">
        <div className="icon-circle icon-pulse bg-gradient-purple-pink">
          <Activity className="icon-large" />
        </div>
        <h2 className="step-title">Select Your Symptoms</h2>
        <p className="step-subtitle">Choose all symptoms you're experiencing</p>
      </div>

      <div className="symptom-grid">
        {commonSymptoms.map((symptom) => (
          <button
            key={symptom}
            onClick={() => handleSymptomToggle(symptom)}
            className={`symptom-btn ${formData.symptoms.includes(symptom) ? 'symptom-btn-active' : ''}`}
          >
            {symptom}
          </button>
        ))}
      </div>

      <div className="btn-group">
        <button
          onClick={() => setStep(1)}
          className="btn btn-secondary btn-half"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={formData.symptoms.length === 0}
          className="btn btn-primary btn-half"
        >
          Continue ({formData.symptoms.length} selected)
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="step-container animate-fadeIn">
      <div className="step-header">
        <div className="icon-circle icon-bounce bg-gradient-pink-red">
          <Thermometer className="icon-large" />
        </div>
        <h2 className="step-title">Additional Details</h2>
        <p className="step-subtitle">Help us understand your condition better</p>
      </div>

      <div className="form-group">
        <div className="input-group">
          <label className="input-label">How long have you had these symptoms?</label>
          <select
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="text-input"
          >
            <option value="">Select duration</option>
            <option value="less-than-24">Less than 24 hours</option>
            <option value="1-3-days">1-3 days</option>
            <option value="4-7-days">4-7 days</option>
            <option value="more-than-week">More than a week</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Severity Level</label>
          <div className="severity-grid">
            {['Mild', 'Moderate', 'Severe'].map((level) => (
              <button
                key={level}
                onClick={() => setFormData({...formData, severity: level})}
                className={`severity-btn ${formData.severity === level ? 'severity-btn-active' : ''}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Additional Information (Optional)</label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
            className="text-input textarea"
            rows="3"
            placeholder="Any other details you'd like to share..."
          />
        </div>
      </div>

      <div className="btn-group">
        <button
          onClick={() => setStep(2)}
          className="btn btn-secondary btn-half"
        >
          Back
        </button>
        <button
          onClick={analyzeSymptoms}
          disabled={!formData.duration || !formData.severity}
          className="btn btn-analyze btn-half"
        >
          Analyze Symptoms
        </button>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="loading-container animate-fadeIn">
      <div className="loading-icon">
        <Brain className="brain-icon" />
      </div>
      <h2 className="loading-title">Analyzing Your Symptoms</h2>
      <p className="loading-subtitle">Our AI is processing your information...</p>
      <div className="loading-dots">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="step-container animate-fadeIn">
      <div className="step-header">
        <div className="icon-circle icon-bounce bg-gradient-green-blue">
          <CheckCircle className="icon-large" />
        </div>
        <h2 className="step-title">Analysis Results</h2>
        <p className="step-subtitle">Based on your symptoms, here are possible conditions</p>
      </div>

      <div className="alert alert-info">
        <AlertCircle className="alert-icon" />
        <div className="alert-content">
          <p className="alert-title">Important Disclaimer</p>
          <p className="alert-text">This is an AI-powered analysis for informational purposes only. Please consult a healthcare professional for proper diagnosis and treatment.</p>
        </div>
      </div>

      <div className="results-list">
        {results && results.map((disease, index) => (
          <div
            key={index}
            className="result-card animate-slideIn"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="result-header">
              <div className="result-info">
                <div className="result-number">{index + 1}</div>
                <h3 className="result-title">{disease.name}</h3>
              </div>
              <span className={`severity-badge ${getSeverityColor(disease.severity)}`}>
                {disease.severity.toUpperCase()}
              </span>
            </div>
            
            <div className="result-progress">
              <div className="progress-info">
                <span className="progress-label">Match Probability</span>
                <span className="progress-value">{disease.percentage}%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{width: `${disease.percentage}%`}}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-warning">
        <Heart className="alert-icon" />
        <div className="alert-content">
          <p className="alert-title">Next Steps</p>
          <ul className="alert-list">
            <li>Schedule an appointment with your healthcare provider</li>
            <li>Monitor your symptoms and note any changes</li>
            <li>Stay hydrated and get adequate rest</li>
            <li>Seek immediate medical attention if symptoms worsen</li>
          </ul>
        </div>
      </div>

      <button
        onClick={() => {
          setStep(1);
          setFormData({
            name: '',
            age: '',
            gender: '',
            symptoms: [],
            duration: '',
            severity: '',
            additionalInfo: ''
          });
          setResults(null);
        }}
        className="btn btn-primary btn-full"
      >
        Start New Analysis
      </button>
    </div>
  );

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="app-header">
          <h1 className="app-title">TruScribe Symptom Checker</h1>
          <p className="app-subtitle">Powered by Advanced Medical AI</p>
        </div>

        {step < 4 && !loading && (
          <div className="progress-container">
            <div className="progress-steps">
              {[1, 2, 3].map((s) => (
                <div key={s} className="progress-step-wrapper">
                  <div className={`progress-step ${step >= s ? 'progress-step-active' : ''}`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`progress-line ${step > s ? 'progress-line-active' : ''}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card">
          {loading ? renderLoading() : (
            <>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderResults()}
            </>
          )}
        </div>

        <div className="footer">
          <p>© 2025 TruScribe Symptom Checker. For educational purposes only.</p>
          <p className="developer-credit">
            Developed by <span className="developer-name">Abhay Tyagi</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;