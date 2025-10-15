import React, { useState, useEffect } from "react";
import { Clock, MapPin, Star } from "lucide-react";
import { StarRating } from "../StarRating.jsx";
import { ReviewCard } from "../ReviewCard.jsx";
import { ReviewForm } from "../ReviewForm.jsx";
import { toast } from "react-hot-toast";

const fetchAddressFromCoordinates = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=e8e97b4bccb04cbf84c4835212b56571`
    );
    const data = await response.json();
    return data.results[0]?.formatted || "Unknown Location";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching address";
  }
};

export default function IncidentDetails() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [addresses, setAddresses] = useState({});
  const [userId] = useState(localStorage.getItem("user_id"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://incident-report-backend-akvl.onrender.com/user/${userId}`
        );
        const data = await response.json();
        const fetchedIncidents = data.incident_reports;

        const fetchedAddresses = {};
        for (const incident of fetchedIncidents) {
          if (incident.latitude && incident.longitude) {
            const address = await fetchAddressFromCoordinates(
              incident.latitude,
              incident.longitude
            );
            fetchedAddresses[incident.id] = address;
          }
        }

        setIncidents(fetchedIncidents);
        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmitReview = (reviewData) => {
    if (!selectedIncidentId) return;

    const existingReview = reviews.find(
      (r) => r.incidentId === selectedIncidentId && r.userId === userId
    );
    if (existingReview) {
      toast("You have already rated this incident.");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      author: reviewData.user_id.username,
      content: reviewData.content,
      rating: reviewData.rating,
      date: new Date().toISOString().split("T")[0],
      incidentId: selectedIncidentId,
      userId,
    };

    setReviews((prev) => [newReview, ...prev]);
    setShowReviewForm(false);
  };

  const getIncidentReviews = (id) => reviews.filter((r) => r.incidentId === id);

  const getAverageRating = (id) => {
    const incidentReviews = getIncidentReviews(id);
    if (incidentReviews.length === 0) return 0;
    return (
      incidentReviews.reduce((acc, r) => acc + r.rating, 0) /
      incidentReviews.length
    );
  };

  if (loading)
    return (
      <div className="p-6 max-w-4xl mx-auto text-center text-white">
        Loading incidents and reviews...
      </div>
    );

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left text-white">
        Incident Details
      </h1>

      <div className="space-y-8">
        {incidents.map((incident) => {
          const incidentReviews = getIncidentReviews(incident.id);
          const averageRating = getAverageRating(incident.id);
          const address = addresses[incident.id] || "Fetching address...";

          return (
            <div
              key={incident.id}
              className="bg-gray-800 rounded-xl overflow-hidden text-white shadow-md"
            >
              <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h2 className="text-xl font-bold">{incident.title}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      incident.status === "resolved"
                        ? "bg-green-500 text-gray-900"
                        : incident.status === "under investigation"
                        ? "bg-yellow-500 text-gray-900"
                        : "bg-red-500 text-gray-900"
                    }`}
                  >
                    {incident.status}
                  </span>
                </div>

                {/* Body Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{incident.date}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      {incident.description}
                    </p>
                  </div>

                  {incident.images?.length > 0 && (
                    <img
                      src={incident.images[0]}
                      alt="incident"
                      className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Review Section */}
                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      setSelectedIncidentId(incident.id);
                      setShowReviewForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition"
                  >
                    <Star className="w-4 h-4" />
                    <span>Rate Response</span>
                  </button>
                </div>

                {incidentReviews.length > 0 && (
                  <div className="mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold">
                        Response Ratings
                      </h3>
                      <div className="flex items-center gap-2">
                        <StarRating rating={averageRating} />
                        <span className="text-gray-400 text-sm">
                          ({incidentReviews.length}{" "}
                          {incidentReviews.length === 1 ? "review" : "reviews"})
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {incidentReviews.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showReviewForm && selectedIncidentId && (
        <ReviewForm
          onSubmit={handleSubmitReview}
          onClose={() => {
            setShowReviewForm(false);
            setSelectedIncidentId(null);
          }}
          incidentId={selectedIncidentId}
        />
      )}
    </div>
  );
}
