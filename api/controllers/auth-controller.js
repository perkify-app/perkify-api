const authModel = require('../models/auth-model');
const { decodeBase64 } = require('../utils');


// supabase.auth.onAuthStateChange((event, session, c) => {
//     console.log(session)
//     supabase.headers["test"] = "hi"
//     return;
//     switch (event) {
//         case "SIGNED_OUT":
//         case "USER_DELETED":
//             const expires = new Date(0).toUTCString();
//             document.cookie = `access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
//             document.cookie = `refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
//             break;
//         case "SIGNED_IN":
//         case "TOKEN_REFRESHED":

//             break;
//     }
// })

exports.signUp = async (req, res) => {
    const [key, value] = req.headers.authorization.split(" ");
    if (key !== "Basic") return res.status(400).send();
    const [email, password] = decodeBase64(value).split(':');


    //const options = {
    // data: {
    //     merchant_id: "John"
    // }
    //}

    const { data, error } = await authModel.signup(email, password);
    if (error) res.status(error.status).send(error.message);

    res.status(200).send();
}

exports.signIn = async (req, res) => {
    const [key, value] = req.headers.authorization.split(" ");
    if (key !== "Basic") return res.status(400).send();

    const credentials = decodeBase64(value)?.split(':');
    if (!credentials?.length) return res.status(400).send();

    const [email, password] = credentials;
    const { data, error } = await authModel.signin(email, password);
    if (error) res.status(error.status).send(error.message);

    authModel.setTokenToCookies(res, data.session);
    res.status(200).send();
}

exports.signOut = async (req, res) => {
    const { error } = authModel.signout();
    if (error) return res.status(error.status).send(error.message);

    res.clearCookie("access-token");
    res.clearCookie("refresh-token");
    res.status(200).send();
}

exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies["refresh-token"];
    const { data, error } = await authModel.refresh(refreshToken);
    if (error) res.status(error.status).send(error.message);

    authModel.setTokenToCookies(res, data.session);
    res.status(200).send();
}

exports.setRoles = async (req, res) => {
    const { roles } = req.body;
    const { error } = await authModel.setRoles(roles);
    if (error) return res.status(error.status).send(error.message);

    res.status(200).send();
}