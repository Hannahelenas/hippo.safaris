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

INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Ultimate Big Five Safari', 'Embark on a classic safari adventure in the heart of Kruger Park. Witness the breathtaking landscapes and diverse wildlife of South Africa while staying in bush camps and exploring the wilderness with experienced guides.', 1000, 'https://images.unsplash.com/photo-1594916105020-b28f829993b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Classic', 'South Africa');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Luxury Wilderness Retreat', 'Indulge in luxury with our premium safari package in Kruger Park. Immerse yourself in the beauty of the African bush while enjoying exclusive accommodations, gourmet dining experiences, and personalized wildlife encounters.', 10000, 'https://images.unsplash.com/photo-1564101145899-58e89297e9ec?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Premium', 'South Africa');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Family Safari in Kruger Park', 'Experience the adventure of a lifetime with our family safari in Kruger Park. Get up close and personal with the Big Five while enjoying luxurious accommodations and guided tours suitable for all ages.', 1500, 'https://images.unsplash.com/photo-1612372992697-81c95501d0d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Family', 'South Africa');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Classic Serengeti Safari', 'Embark on a adventure of a lifetime with our safari in Serengeti. Witness the Great Migration, spot the Big Five, and enjoy family-friendly accommodations and activities in the heart of Tanzanias most famous national park.', 5000, 'https://images.unsplash.com/photo-1583587067350-2c49115673c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Classic', 'Tanzania');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Best of Tanzania Experience', 'Indulge in luxury with our premium safari in the Serengeti. Stay in luxurious tented camps, enjoy exclusive wildlife experiences, and savor gourmet cuisine prepared by private chefs in the heart of the African bush.', 15000, 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?q=80&w=1777&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Premium', 'Tanzania');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Serengeti Family Adventure', 'Experience the adventure of a lifetime with our family safari in. Get up close and personal with the Big Five while enjoying luxurious accommodations and guided tours suitable for all ages.', 1500, 'https://images.unsplash.com/photo-1627895838695-b61ac80edd30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Family', 'Tanzania');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Classic Safari in Masai Mara', 'Embark on a classic safari adventure in the iconic Masai Mara. Witness the Great Migration, explore vast savannahs teeming with wildlife, and immerse yourself in the rich culture of the Maasai people.', 2000, 'https://images.unsplash.com/photo-1526226128118-9ef71fc2f34b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Classic', 'Kenya');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Masai Mara Luxury', 'Experience the epitome of luxury with our premium safari in Masai Mara. Stay in exclusive safari camps, enjoy private game drives with expert guides, and savor gourmet cuisine under the African stars.', 7000, 'https://images.unsplash.com/photo-1517185051431-f92ca046f4f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Premium', 'Kenya');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Hakuna Matata Safari', 'Create unforgettable memories with our family safari in Masai Mara. Discover the magic of Kenyas most famous national reserve as you embark on game drives, guided walks, and cultural experiences suitable for the whole family.', 3000, 'https://images.unsplash.com/photo-1586942842797-436337439959?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Family', 'Kenya');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Okavango Delta Wonders', 'Embark on a classic safari in the breathtaking Okavango Delta. Witness the seasonal floods, explore diverse habitats teeming with wildlife, and stay in comfortable lodges nestled in the heart of Botswanas wilderness.', 3000, 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Classic', 'Botswana');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Okavango Luxury Safari', 'Immerse yourself in luxury with our premium safari in the Okavango Delta. Stay in exclusive safari camps, enjoy private wildlife sightings, and experience unparalleled comfort and service in one of Africas most pristine wilderness areas.', 8000, 'https://images.unsplash.com/photo-1516628013478-ae0e71bb0069?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Premium', 'Botswana');
INSERT INTO Safaris (name, description, price, image, category, country) VALUES ('Okavango Family Adventure', 'Experience the magic of the Okavango Delta on a family safari adventure. Explore the waterways by traditional mokoro canoe, spot unique wildlife in pristine wilderness areas, and enjoy family-friendly accommodations under the African skies.', 6000, 'https://images.unsplash.com/photo-1710853195520-47d45bd06dc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Family', 'Botswana');

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
