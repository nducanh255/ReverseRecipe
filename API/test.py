from flask import json
import requests

from api.routes.follow import follow

users = [
    {
        "username": "Dreamfood",
        "avatar_id": "1b97ef6e-d970-4939-9c79-fa3bcb1bb48b",
        "loginname": "dreamfood123",
        "password": "123456",
        "phone": "033 444 5555",
        "email": "dreamfood123@gmail.com",
        "cover_id": "3b480722-458d-45c1-8fd3-8a506ac4a79c"
    },
    {
        "username": "HANG CAN COOK",
        "avatar_id": "2560fb2f-c158-4970-bd0d-241114db5a0b",
        "loginname": "hangcancook123",
        "password": "123456",
        "phone": "033 444 5555",
        "email": "hangcancook123@gmail.com",
        "cover_id": "42f08b13-0a35-4dcb-a6d8-83b364c7ef54"
    },
    {
        "username": "huong nguyen",
        "avatar_id": "34c638f8-87f2-4241-a949-6ab84d9dbf09",
        "loginname": "huongnguyen123",
        "password": "123456",
        "phone": "033 444 5555",
        "email": "huongnguyen123@gmail.com",
        "cover_id": "4fdf7922-0a76-432f-ba1c-59fecc912976"
    },
    {
        "username": "Mèo béo",
        "avatar_id": "45bde8db-5e5d-4c3e-85a8-172313a3f2ca",
        "loginname": "meobeo123",
        "password": "123456",
        "phone": "033 444 5555",
        "email": "meobeo123@gmail.com",
        "cover_id": "5fb45de0-2b31-40d8-b130-fa056c346309"
    },
    {
        "username": "namdung",
        "avatar_id": "4ad00170-81c9-43a6-92b8-1eb01a0f6e3c",
        "loginname": "namdung123",
        "password": "123456",
        "phone": "033 444 5555",
        "email": "namdung123@gmail.com",
        "cover_id": "6e8e9af3-2f59-4e72-87e1-6f187f3444e0"
    },
    {
        "username": "ngochao",
        "avatar_id": "75bed925-67d3-4324-8906-5cf2cf9ca1c7",
        "loginname": "ngochao123",
        "password": "123456",
        "phone": "033 444 5555",
        "email": "ngochao123@gmail.com",
        "cover_id": "8a29791a-1aea-4583-a627-71aff56c9e13"
    },
    {
        "username": "Phạm Công Sơn",
        "avatar_id": "805f67b9-6545-455d-ae70-2bebd9d3be64",
        "loginname": "phamson123",
        "password": "123456",
        "phone": "033 444 5555",
        "email": "phamson123@gmail.com",
        "cover_id": "9872215b-f4d3-4052-acda-7464795635ab"
    },
    {
        "username": "Nguyễn Minh Thúy",
        "avatar_id": "a318516f-ae12-4014-9abf-3b3c88be302e",
        "loginname": "thuynguyen123",
        "password": "123456",
        "phone": "033 444 5555",
        "email": "thuynguyen123@gmail.com",
        "cover_id": "a9cc8bc5-f03b-44b7-9638-1787612d9d5d"
    },
    {
        "username": "Thượng thần",
        "avatar_id": "b0d6d712-c2f3-440c-b200-89415e6912e1",
        "loginname": "thuongthan123",
        "password": "123456",
        "phone": "033 444 5555",
        "email": "thuongthan123@gmail.com",
        "cover_id": "b0c1ef8b-1b0f-4c6b-9707-0d35a107b974"
    },
    {
        "username": "Trần Gia",
        "avatar_id": "d0de4ae5-e3ed-4cae-a6a6-e88c3c9580d6",
        "loginname": "trangia123",
        "password": "123456",
        "phone": "033 444 5555",
        "email": "trangia123@gmail.com",
        "cover_id": "caaaf15d-9839-4104-896a-179f8aa87030"
    }
]

