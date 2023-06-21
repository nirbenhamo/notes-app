let controler_name = "note";
let object_name = "Note";
let objects_name = "notes";

let Model = require(`../models/${object_name}.model`);


module.exports = {

    add: async (req,res) => {

        try {

            // gettind values from the body request
            const {
                content,time,date
            } = req.body;
    

            // creating new model using the values from req.body
            const new_model = new Model({
                content,time,date
    
            });

            // actual saving
            await new_model.save();

            // return success message
            return res.status(200).json({
                success:true,
                message:`success to add new ${controler_name}`
            })
            
        } catch (error) {
            return res.status(500).json({
                message:`error in add ${controler_name}`,
                error: error.message
            })
        }


    },

    getAll: async (req,res) => {


        try {

            const models = await Model.find();

            return res.status(200).json({
                success:true,
                message:`success to find all ${objects_name}`,
                [objects_name]:models
            })
            
        } catch (error) {
            return res.status(500).json({
                message:`error in get all ${objects_name}`,
                error: error.message
            })
        }
    },

    getById: async (req,res)=>{

        try {

            const models = await Model.findById(req.params.id);

            return res.status(200).json({
                success:true,
                message:`success to find ${controler_name} by id`,
                [objects_name]:models
            })
            
        } catch (error) {
            return res.status(500).json({
                message:`error in find ${controler_name} by id}`,
                error: error.message
            })
        }
    },

    updateById: async (req,res) =>{


        try {

            const{_id} = req.params;
            const {
                content,
                time,
                date}= req.body;

            await Model.findByIdAndUpdate(_id,{
                content:content||this.content,
                time:time || this.time,
                date:date || this.date
            });

            return res.status(200).json({
                success:true,
                message:`success to update ${controler_name} by id`
            })
            
        } catch (error) {
            return res.status(500).json({
                message:`error in update ${controler_name} by id`,
                error: error.message
            })
        }
    },

    deleteById : async (req,res)=> {


        try {


            const id = req.params._id;

            await Model.findByIdAndDelete(id);

            return res.status(200).json({
                success:true,
                message:`success to delete ${controler_name} by id`
            })
            
        } catch (error) {
            return res.status(500).json({
                message:`error in delete ${controler_name} by id`,
                error: error.message
            })
        }
    }
}