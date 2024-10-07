import React from 'react';
import DeclarationHeader from './declarationHeader';
import ITDeclarationForm from './declarationForm';

const DeclarationPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-100 dark:bg-zinc-900">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 mt-2">IT Declaration Page</h1>
          <DeclarationHeader />
          <div className="mt-8">
              <ITDeclarationForm />
         </div>
      {/* You can add more components or content below */}
    </div>
  );
};

export default DeclarationPage;
