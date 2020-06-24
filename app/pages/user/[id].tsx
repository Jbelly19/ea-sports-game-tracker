import fetch from 'isomorphic-unfetch';
import { UserType } from '../../types/user';

interface UserProps {
  user: UserType;
}

const User = ({ user }: UserProps) => {
  return <div>{user.name}</div>;
};

User.getInitialProps = async ({ query: { id } }, res) => {
  const response = await fetch(`http://localhost:3000/api/user/${id}`);
  const user = await response.json();

  return { user };
};

export default User;
