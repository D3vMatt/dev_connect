import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = (profile) => {
  const { status, company, skills, location, user, _id } = profile.profile;

  if (!user) {
    return null;
  }

  return (
    <div className='profile bg-light' key={_id}>
      <img className='round-img' src={user && user.avatar} alt='' />
      <div>
        <h2>{user && user.name}</h2>
        <p>
          {status} at {company}
        </p>
        <p>{location}</p>
        <Link to={'/profile/' + user._id} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {skills.map((skill) => (
          <li className='text-primary'>
            <i className='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileCard;
