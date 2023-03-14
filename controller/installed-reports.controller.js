// Get Installed Reports
const MacUser = require("../models/mac-id");
const HitCount = require("../models/installed_reports_model");

// Create API endpoint to return hit count for a macUser

exports.installedreports = async (req, res) => {
  // Setting up middleware
  const installedreportsMiddleware = async (req, res, next) => {
    const macId = req.body.macId;

    try {
      // Find macUser in database or create new macUser if not present
      let macUser = await MacUser.findOne({ macId });

      if (!macUser) {
        // Increment hit count if macUser is not present in database
        const hitCount = await HitCount.findOne();
        if (!hitCount) {
          const newHitCount = new HitCount({ count: 1 });
          await newHitCount.save();
        } else {
          hitCount.count++;
          await hitCount.save();
        }
        // Create new macUser record with the given macID and set hitCount to 1
        macUser = new MacUser({ macId, hitCount: 1 });
        await macUser.save();
      } else {
        // Increment hit count only if user is not in the request object
        if (!req.macUser) {
          macUser.hitCount++;
          await macUser.save();
        }
      }
      // Set user object on request for use in other middleware or routes
      req.macUser = macUser;
      next();
    } catch (error) {
      res.status(500).send({
        code: 500,
        status: "Internal server error",
        Message: "Not able to connect with Database",
      });
    }
  };

  //Initialize Middleware
  await installedreportsMiddleware(req, res, async () => {
    try {
      // Get hit count from database
      const hitCount = await HitCount.findOne();
      const macUsers = await MacUser.find();
      res.status(200).send({
        code: 200,
        status: "Success",
        Message: {
          installedreports: hitCount ? hitCount.count : 0,
          macUsers: macUsers.map((user) => ({
            macId: user.macId,
            hitCount: user.hitCount,
          })),
        },
      });
    } catch (error) {
      res.status(500).send({
        code: 500,
        status: "Internal server error",
        Message: "Not able to connect with Database",
      });
    }
  });
};

exports.getinstalledreports = (req, res) => {
  HitCount.findOne({}, { _id: 0, __v: 0 }, (err, result) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: "Internal Server Error",
        message: "Not able to connect with database",
      });
    } else if (!result) {
      res.status(404).send({
        code: 404,
        status: "Not Found",
        message: "Installed Reports Data not found in database",
      });
    } else {
      res.status(200).send({
        code: 200,
        status: "Success",
        message: "Installed Reports Data fetched Successfully",
        data: result,
      });
    }
  });
};
