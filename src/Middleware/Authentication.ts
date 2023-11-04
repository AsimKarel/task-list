export const auth = async(req:any, res:any, next:any) =>{
    const token = req.header('Token')
    if(token == "asim"){
        next()
    }
    else{
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
