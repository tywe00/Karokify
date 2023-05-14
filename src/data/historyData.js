import { getUserInfo } from "../utils/api"


let user_ID = getUserInfo(localStorage.getItem("access_token")).then((data) => { user_ID = data.id; });


export const playHistory = {
    id: user_ID,
    playHistoryList: [
        {
}



    ]
  };
