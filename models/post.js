import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
                type: String,
                required: true,
                default:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
            },
    username: {
                    type: String,
                    required: true
                },
    categories: {
                    type: Array,
                    required: false,
                },
    createdDate: {
                    type: Date
                }
});


const post = mongoose.model('post', PostSchema);

export default post;
