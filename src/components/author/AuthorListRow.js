import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorListRow = ({author}) =>{
  return(
    <tr>
      <td><Link to={'/author/'+ author.id}>{author.id}</Link></td>
      <td>{author.firstName}</td>
      <td>{author.lastName}</td>
    </tr>
  );
};
AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired
};

export default AuthorListRow;
