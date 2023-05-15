import { getUserInfo } from "../utils/api"


let user_ID = getUserInfo(localStorage.getItem("access_token")).then(
    (data) => {
      user_ID = data.id;
    }
  );

console.log(user_ID);
console.log("user_ID");


export const playHistory = {
    id: user_ID,
    playHistoryList: [
        



    ]
  };
