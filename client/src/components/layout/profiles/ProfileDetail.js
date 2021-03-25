import React, { Fragment, useEffect } from 'react';
import { getProfileByUserId } from '../../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProfileDetail = ({ match, getProfileByUserId, profile_details }) => {
  const { userId } = match.params;

  useEffect(() => {
    getProfileByUserId(userId);
  }, []);

  return (
    <Fragment>
      <a href='profiles.html' className='btn btn-light'>
        Back To Profiles
      </a>

      <div className='profile-grid my-1'>
        <div className='profile-top bg-primary p-2'>
          <img
            className='round-img my-1'
            src={profile_details && profile_details.user.avatar}
            alt=''
          />
          <h1 className='large'>
            {profile_details && profile_details.user.name}
          </h1>
          <p className='lead'>
            {profile_details && profile_details.status} at{' '}
            {profile_details && profile_details.company}
          </p>
          <p>{profile_details && profile_details.location}</p>
          <div className='icons my-1'>
            <a
              href={profile_details && profile_details.website}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fas fa-globe fa-2x'></i>
            </a>
            <a
              href={profile_details && profile_details.social.twitter}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-twitter fa-2x'></i>
            </a>
            <a
              href={profile_details && profile_details.social.facebok}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-facebook fa-2x'></i>
            </a>
            <a
              href={profile_details && profile_details.social.linkedin}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-linkedin fa-2x'></i>
            </a>
            <a
              href={profile_details && profile_details.social.youtube}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-youtube fa-2x'></i>
            </a>
            <a
              href={profile_details && profile_details.social.instagram}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-instagram fa-2x'></i>
            </a>
          </div>
        </div>

        <div className='profile-about bg-light p-2'>
          <h2 className='text-primary'>
            {profile_details && profile_details.user.name}'s Bio
          </h2>
          <p>{profile_details && profile_details.bio}</p>
          <div className='line'></div>
          <h2 className='text-primary'>Skill Set</h2>
          <div className='skills'>
            {profile_details &&
              profile_details.skills.map((skill) => (
                <div className='p-1'>
                  <i className='fa fa-check'></i> {skill}
                </div>
              ))}
          </div>
        </div>

        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>Experience</h2>
          {profile_details &&
            profile_details.experience.map((experience) => (
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

        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          <div>
            <h3>University Of Washington</h3>
            <p>Sep 1993 - June 1999</p>
            <p>
              <strong>Degree: </strong>Masters
            </p>
            <p>
              <strong>Field Of Study: </strong>Computer Science
            </p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
        </div>

        <div className='profile-github'>
          <h2 className='text-primary my-1'>
            <i className='fab fa-github'></i> Github Repos
          </h2>
          <div className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  Repo One
                </a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>Stars: 44</li>
                <li className='badge badge-dark'>Watchers: 21</li>
                <li className='badge badge-light'>Forks: 25</li>
              </ul>
            </div>
          </div>
          <div className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  Repo Two
                </a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>Stars: 44</li>
                <li className='badge badge-dark'>Watchers: 21</li>
                <li className='badge badge-light'>Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProfileDetail.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
  profile_details: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile_details: state.profile.profiles[0],
});

export default connect(mapStateToProps, { getProfileByUserId })(ProfileDetail);
