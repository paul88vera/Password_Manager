# Password Manager

In a world where you must remember every password and username so hackers won't steal your money, dignity, and/or life, my solution is to just put the creds in a vault and forget about it. Keep it local, keep it on a protected server, or in a private network. Either way, this is an easy way to manage a large about of user creds or client creds.

## Technology Used

Front-End:

- React.js
- TailwindCSS
- Axios
- React Icons
- Full Calendar

Back-End:

- MySQL
- Express.js
- Cors
- Nodemon
- Dotenvx

## Features

- `Roles` for Users (admin, manager, staff)
- Create | Update | Delete a `client` and/or `user`
- Create | Update | Delete client `passwords`
- Encrypted db on passwords table
- `Client` and `Server` Docker images: able to run separately for ease of use.

## Usage

If you are looking for a password manager to run on your local network using Docker images, then download the code zip file.

Once you have downloaded the file, open it and open the terminal in the project root directory.

```console
npm install
```

Then do the same in the client and server folders to download the packages necessary to run each Docker image.

Next, to run the Vite project.

```console
npm run dev
```

Then, start creating your users, clients, and passwords.

## Contact Information

Developer: Paul Vera

Website: PaulVera.com

License: [Read More](./LICENSE)
