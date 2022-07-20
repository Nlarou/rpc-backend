const express = require("express");
const jsonRouter = require("express-json-rpc-router");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());
//Replace body_parser
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;
const usersInfo = [
  { username: "admin", dateOfBirth: "01/01/2000", friends: ["user1", "user2"] },
  { username: "user1", dateOfBirth: "01/01/2000", friends: ["admin"] },
  { username: "user2", dateOfBirth: "01/01/2000", friends: ["admin"] },
];

const projects = [
  {
    name: "project1",
    description: "project1 description",
    members: ["user1", "user2"],
    tasks: [
      {
        name: "task1",
        description: "task1 description",
        status: "todo",
        assignee: "user1",
        dueDate: "01/01/2000",
        comments: [
          {
            comment: "comment1",
            by: "user1",
            date: "01/01/2000",
          },
          {
            comment: "comment2",
            by: "user2",
            date: "01/01/2000",
          },
        ],
      },
      {
        name: "task2",
        description: "task2 description",
        status: "todo",
        assignee: "user2",
        dueDate: "01/01/2000",
        comments: [
          {
            comment: "comment1",
            by: "user1",
            date: "01/01/2000",
          },
          {
            comment: "comment2",
            by: "user2",
            date: "01/01/2000",
          },
        ],
      },
    ],
  },
  {
    name: "project2",
    description: "project2 description",
    members: ["user1", "user2"],
    tasks: [
      {
        name: "task1",
        description: "task1 description",
        status: "todo",
        assignee: "user1",
        dueDate: "01/01/2000",
        comments: [
          {
            comment: "comment1",
            by: "user1",
            date: "01/01/2000",
          },
          {
            comment: "comment2",
            by: "user2",
            date: "01/01/2000",
          },
        ],
      },
    ],
  },
];

const Data = {
  getAllUsers(param, raw) {
    console.log("getAllUsers");
    return usersInfo;
  },
  getUser(param, raw) {
    console.log("getUser");
    return usersInfo.filter((user) => user.username === param.username);
  },
  getAllProjects(param, raw) {
    console.log("getAllProjects", param);
    return projects;
  },
  getProject(param, raw) {
    console.log(param, callback, raw);
    console.log("getProject", param);
    return projects.filter((project) => project.name === param.name);
  },
  getProjectsByUser(param, raw) {
    console.log("getProjectsByUser", param);
    return projects.filter((project) =>
      project.members.includes(param.username)
    );
  },
};
app.use(
  jsonRouter({
    methods: Data,
    onError(err) {
      console.log(err); // send report
    },
  })
);

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));
