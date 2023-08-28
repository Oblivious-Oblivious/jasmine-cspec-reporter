Object.assign(String.prototype, {
    red() { return `\u{001B}[1;31m${this}\u{001B}[0m`; },
    green() { return `\u{001B}[38;5;78m${this}\u{001B}[0m`; },
    yellow() { return `\u{001B}[38;5;11m${this}\u{001B}[0m`; },
    gray() { return `\u{001B}[38;5;244m${this}\u{001B}[0m`; },
    cyan() { return `\u{001B}[1;36m${this}\u{001B}[0m`; },
    magenta() { return `\u{001B}[38;5;207m${this}\u{001B}[0m`; },
    module_color() { return `\u{001B}[48;5;89m\u{001B}[38;5;11m${this}\u{001B}[0m`; },
});

const before = block => beforeAll(block);
const before_each = block => beforeEach(block);
const after = block => afterAll(block);
const after_each = block => afterEach(block);
const assert_that = actual => expect(actual);

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

before(() => {
    jasmine.addMatchers({
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
                        message: `\`${expected}\` expected but got ` + `\`${actual}\``.red(),
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
    });
});

jasmine.getEnv().configure({
    random: false,
});

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter({
    jasmineStarted: _ => {
        spacing = "";
        total_time = 0;
        current_start_time = 0;
        it_counter = 0;
        xit_counter = 0;
        positive_it_counter = 0;
    },

    suiteStarted: result => {
        total_time += performance.now() - current_start_time;
        spacing += "    ";
        console.log(spacing + `\`${result.description}\``.magenta());
    },

    suiteDone: _ => {
        spacing = spacing.slice(0, -4);
    },

    specStarted: _ => {
        spacing += "    ";
        current_start_time = performance.now();
    },

    specDone: result => {
        total_time += result.duration;
        it_counter++;
        if(result.status === "passed") {
            positive_it_counter++;
            console.log(spacing + "✓".green() + ` it ${result.description}`);
        }
        else if(result.status === "pending") {
            xit_counter++;
            console.log(spacing + `- xit ${result.description} (skipped)`.gray());
        }
        else {
            console.log(spacing + "✗".red() + ` it ${result.description}`);
            result.failedExpectations.forEach(e => {
                console.log(spacing + "    " + e.stack.split("\n").at(1).split("/").at(-1).replace(")", "") + ":");
                if(e.actual === "")
                    console.log(spacing + "        |> " + e.message.replace("Failed: ", "").red());
                else
                    console.log(spacing + "        |> " + e.message);
            });
            console.log("");
        }

        spacing = spacing.slice(0, -4);
    },

    jasmineDone: _ => {
        console.log("");
        console.log(`● ${it_counter + xit_counter} tests`.yellow());
        console.log(`✓ ${positive_it_counter} passing`.green());
        console.log(`✗ ${it_counter - positive_it_counter} failing`.red());
        console.log(`- ${xit_counter} skipped`.gray());
        if(total_time > 1000)
            console.log(`★ Finished in ${(total_time/1000.0).toFixed(5)} seconds`.cyan());
        else if(total_time > 60000)
            console.log(`★ Finished in ${(total_time/60000.0).toFixed(5)} minutes`.cyan());
        else
            console.log(`★ Finished in ${total_time.toFixed(5)} ms`.cyan());
    },
});

module.exports = {
    before,
    before_each,
    after,
    after_each,
    assert_that,
};
