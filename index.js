require("./colors.js");
const custom_matchers = require("./matchers.js");
const custom_reporter = require("./reporter.js");

beforeAll(() => {
    jasmine.addMatchers(custom_matchers);
});

jasmine.getEnv().configure({
    random: false,
});
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(custom_reporter);

const before = block => beforeAll(block);
const before_each = block => beforeEach(block);
const after = block => afterAll(block);
const after_each = block => afterEach(block);
const assert_that = actual => expect(actual);

module.exports = {
    before,
    before_each,
    after,
    after_each,
    assert_that,
};
