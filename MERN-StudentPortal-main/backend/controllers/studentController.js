
const Student = require('../models/studentModel')





//@desc  Get students
//@routes  GET /students
//@access  Private

const getStudents  = async (req, res) =>{
        try {

         const allStudents =  await Student.find()
         res.status(200).json(allStudents)

        } catch (error) {
        res.status(404).json({message: error.message})
        }

}

const createStudent  = async(req, res) =>{

        const student = req.body
        const  newStudent = new Student(student)

        try {
            await newStudent.save()
            res.status(201).json(newStudent)

        } catch (error) {
                res.status(409).json({message:error.message})

        }

}
const deleteStudent  = async(req, res) =>{

        const id = req.params.id

        try {
            await Student.findByIdAndRemove(id).exec()
            res.send("successfully deleted")

        } catch (error) {
            console.log(error)

        }

}

module.exports = {
    getStudents,
    createStudent,
    deleteStudent
}