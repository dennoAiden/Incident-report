import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, UserPlus, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import signup from '../../images/signup.png';

const signupValidationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().min(10, 'Invalid phone number').required('Phone number is required'),
  password: Yup.string().min(4, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Confirm password is required'),
});

export default function Signup() {
  const navigate = useNavigate();
  const value = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://incident-report-backend-akvl.onrender.com/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: values.name,
            phone: values.phone,
            email: values.email,
            password: values.password,
            role: 'user',
          }),
        });

        if (response.ok) {
          toast.success('Account created successfully!');
          setTimeout(() => navigate('/login'), 1500);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Signup failed. Please try again.');
        }
      } catch {
        toast.error('Signup failed. Please try again.');
      }
    },
  });

  const handleBackToHome = () => navigate('/');

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
      {/* Back Button */}
      <button
        onClick={handleBackToHome}
        className="absolute top-4 left-4 text-yellow-500 hover:text-yellow-400 focus:outline-none"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Image Section (hidden on small screens) */}
      <div className="hidden md:flex md:w-1/2">
        <img
          src={signup}
          alt="Professional pointing"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 md:p-12">
        <div className="max-w-md w-full text-white">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="w-10 h-10 text-yellow-500" />
              <h1 className="text-2xl md:text-3xl font-bold">RescueApp! Platform</h1>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Create an account to start reporting incidents
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-800 rounded-lg p-6 md:p-8 space-y-6 shadow-lg"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  {...formik.getFieldProps('name')}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
                  placeholder="John Doe"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>

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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  {...formik.getFieldProps('phone')}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
                  placeholder="+254 XXX XXX XXX"
                />
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  {...formik.getFieldProps('password')}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
                  placeholder="••••••••"
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  {...formik.getFieldProps('confirmPassword')}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
                  placeholder="••••••••"
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
            >
              {formik.isSubmitting ? (
                'Creating account...'
              ) : (
                <>
                  <UserPlus className="w-5 h-5" /> Create Account
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-500 hover:text-yellow-400">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
