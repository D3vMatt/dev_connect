import React, { Fragment, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { updateCurrentProfile } from '../../actions/profile';
import { useHistory } from 'react-router-dom';

const formReducer = (state, event) => {
  if (
    ['facebook', 'instagram', 'linkedin', 'twitter', 'youtube'].includes(
      event.name
    )
  ) {
    return {
      ...state,
      social: { ...state.social, [event.name]: event.value },
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

const ProfileForm = ({ profile, setAlert, updateCurrentProfile }) => {
  const [formData, setFormData] = useReducer(formReducer, profile.profile);
  let history = useHistory();

  const handleChange = (event) => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCurrentProfile(formData);
    history.goBack();
  };

  const goBack = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>

      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <select
            name='status'
            onChange={handleChange}
            value={formData.status || ''}
          >
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            onChange={handleChange}
            value={formData.company || ''}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            onChange={handleChange}
            value={formData.website || ''}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={handleChange}
            value={formData.location || ''}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            onChange={handleChange}
            value={formData.skills || ''}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            onChange={handleChange}
            value={formData.githubusername}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            onChange={handleChange}
            value={formData.bio}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button type='button' className='btn btn-light'>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-twitter fa-2x'></i>
          <input
            type='text'
            placeholder='Twitter URL'
            name='twitter'
            onChange={handleChange}
            value={formData.social.twitter}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-facebook fa-2x'></i>
          <input
            type='text'
            placeholder='Facebook URL'
            name='facebook'
            onChange={handleChange}
            value={formData.social.facebook}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-youtube fa-2x'></i>
          <input
            type='text'
            placeholder='YouTube URL'
            name='youtube'
            onChange={handleChange}
            value={formData.social.youtube}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-linkedin fa-2x'></i>
          <input
            type='text'
            placeholder='Linkedin URL'
            name='linkedin'
            onChange={handleChange}
            value={formData.social.linkedin}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-instagram fa-2x'></i>
          <input
            type='text'
            placeholder='Instagram URL'
            name='instagram'
            onChange={handleChange}
            value={formData.social.instagram}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <button onClick={goBack} className='btn btn-light my-1'>
          Go Back
        </button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  updateCurrentProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setAlert, updateCurrentProfile })(
  ProfileForm
);
