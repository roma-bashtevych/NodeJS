const { User } = require('../database');
const { passwordServices: { hash } } = require('../services');
const { userRolesEnum, VAR: { NAME_FIRST_ADMIN, PASS_FIRST_ADMIN, EMAIL_FIRST_ADMIN } } = require('../config');

module.exports = (async () => {
  const user = await User.findOne();

  if (!user) {
    const defaultAdmin = {
      name: NAME_FIRST_ADMIN,
      password: await hash(PASS_FIRST_ADMIN),
      email: EMAIL_FIRST_ADMIN,
      role: userRolesEnum.ADMIN
    };

    await User.create(defaultAdmin);
  }
})();
