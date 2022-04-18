require('dotenv').config();

const {MONGO_URI, NODE_ENV} = process.env;

if (!MONGO_URI || !NODE_ENV) {
    throw new Error('Missing environment variables!');
}

const config: Record<string, string> = {
    MONGO_URI,
    NODE_ENV
};

export default config;