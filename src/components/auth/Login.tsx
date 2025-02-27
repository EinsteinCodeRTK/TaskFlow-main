import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './_auth.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to TaskFlow</h2>
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
              id="login-email"
              name="login-email"
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
              id="login-password"
              name="login-password"
            />
          </div>

          <Button
            text={loading ? "Signing in..." : "Sign In"}
            normal={true}
            width="100%"
            status={loading ? "disabled" : ""}
          />
        </form>

        <div className="auth-links">
          <p>
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 