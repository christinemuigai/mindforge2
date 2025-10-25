import React, { useState } from 'react';

export default function SignIn({authorizeUser}) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!login) return setError('Please enter your login or email.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    authorizeUser();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Signed in as ${login}`);
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-transparent shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div
          className="relative hidden md:flex flex-col items-center justify-center text-center p-10 bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 text-white"
          style={{ backgroundImage: "url('/signIn.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40" />

          <div className="relative z-10 max-w-xs">
            <div className="mx-auto w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#ffffff" opacity="0.9" />
              </svg>
            </div>

            <h2 className="text-2xl font-extrabold mb-3">Hello! Welcome to ArBitrage</h2>
            <p className="text-sm opacity-90 mb-6">Sign up to access the trading dashboard, analytics and secure wallet tools.</p>

            <button className="inline-block px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold shadow-lg">
              Sign Up
            </button>

            <div className="mt-8">
              <div className="bg-white/10 rounded-lg p-4 text-left text-xs leading-relaxed">
                <p className="font-medium">Why join?</p>
                <ul className="mt-2 text-[13px] list-disc list-inside space-y-1">
                  <li>Real-time arbitrage alerts</li>
                  <li>Secure withdrawals</li>
                  <li>Advanced charts & indicators</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-6 text-center">
              <img src="/signIn.jpg" alt="logo" className="w-20 h-20 object-cover mx-auto rounded-md shadow-md md:hidden" />
              <h3 className="text-2xl font-bold mt-4">Sign In</h3>
              <p className="text-sm text-gray-500">Welcome back — please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Login or email</label>
                <input
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
                  placeholder="Enter your login or email"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
                  placeholder="Enter password"/>
                <div className="text-xs text-gray-400 mt-1">Password must contain at least 6 symbols</div>
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center text-sm">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="form-checkbox h-4 w-4 text-cyan-500" />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>

                <a href="#" className="text-sm text-cyan-600 hover:underline">Forgot password?</a>
              </div>

              <div className="py-2">
                <div className="w-full h-12 rounded-md border border-gray-200 bg-white flex items-center justify-center text-sm text-gray-500">
                  reCAPTCHA placeholder
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold shadow"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="text-center text-sm text-gray-500">By clicking "Sign In" you agree to our <a href="#" className="text-cyan-600 hover:underline">Terms of use</a>.</div>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <a href="#" className="text-cyan-600 font-medium hover:underline">Create account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}