posts = [
    {
        "created": 1638098452,
        "image_id": "0.jpg",
        "ingredients": "['mắm tôm', 'hạt nêm', 'tàu hũ', 'hành tím']",
        "instructions": "https://www.cooky.vn/cong-thuc/lau-bo-nhung-me-49807",
        "locations": "[{'name': 'Nhà Hàng Hoà Nhã', 'reviewScore': 4.5, 'numReview': 35, 'address': '49 Ng. 50 Đặng Thai Mai, Quảng An, Tây Hồ, Hà Nội', 'phoneNum': '093 959 12 86', 'lat': 21.05632351169002, 'lon': 105.81976372202094}, {'name': 'Hải sản Cô Tô (BỦN Chef)', 'reviewScore': 4.1, 'numReview': 9, 'address': '85 P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '098 925 34 76', 'lat': 21.047340291819474, 'lon': 105.81496675211619}]",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "title": "Lẩu bò nhúng mẻ",
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd"
    },
    {
        "created": 1638098452,
        "image_id": "1.jpg",
        "ingredients": "['đường']",
        "instructions": "https://www.cooky.vn/cong-thuc/mi-quang-tom-thit-trung-49623",
        "locations": "[{'name': 'Nhà Hàng Xóm Vắng 3 - Hạ Long', 'reviewScore': 4.6, 'numReview': 42, 'address': '143B P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '096 930 18 66', 'lat': 21.0495291520199, 'lon': 105.81461549630384}, {'name': 'Nhà Hàng Paris', 'reviewScore': 3.4, 'numReview': 7, 'address': ' 297 Hoàng Quốc Việt, Nghĩa Tân, Cầu Giấy, Hà Nội', 'phoneNum': '024 3836 3614', 'lat': 21.0464991463528, 'lon': 105.79675296033474}]",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "title": "Mì Quảng tôm thịt trứng",
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614"
    },
    {
        "created": 1638098452,
        "image_id": "2.jpg",
        "ingredients": "['nước', 'rau', 'hạt nêm', 'sả', 'dưa leo', 'đường', 'mayonnaise', 'sò']",
        "instructions": "https://www.cooky.vn/cong-thuc/mi-udon-thit-heo-ham-trung-ngam-51639",
        "locations": "[{'name': 'Nhà Hàng Xóm Vắng 3 - Hạ Long', 'reviewScore': 4.6, 'numReview': 42, 'address': '143B P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '096 930 18 66', 'lat': 21.0495291520199, 'lon': 105.81461549630384}, {'name': 'Nhà Hàng Paris', 'reviewScore': 3.4, 'numReview': 7, 'address': ' 297 Hoàng Quốc Việt, Nghĩa Tân, Cầu Giấy, Hà Nội', 'phoneNum': '024 3836 3614', 'lat': 21.0464991463528, 'lon': 105.79675296033474}]",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "title": "Mì Udon thịt heo hầm & trứng ngâm",
        "user_id": "7e00f0eb-bbb3-4b0b-84f9-7261c2cf0155"
    },
    {
        "created": 1638098452,
        "image_id": "3.jpg",
        "ingredients": "['dầu ăn', 'tàu hũ', 'hạt nêm', 'muối', 'lợn', 'ngò rí', 'đường', 'ớt', 'hành']",
        "instructions": "https://www.cooky.vn/cong-thuc/banh-cuon-pad-thai-33870",
        "locations": "[{'name': 'Nhà Hàng Hoà Nhã', 'reviewScore': 4.5, 'numReview': 35, 'address': '49 Ng. 50 Đặng Thai Mai, Quảng An, Tây Hồ, Hà Nội', 'phoneNum': '093 959 12 86', 'lat': 21.05632351169002, 'lon': 105.81976372202094}, {'name': 'Hải sản Cô Tô (BỦN Chef)', 'reviewScore': 4.1, 'numReview': 9, 'address': '85 P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '098 925 34 76', 'lat': 21.047340291819474, 'lon': 105.81496675211619}]",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "title": "Bánh cuốn Pad Thái",
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50"
    },
    {
        "created": 1638098452,
        "image_id": "4.jpg",
        "ingredients": "['gia vị', 'chao', 'dầu ăn', 'lợn', 'trứng', 'cá', 'dừa', 'tiêu', 'hành tím', 'dấm', 'đường', 'bột mì', 'ớt', 'nấm', 'sấu', 'tỏi']",
        "instructions": "https://www.cooky.vn/cong-thuc/ca-hoi-mang-tay-sot-cam-40146",
        "locations": "[{'name': 'Nhà Hàng Hoà Nhã', 'reviewScore': 4.5, 'numReview': 35, 'address': '49 Ng. 50 Đặng Thai Mai, Quảng An, Tây Hồ, Hà Nội', 'phoneNum': '093 959 12 86', 'lat': 21.05632351169002, 'lon': 105.81976372202094}, {'name': 'Hải sản Cô Tô (BỦN Chef)', 'reviewScore': 4.1, 'numReview': 9, 'address': '85 P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '098 925 34 76', 'lat': 21.047340291819474, 'lon': 105.81496675211619}]",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "title": "Cá hồi măng tây sốt cam",
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5"
    },
    {
        "created": 1638098452,
        "image_id": "5.jpg",
        "ingredients": "['hạt nêm', 'muối', 'ớt', 'mực', 'hành tím']",
        "instructions": "https://www.cooky.vn/cong-thuc/suon-heo-chien-sot-cam-chua-ngot-51296",
        "locations": "[{'name': 'Nhà Hàng Hoà Nhã', 'reviewScore': 4.5, 'numReview': 35, 'address': '49 Ng. 50 Đặng Thai Mai, Quảng An, Tây Hồ, Hà Nội', 'phoneNum': '093 959 12 86', 'lat': 21.05632351169002, 'lon': 105.81976372202094}, {'name': 'Hải sản Cô Tô (BỦN Chef)', 'reviewScore': 4.1, 'numReview': 9, 'address': '85 P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '098 925 34 76', 'lat': 21.047340291819474, 'lon': 105.81496675211619}]",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "title": "Sườn heo chiên sốt cam chua ngọt",
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12"
    },
    {
        "created": 1638098452,
        "image_id": "6.jpg",
        "ingredients": "['gà', 'gia vị', 'dầu ăn', 'bò', 'bột mì', 'nấm']",
        "instructions": "https://www.cooky.vn/cong-thuc/thit-ga-hap-nam-huong-24777",
        "locations": "[{'name': 'Nhà Hàng Hoà Nhã', 'reviewScore': 4.5, 'numReview': 35, 'address': '49 Ng. 50 Đặng Thai Mai, Quảng An, Tây Hồ, Hà Nội', 'phoneNum': '093 959 12 86', 'lat': 21.05632351169002, 'lon': 105.81976372202094}, {'name': 'Hải sản Cô Tô (BỦN Chef)', 'reviewScore': 4.1, 'numReview': 9, 'address': '85 P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '098 925 34 76', 'lat': 21.047340291819474, 'lon': 105.81496675211619}]",
        "post_id": "a682ec51-4210-4929-818e-bbeea04526b3",
        "title": "Thịt Gà Hấp Nấm Hương",
        "user_id": "cfeac836-6046-4590-a8e7-eb5bfccd6635"
    },
    {
        "created": 1638098452,
        "image_id": "7.jpg",
        "ingredients": "['bạc hà', 'bắp mỹ', 'sả', 'táo']",
        "instructions": "https://www.cooky.vn/cong-thuc/cach-lam-dau-hu-tu-xuyen-20427",
        "locations": "[{'name': 'Nhà Hàng Hoà Nhã', 'reviewScore': 4.5, 'numReview': 35, 'address': '49 Ng. 50 Đặng Thai Mai, Quảng An, Tây Hồ, Hà Nội', 'phoneNum': '093 959 12 86', 'lat': 21.05632351169002, 'lon': 105.81976372202094}, {'name': 'Hải sản Cô Tô (BỦN Chef)', 'reviewScore': 4.1, 'numReview': 9, 'address': '85 P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '098 925 34 76', 'lat': 21.047340291819474, 'lon': 105.81496675211619}]",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "title": "Đậu hũ Tứ Xuyên",
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c"
    },
    {
        "created": 1638098452,
        "image_id": "8.jpg",
        "ingredients": "['nước', 'rau', 'hạt nêm', 'cà chua', 'lợn', 'đường', 'hành', 'bơ', 'gừng', 'hành tím']",
        "instructions": "https://www.cooky.vn/cong-thuc/thit-bam-boc-trung-cut-sot-ca-chua-pho-mai-39881",
        "locations": "[{'name': 'Nhà Hàng Hoà Nhã', 'reviewScore': 4.5, 'numReview': 35, 'address': '49 Ng. 50 Đặng Thai Mai, Quảng An, Tây Hồ, Hà Nội', 'phoneNum': '093 959 12 86', 'lat': 21.05632351169002, 'lon': 105.81976372202094}, {'name': 'Hải sản Cô Tô (BỦN Chef)', 'reviewScore': 4.1, 'numReview': 9, 'address': '85 P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '098 925 34 76', 'lat': 21.047340291819474, 'lon': 105.81496675211619}]",
        "post_id": "e0ac328d-b25c-46bb-8950-fbfd2c629069",
        "title": "Thịt băm bọc trứng cút sốt cà chua phô mai",
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5"
    },
    {
        "created": 1638098452,
        "image_id": "9.jpg",
        "ingredients": "['dầu ăn', 'tàu hũ', 'cà chua', 'kim chi', 'mù tạt', 'ngò rí', 'bạc hà', 'đường', 'gừng', 'mực', 'sò']",
        "instructions": "https://www.cooky.vn/cong-thuc/lap-xuong-tuoi-5290",
        "locations": "[{'name': 'Nhà Hàng Xóm Vắng 3 - Hạ Long', 'reviewScore': 4.6, 'numReview': 42, 'address': '143B P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '096 930 18 66', 'lat': 21.0495291520199, 'lon': 105.81461549630384}, {'name': 'Nhà Hàng Paris', 'reviewScore': 3.4, 'numReview': 7, 'address': ' 297 Hoàng Quốc Việt, Nghĩa Tân, Cầu Giấy, Hà Nội', 'phoneNum': '024 3836 3614', 'lat': 21.0464991463528, 'lon': 105.79675296033474}]",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "title": "Lạp xưởng tươi",
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba"
    }
]

