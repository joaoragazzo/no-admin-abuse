-- V2__insert_base_user.sql
-- Insert a base user into the user table
-- This user is the owner of the initial network and must have admin role

INSERT INTO user 
    (id, 
    steam_id, 
    username, 
    avatar_url, 
    accepted_eula, 
    accepted_eula_at, 
    last_login_at, 
    created_at, 
    network_id) VALUES
  (
    UNHEX('81C12D6E997744AFA17CC8EF6A764C4E'), 
    '76561198118616961', 
    '0x6a70', 
    'https://avatars.steamstatic.com/bab2eaea37e9d6b718dd82f388ea9b9d84ad2b2f_full.jpg', 
    1, 
    '2025-01-01 00:00:00', 
    '2025-01-01 00:00:00', 
    '2025-01-01 00:00:00', 
    NULL
);


INSERT INTO user_roles (user_id, roles) VALUES
  (UNHEX('81C12D6E997744AFA17CC8EF6A764C4E'), 'ROOT');