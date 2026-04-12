import React from 'react';
import Card from '../../core/components/Card';
import Input from '../../core/components/Input';
import Button from '../../core/components/Button';

const LoginView = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh',
      padding: '20px'
    }}>
      <Card style={{ padding: '40px', width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to continue to your workspace</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <Input 
            label="Email Address" 
            placeholder="name@example.com" 
            type="email" 
          />
          <Input 
            label="Password" 
            placeholder="••••••••" 
            type="password" 
          />
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: 'var(--primary)' }} />
              <span style={{ color: 'var(--text-muted)' }}>Remember me</span>
            </label>
            <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Forgot password?</a>
          </div>

          <Button style={{ width: '100%', height: '52px', fontSize: '16px' }}>
            Sign In
          </Button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
          <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Sign up</a>
        </div>
      </Card>
    </div>
  );
};

export default LoginView;
