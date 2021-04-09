import React, { Fragment, useEffect } from 'react';
import { getProfileByUserId } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import Spinner from '../layout/Spinner';

const ProfileDetail = ({
  match,
  getProfileByUserId,
  profile_details,
  repos,
  loading,
}) => {
  const { userId } = match.params;
  let history = useHistory();

  useEffect(() => {
    getProfileByUserId(userId);
  }, []);

  if (!profile_details || loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div onClick={history.goBack} className='btn btn-light'>
        Back To Profiles
      </div>

      <ProfileTop profile={profile_details} />

      <div className='profile-grid my-1'>
        <ProfileAbout profile={profile_details} />
        <ProfileExperience experiences={profile_details.experience} />
        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          {profile_details &&
            profile_details.education.map((education) => (
              <div>
                <h3>{education.school}</h3>
                <p>
                  {education.from} -{' '}
                  {education.current ? 'current' : education.to}
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

        <div className='profile-github'>
          <h2 className='text-primary my-1'>
            <i className='fab fa-github'></i> Github Repos
          </h2>

          {repos &&
            repos.map((repo) => (
              <div className='repo bg-white p-1 my-1'>
                <div>
                  <h4>
                    <a
                      href={repo.html_url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div>
                  <ul>
                    <li className='badge badge-primary'>
                      Stars: {repo.stargazers_count}
                    </li>
                    <li className='badge badge-dark'>
                      Watchers: {repo.watchers}
                    </li>
                    <li className='badge badge-light'>Forks: {repo.forks}</li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

ProfileDetail.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
  profile_details: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  profile_details: state.profile.profiles[0],
  repos: state.profile.repos,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfileByUserId })(ProfileDetail);
