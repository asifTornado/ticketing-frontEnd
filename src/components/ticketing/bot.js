export class ChatObject{
   
constructor(type, value, parent = "none"){
   this.parent = parent
   this.type = type
   this.value = value
   }

    value;
    type;
    children = [];


}



export function findObjectByValue(root, value) {
    if (root.value === value) {
        return root;
    }
  
    for (const child of root.children) {
        const result = findObjectByValue(child, value);
        if (result) return result;
    }
  
    return null;
}

export function insertChild(parent, newChild) {
    parent.children.push(newChild);
}

