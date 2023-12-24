const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();


const bootstrapRouter = require("./routes/bs_router")
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth')
const youtubeRouter = require('./routes/youtube')
const channelRouter =require('./routes/channel')

const passportConfig = require('./passport');
const {sequelize } = require('./models')

const app = express();
passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/',pageRouter)
app.use('/auth',authRouter)
app.use('/bs',bootstrapRouter)
app.use('/channel',channelRouter)
app.use('/youtube',youtubeRouter)


app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
