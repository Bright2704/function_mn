const mongoose = require('mongoose'); // Import mongoose

const MarkdownSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#FFF9C4', // กำหนดสีพื้นฐาน
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Markdown', MarkdownSchema);
