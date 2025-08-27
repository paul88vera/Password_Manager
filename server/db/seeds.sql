-- Seed Users
INSERT INTO PassUsers (UserName, UserEmail, UserLogin, UserRole, UserActive)
VALUES
('Alice Smith', 'alice@example.com', 'alice123', 'Admin', TRUE),
('Bob Johnson', 'bob@example.com', 'bobbyJ', 'Manager', TRUE),
('Carol White', 'carol@example.com', 'carolW', 'Staff', FALSE);

-- Seed Clients
INSERT INTO PassClient (ClientUsername, ClientEmail, POC, ClientNotes)
VALUES
('client_one', 'client1@example.com', 1, 'No Notes'),
('client_two', 'client2@example.com', 2, ''),
('client_three', 'client3@example.com', 1, '');