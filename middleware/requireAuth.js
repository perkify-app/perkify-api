const requireAuth = (...roles) => (req, res, next) => {
    if (!req.user) return res.status(401).send();

    const userRoles = req.user.user_metadata.roles ?? [];
    if (roles.some(role => !userRoles.includes(role))) return res.status(403).send();

    next();
}

module.exports = requireAuth;