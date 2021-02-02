const Schema = new mongoose.Schema({ name: 'string', size: 'string' });

var PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  likes: [
    { user: { type: Schema.Types.ObjectId, ref: 'User', required: true } },
  ],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String },
      avatar: { type: String },
      text: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
});

//Export model
module.exports = mongoose.model('Post', PostSchema);
