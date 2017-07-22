var express = require('express');
var multer = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads')
	},
	filename: function (req, file, cb) {
		cb(null, + Date.now()+ '.' +ext(file.originalname))
	}
})

var upload = multer({storage : storage}).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/',function (req,res) {
	res.render('index', { title: 'Disciplinappte' });
})

app.get('/signup',function (req,res) {
	res.render('index', { title: 'Disciplinappte-registro' });
})

app.get('/signin',function (req,res) {
	res.render('index', { title: 'Disciplinappte-ingreso' });
})

app.get('/api/pictures', function (req,res) {
	var pictures = [
		{
			user:{
				username:'Seelecorp',
				avatar: 'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/13174204_120790515001002_1254631020557491331_n.jpg?oh=5b205fd4d6e1a7502a8bdc083297e349&oe=5A0817E6'
			},
			url:'logoDisciplinappte.png',
			likes:204,
			liked:false,
			createdAt: new Date().getTime()
		},
		{
			user:{
				username:'Seelecorp',
				avatar: 'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/13174204_120790515001002_1254631020557491331_n.jpg?oh=5b205fd4d6e1a7502a8bdc083297e349&oe=5A0817E6'
			},
			url:'logoDisciplinappte.png',
			likes:10,
			liked:true,
			createdAt: new Date().setDate(new Date().getDate() - 10)
		}
	];

	setTimeout(function () {
		res.send(pictures);
	}, 1000)	
});

app.post('/api/pictures', function (req, res) {
	upload(req, res, function (err) {
		if (err) {
			return res.send(500, 'Error uploading file');
		}
		res.send('File uploaded');
	})
})

app.get('/api/user/:username', function (req, res) {
	const user = {
		username: 'Seelecorp',
		avatar: 'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/20228751_10212120452160429_7935935272930738033_n.jpg?oh=090cb37252f3d2aee520262eaea94174&oe=59C4B3A5',
		pictures: [
			{
				id:0,
				src:'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/20228751_10212120452160429_7935935272930738033_n.jpg?oh=090cb37252f3d2aee520262eaea94174&oe=59C4B3A5',
				likes:10
			},
			{
				id:1,
				src:'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/20228751_10212120452160429_7935935272930738033_n.jpg?oh=090cb37252f3d2aee520262eaea94174&oe=59C4B3A5',
				likes:100
			},
			{
				id:2,
				src:'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/20228751_10212120452160429_7935935272930738033_n.jpg?oh=090cb37252f3d2aee520262eaea94174&oe=59C4B3A5',
				likes:30
			},
			{
				id:3,
				src:'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/20228751_10212120452160429_7935935272930738033_n.jpg?oh=090cb37252f3d2aee520262eaea94174&oe=59C4B3A5',
				likes:14
			},
			{
				id:4,
				src:'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/20228751_10212120452160429_7935935272930738033_n.jpg?oh=090cb37252f3d2aee520262eaea94174&oe=59C4B3A5',
				likes:15
			},
			{
				id:5,
				src:'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/20228751_10212120452160429_7935935272930738033_n.jpg?oh=090cb37252f3d2aee520262eaea94174&oe=59C4B3A5',
				likes:0
			}

		]
	}
	res.send(user);
})

app.get('/:username', function (req, res) {
	res.render('index', {title: `${req.params.username}`})
})

app.get('/:username/:id', function (req, res) {
	res.render('index', {title: `${req.params.username}`})
})

app.listen(port,function (err) {
	if (err) return console.log('Tenemos un error'), process.exit(1);
	console.log('Escuchando en el puerto '+ port);
})