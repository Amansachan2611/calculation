var express=require('express')
var fs=require('fs')
var save=[]

var app=express()

var Arr=["plus","minus","into","by","mod"]
var mapArr=['+','-','*','/','%']


app.get('/',(req,res)=>{
    res.send("Namaste,Kalvium?")
})

app.get('/history',(req,res)=>{
    arr=[]
    save.forEach(ele => {
        arr.push({
            "que":ele["que"],
            "ans":ele["ans"]
        })
    });
    res.send(arr)
})

app.get('*',(req,res)=>{
    try {        
        var arr = req.url.split('/');
        var expr = arr[1];
        for(var i=2;i<arr.length;i+=2){
            var index=Arr.indexOf(arr[i])
            expr+=mapArr[index]
            expr+=arr[i+1];
        }
        var ans = eval(expr);
        var resp={
            "que":expr,
            "ans":ans
        }
        save.push(resp)
        res.send(resp)

    } catch (err) {
        console.log(err);
    }
})
app.listen(200,console.log("Server => 200"))