import json
likes = json.load(open(r'C:\Users\DELL\OneDrive\Máy tính\KLTN\database\likes.json', 'r'))

comments = [
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "Đường nâu là đường ntn ạ"
    },
    {
        "user_id": "cfeac836-6046-4590-a8e7-eb5bfccd6635",
        "post_id": "a682ec51-4210-4929-818e-bbeea04526b3",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "bạn cho hơi nhiều dầu đúng hông?"
    },
    {
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "Đường nâu là đường ntn ạ"
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "lưu vào để làm cho con gái iu ăn thui nào"
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "Món này chắc béo lắm"
    },
    {
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "Món này cho bao nhiêu người vậy?"
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "Ngon, dễ làm"
    },
    {
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba",
        "post_id": "a682ec51-4210-4929-818e-bbeea04526b3",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "text": "Cũng bình thường"
    },
    {
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "Có thể thay đường nho bằng đường trắng được không ad?"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "text": "Món này cho bao nhiêu người vậy?"
    },
    {
        "user_id": "7e00f0eb-bbb3-4b0b-84f9-7261c2cf0155",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "text": "Đường nâu là đường ntn ạ"
    },
    {
        "user_id": "7e00f0eb-bbb3-4b0b-84f9-7261c2cf0155",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "bạn cho hơi nhiều dầu đúng hông?"
    },
    {
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "Hayyy"
    },
    {
        "user_id": "7e00f0eb-bbb3-4b0b-84f9-7261c2cf0155",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "Ngon, dễ làm"
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "text": "Hayyy"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "Có thể thay đường nho bằng đường trắng được không ad?"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "bạn cho hơi nhiều dầu đúng hông?"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "text": "Hayyy"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "Món này cho bao nhiêu người vậy?"
    },
    {
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "Cũng bình thường"
    },
    {
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "Cũng bình thường"
    },
    {
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614",
        "post_id": "a682ec51-4210-4929-818e-bbeea04526b3",
        "text": "bạn cho hơi nhiều dầu đúng hông?"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "bạn cho hơi nhiều dầu đúng hông?"
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "text": "Có thể thay đường nho bằng đường trắng được không ad?"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "Hayyy"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "Món này cho bao nhiêu người vậy?"
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "Món này cho bao nhiêu người vậy?"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "text": "Món này cho bao nhiêu người vậy?"
    },
    {
        "user_id": "cfeac836-6046-4590-a8e7-eb5bfccd6635",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "text": "rượu trắng mình dùng loại nào vậy ạ?"
    },
    {
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "bạn cho hơi nhiều dầu đúng hông?"
    },
    {
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "Hayyy"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "rượu trắng mình dùng loại nào vậy ạ?"
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "Đường nâu là đường ntn ạ"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "Không biết khó làm k ,sẽ thử :D"
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "e0ac328d-b25c-46bb-8950-fbfd2c629069",
        "text": "Không biết khó làm k ,sẽ thử :D"
    },
    {
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "lưu vào để làm cho con gái iu ăn thui nào"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "e0ac328d-b25c-46bb-8950-fbfd2c629069",
        "text": "Không biết khó làm k ,sẽ thử :D"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "text": "Không biết khó làm k ,sẽ thử :D"
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "e0ac328d-b25c-46bb-8950-fbfd2c629069",
        "text": "rượu trắng mình dùng loại nào vậy ạ?"
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "e0ac328d-b25c-46bb-8950-fbfd2c629069",
        "text": "Đường nâu là đường ntn ạ"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "lưu vào để làm cho con gái iu ăn thui nào"
    },
    {
        "user_id": "7e00f0eb-bbb3-4b0b-84f9-7261c2cf0155",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "text": "bạn cho hơi nhiều dầu đúng hông?"
    },
    {
        "user_id": "cfeac836-6046-4590-a8e7-eb5bfccd6635",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "text": "rượu trắng mình dùng loại nào vậy ạ?"
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "Không biết khó làm k ,sẽ thử :D"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "Đường nâu là đường ntn ạ"
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "Có thể thay đường nho bằng đường trắng được không ad?"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "Không biết khó làm k ,sẽ thử :D"
    },
    {
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "Hayyy"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "Có thể thay đường nho bằng đường trắng được không ad?"
    },
    {
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "text": "Món này chắc béo lắm"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "a682ec51-4210-4929-818e-bbeea04526b3",
        "text": "lưu vào để làm cho con gái iu ăn thui nào"
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "e0ac328d-b25c-46bb-8950-fbfd2c629069",
        "text": "Hayyy"
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "Món này chắc béo lắm"
    },
    {
        "user_id": "cfeac836-6046-4590-a8e7-eb5bfccd6635",
        "post_id": "e0ac328d-b25c-46bb-8950-fbfd2c629069",
        "text": "Ngon, dễ làm"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "Có thể thay đường nho bằng đường trắng được không ad?"
    },
    {
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "Ngon, dễ làm"
    },
    {
        "user_id": "cfeac836-6046-4590-a8e7-eb5bfccd6635",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "text": "Có thể thay đường nho bằng đường trắng được không ad?"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614",
        "post_id": "d30bedb6-0ce3-4d79-92be-d7cbaaafadb9",
        "text": "rượu trắng mình dùng loại nào vậy ạ?"
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "Cũng bình thường"
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "lưu vào để làm cho con gái iu ăn thui nào"
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "text": "Món này chắc béo lắm"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "Hayyy"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "text": "rượu trắng mình dùng loại nào vậy ạ?"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "Món này chắc béo lắm"
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "a4295e03-992a-4cde-b71b-a8b406170341",
        "text": "rượu trắng mình dùng loại nào vậy ạ?"
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "Đường nâu là đường ntn ạ"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "Không biết khó làm k ,sẽ thử :D"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "text": "Hayyy"
    },
    {
        "user_id": "cfeac836-6046-4590-a8e7-eb5bfccd6635",
        "post_id": "a682ec51-4210-4929-818e-bbeea04526b3",
        "text": "bạn cho hơi nhiều dầu đúng hông?"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "text": "Món này cho bao nhiêu người vậy?"
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "Không biết khó làm k ,sẽ thử :D"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "text": "bạn cho hơi nhiều dầu đúng hông?"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "post_id": "e0ac328d-b25c-46bb-8950-fbfd2c629069",
        "text": "Món này chắc béo lắm"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "87cf563f-49b3-4cf5-a8eb-4a911a684566",
        "text": "Món này cho bao nhiêu người vậy?"
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "post_id": "22f04b8a-22f5-4cce-ab2a-04968a92f22e",
        "text": "lưu vào để làm cho con gái iu ăn thui nào"
    },
    {
        "user_id": "7e00f0eb-bbb3-4b0b-84f9-7261c2cf0155",
        "post_id": "f7207834-03d2-4b57-bfec-334f3709d4b0",
        "text": "Đã làm, ngon lắm ạ. Cảm ơn bạn đã chia sẻ ct."
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "1ef16516-5a4d-4de4-864e-b921737947e0",
        "text": "Cũng bình thường"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "text": "món này làm để qua ngày đc ko ạ? hay ngấm rồi thì ăn ngay?"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "post_id": "98a4841e-adef-4de2-bdfb-7a709d13490f",
        "text": "Không biết khó làm k ,sẽ thử :D"
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "post_id": "5fc68d1a-7803-4ba4-a96c-cff019ac60fe",
        "text": "Ngon, dễ làm"
    }
]

