require("./colors.js");

const custom_reporter = {
    spacing: "",
    total_time: 0,
    current_start_time: 0,
    it_counter: 0,
    xit_counter: 0,
    positive_it_counter: 0,

    jasmineStarted: function(_) {
    },

    suiteStarted: function(result) {
        this.total_time += performance.now() - this.current_start_time;
        this.spacing += "    ";
        console.log(this.spacing + `\`${result.description}\``.magenta());
    },

    suiteDone: function(_) {
        this.spacing = this.spacing.slice(0, -4);
    },

    specStarted: function(_) {
        this.spacing += "    ";
        this.current_start_time = performance.now();
    },

    specDone: function(result) {
        this.total_time += result.duration;
        this.it_counter++;
        if(result.status === "passed") {
            this.positive_it_counter++;
            console.log(this.spacing + "✓".green() + ` it ${result.description}`);
        }
        else if(result.status === "pending") {
            this.xit_counter++;
            console.log(this.spacing + `- xit ${result.description} (skipped)`.gray());
        }
        else {
            console.log(this.spacing + "✗".red() + ` it ${result.description}`);
            result.failedExpectations.forEach(e => {
                console.log(this.spacing + "    " + e.stack.split("\n").at(1).split("/").at(-1).replace(")", "") + ":");
                if(e.actual === "")
                    console.log(this.spacing + "        |> " + e.message.replace("Failed: ", "").red());
                else
                    console.log(this.spacing + "        |> " + e.message);
            });
            console.log("");
        }

        this.spacing = this.spacing.slice(0, -4);
    },

    jasmineDone: function(_) {
        console.log("");
        console.log(`● ${this.it_counter} tests`.yellow());
        console.log(`✓ ${this.positive_it_counter} passing`.green());
        console.log(`✗ ${this.it_counter - this.positive_it_counter - this.xit_counter} failing`.red());
        console.log(`- ${this.xit_counter} skipped`.gray());
        if(this.total_time > 1000)
            console.log(`★ Finished in ${(this.total_time/1000.0).toFixed(5)} seconds`.cyan());
        else if(this.total_time > 60000)
            console.log(`★ Finished in ${(this.total_time/60000.0).toFixed(5)} minutes`.cyan());
        else
            console.log(`★ Finished in ${this.total_time.toFixed(5)} ms`.cyan());
    },
};

module.exports = custom_reporter;
