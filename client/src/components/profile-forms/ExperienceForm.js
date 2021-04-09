import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addProfileExperience } from '../../actions/profile';
import { connect } from 'react-redux';

const ExperienceForm = ({ addProfileExperience }) => {
  let history = useHistory();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    let isCheckbox = e.target.type == 'checkbox';
    setFormData({
      ...formData,
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProfileExperience(formData);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            required
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            required
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' onChange={handleChange} />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value=''
              onChange={handleChange}
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input type='date' name='to' onChange={handleChange} />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            onChange={handleChange}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <button className='btn btn-light my-1' onClick={history.goBack}>
          Go Back
        </button>
      </form>
    </Fragment>
  );
};

ExperienceForm.propTypes = {
  addProfileExperience: PropTypes.func.isRequired,
};

export default connect(null, { addProfileExperience })(ExperienceForm);
