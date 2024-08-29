CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    mobile_number VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- direct copy paste nako karu 
CREATE TABLE UserProfile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    caste ENUM('Aagri','Koli') ,
    current_village_city ENUM('Virar','Arnala','Dandi'),
    current_pin_code VARCHAR(10),
    native_village_city ENUM('Virar','Arnala','Dandi'),
    first_name VARCHAR(50),
    middle_name VARCHAR(50),
    last_name VARCHAR(50),
    birthdate DATE,
    gender ENUM('Male', 'Female', 'Transgender'),
    marital_status ENUM('Married', 'Un-married', 'Divorcee'),
    occupation ENUM('Student', 'Service', 'Business', 'Entrepreneur', 'Profession'),
    working_place VARCHAR(255),
    hobbies TEXT,
    email_id VARCHAR(100),
    photo_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_numbers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) -- Assuming 'users' is your user table
);
