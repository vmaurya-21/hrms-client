// src/components/ErrorTest.js

import { useEffect } from 'react';
import useErrorHandler from '../../hooks/error/useErrorHandler';

const ErrorTest = () => {
  const handleError = useErrorHandler();

  useEffect(() => {
    try {
      // Simulate some code that may throw an error
      throw new Error("This is a test error");
    } catch (error) {
      handleError(error, { componentStack: "ErrorTest component stack trace" });
    }
  }, [handleError]);

  return (
    <div>
      <h1>Error Test Component</h1>
      <p>If an error occurs, it will be logged using the error handling service.</p>
    </div>
  );
};

export default ErrorTest;
