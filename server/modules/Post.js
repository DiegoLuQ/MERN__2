import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim: true // quita el espacio del string que llegara '  my first app  ' -> 'my first app'
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        url:String,
        public_id: String
    }
})


export default mongoose.model( 'Post',PostSchema) // la tabla que se guardara en la DB