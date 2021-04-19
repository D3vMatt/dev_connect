import React from 'react';
import PropTypes from 'prop-types';

const ProfileEducation = ({ education_list }) => {
  return (
    <div className='profile-edu bg-white p-2'>
      <h2 className='text-primary'>Education</h2>
      {education_list.map((education) => (
        <div>
          <h3>{education.school}</h3>
          <p>
            {education.from} - {education.current ? 'current' : education.to}
          </p>
          <p>
            <strong>Degree: </strong>
            {education.degree}
          </p>
          <p>
            <strong>Field Of Study: </strong>
            {education.fieldOfStudy}
          </p>
          <p>
            <strong>Description: </strong>
            {education.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProfileEducation;
