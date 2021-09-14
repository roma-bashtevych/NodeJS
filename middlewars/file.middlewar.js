const { CONSTANTS: { PHOTO_MAX_SIZE, MIMETYPES }, statusCode, MESSAGES: { BIG_FILE, FILE_FORMAT } } = require('../config');
const { ErrorHandler } = require('../errors');

module.exports = {
  checkAvatar: (req, res, next) => {
    try {
      if (!req.files || !req.files.avatar) {
        next();
        return;
      }
      const { avatar } = req.files;

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
