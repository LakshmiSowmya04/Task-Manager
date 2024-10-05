const cookieOptions = {
  httpOnly: true,
  secure: false, //only can send on https domain when it's true not on http,if you are testing it in htttp please false it.
  sameSite: "Lax",
  maxAge: 24 * 60 * 60 * 1000,
};
export { cookieOptions };
