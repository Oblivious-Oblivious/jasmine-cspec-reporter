import "./colors";
import custom_matchers from "./matchers";
import custom_reporter from "./reporter";

beforeAll(() => {
    jasmine.addMatchers(custom_matchers);
});

jasmine.getEnv().configure({
    random: false,
});
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(custom_reporter);

export const before = block => beforeAll(block);
export const before_each = block => beforeEach(block);
export const after = block => afterAll(block);
export const after_each = block => afterEach(block);
export const assert_that = actual => expect(actual);
