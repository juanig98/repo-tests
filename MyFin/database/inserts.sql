DROP DATABASE myfin;
CREATE DATABASE myfin;


/* USUARIO */
INSERT INTO `myfin`.`users` (`username`,`password`,`status`,`updated_at`,`created_at`)
VALUES ('jgalarza', '$2b$10$ITnKR5tQI.YkulUxf5F5W.mvPxP8nP0AJFymqe4bwBVqLxOQDqXTe', 'AC', current_timestamp(), current_timestamp());
