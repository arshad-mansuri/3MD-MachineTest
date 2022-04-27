exports.getIndex = (req,res)=>{
    const data = {id:"0893",name:"ash",age:33};
    res.send(JSON.stringify(data));
}