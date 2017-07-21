var yo = require('yo-yo');

module.exports = function landing(box) {
	return yo`<div class="container landing">
			<div class="row">
				<div class="col s10 offset-s1 m10 offset-m0">
					<div class="row">
						${box}
						<div class="col m5 hide-on-small-only push-l2">
							<img class="iphone" src="iphone.png">
						</div>
					</div>
				</div>
			</div>`;
}
