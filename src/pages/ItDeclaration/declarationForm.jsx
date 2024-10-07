import React, { useState } from 'react';

// Sample data for itDeclarationData - Replace with actual data or state
const initialData = {
  declRec: 'Yes',
  rebClaim: 'Yes',
  q1Provided: 'N',
  q2Provided: 'N',
  q3Provided: 'N',
  q4Provided: 'N',
  rentedAddr: '123 Main St',
  signRent: 'Yes',
  ownerPan: 'Yes',
  rebAllowed: 'Yes',
  comments: '',
  rebClaimInvest: 'Yes',
  publicProvFund: '',
  lifeInsurance: '',
  mutFundRecp: '',
  subsNSC: 'N',
  eduRecp: '',
  contriEPF: '',
  penFundRecp: '',
  fdRecp: '',
  houseLoanRecp: '',
  rajivRecp: '',
  sukanyaRecp: '',
  penScheme: '',
  chapAllow: '',
  commentInvest: ''
};

const ITDeclarationForm = () => {
  const [itDeclarationData, setItDeclarationData] = useState(initialData);
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setItDeclarationData({
      ...itDeclarationData,
      [e.target.name]: e.target.value
    });
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white mx-8' style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
        {/* Left Column for IT Declaration */}
<div style={{ flex: 1 }}>
        <h3 className="text-lg font-semibold mb-4">Income Tax Declaration</h3>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-zinc-300">Income Tax Declaration for the FY Submitted?</label>
          <span className="block text-gray-900 dark:text-zinc-200">{itDeclarationData.declRec}</span>
        </div>

        {/* Rent Receipt */}
        <h4 className="text-md font-semibold mb-2">Form 12BB - Rent Receipt</h4>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-zinc-300">Rebate Claimed?</label>
          <span className="block text-gray-900 dark:text-zinc-200">{itDeclarationData.rebClaim}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-zinc-300">Rent receipt for quarter Provided or not? (Y/N)</label>
          <div className="flex space-x-4">
            <span className="text-gray-900 dark:text-zinc-200">Q1: {itDeclarationData.q1Provided}</span>
            <span className="text-gray-900 dark:text-zinc-200">Q2: {itDeclarationData.q2Provided}</span>
            <span className="text-gray-900 dark:text-zinc-200">Q3: {itDeclarationData.q3Provided}</span>
            <span className="text-gray-900 dark:text-zinc-200">Q4: {itDeclarationData.q4Provided}</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-zinc-300">Address of Rented Accommodation:</label>
          <span className="block text-gray-900 dark:text-zinc-200">{itDeclarationData.rentedAddr}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-zinc-300">Rent Receipt Signed?</label>
          <span className="block text-gray-900 dark:text-zinc-200">{itDeclarationData.signRent}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-zinc-300">Copy of PAN card of owner provided?</label>
          <span className="block text-gray-900 dark:text-zinc-200">{itDeclarationData.ownerPan}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-zinc-300">Rebate Allowed?</label>
          <span className="block text-gray-900 dark:text-zinc-200">{itDeclarationData.rebAllowed}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-zinc-300">Comments:</label>
          <span className="block text-gray-900 dark:text-zinc-200">{itDeclarationData.comments}</span>
        </div>

        {/* Investments */}
        <h4 className="text-md font-semibold mb-2">Form 12BB - Investments Eligible Under Chapter VI A</h4>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-zinc-300">Rebate Claimed?</label>
          <span className="block text-gray-900 dark:text-zinc-200">{itDeclarationData.rebClaimInvest}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-zinc-300">Public Provident Fund Receipt:</label>
          {edit ? (
            <input
              type="text"
              name="publicProvFund"
              value={itDeclarationData.publicProvFund}
              onChange={handleChange}
              className="border border-gray-300 dark:border-zinc-600 rounded-md p-2 w-full"
            />
          ) : (
            <span className="block text-gray-900 dark:text-zinc-200">{itDeclarationData.publicProvFund}</span>
          )}
        </div>

        <button
          type="button"
          onClick={toggleEdit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition duration-200"
        >
          {edit ? 'Save' : 'Edit'}
        </button>
      </div>
        {/* Right Column for Annexures */}
 <div className="flex flex-col" style={{ flex: 1 }}>
  <div className="flex flex-row gap-2">
    {/* Annexure II(2) Medical Insurance Premium (80D) */}
    <div className="card" style={cardStyle}>
      <h3>Annexure II(2) Medical Insurance Premium (80D)</h3>
      <div style={fieldStyle}>
        <label>Rebate Claimed?</label>
        <span>Yes</span>
      </div>
      <div style={fieldStyle}>
        <label>Policy for Self/Family provided?</label>
        <span>Yes</span>
      </div>
      <div style={fieldStyle}>
        <label>Policy for Dependent Parent(s) provided?</label>
        <span>No</span>
      </div>
    </div>

    {/* Annexure II(3) Declaration of Other Income for Deduction of Tax */}
    <div className="card" style={cardStyle}>
      <h3>Annexure II(3) Declaration of Other Income for Deduction of Tax</h3>
      <div style={fieldStyle}>
        <label>Income Salary:</label>
        <span>500,000</span>
      </div>
      <div style={fieldStyle}>
        <label>Other Income:</label>
        <span>50,000</span>
      </div>
    </div>
  </div>

  {/* Annexure IV Housing Loan Details */}
  <div className="card mt-4" style={cardStyle}>
    <h3>Annexure IV Housing Loan Details</h3>
    <div style={fieldStyle}>
      <label>Rebate Claimed?</label>
      <span>Yes</span>
    </div>
    <div style={fieldStyle}>
      <label>Rebate Allowed?</label>
      <span>Yes</span>
    </div>
  </div>

  {/* Other Comments */}
  <div className="mt-4">
    <h3>Other Comments</h3>
    <p>
      <strong>1.</strong> Please refer to the detailed guidelines sent with the last salary slip.
    </p>
    <p>
      <strong>2.</strong> Submission of the Income Tax Declaration Form helps in computing correct TDS from your salary.
    </p>
  </div>
</div>

      </div>
    </div>
  );
};

const cardStyle = {
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginBottom: '20px',
};

const fieldStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px'
};

export default ITDeclarationForm;
