import mongoose from 'mongoose';

const listokSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  desc: {
    type: String,
    required: false,
    unique: false,
  },
  picture: {
    type: String,
    required: false,
    unique: false,
  },
  days: {
    type: String,
    required: true,
    unique: false,
  },
  createdBy: {
    type: String,
    required: true,
    unique: false,
  },
  createdByName: {
    type: String,
    required: true,
    unique: false,
  },
  createdOn: {
    type: String,
    required: true,
    unique: false,
  },
});

const Listok = mongoose.model('Listok', listokSchema);
export default Listok;
