import server from 'server/main';


describe('(Serve) main', () => {

	it('#exists', function () {
		expect(server).to.be.ok;
	});


	it('#server is  function.', () => {
		expect(typeof (server) === 'function').to.be.true;
	});

});