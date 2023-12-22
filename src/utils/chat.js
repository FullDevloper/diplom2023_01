export const getConversationId=(user,users)=>{
    return users[0]._id === user._id ? users[1]._id : users[0]._id
}
export const getConversationName = (user, users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name;
  };
  export const checkOnlineStatus = (onlineUsers, user, users) => {
    // console.log(onlineUsers,"check")
    let convoId = getConversationId(user, users);
    let check = onlineUsers.find((u) => u.userId === convoId);
    return check ? true : false;
  };