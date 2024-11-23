const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const Markdown = require('./models/Markdown');

// สร้าง Express App
const app = express();

// เชื่อมต่อ MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/api/create', async (req, res) => {
    const { content, color } = req.body;
  
    try {
      const newAnnouncement = new Markdown({
        content: content || 'ประกาศใหม่',
        color: color || '#FFF9C4', // ใช้สีพื้นฐานถ้าไม่ได้ส่งมา
      });
      await newAnnouncement.save();
      res.status(201).json(newAnnouncement);
    } catch (error) {
      console.error('Error creating announcement:', error);
      res.status(500).json({ error: 'Failed to create announcement' });
    }
  });
  
  
  // อัปเดตประกาศ
  app.post('/api/update/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
  
    try {
      await Markdown.findByIdAndUpdate(id, { content });
      res.status(200).json({ message: 'Announcement updated successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update announcement' });
    }
  });
  
  // ดึงประกาศทั้งหมด
  app.get('/api/get', async (req, res) => {
    try {
      const announcements = await Markdown.find();
      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch announcements' });
    }
  });

  app.delete('/api/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await Markdown.findByIdAndDelete(id); // ลบเอกสารใน MongoDB ตาม ID
      if (!result) {
        return res.status(404).json({ error: 'Announcement not found' }); // กรณีไม่พบเอกสาร
      }
      res.status(200).json({ message: 'Announcement deleted successfully!' });
    } catch (error) {
      console.error('Error deleting announcement:', error); // แสดง error ใน console
      res.status(500).json({ error: 'Failed to delete announcement' }); // ส่ง error กลับไปยัง client
    }
  });
  
  

// เริ่มเซิร์ฟเวอร์
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
