const { CONSTANTS: { PHOTO_MAX_SIZE, MIMETYPES }, statusCode, MESSAGES: { BIG_FILE, FILE_FORMAT } } = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
  checkAvatar: (req, res, next) => {
    try {
      const { avatar } = req.files;
      if (!req.files || !avatar) {
        next();
        return;
      }

      const { size, mimetype } = avatar;
      if (size > PHOTO_MAX_SIZE) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, BIG_FILE);
      }

      if (!MIMETYPES.PHOTO.includes(mimetype)) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, FILE_FORMAT);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
