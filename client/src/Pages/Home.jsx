

const Home = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold mb-5 text-sky-950  ">
          Welcome to CRUD Application
        </h1>
        <p>
          The purpose of this application is to allow users to create, update, and
          delete accounts along with their data, managed securely using JWT
          tokens.
          <br /> <br />
          This application is built with the MERN Stack and Redux. On the admin
          side, administrators can view, search, delete, and block users. 
        </p>
        <br />
        <span className="text-sky-950 font-semibold"> Thank you! 😊</span>
      </div>
    </div>
  );
};

export default Home;
