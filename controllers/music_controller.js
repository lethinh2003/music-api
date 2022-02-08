const Music = require("../models/music_model");
const catchAsync = require("../utils/catch_async");
const factory = require("./handle_factory");

exports.getTopViewsDayMusics = (req, res, next) => {
  if (!req.query.limit) {
    req.query.limit = 5;
  }
  req.query.sort = "-views";
  next();
};
exports.getNewMusics = (req, res, next) => {
  req.query.limit = 10;
  req.query.sort = "-createdAt";
  next();
};

exports.getAllMusics = factory.getAll(Music, {
  path: "hearts",
  select: "-__v -_id ",
});
exports.getMusic = factory.getOne(Music, {
  path: "hearts",
  select: "-__v -_id ",
});

exports.updateMusic = factory.updateOne(Music);
exports.updateViews = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const doc = await Music.updateOne(
    { _id: req.params.id },
    { $inc: { views: 1 } },
    {
      new: true,
    }
  );

  if (!doc) {
    return next(new AppError("No document find with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.deleteMusic = factory.deleteOne(Music);
exports.createMusic = factory.createOne(Music);
exports.uploadThumbnail = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("No file uploaded!", 404));
  }
  return res.status(200).json({
    status: "success",
    data: req.file.path,
  });
});
exports.uploadLink = catchAsync(async (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    return next(new AppError("No file uploaded!", 404));
  }
  return res.status(200).json({
    status: "success",
    data: req.file.path,
  });
});
