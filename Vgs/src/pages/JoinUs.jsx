import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GraduationCap, Scale, ArrowLeft, Upload, X } from 'lucide-react';
import { JoinUsCard } from '../components/JoinUsCard';
import Navbar from '../components/Navbar';


export default function JoinUs() {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    relationName: '',
    permanentAddress: '',
    presentAddress: '',
    age: '',
    whatsappNumber: '',
    alternateNumber: '',
    whyChooseYou: '',
    howDidYouKnow: '',
    whyJoinChamber: '',
    resume: null,
    university: '', // for interns
    barRegistrationNumber: '' // for advocates
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'intern' || type === 'advocate') {
      setSelectedType(type);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Special handler for number-only fields
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    
    // Remove any non-digit characters
    const numericValue = value.replace(/\D/g, '');
    
    // Apply specific limits based on field
    let finalValue = numericValue;
    
    if (name === 'whatsappNumber' || name === 'alternateNumber') {
      // Limit to 10 digits for phone numbers
      finalValue = numericValue.slice(0, 10);
    } else if (name === 'age') {
      // Limit age to reasonable range (1-100)
      const ageValue = parseInt(numericValue) || '';
      if (ageValue === '' || (ageValue >= 1 && ageValue <= 100)) {
        finalValue = numericValue.slice(0, 3); // Max 3 digits for age
      } else {
        return; // Don't update if age is out of range
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleFileChange = (file) => {
    if (file && file.type === 'application/pdf') {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    } else {
      alert('Please upload a PDF file only');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      resume: null
    }));
  };

  const copyPermanentAddress = () => {
    setFormData(prev => ({
      ...prev,
      presentAddress: prev.permanentAddress
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    console.log('=== FRONTEND DEBUG: Starting form submission ===');
    console.log('Selected type:', selectedType);
    console.log('Form data:', {
      fullName: formData.fullName,
      email: formData.email,
      relationName: formData.relationName,
      age: formData.age,
      whatsappNumber: formData.whatsappNumber,
      resume: formData.resume ? `${formData.resume.name} (${formData.resume.size} bytes)` : 'No file'
    });

    // Validate phone numbers
    if (formData.whatsappNumber.length !== 10) {
      throw new Error('WhatsApp number must be exactly 10 digits');
    }

    if (formData.alternateNumber && formData.alternateNumber.length !== 10) {
      throw new Error('Alternate number must be exactly 10 digits');
    }

    // Age validation
    if (formData.age && (parseInt(formData.age) < 18 || parseInt(formData.age) > 100)) {
      throw new Error('Age must be between 18 and 100');
    }

    // Resume validation
    if (!formData.resume) {
      throw new Error('Please upload your resume in PDF format');
    }

    // File size validation (10MB)
    if (formData.resume.size > 10 * 1024 * 1024) {
      throw new Error('Resume file size must be less than 10MB');
    }

    // Type-specific validation
    if (selectedType === 'intern' && !formData.university) {
      throw new Error('University/College is required for intern applications');
    }

    if (selectedType === 'advocate' && !formData.barRegistrationNumber) {
      throw new Error('Bar Registration Number is required for advocate applications');
    }

    console.log('✅ All validations passed');

    // Create FormData for file upload
    const submitData = new FormData();
    
    // Add all form fields
    Object.keys(formData).forEach(key => {
      if (key === 'resume' && formData[key]) {
        submitData.append('resume', formData[key]);
        console.log(`Added file: ${formData[key].name}`);
      } else if (key !== 'resume' && formData[key]) {
        submitData.append(key, formData[key]);
        console.log(`Added field ${key}: ${formData[key]}`);
      }
    });
    
    submitData.append('joinType', selectedType);
    console.log(`Added joinType: ${selectedType}`);

    console.log('📤 Sending request to API...');

    // Use the api module instead of fetch
  const response = await fetch("http://localhost:5000/api/join-us", {
  method: "POST",
  body: submitData,
});

const result = await response.json();


    console.log('📥 API Response:', result);

    if (result.success) {
      setSubmitStatus({ 
        type: 'success', 
        message: 'Application submitted successfully! We will contact you soon.' 
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        relationName: '',
        permanentAddress: '',
        presentAddress: '',
        age: '',
        whatsappNumber: '',
        alternateNumber: '',
        whyChooseYou: '',
        howDidYouKnow: '',
        whyJoinChamber: '',
        resume: null,
        university: '',
        barRegistrationNumber: ''
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } else {
      throw new Error(result.message || 'Something went wrong');
    }
  } catch (error) {
    console.error('❌ FRONTEND ERROR:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    }
    
    if (error.request) {
      console.error('Request:', error.request);
    }
    
    let errorMessage = 'Failed to submit application. Please try again.';
    
    // Handle different types of errors
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      // Check if it's a network error
      if (error.message.includes('Network Error') || error.message.includes('ERR_NETWORK')) {
        errorMessage = 'Cannot connect to server. Please check if the server is running on port 5000.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timeout. Please try again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    setSubmitStatus({ type: 'error', message: errorMessage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    setIsSubmitting(false);
  }
};
  const handleBackToOptions = () => {
    setSelectedType(null);
    setSubmitStatus(null); // Clear any previous status
    // Reset form when going back
    setFormData({
      fullName: '',
      email: '',
      relationName: '',
      permanentAddress: '',
      presentAddress: '',
      age: '',
      whatsappNumber: '',
      alternateNumber: '',
      whyChooseYou: '',
      howDidYouKnow: '',
      whyJoinChamber: '',
      resume: null,
      university: '',
      barRegistrationNumber: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #f59e0b,
            #f59e0b 2px,
            transparent 2px,
            transparent 20px
          )`
        }} />
      </div>
      
      {/* Header Section */}
      <header className="relative bg-[#36454F] py-16 md:py-24">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 to-amber-500" />
        
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {selectedType ? `Join as ${selectedType === 'intern' ? 'an Intern' : 'an Advocate'}` : 'Join Us'}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-sans">
            {selectedType 
              ? `Be part of our legal team as ${selectedType === 'intern' ? 'an intern' : 'an advocate'}`
              : 'Be part of a trusted legal team'
            }
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          {selectedType ? (
            // Application Form
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <button
                    onClick={handleBackToOptions}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mr-4"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Options</span>
                  </button>
                </div>
                
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    selectedType === 'intern' 
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                      : 'bg-gradient-to-br from-amber-400 to-amber-600'
                  }`}>
                    {selectedType === 'intern' ? (
                      <GraduationCap className="h-10 w-10 text-white" />
                    ) : (
                      <Scale className="h-10 w-10 text-white" />
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Apply as {selectedType === 'intern' ? 'an Intern' : 'an Advocate'}
                  </h2>
                  <p className="text-gray-600">
                    {selectedType === 'intern' 
                      ? 'Gain real-world legal experience and grow with industry mentors.'
                      : 'Collaborate with a network of legal professionals and contribute your expertise.'
                    }
                  </p>
                </div>

                {/* Status Message */}
               {selectedType && submitStatus && (
  <div className={`mb-6 p-4 rounded-lg ${
    submitStatus.type === 'success' 
      ? 'bg-green-50 text-green-800 border border-green-200' 
      : 'bg-red-50 text-red-800 border border-red-200'
  }`}>
    <div className="flex items-center">
      <div className="flex-shrink-0">
        {submitStatus.type === 'success' ? (
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div className="ml-3">
        <p className="font-medium">{submitStatus.message}</p>
      </div>
    </div>
  </div>
)}


                {/* Application Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  {/* S/o, D/o, W/o */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">S/o. D/o. W/o. *</label>
                    <input
                      type="text"
                      name="relationName"
                      value={formData.relationName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Mention your father's name and if married then husband's name"
                      required
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleNumberInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter your age (18-100)"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="3"
                      required
                    />
                    {formData.age && (parseInt(formData.age) < 18 || parseInt(formData.age) > 100) && (
                      <p className="text-red-500 text-sm mt-1">Age must be between 18 and 100</p>
                    )}
                  </div>

                  {/* Addresses */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Permanent Address *</label>
                      <textarea
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                        placeholder="Enter your permanent address"
                        required
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Present Address *</label>
                        <button
                          type="button"
                          onClick={copyPermanentAddress}
                          className="text-sm text-amber-600 hover:text-amber-700 underline"
                        >
                          Same as permanent address
                        </button>
                      </div>
                      <textarea
                        name="presentAddress"
                        value={formData.presentAddress}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                        placeholder="Enter your present address"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Numbers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number *</label>
                      <input
                        type="text"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleNumberInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter WhatsApp number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="10"
                        required
                      />
                      {formData.whatsappNumber && formData.whatsappNumber.length !== 10 && (
                        <p className="text-red-500 text-sm mt-1">WhatsApp number must be exactly 10 digits</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Number</label>
                      <input
                        type="text"
                        name="alternateNumber"
                        value={formData.alternateNumber}
                        onChange={handleNumberInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter alternate number (optional)"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="10"
                      />
                      {formData.alternateNumber && formData.alternateNumber.length > 0 && formData.alternateNumber.length !== 10 && (
                        <p className="text-red-500 text-sm mt-1">Alternate number must be exactly 10 digits</p>
                      )}
                    </div>
                  </div>

                  {/* Specific Fields */}
                  {selectedType === 'intern' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">University/College *</label>
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your university/college name"
                        required
                      />
                    </div>
                  )}

                  {selectedType === 'advocate' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bar Registration Number *</label>
                      <input
                        type="text"
                        name="barRegistrationNumber"
                        value={formData.barRegistrationNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your bar registration number"
                        required
                      />
                    </div>
                  )}

                  {/* Why should we choose you */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Why should we choose you? *</label>
                    <textarea
                      name="whyChooseYou"
                      value={formData.whyChooseYou}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                      placeholder="Tell us why you would be a valuable addition to our team..."
                      required
                    />
                  </div>

                  {/* How did you know about chamber */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From where do you get to know about our chamber? *</label>
                    <textarea
                      name="howDidYouKnow"
                      value={formData.howDidYouKnow}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                      placeholder="Tell us how you came to know about VRG Legal..."
                      required
                    />
                  </div>

                  {/* Why join chamber */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Why do you wish to join our chamber? *</label>
                    <textarea
                      name="whyJoinChamber"
                      value={formData.whyJoinChamber}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                      placeholder="Explain your motivation for joining our chamber..."
                      required
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Resume / CV in PDF Form *</label>
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                        dragActive 
                          ? 'border-amber-400 bg-amber-50' 
                          : 'border-gray-300 hover:border-amber-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {formData.resume ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 rounded">
                              <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{formData.resume.name}</p>
                              <p className="text-sm text-gray-500">{(formData.resume.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-1 text-gray-400 hover:text-red-500"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-4">
                            <label htmlFor="resume-upload" className="cursor-pointer">
                              <span className="mt-2 block text-sm font-medium text-gray-900">
                                Drop your PDF here or{' '}
                                <span className="text-amber-600 underline">browse</span>
                              </span>
                              <input
                                id="resume-upload"
                                name="resume-upload"
                                type="file"
                                className="sr-only"
                                accept=".pdf"
                                onChange={(e) => handleFileChange(e.target.files[0])}
                              />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">PDF files only, up to 10MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.resume}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                      selectedType === 'intern'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600'
                        : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:from-amber-500 hover:to-amber-600'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Application...
                      </div>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // Show both options
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              <JoinUsCard
                icon={<GraduationCap size={48} />}
                title="Join as an Intern"
                description="Gain real-world legal experience and grow with industry mentors."
                buttonText="Apply as Intern"
                variant="intern"
                onApply={() => setSelectedType('intern')}
              />
              
              <JoinUsCard
                icon={<Scale size={48} />}
                title="Join as an Advocate"
                description="Collaborate with a network of legal professionals and contribute your expertise."
                buttonText="Apply as Advocate"
                variant="advocate"
                onApply={() => setSelectedType('advocate')}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}