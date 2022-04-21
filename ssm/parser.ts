// Scope

function SeachChar(str: string): string[] {
    let arr: string[] = [];
    for (let i: number = 0; i < str.length; ++i) {
        arr.push(str[i])
    }

    return arr
}

let tokens: string[] = SeachChar("/!@#$%^&*().\\");

function _each(str: string, cb: Function) {
    for (let i: number = 0; i < str.length; ++i)
        cb(str[i]);
}

function hasTokenInIt(str: string): boolean {
    let found: boolean = false;

    _each(str, function (char: string) {
        for (let i = 0; i < tokens.length; ++i) {
            let t: string = tokens[i]

            if (char == t) {
                found = true;
                break;
            }

            else {
                found = false;
            }
        }
    })

    return found;
}

// console.log(hasTokenInIt("hello"))
// console.log(hasTokenInIt("helo!"))


class Construct {
    data: object[] = []
    /**
     * A "Construct" is essentially the base for statements,
     * When you load a chunk of code, it loads into a construct.
     * Which is a tree of different statements, like an AST. (Abstract Syntax Tree)
     * 
     * @param statement The statement to compile.
     * @param compiler Specify a custom compiler on top of the default presets, do extra things while the compiler handles the statement, _onFuncN(), _onFuncExec
     */
    constructor(statement: string, compiler?: object) {

        let state: number = 0;
        let buffer: string = "";
        let CurrentObject: object = {}

        if (compiler == undefined) compiler = {}

        if (!compiler["lineBreak"]) compiler["lineBreak"] = "\n"

        _each(statement.trim(), (c: string) => {
            if (c == ' ' && state == 0 && buffer.trim().length > 0) {

                if (compiler["_onFuncN"]) {
                    compiler["_onFuncN"](buffer)
                }
                
                if (hasTokenInIt(buffer.trim())) {
                    return console.log("Error: Function name can not have reserved tokens (!, *, #, etc..)")
                }

                CurrentObject["type"] = "FUNCTION_CALL"
                CurrentObject["func_name"] = buffer.trim()

                state = 1;

                buffer = ""
            } else if (c == ' ' && state == 1) {

                if (CurrentObject["arg"] == null) CurrentObject["arg"] = []

                CurrentObject["arg"].push(buffer.trim())

                buffer = ""
            } else if (c == compiler["lineBreak"] && state == 1) {
                console.log("LINE BREAK")
                if (buffer.length > 0) CurrentObject["arg"].push(buffer.trim())
                
                this.data.push(CurrentObject)

                CurrentObject = {}
                buffer = ""
                state = 0;
                
            } else {
                buffer += c
            }
        })

        if (buffer.length > 0) { CurrentObject["arg"].push(buffer.trim()) 
            this.data.push(CurrentObject)
            CurrentObject = {}
            buffer = "";
            state = 0;

        }
    }
}

class Scope {
    lineEnding: string = "\n"

    constructor(cnt_line_ending: string = "\n") {
        this.lineEnding = cnt_line_ending;
    }
}

let SyntaxTree: Construct = new Construct("hello world 1 2\nhello world 2 3");

console.log(SyntaxTree.data)