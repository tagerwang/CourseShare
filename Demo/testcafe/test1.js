import { Selector } from 'testcafe';

fixture('test1').page('http://localhost:1350/login.html?login');

// test("not set password", async t=>{
	// await t
	// .typeText("#login_user", "13570852872")
	// .click('#login_submit');
	// await t
	// .expect(Selector('#login_password-error').innerText).eql('必须填写密码');
// });

const login_id  = Selector('#login_id');

test("normal login", async t=>{
	await t
	.typeText("#login_user", "15112280165")
	.typeText("#login_password", "cyyz1234")
	.click('#login_submit')
	.expect(login_id.exists).ok()
	.takeScreenshot()
	.expect(login_id.innerText).eql('15112280165');
	
	
	//const location = await t.eval(() => window.location);
    //await t.expect(location.pathname).eql('/default.html');

	
});