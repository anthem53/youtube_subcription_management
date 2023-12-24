exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인이 해제되었습니다.');
    res.redirect(`/?error=${message}`);
    //res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
if (!req.isAuthenticated()) {
  next();
} else {
  const message = encodeURIComponent('로그인한 상태입니다.');
  res.redirect(`/?error=${message}`);
}
};
