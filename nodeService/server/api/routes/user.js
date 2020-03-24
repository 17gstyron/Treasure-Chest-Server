const Router = require('koa-router');
const {
  addUser,
  getUser
} = require('../../db/queries/user');

const userRouter = new Router({ prefix: '/user' });

// Create new user
userRouter.post('/', async (ctx) => {
  const { name, bio, email, icon } = ctx.request.body
  await addUser(name, bio, email, icon)
    .then(() => {;
      ctx.body = 'Successfully added user';
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500
      ctx.body = "User already exists"
    })
});

// Get user by name
userRouter.get('/:email', async (ctx) => {
  console.log(ctx.params.email)
  const { email } = ctx.params
  await getUser(email)
    .then((user) => {
      console.log('Successfully got user');
      ctx.body = user;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "User not found"
    })
});

module.exports.userRouter = userRouter;
