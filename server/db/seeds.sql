-- Insert Users
INSERT INTO PassUsers (UserName, UserEmail, UserLogin, UserRole, UserActive)
VALUES
('John Doe', 'john@example.com', 'johnd', 'Admin', TRUE),
('Jane Smith', 'jane@example.com', 'janes', 'Manager', TRUE),
('Mark Lee', 'mark@example.com', 'markl', 'Staff', FALSE);

-- Insert Clients
INSERT INTO PassClient (ClientUsername, ClientCompany, ClientEmail, ClientNotes, POC)
VALUES
('ClientA', 'Arkham Asylum', 'clientA@example.com', 'VIP Client', 1),
('ClientB', 'Consultin Group', 'clientB@example.com', 'Regular Client', 2);

-- Insert Passwords
INSERT INTO Passwords (PassSite, PassUsername, PassPW, PassHTML, Client)
VALUES
('Example', 'clientAuser', 'password123', 'example.com', 1),
('Testsite', 'clientBuser', 'securepass', 'testsite.com', 2);