var page = require('page');
var template = require('./template');
var title = require('title');
var header = require('../header/index.js');
var empty = require('empty-element');
var request = require('superagent');


page('/:username', header,loadUser, function (ctx, next) {
	var main = document.getElementById('main-container');
	title(`${ctx.params.username}`);
	empty(main).appendChild(template(ctx.user));
})

page('/:username/:id', header,loadUser, function (ctx, next) {
	var main = document.getElementById('main-container');
	title(`${ctx.params.username}`);
	empty(main).appendChild(template(ctx.user));
	$(`#modal${ctx.params.id}`).modal('open', {
		complete: function () {
			var path = `/${ctx.params.username}`;
			page(path)
		}
	});
})

async function loadUser(ctx, next) {
	try{
		ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json())
		next()
	} catch (err) {
		console.log(err)
	}
}
