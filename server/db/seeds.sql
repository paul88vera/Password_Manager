-- Insert Users
INSERT INTO PassUsers (UserName, UserEmail, UserLogin, UserRole, UserActive)
VALUES
('John Doe', 'john@example.com', 'johnd', 'Admin', TRUE),
('Jane Smith', 'jane@example.com', 'janes', 'Manager', TRUE),
('Mark Lee', 'mark@example.com', 'markl', 'Staff', FALSE);

-- Insert Clients
INSERT INTO PassClient (ClientUsername, ClientEmail, ClientNotes, POC)
VALUES
('ClientA', 'clientA@example.com', 'VIP Client', 1),
('ClientB', 'clientB@example.com', 'Regular Client', 2);

-- Insert Passwords
INSERT INTO Passwords (PassSite, PassUsername, PassPW, Client)
VALUES
('example.com', 'clientAuser', 'password123', 1),
('testsite.com', 'clientBuser', 'securepass', 2);