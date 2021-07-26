import React from 'react';
import Profile from '../component/Profile/Profile';

const ProfilePage = ({ user }) => {
  return (
    <div>
      <Profile
        user={user}
      />
    </div>
  )
}

export default ProfilePage;