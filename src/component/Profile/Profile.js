import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState({
    name: '',
    id: null,
    createAt: null
  });
  useEffect(() => {
    let didCancel = false;
    axios.get(`https://60dff0ba6b689e001788c858.mockapi.io/users/${user.userID}`)
        .then((response) => {
            if (!didCancel) {
              setProfile({
                  name: response.data.name,
                  id: response.data.id,
                  createAt: response.data.createAt,
              })
            }
        });
    return () => didCancel = true;
  }, [user.userID, user.token])
  return (
    <div>
      <h2>{profile.id}</h2>
      <h2>{profile.name}</h2>
    </div>
  )
}

export default Profile;