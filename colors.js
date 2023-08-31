Object.assign(String.prototype, {
    red() { return `\u{001B}[1;31m${this}\u{001B}[0m`; },
    green() { return `\u{001B}[38;5;78m${this}\u{001B}[0m`; },
    yellow() { return `\u{001B}[38;5;11m${this}\u{001B}[0m`; },
    gray() { return `\u{001B}[38;5;244m${this}\u{001B}[0m`; },
    cyan() { return `\u{001B}[1;36m${this}\u{001B}[0m`; },
    magenta() { return `\u{001B}[38;5;207m${this}\u{001B}[0m`; },
    module_color() { return `\u{001B}[48;5;89m\u{001B}[38;5;11m${this}\u{001B}[0m`; },
});
