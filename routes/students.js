const express = require('express')
const router= express.Router()
const {getAllData, getAllSingleData, getCreateData, getUpdateData, getDeleteData }= require('../controllers/studentControler')

//router manage
router.route('/').get(getAllData).post(getCreateData)
router.route('/:id').get(getAllSingleData).put(getUpdateData).patch(getUpdateData).delete(getDeleteData)

module.exports = router;