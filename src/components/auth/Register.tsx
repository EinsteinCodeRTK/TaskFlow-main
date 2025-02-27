import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './_auth.scss';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await register(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create TaskFlow Account</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              hint="Email"
              inputValue={email}
              onInputValueChange={setEmail}
              type="email"
              field="input"
              state={error ? "error" : ""}
              error={error}
              id="register-email"
              name="register-email"
            />
          </div>
          
          <div className="form-group">
            <Input
              hint="Password"
              inputValue={password}
              onInputValueChange={setPassword}
              type="password"
              field="input"
              state={error ? "error" : ""}
              error={error}
              id="register-password"
              name="register-password"
            />
          </div>

          <div className="form-group">
            <Input
              hint="Confirm Password"
              inputValue={confirmPassword}
              onInputValueChange={setConfirmPassword}
              type="password"
              field="input"
              state={error ? "error" : ""}
              error={error}
              id="register-confirm-password"
              name="register-confirm-password"
            />
          </div>

          <Button
            text={loading ? "Creating Account..." : "Create Account"}
            normal={true}
            width="100%"
            status={loading ? "disabled" : ""}
          />
        </form>

        <div className="auth-links">
          <p>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 