followers = [
    {
        "user_id": "cfeac836-6046-4590-a8e7-eb5bfccd6635",
        "following_id": "4b84f119-ffd1-4120-be40-a431b70a2614"
    },
    {
        "user_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12",
        "following_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd"
    },
    {
        "user_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c",
        "following_id": "6b43c366-3efa-4c30-9960-e51eb4771eba"
    },
    {
        "user_id": "299d7104-a1ac-40e9-b147-6381961e9c50",
        "following_id": "51a231eb-f010-4668-ba1c-b0a876da83a5"
    },
    {
        "user_id": "7e00f0eb-bbb3-4b0b-84f9-7261c2cf0155",
        "following_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5"
    },
    {
        "user_id": "c357d2ba-7f76-4e26-a0b2-3c7a8dea58f5",
        "following_id": "7e00f0eb-bbb3-4b0b-84f9-7261c2cf0155"
    },
    {
        "user_id": "51a231eb-f010-4668-ba1c-b0a876da83a5",
        "following_id": "299d7104-a1ac-40e9-b147-6381961e9c50"
    },
    {
        "user_id": "6b43c366-3efa-4c30-9960-e51eb4771eba",
        "following_id": "a8a9bd7b-80d8-451a-a166-5c0e8ef6395c"
    },
    {
        "user_id": "ea4025ec-a35c-4732-a58e-ff8c0718b3bd",
        "following_id": "863ff3e5-faf1-4cb5-aa43-c73c9edcfc12"
    },
    {
        "user_id": "4b84f119-ffd1-4120-be40-a431b70a2614",
        "following_id": "cfeac836-6046-4590-a8e7-eb5bfccd6635"
    }
]

