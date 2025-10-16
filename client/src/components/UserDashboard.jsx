import { AlertTriangle, ThumbsUp, MessageSquare, Share2, Clock } from 'lucide-react';
import { AlertCard } from './user/AlertCard';
import { StatCard } from './user/StatCard';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import { useParams } from 'react-router-dom';

export default function UserDashboard() {
  const { value } = useContext(AppContext);
  const { userData, setUserData } = value;

  const params = useParams();
  const id = params.id;

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  useEffect(() => {
    fetch(`https://incident-report-backend-akvl.onrender.com/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setIsUserDataLoaded(true);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [id, setUserData]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white px-3 sm:px-5 md:px-10">
      {/* Header Section */}
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 mt-4 shadow-lg text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-yellow-500 text-gray-900 flex items-center justify-center rounded-full text-xl sm:text-2xl font-bold mb-3 sm:mb-0">
            {isUserDataLoaded ? (userData?.username?.charAt(0).toUpperCase() || 'U') : 'U'}
          </div>
          <div className="max-w-lg">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {isUserDataLoaded ? `Welcome, ${userData?.username}` : 'Welcome, User!'}
            </h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base leading-relaxed">
              {isUserDataLoaded
                ? 'We are here to assist you in reporting incidents quickly and effectively. Your role in making our communities safer is invaluable. Let’s get started!'
                : 'Loading user data...'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <StatCard
          icon={AlertTriangle}
          title="Active Incidents"
          value="15"
          change={10}
          timeframe="week"
        />
        <StatCard
          icon={Clock}
          title="Resolved Incidents"
          value="42"
          change={20}
          timeframe="month"
        />
        <StatCard
          icon={ThumbsUp}
          title="User Engagement"
          value="238 Likes"
          change={5}
          timeframe="day"
        />
      </div>

      {/* Report Section */}
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-8 shadow-lg">
        <div className="flex flex-col gap-3 sm:gap-4">
          <h3 className="font-semibold text-lg sm:text-xl text-center sm:text-left">
            Report an accident or emergency now
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-center sm:text-left">
            Welcome to <span className="text-yellow-400 font-medium">RescueApp!</span> — a modern web
            application designed for reporting accidents and emergencies in Kenya.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mt-2">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm sm:text-base">
              <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>238 Likes</span>
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm sm:text-base">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>42 Comments</span>
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm sm:text-base">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center sm:text-left">
          Recent Alerts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          <AlertCard
            image="https://images.pexels.com/photos/1739855/pexels-photo-1739855.jpeg?auto=compress&cs=tinysrgb&w=300"
            title="Flood Alert"
            description="Heavy rains are expected in the next 48 hours, causing potential floods."
            time="2 hours ago"
            location="Nairobi, Kenya"
            severity="high"
            status="Resolved"
          />
          <AlertCard
            image="https://images.pexels.com/photos/189524/pexels-photo-189524.jpeg?auto=compress&cs=tinysrgb&w=300"
            title="Power Outage"
            description="Scheduled maintenance may cause power outages in your area."
            time="1 day ago"
            location="Mombasa, Kenya"
            severity="medium"
            status="Resolved"
          />
          <AlertCard
            image="https://images.pexels.com/photos/10476391/pexels-photo-10476391.jpeg?auto=compress&cs=tinysrgb&w=300"
            title="Road Block"
            description="A fallen tree is blocking the main road in your area."
            time="3 hours ago"
            location="Kisumu, Kenya"
            severity="low"
            status="Resolved"
          />
        </div>
      </div>
    </div>
  );
}
