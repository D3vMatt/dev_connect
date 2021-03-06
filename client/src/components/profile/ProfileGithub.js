import React from 'react';
import PropTypes from 'prop-types';

const ProfileGithub = ({ repos }) => {
  return (
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
                <li className='badge badge-dark'>Watchers: {repo.watchers}</li>
                <li className='badge badge-light'>Forks: {repo.forks}</li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

ProfileGithub.propTypes = {};

export default ProfileGithub;
