-- Insert Users
INSERT INTO PassUsers (UserName, UserEmail, UserRole, UserActive)
VALUES
('Paul Vera', 'paul88vera@gmail.com', 'Admin', TRUE);

-- Insert Clients
INSERT INTO PassClient (ClientUsername, ClientCompany, ClientEmail, ClientNotes, POC)
VALUES
('ClientA', 'Arkham Asylum', 'clientA@example.com', 'VIP Client', 1),
('ClientB', 'Consultin Group', 'clientB@example.com', 'Regular Client', 1);

-- Insert Passwords
INSERT INTO Passwords (PassSite, PassUsername, PassPW, PassHTML, Client)
VALUES
('Example', 'clientAuser', 'password123', 'example.com', 1),
('Testsite', 'clientBuser', 'securepass', 'testsite.com', 1);