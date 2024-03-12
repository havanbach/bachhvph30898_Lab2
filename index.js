//import thư viện
const express = require('express');
const mongoese = require('mongoose');
//tạo đói tượng mới cho ẽpress
const app = express();
app.set('view engine','ejs');
//kết nối với csdl mongodb
mongoese.connect('mongodb+srv://bachhvph30898:havanbach0112@pro3.3xn7d2b.mongodb.net/?retryWrites=true&w=majority&appName=PRO3',
   {
    useNewUrlParser:true,
    useunifiedTopology:true
}).then(()=>{
    console.log("Kết nối thành công với mongodb");
}).catch((err)=>{
    console.error("lỗi: ",err);
});
//truy vấn csdl
//chọn csdl để thao tác
const db1 = mongoese.connection.useDb('db1');
//định nghĩa model cho bảng dữ liệu
const SinhVienSchema = new mongoese.Schema({
    masv:String,
    tensv:String
});
//ánh xạ model vào bảng dữ liệu
const SinhVien = db1.model('sinhvien',SinhVienSchema);
//tạo link để triệu gọi trên trình duyệt(API)
app.get('/',async(req,res)=>{
    try {
        const sinhvien = await SinhVien.find();//đọc dữ liệu từ bảng sinh viên
        if(sinhvien.length>0){//nếu có tồn tại dữ liệu
            //res.json(sinhvien);//API trả về kết quả 
            res.render('student',{sinhvien:sinhvien});
        }else{
            res.status(404).json({error:'Không có sinh viên'})
        }
    } catch (error) {
        console.error("Lỗi đọc dữ liệu: " ,error);
        res.status(500).json({error:"Đọc dữ liệu lỗi"});
    }
})
//Khởi chạy máy chủ
const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("Server đang chạy ở cổng 5000");
});
module.exports=app;


