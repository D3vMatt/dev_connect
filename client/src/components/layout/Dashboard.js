import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteProfileExperience,
  deleteProfileEducation,
} from '../../actions/profile';
import { useEffect } from 'react';

const Dashboard = ({
  auth,
  getCurrentProfile,
  profile,
  deleteProfileExperience,
  deleteProfileEducation,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <div>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {auth.user && auth.user.name}
      </p>
      <div className='dash-buttons'>
        <a href='edit-profile.html' className='btn btn-light'>
          <i className='fas fa-user-circle text-primary'></i> Edit Profile
        </a>
        <a href='add-experience.html' className='btn btn-light'>
          <i className='fab fa-black-tie text-primary'></i> Add Experience
        </a>
        <a href='add-education.html' className='btn btn-light'>
          <i className='fas fa-graduation-cap text-primary'></i> Add Education
        </a>
      </div>

      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {profile.profile &&
            profile.profile.experience.map((experience) => (
              <tr key={experience._id}>
                <td>{experience.title}</td>
                <td className='hide-sm'>{experience.company}</td>
                <td className='hide-sm'>
                  {new Date(experience.from).toLocaleDateString('en-GB')} -{' '}
                  {new Date(experience.to).toLocaleDateString('en-GB')}
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteProfileExperience(experience._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {profile.profile &&
            profile.profile.education.map((education) => (
              <tr key={education._id}>
                <td>{education.school}</td>
                <td className='hide-sm'>{education.degree}</td>
                <td className='hide-sm'>
                  {' '}
                  {new Date(education.from).toLocaleDateString('en-GB')} -{' '}
                  {new Date(education.to).toLocaleDateString('en-GB')}
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteProfileEducation(education._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className='my-2'>
        <button className='btn btn-danger'>
          <i className='fas fa-user-minus'></i>
          Delete My Account
        </button>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProfileExperience: PropTypes.func.isRequired,
  deleteProfileEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteProfileExperience,
  deleteProfileEducation,
})(Dashboard);
