module.exports = {
    "idle": async () => {
        await new Promise(r => setTimeout(r, 5000))
    },
};
