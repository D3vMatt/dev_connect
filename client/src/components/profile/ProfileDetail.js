import React, { Fragment, useEffect } from 'react';
import { getProfileByUserId } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import Spinner from '../layout/Spinner';
import ProfileGithub from './ProfileGithub';
import ProfileEducation from './ProfileEducation';

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
        <ProfileEducation education_list={profile_details.education} />
        <ProfileGithub repos={repos} />
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
