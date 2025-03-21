// Start with an empty object
let myList = {};


let handler = {
    onDelete: undefined,
    onUpdate: undefined,
    set(target, prop, value) {
        if (!(prop in target)) {
            console.log(`Property "${prop}" was added with value: ${value}`);
        } else {
            console.log(`Property "${prop}" was updated to: ${value}`);
        }
        target[prop] = value; // Perform the actual property addition/update
        return true; // Indicate success
    },
    deleteProperty(target, prop) {
        if (prop in target) {
            console.log(`Property "${prop}" was deleted!`);

            if (this.onDelete) {
                this.onDelete(prop);
                console.log("object");
            }
            delete target[prop];
            return true;
        }
        return false;
    }
};



let proxiedList = new Proxy({}, handler);

// Test
// Logs: Property "a" is being deleted
// delete proxiedList.a;

// { b: "another value" }
// console.log(proxiedList);
