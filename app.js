const express= require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");

var app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(require,response){
    var fname=require.body.fname;
    var lname=require.body.lname;
    var email=require.body.email;
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME:lname
                }
            }
        ]
    };

    const jsondata=JSON.stringify(data);
    const url="https://us5.api.mailchimp.com/3.0/lists/142f91f1f7"
    const options={
        method:"POST",
        auth:"aleem1:15bbd9d2a7e1add8f47622bd85d4cf6b-us5"
    }
   
   
    const request=https.request(url,options,function(response1){
        if(response1.statusCode===200){
            response.sendFile(__dirname+"/success.html")
        }else{
            response.sendFile(__dirname+"/failure.html")            
        }
      
        response1.on("data",function(data){
            console.log(JSON.parse(data));
        })

    });
  
    request.write(jsondata);
    request.end();

});

app.listen(3000,function(){
    console.log("the server is running at localhost:3000")

});

//api key

// 15bbd9d2a7e1add8f47622bd85d4cf6b-us5

//list id
// 142f91f1f7