const Employe = require('../models/employes');

class Employes {

    //GET ALL EMPLOYES FROM DATABASE
    static async getAllEmployes(req, res) {
        const employes = await Employe.findAll();
        res.json(employes);
    }
    //GET ONE EMPLOYES FROM DATABASE BY ID
    static async getEmployeById(req, res) {
        const employe = await Employe.findByPk(req.params.id);
        res.json(employe);
    }
    //CREATE EMPLOYE IN DATABASE
    static async createEmploye(req, res) {
    const { id, name, firstName, dateCreated, department} = req.query;
    const employe = await Employe.create({
        name: name,
        firstName: firstName,
        dateCreated: dateCreated,
        department: department,
    })
        res.status(201).json(employe);
    }
    //MODIFY EMPLOYE IN DATABASE
    static async updateEmploye(req, res) {
        // sqllite update employe where id is req.params.id
        const employe = await Employe.update(req.query, {where: {id: req.params.id}});
        res.status(204).json({
            message: "Employe modifié!"
        })
    }
    //DELETE EMPLOYE FROM DATABASE
    static async deleteEmploye(req, res) {
        const employe = await Employe.destroy({where: {id: req.params.id}});
        res.json(employe);
    }
    //GET ALL EMPLOYES FROM DATABASE BY createdDate
    static async getEmployesByDate(req, res) {
        // get all employes where dateCreated LIKE req.query.date
        const employes = await Employe.findAll({contains: {dateCreated: req.params.date}});
        res.json(employes);

    }

    //Employees check-in with their id and current date and time and a comment
    static async checkIn(req, res) {
        const employe = await Employe.update({
            //get current date and time, 
            checkIn: new Date(),
            comment: req.params.comment,
        }, {where: {id: req.params.id}});
        res.status(204).json({
            message: "Employe check-in!"
        })
    }
    //Employees check-out with their id and current date and time and a comment
    static async checkOut(req, res) {
        const employeI = await Employe.findByPk(req.params.id);
        //difference between checkIn and checkOut
        const diff = (new Date() - employeI.checkIn) / 1000;
        const diffHours = Math.floor(diff / 3600) % 24;
        const diffMinutes = Math.floor(diff / 60) % 60;
        const diffSeconds = diff % 60;

        // convert diff milleseconds to hours
        const employe = await Employe.update({
            //get current date and time, 
           workingHours: diffHours+ "h" + diffMinutes + "m" + diffSeconds + "s",
            checkOut: new Date(),
            comment: req.params.comment,
        }, {where: {id: req.params.id}});
        res.status(204).json({
            message: "Employe check-out!",
        })
    }

   

}


module.exports = Employes;
