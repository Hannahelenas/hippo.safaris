DROP TABLE IF EXISTS Safaris;
CREATE TABLE Safaris (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    country TEXT NOT NULL
);

INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Ultimate Big Five Safari', 'Embark on a classic safari adventure in the heart of Kruger Park. Witness the breathtaking landscapes and diverse wildlife of South Africa while staying in bush camps and exploring the wilderness with experienced guides.', 1000, 'https://cdn.pixabay.com/photo/2017/10/02/08/45/zebra-2808196_1280.jpg', 'Classic', 'South Africa');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Luxury Wilderness Retreat', 'Indulge in luxury with our premium safari package in Kruger Park. Immerse yourself in the beauty of the African bush while enjoying exclusive accommodations, gourmet dining experiences, and personalized wildlife encounters.', 10000, 'https://cdn.pixabay.com/photo/2021/09/28/16/43/lion-6665048_1280.jpg', 'Premium', 'South Africa');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Family Safari in Kruger Park', 'Experience the adventure of a lifetime with our family safari in Kruger Park. Get up close and personal with the Big Five while enjoying luxurious accommodations and guided tours suitable for all ages.', 1500, 'https://cdn.pixabay.com/photo/2023/01/09/22/08/giraffes-7708392_1280.jpg', 'Family', 'South Africa');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Classic Serengeti Safari', 'Embark on a adventure of a lifetime with our safari in Serengeti. Witness the Great Migration, spot the Big Five, and enjoy family-friendly accommodations and activities in the heart of Tanzanias most famous national park.', 5000, 'https://images.unsplash.com/photo-1583587067350-2c49115673c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Classic', 'Tanzania');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Best of Tanzania Experience', 'Indulge in luxury with our premium safari in the Serengeti. Stay in luxurious tented camps, enjoy exclusive wildlife experiences, and savor gourmet cuisine prepared by private chefs in the heart of the African bush.', 15000, 'https://cdn.pixabay.com/photo/2022/06/22/10/47/cheetah-7277664_1280.jpg', 'Premium', 'Tanzania');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Serengeti Family Adventure', 'Experience the adventure of a lifetime with our family safari in. Get up close and personal with the Big Five while enjoying luxurious accommodations and guided tours suitable for all ages.', 1500, 'https://cdn.pixabay.com/photo/2021/12/24/18/40/animals-6891646_1280.jpg', 'Family', 'Tanzania');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Classic Safari in Masai Mara', 'Embark on a classic safari adventure in the iconic Masai Mara. Witness the Great Migration, explore vast savannahs teeming with wildlife, and immerse yourself in the rich culture of the Maasai people.', 2000, 'https://images.pexels.com/photos/5044029/pexels-photo-5044029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Classic', 'Kenya');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Masai Mara Luxury', 'Experience the epitome of luxury with our premium safari in Masai Mara. Stay in exclusive safari camps, enjoy private game drives with expert guides, and savor gourmet cuisine under the African stars.', 7000, 'https://cdn.pixabay.com/photo/2022/11/19/20/38/africa-7602960_1280.jpg', 'Premium', 'Kenya');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Hakuna Matata Family Safari', 'Create unforgettable memories with our family safari in Masai Mara. Discover the magic of Kenyas most famous national reserve as you embark on game drives, guided walks, and cultural experiences suitable for the whole family.', 3000, 'https://cdn.pixabay.com/photo/2015/02/05/17/11/zebra-625153_1280.jpg', 'Family', 'Kenya');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Okavango Delta Wonders', 'Embark on a classic safari in the breathtaking Okavango Delta. Witness the seasonal floods, explore diverse habitats teeming with wildlife, and stay in comfortable lodges nestled in the heart of Botswanas wilderness.', 3000, 'https://images.unsplash.com/photo-1500848921107-0daf99da357b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Classic', 'Botswana');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Okavango Luxury Safari', 'Immerse yourself in luxury with our premium safari in the Okavango Delta. Stay in exclusive safari camps, enjoy private wildlife sightings, and experience unparalleled comfort and service in one of Africas most pristine wilderness areas.', 8000, 'https://cdn.pixabay.com/photo/2019/07/02/10/25/giraffe-4312090_1280.jpg', 'Premium', 'Botswana');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Okavango Family Adventure', 'Experience the magic of the Okavango Delta on a family safari adventure. Explore the waterways by traditional mokoro canoe, spot unique wildlife in pristine wilderness areas, and enjoy family-friendly accommodations under the African skies.', 6000, 'https://cdn.pixabay.com/photo/2017/05/04/12/43/zebra-2283914_1280.jpg', 'Family', 'Botswana');

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email TEXT NOT NULL,
    last_name TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    total_cost REAL NOT NULL
);

DROP TABLE IF EXISTS order_details;
CREATE TABLE order_details (
    order_id INTEGER,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL
);
