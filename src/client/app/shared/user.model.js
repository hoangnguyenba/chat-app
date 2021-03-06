"use strict";
var User = (function () {
    function User(obj) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.status = obj && obj.status || User.USER_STATUS_OFFLINE;
        this.logo = obj && obj.logo || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFoAWgMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAwQGAQIFB//EADQQAAICAQIDBQUGBwAAAAAAAAABAgMEBREGEjETIUFRkRRSYaHRFUJicYHwIiMkM7HB4f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD1kAAADYykRNWz46bjc7ipWSe0I+b+gEtIRPMxYPlnk0xfk7EUzL1DLzG+3uk4+4u6PoRQPQoSjZHmrlGcfOL3RtsUHEyrsO5W483GS6rwl8H5lq0PVnqMrKroRhbBcy5ejX7/AMgdMDLRgAAAADKRhDIoDMYlV4wk/b6YeEat1+bb+iLfCJVeNquXLxrPercfR/8AQK4AAAHX4W3+2IJeMJb+hyDucHqL1d79exlt6oC2SiaNEicRMkAsDLMAbLqNghcR1aAdCJTeNU1qtTbezoW3qy6QRyuJdH+0qI3Qs5LaIya3W6kuu3yAoAAAAT9CclrOHyde1S/Tx+W5ALZwjo39vVLpr73ZVpfmt38wLNOIiaJU0R7EBHaNTeSNAN4j6xER9YEiAxxUouL6NbC4EDWdYo07FsathLJ22hUmm9/ivICgZuJbgZVmLev463tuujXg0IMylKcnKcnKT72292zAG9Vc7bYVVx5pzkoxXm30PTdLxPYdPoxnJSdcNm14vx+Z5eXLhPWqni+x5l8YWVv+XKyW3NF+G78UBZJkewfJ7rddGIsARMWMkLAHZCuDnZOMIrrKT2SOdl8SYeMmsdPIn+Huj6/Qq2oZlubkSstk2k3yx8Ir4EYDp5+vahm7xdvZVv7lXd6vqzmdOgAAAAAAAAEvB1LMwH/S3yjH3H3xf6Hfw+Ka7No5tTrfv198fTqvmVUAPQKcmjKjzY9sLF+F9Bh57XOdVisqk4TXSUXs0WKriCzsoc9UZS5Vu92t2BXH1MAAAAAAAAAAAAAAAAG6saW3+zQAP//Z";
    }
    Object.defineProperty(User, "USER_STATUS_OFFLINE", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User, "USER_STATUS_ONLINE", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User, "USER_STATUS_AWAY", {
        get: function () { return 2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User, "USER_STATUS_BUSY", {
        get: function () { return 3; },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map