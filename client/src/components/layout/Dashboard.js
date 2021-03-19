import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import {
  getCurrentProfile,
  deleteProfileExperience,
  deleteProfileEducation,
  deleteAccount,
} from '../../actions/profile';
import { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';

const Dashboard = ({
  auth,
  getCurrentProfile,
  profile,
  deleteProfileExperience,
  deleteProfileEducation,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
    console.log(profile);
  }, []);

  const deleteProfileConfirmation = () => {
    confirmAlert({
      title: 'Ar you sure you want to delete your account?',
      message: 'This action can not be undone.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteAccount(),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  if ((profile.profile === null) & profile.loading) {
    return <spinner />;
  }

  if (profile.profile) {
    return (
      <div>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome {auth.user && auth.user.name}
        </p>
        <div className='dash-buttons'>
          <Link to='/profile/edit' className='btn btn-light'>
            <i className='fas fa-user-circle text-primary'></i> Edit Profile
          </Link>
          <Link to='/profile/experience/add' className='btn btn-light'>
            <i className='fab fa-black-tie text-primary'></i> Add Experience
          </Link>
          <Link to='/profile/education/add' className='btn btn-light'>
            <i className='fas fa-graduation-cap text-primary'></i> Add Education
          </Link>
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
                    {new Date(education.from).toLocaleDateString(
                      'en-GB'
                    )} - {new Date(education.to).toLocaleDateString('en-GB')}
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
          <button
            className='btn btn-danger'
            onClick={() => deleteProfileConfirmation()}
          >
            <i className='fas fa-user-minus'></i>
            Delete My Account
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {auth.user && auth.user.name},
        you currently do not have a profile setup.
      </p>
      <div className='dash-buttons'>
        <Link to='/profile/create' className='btn btn-primary'>
          <i className='fas fa-user-circle text-secondary'></i> Create Profile
        </Link>
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
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteProfileExperience,
  deleteProfileEducation,
  deleteAccount,
})(Dashboard);
