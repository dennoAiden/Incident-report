import { useState, useRef } from 'react';
import { Camera, MapPin } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function IncidentReport() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const formik = useFormik({
    initialValues: { description: '', location: '' },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
      location: Yup.string().required('Location is required'),
    }),
    onSubmit: () => toast.success('Incident reported successfully!'),
  });

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-lg sm:text-2xl font-bold mb-6 text-white text-center sm:text-left">
        Report an Incident
      </h1>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 space-y-6 shadow-md"
      >
        {/* Description */}
        <div>
          <label className="block text-white font-medium text-sm sm:text-base">What happened?</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2 w-full bg-gray-700 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500 text-sm sm:text-base"
            rows={4}
            placeholder="Describe the incident..."
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.description}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-white font-medium text-sm sm:text-base">Location</label>
          <div className="mt-2 flex flex-col sm:flex-row gap-2">
            <input
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500 text-sm sm:text-base"
              placeholder="Enter location..."
            />
            <button
              type="button"
              className="flex items-center justify-center gap-1 bg-gray-700 text-gray-400 hover:text-white rounded-lg px-3 py-2 text-sm"
            >
              <MapPin className="w-4 h-4" /> Use My Location
            </button>
          </div>
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.location}</p>
          )}
        </div>

        {/* Evidence Upload */}
        <div>
          <span className="text-white font-medium text-sm sm:text-base">Evidence</span>
          <div className="mt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-gray-700 text-gray-400 hover:text-white px-3 py-2 rounded-lg text-sm sm:text-base"
              onClick={() => imageInputRef.current.click()}
            >
              <Camera className="w-4 h-4" /> Add Photos
              <input ref={imageInputRef} type="file" multiple accept="image/*" className="hidden" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-gray-700 text-gray-400 hover:text-white px-3 py-2 rounded-lg text-sm sm:text-base"
              onClick={() => videoInputRef.current.click()}
            >
              <Camera className="w-4 h-4" /> Add Videos
              <input ref={videoInputRef} type="file" multiple accept="video/*" className="hidden" />
            </button>
          </div>

          {/* Previews */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {imagePreviews.map((url, idx) => (
              <img key={idx} src={url} className="h-24 sm:h-28 object-cover rounded-lg" alt="preview" />
            ))}
            {videoPreviews.map((url, idx) => (
              <video key={idx} src={url} className="h-24 sm:h-28 object-cover rounded-lg" controls />
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 sm:py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition text-sm sm:text-base"
        >
          Report Incident
        </button>
      </form>
    </div>
  );
}
