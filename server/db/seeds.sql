-- Insert Orgs (using UUID_TO_BIN for BINARY(16) storage)
SET @orgId1 = UUID_TO_BIN(UUID());
SET @orgId2 = UUID_TO_BIN(UUID());
SET @orgId3 = UUID_TO_BIN(UUID());


INSERT INTO Org (OrgId, OrgName) VALUES
  (@orgId1, 'TechNova Solutions'),
  (@orgId2, 'BlueSky Analytics');

-- Insert Manager (referencing Org by name via subselect)
INSERT INTO Manager (UserId, UserName, UserEmail, UserRole, UserActive, OrgId)
VALUES
  (1, 'Alice Johnson', 'alice@technova.com', 'Admin', TRUE, @orgId1),
  (2, 'Bob Smith', 'bob@technova.com', 'Manager', TRUE, @orgId2),
  (3, 'Evelyn Clark', 'evelyn@bluesky.com', 'Admin', TRUE, @orgId1);

-- Insert Client
INSERT INTO Client (ClientId, ClientUsername, ClientCompany, ClientEmail, ClientNotes, Manager, OrgId)
VALUES
  (1,'client_alpha', 'Alpha Industries', 'alpha@alpha.com', 'Prefers phone contact.', 1, @orgId1),
  (2,'client_beta', 'Beta Corp', 'beta@beta.com', 'Weekly reporting.',
     2, @orgId2),
  (3, 'client_gamma', 'Gamma LLC', 'gamma@gamma.com', 'Quarterly check-ins.',
     3, @orgId1);

-- Insert Passwords
INSERT INTO Passwords (PassId, PassSite, PassUsername, PassHTML, PassPW, Client, OrgId)
VALUES
  (1, 'https://dashboard.alpha.com', 'alpha_admin', '<html>alpha login</html>', 'alpha123!', 1, @orgId1),
  (2, 'https://portal.beta.com', 'beta_user', '<html>beta login</html>', 'beta456!', 2, @orgId2),
  (3, 'https://data.gamma.com', 'gamma_login', '<html>gamma login</html>', 'gamma789!', 3, @orgId1);

