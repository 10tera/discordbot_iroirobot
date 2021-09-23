module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log("login with "+client.user.tag+" now");
    },
};