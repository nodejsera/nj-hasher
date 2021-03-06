var express =  require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var app = express();


//Sendgrid Email system --123
const sgMail = require('@sendgrid/mail');
var key = process.env.SENDGRID_KEY;		
sgMail.setApiKey(key);

//commenting from pervious folder
app.get('/', function(req,res){
    res.set({
        'Access-Control-Allow-Origin' :'*'
    });
    return res.redirect('views/nj-hasher.html');
})



app.use('/views', express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

var getHash = ( content , value ) => {
				
				if(value == 'md5'){
					var hash = crypto.createHash('md5');
					//passing the data to be hashed
					data = hash.update(content, 'utf-8');
					//Creating the hash in the required format
					gen_hash= data.digest('hex');
					//Printing the output on the console
					console.log("Hash : " + gen_hash);
					return gen_hash;					
				}else if(value == 'whirlpool'){
					var hash = crypto.createHash('whirlpool');
					//passing the data to be hashed
					data = hash.update(content, 'utf-8');
					//Creating the hash in the required format
					gen_hash= data.digest('hex');
					//Printing the output on the console
					console.log("Hash : " + gen_hash);
					return gen_hash;				
				}else if(value == 'sha1'){
					var hash = crypto.createHash('sha1');
					//passing the data to be hashed
					data = hash.update(content, 'utf-8');
					//Creating the hash in the required format
					gen_hash= data.digest('hex');
					//Printing the output on the console
					console.log("Hash : " + gen_hash);
					return gen_hash;				
				}else if(value == 'sha224'){
					var hash = crypto.createHash('sha224');
					//passing the data to be hashed
					data = hash.update(content, 'utf-8');
					//Creating the hash in the required format
					gen_hash= data.digest('hex');
					//Printing the output on the console
					console.log("Hash : " + gen_hash);
					return gen_hash;				
				}else if(value == 'sha256'){
					var hash = crypto.createHash('sha256');
					//passing the data to be hashed
					data = hash.update(content, 'utf-8');
					//Creating the hash in the required format
					gen_hash= data.digest('hex');
					//Printing the output on the console
					console.log("Hash : " + gen_hash);
					return gen_hash;				
				}else if(value == 'sha384'){
					var hash = crypto.createHash('sha384');
					//passing the data to be hashed
					data = hash.update(content, 'utf-8');
					//Creating the hash in the required format
					gen_hash= data.digest('hex');
					//Printing the output on the console
					console.log("Hash : " + gen_hash);
					return gen_hash;				
				}else if(value == 'sha512'){
					var hash = crypto.createHash('sha512');
					//passing the data to be hashed
					data = hash.update(content, 'utf-8');
					//Creating the hash in the required format
					gen_hash= data.digest('hex');
					//Printing the output on the console
					console.log("Hash : " + gen_hash);
					return gen_hash;				
				}else if(value == 'ripemd160'){
					var hash = crypto.createHash('ripemd160');
					//passing the data to be hashed
					data = hash.update(content, 'utf-8');
					//Creating the hash in the required format
					gen_hash= data.digest('hex');
					//Printing the output on the console
					console.log("Hash : " + gen_hash);
					return gen_hash;				
				}else{
					var gen_hash =  "Invalid Content passed. Please contact https://nodejsera.com Team";
					return gen_hash;
				}
                
}

app.post('/hash', function(req,res){
    var content = req.body.content;  
	var value = req.body.algorithm;
    
    var hash = getHash(content,value);
	const pug = require('pug'); 
                // Compile the source code
    const compiledFunction = pug.compileFile('views/hashed.pug');
    reshash = compiledFunction({
        hashed : hash
    }); 
    res.send(reshash);

})

app.get('/email', function(req,res){
	res.set({
        'Access-Control-Allow-Origin' :'*'
    });
    return res.redirect('views/nj-email.html');

})

app.post('/email', function(req,res){
	var email= req.body.email;
    //console.log("SENDGRID_ENV : " + key);
    const msg = {
        to: process.env.EMAIL_TO,
        from: process.env.EMAIL_FROM,				
        subject: 'NEW_SUBSCRIPTION',
        html: email ,
    };

    sgMail.send(msg);

    return res.redirect('/views/nj-email.html');

})





app.listen(process.env.PORT || 3000,function(){
	console.log("App listening at 6899");
});
//Just a random commit