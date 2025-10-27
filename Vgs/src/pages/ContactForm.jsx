import { useState } from 'react';
import api from '../api'; // Adjust the path if your api.js is in a different folder, e.g., './utils/api'

function App() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      firstName,
      lastName,
      email,
      phone,
      message
    };

    try {
      const response = await api.contact(dataToSend); // Use the custom api.contact method
      
      if (response.success) {
        alert(response.message);
        // Clear form after successful submission
        setfirstName('');
        setlastName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        Send us a Message
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-slate-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-slate-700 font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-slate-700 font-medium mb-2">
            Message
          </label>
          <textarea
            rows="4"
            value={message}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your legal needs..."
            required
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 py-3 rounded-lg font-bold hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Schedule Consultation'}
        </button>
      </form>
    </div>
  );
}

export default App;