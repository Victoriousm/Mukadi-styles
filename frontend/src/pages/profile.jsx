import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    bio: '',
    profilePicture: null,
    isEditing: false,
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  useEffect(() => {
    if (profile && !profile.isEditing) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setProfile({ ...profile, isEditing: true });
  };

  const handleSave = () => {
    setProfile({ ...profile, isEditing: false });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-beige-500 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">User Profile</h1>

        {profile.isEditing ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {profile.profilePicture && (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="mt-2 w-32 h-32 rounded-full object-cover"
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            {profile.profilePicture && (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="mb-4 w-32 h-32 rounded-full object-cover"
              />
            )}
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Age:</strong> {profile.age}
            </p>
            <p>
              <strong>Bio:</strong> {profile.bio}
            </p>
            <button
              onClick={handleEdit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;