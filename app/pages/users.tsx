import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { UserType } from '../types/user';
import { UserSchema } from '../models/User';

interface UsersProps {
  users: UserType[];
}

const Users: NextPage<UsersProps> = ({ users }: UsersProps) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link href="/user/[id]" as={`/user/${user._id}`}>
              <a>{`User ${user.name}`}</a>
            </Link>
          </li>
        ))}
      </ul>
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

Users.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/users');
  const users = await res.json();
  return { users };
};

export default Users;
