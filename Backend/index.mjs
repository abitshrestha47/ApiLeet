import { LeetCode } from "leetcode-query";
import express from "express";
import cors from "cors";
const leetcode = new LeetCode();
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});

app.use(cors());
app.use(express.json());

app.get("/getuserdata", async (req, res) => {
  const { username } = req.query;
  try {
    const user1 = await getUserData(username, res);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
var recentSubmissions;
//     const user = await leetcode.user(username);
//     recentSubmissions = user.recentSubmissionList;
//     console.log(recentSubmissions);
//     // showSubmisions();
//   } catch (error) {
//     if (error.code === "ECONNRESET") {
//       console.error("Connection reset error. Check your network and retry.");
//     } else {
//       console.error("An error occurred:", error);
//     }
//   }
//   try {
async function getUserData(username, res) {
  try {
    const leetcode = new LeetCode();
    const user = await leetcode.user(username);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      recentSubmissions = user.recentSubmissionList;
      const acceptedSubmission = uniqueSubmissions(recentSubmissions);
      res.json(acceptedSubmission); 
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}

const uniqueSubmissions = () => {
  const acceptedSubmission = [];
  for (const submission of recentSubmissions) {
    if (submission.statusDisplay === "Accepted") {
      const title = submission.title;
      if (!acceptedSubmission.includes(title)) {
        acceptedSubmission.push(title);
      }
    }
  }
  return acceptedSubmission;
};

// getUserData();
// const showSubmisions = () => {
//   const acceptedSubmission = [];
//   for (const submission of recentSubmissions) {
//     if (submission.statusDisplay === "Accepted") {
//       const title = submission.title;
//       if (!acceptedSubmission.includes(title)) {
//         acceptedSubmission.push(title);
//       }
//     }
//   }
//   console.log(acceptedSubmission);
// };
