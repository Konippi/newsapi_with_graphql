const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

APP_SECRET = process.env.APP_SECRET;

// signup
async function signup(parent, args, context) {
    // define passwd
    const passwd = await bcrypt.hash(args.passwd, 10);

    // create user
    const user = await context.prisma.user.create({
       data: {
        ...args,
        passwd,
       },
    });

    // jwt token
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

// login
async function login(parent, args, context) {
    // serch user from db using email
    const user = await context.prisma.user.findUnique({
        where: { email: args.email },
    });


    if (user === null) {
        throw new Error("Not exist the user");
    }
}
