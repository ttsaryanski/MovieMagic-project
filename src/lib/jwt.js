import jsonwebtoken from "jsonwebtoken";
import util from 'util';

const sign = util.promisify(jsonwebtoken.sign);

const verify = util.promisify(jsonwebtoken.verify);

export default {
    sign,
    verify
}