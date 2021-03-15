import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProfileEducation } from '../../actions/profile';

const EducationForm = ({ addProfileEducation }) => {
  let history = useHistory();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    let isCheckbox = e.target.type === 'checkbox';
    setFormData({
      ...formData,
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProfileEducation(formData);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldOfStudy'
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
            Current School or Bootcamp
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
            placeholder='Program Description'
            onChange={handleChange}
          ></textarea>
        </div>
        <input
          type='submit'
          className='btn btn-primary my-1'
          onClick={handleSubmit}
        />
        <button className='btn btn-light my-1' onClick={history.goBack}>
          Go Back
        </button>
      </form>
    </Fragment>
  );
};

EducationForm.propTypes = {
  addProfileEducation: PropTypes.func.isRequired,
};

export default connect(null, { addProfileEducation })(EducationForm);
