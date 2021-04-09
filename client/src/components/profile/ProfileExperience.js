import React from 'react';

const ProfileExperience = ({ experiences }) => {
  return (
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {experiences &&
        experiences.map((experience) => (
          <div>
            <h3 className='text-dark'>{experience.company}</h3>
            <p>
              {experience.from} -{' '}
              {experience.current ? 'current' : experience.to}
            </p>
            <p>
              <strong>Position: </strong>
              {experience.title}
            </p>
            <p>
              <strong>Description: </strong> {experience.description}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ProfileExperience;
