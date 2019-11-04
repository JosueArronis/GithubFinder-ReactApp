import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, getUserRepos, repos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);
  const { name, avatar_url, location, bio, company, blog, login, html_url, followers, following, public_repos, public_gists, hirable } = user;

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back To Search
      </Link>
      Hirable: {''}
      {hirable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}
      <div className='card grid-2'>
        <div className='all-center'>
          <img src={avatar_url} className='round-img' alt='' style={{ width: '150px' }} />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
              <a href={html_url} className='btn btn-dark my-1'>
                Visit Github Profile
              </a>
              <ul>
                <li>
                  {login && (
                    <Fragment>
                      <strong>Username: </strong> {login}
                    </Fragment>
                  )}
                </li>
                <li>
                  {company && (
                    <Fragment>
                      <strong>Company: </strong> {company}
                    </Fragment>
                  )}
                </li>
                <li>
                  {blog && (
                    <Fragment>
                      <strong>Website: </strong> {blog}
                    </Fragment>
                  )}
                </li>
              </ul>
            </Fragment>
          )}
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Follower: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repo: {public_repos}</div>
        <div className='badge badge-dark'>Public GIsts: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};
export default User;
