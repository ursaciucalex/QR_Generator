import { mongoose } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import pkg from 'validator';

const { isEmail } = pkg;

const userSchema = new mongoose.Schema({
    firstName: { type: String, minLength: 2, maxLength: 32, required: true },
    lastName: { type: String, minLength: 2, maxLength: 32, required: true },
    age:{type: String, minLength:1,maxLength:3, required:true},
    email: { type: String, validate: isEmail, message: 'Invalid email.', required: true, unique : true },
    phone: { type: String, minLength: 10,  maxLength: 13, required: true, unique: true },
    password: { type: String, required: true},
    sex: {type: String, required:true},
    lastSchool:{type: String, minLength: 2, maxLength: 100, required: true },
    loggedIn: { type: Boolean, default: false }
}, {timestamps: true});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);