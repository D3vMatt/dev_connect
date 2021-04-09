import React from 'react';

const ProfileTop = ({ profile }) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img
        className='round-img my-1'
        src={profile && profile.user && profile.user.avatar}
        alt=''
      />
      <h1 className='large'>{profile && profile.user && profile.user.name}</h1>
      <p className='lead'>
        {profile && profile.status} at {profile && profile.company}
      </p>
      <p>{profile && profile.location}</p>
      <div className='icons my-1'>
        <a
          href={profile && profile.website}
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='fas fa-globe fa-2x'></i>
        </a>
        <a
          href={profile && profile.social.twitter}
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='fab fa-twitter fa-2x'></i>
        </a>
        <a
          href={profile && profile.social.facebok}
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='fab fa-facebook fa-2x'></i>
        </a>
        <a
          href={profile && profile.social.linkedin}
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='fab fa-linkedin fa-2x'></i>
        </a>
        <a
          href={profile && profile.social.youtube}
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='fab fa-youtube fa-2x'></i>
        </a>
        <a
          href={profile && profile.social.instagram}
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='fab fa-instagram fa-2x'></i>
        </a>
      </div>
    </div>
  );
};

export default ProfileTop;
