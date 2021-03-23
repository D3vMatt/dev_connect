import React from 'react';

const ProfileCard = () => {
  return (
    <div className='profile bg-light'>
      <img
        className='round-img'
        src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
        alt=''
      />
      <div>
        <h2>John Doe</h2>
        <p>Developer at Microsoft</p>
        <p>Seattle, WA</p>
        <a href='profile.html' className='btn btn-primary'>
          View Profile
        </a>
      </div>

      <ul>
        <li className='text-primary'>
          <i className='fas fa-check'></i> HTML
        </li>
        <li className='text-primary'>
          <i className='fas fa-check'></i> CSS
        </li>
        <li className='text-primary'>
          <i className='fas fa-check'></i> JavaScript
        </li>
        <li className='text-primary'>
          <i className='fas fa-check'></i> Python
        </li>
        <li className='text-primary'>
          <i className='fas fa-check'></i> C#
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;
