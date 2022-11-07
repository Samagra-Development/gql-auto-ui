import { on } from "events"
import { GraphqlArgument, GraphqlAttributes, GraphqlObject, GraphqlValue } from "./interface"

export function usage(err: string = ""): void {
    console.log( "1/ First step is to run the introspection query on the server, and store the JSON returned in a file.\n")
    console.log( "2/ Then run this program.\n")
    console.log( `Usage: ${process.argv[0]} ${process.argv[1]} <introspection file>` )
    if(err!==""){
        console.log( `Error: ${err}` )
    }
    console.log("")
    process.exit()
}

export function sort_by_key(array: Array<any>, key: string): Array<any> {
    key = key.toLowerCase();
    return array.sort(function(a, b){
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export function displayTypeO(o: GraphqlObject): void {
    console.log(`${o.ttype} ${o.name}`)
    console.log("-----------------------------")
    let l: Array<any>;
    if(o.attrs.length > 0){
        l = sort_by_key(o.attrs, "name")
        l.forEach(elt => {
            console.log({name: elt.name, type: elt.ttype});
            if(elt !== l.at(-1)){
                console.log(",");
            }
            else {
                console.log("\n \n");
            }
            console.log("");
        })
    }
    if(o.inputs.length > 0){
        l = sort_by_key(o.attrs, "name")
        l.forEach(elt => {
            console.log({name: elt.name, type: elt.ttype});
            if(elt !== l.at(-1)){
                console.log(",");
            }
            else {
                console.log("\n \n");
            }
            console.log("");
        })
    }
    if(o.values.length > 0){
        l = sort_by_key(o.attrs, "name")
        l.forEach(elt => {
            console.log({name: elt.name});
            if(elt !== l.at(-1)){
                console.log(",");
            }
            else {
                console.log("\n \n");
            }
            console.log("");
        })
    }
}

export function displayTypeQM(o: GraphqlObject) {
    console.log(`${o.ttype} ${o.name} {`)
    let l: Array<any>;
    if(o.args.length > 0){
        l = sort_by_key(o.args, "name")
        l.forEach(elt => {
            console.log({name: elt.name, type: elt.ttype});
            if(elt !== l.at(-1)){
                console.log(",");
            }
            else{
                console.log("\n \n");
            }
            console.log();
        })
    }
}

export function getEntityDetails(keyword: string, jfile: any): any{
    var t_objects: Array<GraphqlObject> = [];
    var t_queries: Array<GraphqlObject> = [];
    var t_muations: Array<GraphqlObject> = [];
    jfile['data']['__schema']['types'].forEach((v: any) => {
        if(v['name'] === 'Query' || v['name'] === 'Mutation'){
            if(v.hasOwnProperty('fields') && typeof v['fields'] === "object" && v['fields'].length > 0){
                v['fields'].forEach((vv: any) => {
                    let o = new GraphqlObject();
                    o.name = vv['name']
                    o.ttype = v['name']==='Query' ? 'QUERY' : 'MUTATION';
                    let ttype: any;
                    if(vv['args']!=null && typeof vv['args'] === "object" && vv['args'].length > 0){
                        vv['args'].forEach((vvv: any) => {
                            if(vvv['type']!=null && vvv['type']['name']!=null) {
                                ttype = vvv['type']['name']
                            }
                            else if(vvv['type']!=null && vvv['type']['ofType']!=null && vvv['type']['ofType']['name']!=null) {
                                ttype = vvv['type']['ofType']['name']
                            }
                            else if(vvv['type']!=null && vvv['type']['ofType']!=null && vvv['type']['ofType']['ofType']!=null && vvv['type']['ofType']['ofType']['name']!=null) {
                                ttype = vvv['type']['ofType']['ofType']['name']
                            }
                            else if(vvv['type']!=null && vvv['type']['ofType']!=null && vvv['type']['ofType']['ofType']!=null && vvv['type']['ofType']['ofType']['ofType']!=null && vvv['type']['ofType']['ofType']['ofType']['name']!=null) {
                                ttype = vvv['type']['ofType']['ofType']['ofType']['name']
                            }
                            let arg = new GraphqlArgument();
                            arg.name = vvv['name'];
                            arg.ttype = ttype;
                            o.args.push(arg);
                        });
                        if(o.ttype === "QUERY"){
                            t_queries.push(o);
                        }
                        else if(o.ttype === "MUTATION"){
                            t_muations.push(o);
                        }
                    }
                });
            }
        }
        else if(v['name'].startsWith(keyword)){
            let o = new GraphqlObject();
            o.name = v['name']
            o.ttype = v['kind']
            let ttype: any;
            if(v['fields']!= null && typeof v['fields'] === "object" && v['fields'].length > 0){
                v['fields'].forEach((vv: any) => {
                    if(vv['type']!=null && vv['type']['name']!=null) {
                        ttype = vv['type']['name']
                    }
                    else if(vv['type']!=null && vv['type']['ofType']!=null && vv['type']['ofType']['name']!=null) {
                        ttype = vv['type']['ofType']['name']
                    }
                    else if(vv['type']!=null && vv['type']['ofType']!=null && vv['type']['ofType']['ofType']!=null && vv['type']['ofType']['ofType']['name']!=null) {
                        ttype = vv['type']['ofType']['ofType']['name']
                    }
                    else if(vv['type']!=null && vv['type']['ofType']!=null && vv['type']['ofType']['ofType']!=null && vv['type']['ofType']['ofType']['ofType']!=null && vv['type']['ofType']['ofType']['ofType']['name']!=null) {
                        ttype = vv['type']['ofType']['ofType']['ofType']['name']
                    }
                    let attr = new GraphqlAttributes()
                    attr.name = vv['name']
                    attr.ttype = ttype
                    o.attrs.push(attr)
                });
            }
            if(v['inputFields']!= null && typeof v['inputFields'] === "object" && v['inputFields'].length > 0){
                v['inputFields'].forEach((vv: any) => {
                    if(vv['type']!=null && vv['type']['name']!=null) {
                        ttype = vv['type']['name']
                    }
                    else if(vv['type']!=null && vv['type']['ofType']!=null && vv['type']['ofType']['name']!=null) {
                        ttype = vv['type']['ofType']['name']
                    }
                    else if(vv['type']!=null && vv['type']['ofType']!=null && vv['type']['ofType']['ofType']!=null && vv['type']['ofType']['ofType']['name']!=null) {
                        ttype = vv['type']['ofType']['ofType']['name']
                    }
                    else if(vv['type']!=null && vv['type']['ofType']!=null && vv['type']['ofType']['ofType']!=null && vv['type']['ofType']['ofType']['ofType']!=null && vv['type']['ofType']['ofType']['ofType']['name']!=null) {
                        ttype = vv['type']['ofType']['ofType']['ofType']['name']
                    }
                    let attr = new GraphqlAttributes()
                    attr.name = vv['name']
                    attr.ttype = ttype
                    o.inputs.push(attr)
                });
            }
            if(v['enumValues']!= null && typeof v['enumValues'] === "object" && v['enumValues'].length > 0) {
                v['enumValues'].forEach((vv: any) => {
                    let attr = new GraphqlValue()
                    attr.name = vv['name']
                    o.values.push(attr)
                });
            }
            t_objects.push(o);
        }
    })
    if(t_objects.length > 0){
        const l: Array<GraphqlObject> = sort_by_key(t_objects, "name")
        l.forEach((ele) => {
            displayTypeO(ele);
        });
    }
    if(t_queries.length > 0){
        const l: Array<GraphqlObject> = sort_by_key(t_queries, "name")
        l.forEach((ele) => {
            displayTypeO(ele);
        });
    }
    if(t_muations.length > 0){
        const l: Array<GraphqlObject> = sort_by_key(t_muations, "name")
        l.forEach((ele) => {
            displayTypeO(ele);
        });
    }
}