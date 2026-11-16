import React, { useState } from 'react';

const provinces = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
  'Prince Edward Island', 'Quebec', 'Saskatchewan'
];
const initialForm = {
  email: '', fullName: '', address: '', address2: '',
  city: '', province: '', postalCode: '', agree: false
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(null);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm(previous => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Copy the submitted values so editing the form does not change the result.
    setSubmitted({ ...form });
  }

  return (
    <main>
      <form className="entry-form" onSubmit={handleSubmit}>
        <h1>Data Entry Form</h1>
        <div className="row two-columns">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Enter email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="fullName">Name</label>
            <input id="fullName" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="address">Address</label>
          <input id="address" name="address" placeholder="1234 Main St" value={form.address} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="address2">Address 2</label>
          <input id="address2" name="address2" placeholder="Apartment, studio, or floor" value={form.address2} onChange={handleChange} />
        </div>
        <div className="row three-columns">
          <div className="field">
            <label htmlFor="city">City</label>
            <input id="city" name="city" value={form.city} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="province">Province</label>
            <select id="province" name="province" value={form.province} onChange={handleChange} required>
              <option value="">Choose...</option>
              {provinces.map(province => <option key={province} value={province}>{province}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="postalCode">Postal Code</label>
            <input id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} required />
          </div>
        </div>
        <label className="agreement" htmlFor="agree">
          <input id="agree" name="agree" type="checkbox" checked={form.agree} onChange={handleChange} required />
          Agree Terms &amp; Condition?
        </label>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <section className="result" aria-label="Submitted information" aria-live="polite">
          <table><tbody>
            <tr><th scope="row">Email:</th><td>{submitted.email}</td></tr>
            <tr><th scope="row">Full Name:</th><td>{submitted.fullName}</td></tr>
            <tr><th scope="row">Address:</th><td>{[submitted.address, submitted.address2].filter(Boolean).join(', ')}</td></tr>
            <tr><th scope="row">City:</th><td>{submitted.city}</td></tr>
            <tr><th scope="row">Province:</th><td>{submitted.province}</td></tr>
            <tr><th scope="row">Postal Code:</th><td>{submitted.postalCode}</td></tr>
          </tbody></table>
        </section>
      )}
    </main>
  );
}
