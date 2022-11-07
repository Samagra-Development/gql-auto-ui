export class GraphqlObject {
    name: string
    ttype: string
    args: Array<any>
    attrs: Array<any>
    values: Array<any>
    inputs: Array<any>

    constructor() {
        this.args = [];
        this.attrs = [];
        this.values = [];
        this.inputs = [];

    }
}

export class GraphqlAttributes{
    name: string
    ttype: string
}

export class GraphqlArgument{
    name: string
    ttype: string
}

export class GraphqlValue{
    name: string
    ttype: string
}
