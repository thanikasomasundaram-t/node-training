const service = require('../services/controllerServices');
const jwt = require('jsonwebtoken');
const constants = require('../constants');

describe('test for controller service', () => {
  //generate token
  const { generateToken, checkUserAlreadyExists } = service;
  test('generate token', () => {
    jest.spyOn(jwt, 'sign').mockReturnValue("token");
    const user = { userName: 'hero' };
    expect(generateToken(user)).toEqual("token");
    expect(jwt.sign).toHaveBeenCalledWith({ userName: user.userName }, constants.SECRET_KEY);
  });
  test('checkUserAlreadyExists', () => {
    const users = [
      {
        userName: 'villan',
      }
    ]
    const incomingUser = { userName: 'hero'}
    const result = checkUserAlreadyExists(users, incomingUser);
    expect(result).toBe(true);
  });

});