import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileCard from './ProfileCard';
import { getAllProfiles } from '../../../actions/profile';
import { connect } from 'react-redux';

const ProfileMaster = ({ getAllProfiles, profiles }) => {
  useEffect(() => {
    getAllProfiles();
    console.log(profiles);
  }, []);

  return (
    <Fragment>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Browse and connect with
        developers
      </p>
      <div className='profiles'>
        {profiles.map((profile) => (
          <ProfileCard profile={profile} />
        ))}
      </div>
    </Fragment>
  );
};

ProfileMaster.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { getAllProfiles })(ProfileMaster);
