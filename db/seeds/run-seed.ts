import devData from "../data/development-data/index";
import seed from "./seed";
import db from "../connection";

async function runSeed() {
    await seed(devData);
    db.end();
};

export default runSeed();