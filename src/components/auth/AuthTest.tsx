import React, { useState } from 'react';
import { testAuth } from '../../firebase';
import Button from '../Button/Button';

const AuthTest: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      const success = await testAuth();
      setResult(success ? 'Autentifikācija veiksmīga!' : 'Autentifikācija neizdevās.');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Nezināma kļūda';
      setResult(`Kļūda: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Autentifikācijas Tests</h2>
      <Button
        text={loading ? "Notiek testēšana..." : "Sākt testu"}
        normal={true}
        width="100%"
        status={loading ? "disabled" : ""}
        onClick={handleTest}
      />
      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: result.includes('veiksmīga') ? '#e6ffe6' : '#ffe6e6',
          borderRadius: '4px'
        }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default AuthTest; 