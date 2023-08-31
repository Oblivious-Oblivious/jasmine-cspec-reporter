require("./colors.js");

const formatted_actual_expected = (_actual, _expected) => {
    var actual = _actual;
    var expected = _expected;

    if(Object.prototype.toString.call(_actual) === "[object Array]")
        actual = `[${_actual}]`;

    if(Object.prototype.toString.call(_expected) === "[object Array]")
        expected = `[${_expected}]`;

    return {
        actual: actual,
        expected: expected,
    };
}

const custom_matchers = {
    is: matchers_util => {
        return {
            compare: (_actual, _expected) => {
                const { actual, expected } = formatted_actual_expected(_actual, _expected);
                return {
                    pass: matchers_util.equals(actual, expected),
                    message: `\`${actual}\``.red() + ` should be \`${expected}\``,
                };
            },
        };
    },

    isnot: matchers_util => {
        return {
            compare: (_actual, _expected) => {
                const { actual, expected } = formatted_actual_expected(_actual, _expected);
                return {
                    pass: !matchers_util.equals(actual, expected),
                    message: `\`${actual}\``.red() + ` should not be \`${expected}\``,
                };
            },
        };
    },

    equals_to: matchers_util => {
        return {
            compare: (_actual, _expected) => {
                const { actual, expected } = formatted_actual_expected(_actual, _expected);
                return {
                    pass: matchers_util.equals(actual, expected),
                    message: `\`${matchers_util.pp(expected)}\` expected but got ` + `\`${matchers_util.pp(actual)}\``.red(),
                };
            },
        };
    },

    does_not_equal_to: matchers_util => {
        return {
            compare: (_actual, _expected) => {
                const { actual, expected } = formatted_actual_expected(_actual, _expected);
                return {
                    pass: !matchers_util.equals(actual, expected),
                    message: `\`${expected}\` must be different from ` + `\`${actual}\``.red(),
                };
            },
        };
    },

    is_true: matchers_util => {
        return {
            compare: (_actual, _expected) => {
                const { actual } = formatted_actual_expected(_actual, _expected);
                return {
                    pass: matchers_util.equals(actual, true),
                    message: `\`${actual}\``.red() + " should be true",
                };
            },
        };
    },

    is_false: matchers_util => {
        return {
            compare: (_actual, _expected) => {
                const { actual } = formatted_actual_expected(_actual, _expected);
                return {
                    pass: matchers_util.equals(actual, false),
                    message: `\`${actual}\``.red() + " should be false",
                };
            },
        };
    },

    is_null: matchers_util => {
        return {
            compare: (_actual, _expected) => {
                const { actual } = formatted_actual_expected(_actual, _expected);
                return {
                    pass: matchers_util.equals(actual, null),
                    message: `\`${actual}\``.red() + " should be null",
                };
            },
        };
    },

    isnot_null: matchers_util => {
        return {
            compare: (_actual, _expected) => {
                const { actual } = formatted_actual_expected(_actual, _expected);
                return {
                    pass: !matchers_util.equals(actual, null),
                    message: `\`${actual}\``.red() + " should not be null",
                };
            },
        };
    },
};

module.exports = custom_matchers;
