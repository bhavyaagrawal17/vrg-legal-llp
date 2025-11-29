import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { GraduationCap, Scale, ArrowLeft, Upload } from "lucide-react";
import { JoinUsCard } from "../components/JoinUsCard";
import Navbar from "../components/Navbar";

export default function JoinUs() {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    permanentAddress: "",
    presentAddress: "",
    whatsappNumber: "",
    alternateNumber: "",
    whyChooseYou: "",
    howDidYouKnow: "",
    whyJoinChamber: "",
    coverLetter: null,   // UPDATED ✔
    resume: null,
    university: "",
    advocateUniversity: "",
    additionalQualification: "",
    barRegistrationNumber: "",
    year: "",
    semester: "",
  });
useEffect(() => {
  // Reset fields whenever user switches between Intern / Advocate
  setFormData({
    fullName: "",
    email: "",
    permanentAddress: "",
    presentAddress: "",
    whatsappNumber: "",
    alternateNumber: "",
    whyChooseYou: "",
    howDidYouKnow: "",
    whyJoinChamber: "",
    coverLetter: null,
    resume: null,
    university: "",
    advocateUniversity: "",
    additionalQualification: "",
    barRegistrationNumber: "",
    year: "",
    semester: "",
  });

  setSubmitStatus(null);
  setIsSubmitting(false); 
}, [selectedType]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    
    const type = searchParams.get("type");
    if (type === "intern" || type === "advocate") {
      setSelectedType(type);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    const finalValue =
      name === "whatsappNumber" || name === "alternateNumber"
        ? numericValue.slice(0, 10)
        : numericValue;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const validateFile = (file) => {
    if (!file) return true;
    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed.");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("File must be below 10MB.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // ✔ at least one file required
      if (!formData.coverLetter && !formData.resume) {
        throw new Error("Please upload at least a Cover Letter or a Resume");
      }

      if (!validateFile(formData.coverLetter) || !validateFile(formData.resume)) {
        throw new Error("Invalid file type or size");
      }

      if (formData.whatsappNumber.length !== 10)
        throw new Error("WhatsApp number must be exactly 10 digits");

      if (formData.alternateNumber && formData.alternateNumber.length !== 10)
        throw new Error("Alternate number must be exactly 10 digits");

      if (selectedType === "intern") {
        if (!formData.university) throw new Error("University is required");
        if (!formData.year) throw new Error("Year is required");
        if (!formData.semester) throw new Error("Semester is required");
      }

      if (selectedType === "advocate") {
        if (!formData.barRegistrationNumber)
          throw new Error("Bar Registration Number is required");
        if (!formData.advocateUniversity)
          throw new Error("University name is required");
      }

      // ✔ Prepare FormData
      const submitData = new FormData();
      if (formData.coverLetter) submitData.append("coverLetter", formData.coverLetter);
      if (formData.resume) submitData.append("resume", formData.resume);

      Object.keys(formData).forEach((key) => {
        if (key !== "coverLetter" && key !== "resume" && formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      submitData.append("joinType", selectedType);

      const response = await fetch("http://localhost:5000/api/join-us", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Application submitted successfully!",
        });

        window.scrollTo({ top: 0, behavior: "smooth" });

        // reset form
        setFormData({
          fullName: "",
          email: "",
          permanentAddress: "",
          presentAddress: "",
          whatsappNumber: "",
          alternateNumber: "",
          whyChooseYou: "",
          howDidYouKnow: "",
          whyJoinChamber: "",
          coverLetter: null,
          resume: null,
          university: "",
          advocateUniversity: "",
          additionalQualification: "",
          barRegistrationNumber: "",
          year: "",
          semester: "",
        });
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: error.message });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
  const hasUnsavedData = Object.values(formData).some(v => v);

  const handleBeforeUnload = (e) => {
    if (hasUnsavedData && !isSubmitting) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);
  return () => window.removeEventListener("beforeunload", handleBeforeUnload);
}, [formData, isSubmitting]);


 const handleBackClick = () => {
  if (isSubmitting) {
    alert("Form is submitting. Please wait...");
    return;
  }

  if (Object.values(formData).some(v => v)) {
    const confirmSwitch = window.confirm(
      "If you go back, all filled data will be lost. Continue?"
    );
    if (!confirmSwitch) return;
  }

  setSelectedType(null);
  setSubmitStatus(null);
};


  // ================================
  // FILE UPLOAD UI (COVER LETTER + RESUME)
  // ================================
  const FileUploadUI = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Cover Letter or Resume (PDF, max 10MB) *
      </label>

      {/* Cover Letter Upload */}
      <div className="p-4 mb-4 border-2 border-dashed rounded-lg hover:border-amber-400 transition">
        <p className="text-sm font-medium mb-2">Upload Cover Letter</p>

        {!formData.coverLetter ? (
          <label className="cursor-pointer text-amber-600 underline">
            Choose File
            <input
              type="file"
              className="sr-only"
              accept=".pdf"
              onChange={(e) =>
                setFormData({ ...formData, coverLetter: e.target.files[0] })
              }
            />
          </label>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{formData.coverLetter.name}</p>
              <p className="text-xs text-gray-500">
                {(formData.coverLetter.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, coverLetter: null })}
              className="text-red-600"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Resume Upload */}
      <div className="p-4 border-2 border-dashed rounded-lg hover:border-amber-400 transition">
        <p className="text-sm font-medium mb-2">Upload Resume</p>

        {!formData.resume ? (
          <label className="cursor-pointer text-amber-600 underline">
            Choose Resume
            <input
              type="file"
              className="sr-only"
              accept=".pdf"
              onChange={(e) =>
                setFormData({ ...formData, resume: e.target.files[0] })
              }
            />
          </label>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{formData.resume.name}</p>
              <p className="text-xs text-gray-500">
                {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, resume: null })}
              className="text-red-600"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
const handleTypeSwitch = (type) => {
  if (isSubmitting) {
    alert("Your application is being submitted. Please wait...");
    return;
  }

  if (formData.fullName || formData.email || formData.permanentAddress || formData.presentAddress ||
      formData.whatsappNumber || formData.alternateNumber || formData.whyChooseYou ||
      formData.howDidYouKnow || formData.whyJoinChamber || formData.coverLetter || formData.resume ||
      formData.university || formData.advocateUniversity || formData.additionalQualification ||
      formData.barRegistrationNumber || formData.year || formData.semester) 
  {
    const confirmSwitch = window.confirm(
      "If you switch now, the data you entered in this form will be lost. Continue?"
    );
    if (!confirmSwitch) return;
  }

  setSelectedType(type);
};

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative z-50">
        <Navbar formData={formData}
         isSubmitting={isSubmitting}/>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #f59e0b,
              #f59e0b 2px,
              transparent 2px,
              transparent 20px
            )`,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative bg-[#36454F] py-16 md:py-24">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 to-amber-500" />

        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {selectedType
              ? `Join as ${
                  selectedType === "intern" ? "an Intern" : "an Advocate"
                }`
              : "Join Us"}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-sans">
            {selectedType
              ? `Be part of our legal team as ${
                  selectedType === "intern" ? "an intern" : "an advocate"
                }`
              : "Be part of a trusted legal team"}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          {selectedType ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Back button */}
                <button
                  onClick={handleBackClick}

                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition mb-6"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Options</span>
                </button>

                {/* Title & Icon */}
                <div className="text-center mb-8">
                  <div
                    className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      selectedType === "intern"
                        ? "bg-gradient-to-br from-blue-400 to-blue-600"
                        : "bg-gradient-to-br from-amber-400 to-amber-600"
                    }`}
                  >
                    {selectedType === "intern" ? (
                      <GraduationCap className="h-10 w-10 text-white" />
                    ) : (
                      <Scale className="h-10 w-10 text-white" />
                    )}
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Apply as{" "}
                    {selectedType === "intern" ? "an Intern" : "an Advocate"}
                  </h2>

                  <p className="text-gray-600">
                    {selectedType === "intern"
                      ? "Gain real-world legal experience and grow with industry mentors."
                      : "Collaborate with experienced legal professionals and contribute your expertise."}
                  </p>
                </div>

                {/* Status Message */}
                {submitStatus && (
                  <div
                    className={`mb-6 p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    <p className="font-medium text-center">
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                {/* FORM START */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500"
                      required
                    />
                  </div>

                  {/* Permanent Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Permanent Address *
                    </label>
                    <textarea
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-amber-500"
                      required
                    />
                  </div>

                  {/* Present Address */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Present Address *
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            presentAddress: prev.permanentAddress,
                          }))
                        }
                        className="text-sm text-amber-600 underline"
                      >
                        Same as permanent address
                      </button>
                    </div>

                    <textarea
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-amber-500"
                      required
                    />
                  </div>

                  {/* Phone Numbers */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Number *
                      </label>
                      <input
                        type="text"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleNumberInputChange}
                        maxLength="10"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alternate Number
                      </label>
                      <input
                        type="text"
                        name="alternateNumber"
                        value={formData.alternateNumber}
                        onChange={handleNumberInputChange}
                        maxLength="10"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Intern Fields */}
                  {selectedType === "intern" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          University *
                        </label>
                        <input
                          type="text"
                          name="university"
                          value={formData.university}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year *
                        </label>
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500"
                          required
                        >
                          <option value="">Select Year</option>
                          <option>1st Year</option>
                          <option>2nd Year</option>
                          <option>3rd Year</option>
                          <option>4th Year</option>
                          <option>5th Year</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Semester *
                        </label>
                        <select
                          name="semester"
                          value={formData.semester}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500"
                          required
                        >
                          <option value="">Select Semester</option>
                          {[...Array(10)].map((_, i) => (
                            <option key={i}>{`${i + 1} Semester`}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {/* Advocate Fields */}
                  {selectedType === "advocate" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bar Registration Number *
                        </label>
                        <input
                          type="text"
                          name="barRegistrationNumber"
                          value={formData.barRegistrationNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          University Name *
                        </label>
                        <input
                          type="text"
                          name="advocateUniversity"
                          value={formData.advocateUniversity}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Qualification
                        </label>
                        <input
                          type="text"
                          name="additionalQualification"
                          value={formData.additionalQualification}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500"
                          placeholder="Optional"
                        />
                      </div>
                    </>
                  )}

                  {/* Why Choose You */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why should we choose you? *
                    </label>
                    <textarea
                      name="whyChooseYou"
                      value={formData.whyChooseYou}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-amber-500"
                      required
                    />
                  </div>

                  {/* How Did You Know */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How did you get to know about us? *
                    </label>
                    <textarea
                      name="howDidYouKnow"
                      value={formData.howDidYouKnow}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-amber-500"
                      required
                    />
                  </div>

                  {/* Why Join Us */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why do you wish to join us? *
                    </label>
                    <textarea
                      name="whyJoinChamber"
                      value={formData.whyJoinChamber}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-amber-500"
                      required
                    />
                  </div>

                  {/* Upload Section */}
                  <FileUploadUI />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition ${
                      selectedType === "intern"
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-amber-500 text-black hover:bg-amber-600"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <JoinUsCard
                icon={<GraduationCap size={48} />}
                title="Join as an Intern"
                description="Gain real-world legal experience and grow with industry mentors."
                buttonText="Apply as Intern"
                variant="intern"
                onApply={() => handleTypeSwitch("intern")}

              />

              <JoinUsCard
                icon={<Scale size={48} />}
                title="Join as an Advocate"
                description="Collaborate with experienced legal professionals and bring your expertise."
                buttonText="Apply as Advocate"
                variant="advocate"
               onApply={() => handleTypeSwitch("advocate")}

              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
