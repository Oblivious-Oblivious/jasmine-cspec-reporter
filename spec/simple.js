class SimpleTestClass {
    constructor() {
        this.i = -1;
        this.d = 0;
        this.s = "";
    }

    debug_msg() {
        console.log("This is called before all tests");
    }

    teardown_msg() {
        console.log("This is called after all tests");
    }

    initializer() {
        this.i = 1;
        this.d = 2.42;
        this.s = "str";
    }

    destructor() {
        this.i = -1;
        this.d = 0;
        this.s = "";
    }
}

export default SimpleTestClass;
