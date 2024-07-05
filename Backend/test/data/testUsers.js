const testUsers = [
  {
    email: "test1@example.com",
    password: "Password1!",
    favs: [
      {
        city: "testCity1",
      },
      {
        city: "testCity2",
      },
      {
        city: "testCity3",
      },
    ],
  },
  {
    email: "test2@example.com",
    password: "Password2!",
    favs: [
      {
        city: "testCityA",
      },
      {
        city: "testCityB",
      },
      {
        city: "testCityC",
      },
    ],
  },
  {
    email: "user-with-no-favs@example.com",
    password: "Password3!",
    favs: [],
  },
];

export default testUsers;
