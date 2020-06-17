import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';

interface User {
  username: string;
  name: string;
}

interface HomeProps {
  users: User[];
}

const Home: NextPage<HomeProps> = ({ users }: HomeProps) => {
  return (
    <div>
      {users.map(({ name, username }, index) => {
        return (
          <ul key={index}>
            <li>
              <h1>Name: {name}</h1>
              <h3>Username: {username}</h3>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/users');
  const json = await res.json();
  return { users: json.users };
};

export default Home;
