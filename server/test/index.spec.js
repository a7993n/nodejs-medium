const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const BlueBird = require('bluebird');
const Employes = require('../models/employes');

chai.use(chaiHttp);

const setup = (...employes) => {
    return BlueBird.mapSeries(employes, user => {
        return chai.request(server)
            .post('/employes')
            .send(user)
            .then(response => {
                return response.body;
            })
    })
}

describe('employes_api', () => {
    
    const employe_1 = {
        name: "Jarouih",
        firstName: "Aymen",
        dateCreated: "2021-01-01",
        department: "IT",
    }


beforeEach(async () => {
    await Employes.sync();
})

afterEach(async () => {
     await Employes.drop();
})


//Create employe
describe('POST /employes', () => {
    it('should create a new employe', (done) => {
        chai.request(server)
            .post('/employes')
            .send(employe_1)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});

//GET ALL EMPLOYES FROM DATABASE
describe('GET /employes', () => {
    it('should get all employes', async () => {
        const employes = await setup(employe_1);
        const response = await chai.request(server).get('/employes');
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.be.eql(1);
    })
})



// Update employe
describe('PUT /employes/:id', () => {
    it('should update employe', async () => {
        const employes = await setup(employe_1);
        const response = await chai.request(server).put('/employes/' + employes[0].id).send({name: "Jarouih", firstName: "Aymen", dateCreated: "2021-01-01", department: "IT", checkIn: "08:00", checkOut: "17:00", comment: "test"});
        response.should.have.status(204);
    })

})

//GET ONE EMPLOYES FROM DATABASE BY ID
describe('GET /employes/:id', () => {
    it('should get one employe', async () => {
        const employes = await setup(employe_1);
        const response = await chai.request(server).get('/employes/' + employes[0].id);
        response.should.have.status(200);
        response.body.should.be.a('object');
    })
})


//GET EMPLOYES FROM DATABASE BY DATE
describe('GET /employes/date/:date', () => {
    it('should get employes by date', async () => {
        const employes = await setup(employe_1);
        const response = await chai.request(server).get('/employes/date/2021-01-01');
        response.should.have.status(200);
        response.body.should.be.a('array');
    })

})

//CHECK IN EMPLOYE
describe('PUT /employes/checkin/:id&:comment', () => {
    it('should check in employe', async () => {
        const employes = await setup(employe_1);
        const response = await chai.request(server).put('/employes/checkin/' + employes[0].id + "&test");
        response.should.have.status(204);
    })


})

//CHECK OUT EMPLOYE
describe('PUT /employes/checkout/:id&:comment', () => {
    it('should check out employe', async () => {
        const employes = await setup(employe_1);
        const response = await chai.request(server).put('/employes/checkout/' + employes[0].id + "&test");
        response.should.have.status(204);
    })


})

//DELETE EMPLOYE FROM DATABASE
describe('DELETE /employes/:id', () => {
    it('should delete employe', async () => {
        const employes = await setup(employe_1);
        const response = await chai.request(server).delete('/employes/' + employes[0].id);
        response.should.have.status(200);
        response.body.should.be.a('number');
    })

})

});