restaurants = [
    {
        "name": "Nhà Hàng Xóm Vắng 3 - Hạ Long",
        "reviewScore": 4.6,
        "numReview": 42,
        "address": "143B P. Trích Sài, Bưởi, Tây Hồ, Hà Nội",
        "phoneNum": "096 930 18 66"
    },
    {
        "name": "Nhà Hàng Hoà Nhã",
        "reviewScore": 4.5,
        "numReview": 35,
        "address": "49 Ng. 50 Đặng Thai Mai, Quảng An, Tây Hồ, Hà Nội",
        "phoneNum": "093 959 12 86"
    },
    {
        "name": "Meat Plus Hồ Tây",
        "reviewScore": 4.6,
        "numReview": 396,
        "address": "73 P. Trích Sài, Bưởi, Tây Hồ, Hà Nội",
        "phoneNum": "098 845 73 73"
    },
    {
        "name": "Hải sản Cô Tô (BỦN Chef)",
        "reviewScore": 4.1,
        "numReview": 9,
        "address": "85 P. Trích Sài, Bưởi, Tây Hồ, Hà Nội",
        "phoneNum": "098 925 34 76"
    },
    {
        "name": "Nhà Hàng Paris",
        "reviewScore": 3.4,
        "numReview": 7,
        "address": " 297 Hoàng Quốc Việt, Nghĩa Tân, Cầu Giấy, Hà Nội",
        "phoneNum": "024 3836 3614"
    }
]

# response = requests.post('http://127.0.0.1:5000/post', json=post)

# response = requests.get('http://127.0.0.1:5000/post')

# response = requests.post('http://127.0.0.1:5000/like', json=like)

# response = requests.post('http://127.0.0.1:5000/comment', json=comment)

# response = requests.post('http://127.0.0.1:5000/follow', json=follow)

"""Insert mock data"""

# for user in users:
#     response = requests.post('http://127.0.0.1:5000/signup', json=user)
#     print(response.json())

# response = requests.post('http://127.0.0.1:5000/signin', json={'loginname': 'hangcancook123', 'password': '123456'})
# print(response.json())

for post in posts:
    response = requests.post('http://127.0.0.1:5000/post', json=post)
    print(response.json())

# response = requests.get('http://127.0.0.1:5000/user')
# print(response.json())

# for comment in comments:
#     response = requests.post('http://127.0.0.1:5000/comment', json=comment)
#     print(response.json())

# for follow in followers:
#     response = requests.post('http://127.0.0.1:5000/follow', json=follow)
#     print(response.json())

# for like in likes:
#     response = requests.post('http://127.0.0.1:5000/like', json=like)
#     print(response.json())

# print(response.json())