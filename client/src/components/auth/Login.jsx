import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, LogIn, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { AppContext } from '../../AppContext';

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Required'),
});

export default function Login() {
  const navigate = useNavigate();
  const value = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://incident-report-backend-akvl.onrender.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('user_id', data.user_data.id);

          toast.success(`Welcome ${data.user_data.username}!`);
          navigate(
            data.user_data.role === 'admin'
              ? `/admin/d/${data.user_data.id}`
              : `/user/${data.user_data.id}`
          );
        } else {
          const errorMessage = await response.text();
          toast.error(errorMessage || 'Login failed. Please check your credentials.');
        }
      } catch {
        toast.error('Login failed. Please try again.');
      }
    },
  });

  const handleBackToHome = () => navigate('/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6 sm:p-8 md:p-10">
      <div className="max-w-md w-full text-white">
        <button
          onClick={handleBackToHome}
          className="absolute top-4 left-4 text-yellow-500 hover:text-yellow-400 focus:outline-none"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-10 h-10 text-yellow-500" />
            <h1 className="text-2xl md:text-3xl font-bold">RescueApp! Platform</h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base">
            Sign in to your account to report incidents
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-800 rounded-lg p-6 md:p-8 space-y-6 shadow-lg"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                {...formik.getFieldProps('email')}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
                placeholder="you@example.com"
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                {...formik.getFieldProps('password')}
                className="w-full bg-gray-700 text-white pl-10 pr-10 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
                placeholder="••••••••"
              />
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          {/* Remember / Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Remember me</span>
            </label>
            <Link to="/forgotP" className="text-yellow-500 hover:text-yellow-400">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
          >
            {formik.isSubmitting ? (
              'Signing in...'
            ) : (
              <>
                <LogIn className="w-5 h-5" /> Sign In
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-yellow-500 hover:text-yellow-400">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
