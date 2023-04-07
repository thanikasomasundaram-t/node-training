const devLogger = require("../utils/devLogger");


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

const validateId = (id) => {
  if(/^[0-9]{1,30}$/.test(id)) {
    return id;
  }
  throw { level:"warn", status: 400, message: "validate error" };
}

const checkUniqueBuddy = (buddies, buddyId) => {
  for (buddy of buddies) {
    if (buddy.employeeId == buddyId.employeeId) {
      throw { level:"warn", status: 400, message: "buddy already exists" };
    }
  }
  return true;
}

const addBuddy = (buddies, buddy) => {
  buddies.push(buddy);
  console.log(buddies)
  return buddies;
}

const getBuddy = (buddies, id) => {
  for (buddy of buddies) {
    if (buddy.employeeId == id) {
      return buddy;
    }
  }
  throw { level:"warn", status: 404, message: "buddy not found" }
}

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

