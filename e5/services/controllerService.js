//validate details of buddy
const validateBuddy = (buddy) => {
  let flag = true;
  if (buddy.employeeId == undefined || !(/^[0-9]{1,30}$/.test(buddy.employeeId))) {
    flag = false;
  }
  if (buddy.realName == undefined || !(/^[a-zA-z]{1,50}$/.test(buddy.realName))) {
    flag = false;
  }
  if (buddy.nickName ? !(/^[a-zA-Z]{1,50}$/.test(buddy.nickName)) : false) {
    flag = false;
  }
  if (buddy.dob ? !(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(buddy.dob)) : false) {
    flag = false;
  }
  if (buddy.hobbies ? !(Array.isArray(buddy.hobbies)) : false) {
    flag = false;
  }
  if(flag) {
    return true;
  }
  throw { level:"warn", status: 400, message: "validate error" };
}

//validate id from request params
const validateId = (id) => {
  if(/^[0-9]{1,30}$/.test(id)) {
    return id;
  }
  throw { level:"warn", status: 400, message: "validate error" };
}

//check if buddy already exists
const checkUniqueBuddy = (buddies, incomingBuddy) => {
  const checkBuddy = buddies.find((buddy) => buddy.employeeId === incomingBuddy.employeeId);
  if(checkBuddy) {
    throw { level:"warn", status: 400, message: "buddy already exists" };
  }
  // for (buddy of buddies) {
  //   if (buddy.employeeId == incomingBuddy.employeeId) {
  //     throw { level:"warn", status: 400, message: "buddy already exists" };
  //   }
  // }
  return true;
  
}

//add new buddy to list
const addBuddy = (buddies, buddy) => {
  buddies.push(buddy);
  return buddies;
}

//get buddy by id
const getBuddy = (buddies, id) => {
  const buddy = buddies.find((buddy) => buddy.employeeId === id);
  // for (buddy of buddies) {
  //   if (buddy.employeeId == id) {
  //     return buddy;
  //   }
  // }
  if(buddy) {
    return buddy;
  }
  throw { level:"warn", status: 404, message: "buddy not found" };
}

// update existing buddy details
const editBuddy = (buddies, updateBuddy) => {
  let flag = false;
  let updatedBuddies = buddies.map((buddy) =>
  buddy.employeeId == updateBuddy.employeeId
      ?  (
        flag = true,
        updateBuddy
      )
      : buddy);
  if(flag) {
    return updatedBuddies;
  }
  throw { level:"warn", status: 404, message: "buddy not found" };
}

//delete buddy by id
const deleteBuddy = (buddies, buddyId) => {
  let newBuddies = buddies.filter((buddy) => buddyId != buddy.employeeId);
  if(buddies.length != newBuddies.length) {
    return newBuddies;
  }
  throw { level:"warn", status: 404, message: "buddy not found" };
}

module.exports = {
  validateBuddy,
  checkUniqueBuddy,
  addBuddy,
  getBuddy,
  editBuddy,
  deleteBuddy,
  validateId,
}

