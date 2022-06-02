const fs = require('fs')
const path = require('path')

//Get Json file with fs system
const student_json = fs.readFileSync(path.join(__dirname, '../data/student.json'))
let student_obj = JSON.parse(student_json)

//Get Id from Json file 

const getSingleId = ()=>{
    if(student_obj.length>0 ){
     return student_obj[student_obj.length - 1].id + 1
    }else{
        return 1
    }
    
}



//all data get
const getAllData = (req, res) => {

    if(student_obj.length>0){
    res.status(200).json(student_obj)
    }else{
      res.status(404).json({
          message:'Data Not Found'
      })
    }

    
};
//single data get 
const getAllSingleData = (req, res) => {
    
    const id = req.params.id
    if (student_obj.some(data => data.id == id)){
    res.status(200).json(student_obj.find(data => data.id == id))
    }else{
      res.status(404).json({
          message:'Data Not Found'
      })
    }
    
      
};

// data created
const getCreateData = (req, res) => {
  const {name,age,skill}=req.body

  if(name!='' || age !='' || skill!=''){
     student_obj.push({
         id: getSingleId(),
         name: name,
         age: age,
         skill: skill
     })
  }else{
      res.status(406).json({
          message: "All Fields required"
      })
  }
    
 

fs.writeFileSync(path.join(__dirname, '../data/student.json'), JSON.stringify(student_obj))
    
};
//Data edited after updated
const getUpdateData = (req, res) => {
const id = req.params.id
const {name,age,skill}=req.body

if(name!="" || age != "" || skill != ""){
student_obj[student_obj.findIndex(data => data.id == id)] = {
    id: id,
    name: name,
    age: age,
    skill: skill
}
}else{
    res.status(406).json({
         message: "All Fields required"
     })
 }


fs.writeFileSync(path.join(__dirname, '../data/student.json'), JSON.stringify(student_obj))

    res.status(202).json({
        message:"Data Updated"
    })
};

// data deleted
const getDeleteData = (req, res) => {
   const id = req.params.id

   if(student_obj.some(data=> data.id==id)){
        const data_updated = student_obj.filter(data => data.id != id)

        fs.writeFileSync(path.join(__dirname, '../data/student.json'), JSON.stringify(data_updated))
        res.status(202).json({
            message: 'Data Deleted'
        })
   }else{
       res.status(404).json({
           message: " Data Not Found"
       })
   }
  
}

module.exports={
    getAllData,
    getAllSingleData,
    getCreateData,
    getUpdateData,
    getDeleteData

}