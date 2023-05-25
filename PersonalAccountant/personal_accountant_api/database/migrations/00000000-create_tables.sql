DROP TABLE transactions;
DROP TABLE origins;
DROP TABLE users;
DROP TABLE transactions_types;

CREATE TABLE transactions_types (
    id TINYINT NOT NULL PRIMARY KEY,
    description VARCHAR(50) NOT NULL,
    translate CHAR(50) NOT NULL,
    is_transfer TINYINT NOT NULL DEFAULT 0,
    is_income TINYINT NOT NULL DEFAULT 0,
    is_expense TINYINT NOT NULL DEFAULT 0,
    status CHAR(1) NOT NULL DEFAULT 'A',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    status CHAR(1) NOT NULL DEFAULT 'A',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE origins (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL,
    code CHAR(10) NOT NULL,
    status CHAR(1) NOT NULL DEFAULT 'A',
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    status CHAR(1) NOT NULL DEFAULT 'A',
    transaction_type_id TINYINT NOT NULL,
    origin_id BIGINT NOT NULL,
    destiny_id BIGINT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE origins ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE transactions ADD FOREIGN KEY (transaction_type_id) REFERENCES transactions_types(id);
ALTER TABLE transactions ADD FOREIGN KEY (origin_id) REFERENCES origins(id);
ALTER TABLE transactions ADD FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TRIGGER transactions_types_create BEFORE INSERT ON `transactions_types` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER transactions_types_update BEFORE UPDATE ON `transactions_types` FOR EACH ROW SET NEW.updated_at = NOW();
CREATE TRIGGER users_create BEFORE INSERT ON `users` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER users_update BEFORE UPDATE ON `users` FOR EACH ROW SET NEW.updated_at = NOW();
CREATE TRIGGER origins_create BEFORE INSERT ON `origins` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER origins_update BEFORE UPDATE ON `origins` FOR EACH ROW SET NEW.updated_at = NOW();
CREATE TRIGGER transactions_types_create BEFORE INSERT ON `transactions_types` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER transactions_types_update BEFORE UPDATE ON `transactions_types` FOR EACH ROW SET NEW.updated_at = NOW();