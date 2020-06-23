import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';
import { useState } from 'react';

interface User {
  username: string;
  name: string;
}

interface UserProps {
  users: User[];
}

const User: NextPage<UserProps> = ({ users }: UserProps) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

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
      <form>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            const res = await fetch('http://localhost:3000/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, username }),
            });
            console.log(res);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

User.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/users');
  const json = await res.json();
  return { users: json.users };
};

export default User;
