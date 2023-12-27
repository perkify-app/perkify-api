const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: `${__dirname}/../../.env.config` });


const supabase = createClient(process.env.SUPABASE_URL, process.env.PUBLIC_ANON_KEY);


exports.signup = (email, password, options) => {
    return supabase.auth.signUp({ email, password, ...(options && { options }) });
}

exports.setRoles = (roles) => {
    return supabase.auth.updateUser({ data: { roles } });
}

exports.signin = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
}

exports.refresh = (refresh_token) => {
    return supabase.auth.refreshSession({ refresh_token });
}

exports.signout = () => {
    return supabase.auth.signOut();
}

exports.setTokenToCookies = (res, { access_token, refresh_token }) => {
    if (!(access_token && refresh_token)) return;

    const cookieOpts = {
        path: "/",
        maxAge: 100 * 365 * 24 * 60 * 60, // 100 years, never expires
        SameSite: "Lax",
        secure: true
    };

    res.cookie("access-token", access_token, cookieOpts);
    res.cookie("refresh-token", refresh_token, cookieOpts);
}