// Client side socket to get user count
let socket = io();

let totalUserCount = document.getElementById("totalUserCount");

socket.on('users', function (totalUsers) {
    if (totalUsers == 1) {
        totalUserCount.innerHTML = "1 user online";
    } else if (totalUsers > 1) {
        totalUserCount.innerHTML = totalUsers + " users online";
    }
})
