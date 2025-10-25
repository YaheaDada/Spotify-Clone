
import Mahmoud from "../../Mahmoud/mahmoud";

const Profile = () => {
  const user = {
    firstName: "Yahea",
    lastName: "Dada",
    email: "yaheaDada@gmail.com",
    phone: "+963 980 817 760",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  const monthlyPlays = [
    { month: "Jan", plays: 120 },
    { month: "Feb", plays: 90 },
    { month: "Mar", plays: 150 },
    { month: "Apr", plays: 200 },
    { month: "May", plays: 180 },
  ];

  const uniqueSongs = [
    { id: 0, value: 40, label: "Pop" },
    { id: 1, value: 25, label: "Rock" },
    { id: 2, value: 35, label: "Hip-Hop" },
  ];

  return (
    <div className="min-h-screen w-screen p-9 bg-linear-to-b from-[#121212] to-[#181818] text-gray-100">
      {/* Profile Header */}
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center bg-[#1e1e1e] p-9 rounded-3xl shadow-lg border border-[#333] mb-12">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-60 h-60 rounded-full border-4 border-[#8b00ff] mb-6 md:mb-0 md:mr-12"
        />
        <div className="text-center md:text-left flex-1">
          <h1 className="text-6xl font-bold mb-3 text-[#8b00ff]">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-400 mb-2 text-2xl">{user.email}</p>
          <p className="text-gray-400 text-2xl">{user.phone}</p>
        </div>
      </div>

      <Mahmoud />

    </div>
  );
};

export default Profile;

// when do user listen to music most (sesons)
// when do user listen to music most (Times of the day)

// how many listen Time (Nour 1)
// percentage of the artist (Nour 2)

//homepage
