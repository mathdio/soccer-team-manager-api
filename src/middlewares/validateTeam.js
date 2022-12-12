const validateTeam = (req, res, next) => {
  const requiredProp = ['name', 'initials'];
    
  if (requiredProp.every((property) => property in req.body)) {
    next();
  } else {
    res.sendStatus(400);
  }
};

module.exports = validateTeam;