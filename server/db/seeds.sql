-- -- Insert Orgs (using UUID_TO_BIN for BINARY(16) storage)
-- INSERT INTO Org (OrgId, OrgName) VALUES
--   ('org_34S0T5dxNHO8wxHV1SA6P2nekIv', 'Transcendental');

-- -- Insert Manager (referencing Org by name via subselect)
-- INSERT INTO Manager (UserId, UserName, UserEmail, UserRole, UserActive, OrgId)
-- VALUES
--   (1, 'Nicole', 'nt@transcendentalagency.com', 'Admin', TRUE, 'org_34S0T5dxNHO8wxHV1SA6P2nekIv'),
--   (2, 'Lauren', 'la@transcendentalagency.com', 'Manager', TRUE, 'org_34S0T5dxNHO8wxHV1SA6P2nekIv'),
--   (3, 'Bri', 'bf@transcendentalagency.com', 'Manager', TRUE, 'org_34S0T5dxNHO8wxHV1SA6P2nekIv');

-- -- Insert Client
-- INSERT INTO Client (ClientId, ClientUsername, ClientCompany, ClientEmail, ClientNotes, Manager, OrgId)
-- VALUES
--   (1,'client_alpha', 'Alpha Industries', 'alpha@alpha.com', 'Prefers phone contact.', 1, @orgId1),
--   (2,'client_beta', 'Beta Corp', 'beta@beta.com', 'Weekly reporting.',
--      2, @orgId2),
--   (3, 'client_gamma', 'Gamma LLC', 'gamma@gamma.com', 'Quarterly check-ins.',
--      3, @orgId1);

-- -- Insert Passwords
-- INSERT INTO Passwords (PassId, PassSite, PassUsername, PassHTML, PassPW, Client, OrgId)
-- VALUES
--   (1, 'dashboard.alpha', 'alpha_admin', 'https://profile.alpha.com', 'alpha123!', 1, @orgId1),
--   (2, 'portal.beta', 'beta_user', 'https://portal.beta.com', 'beta456!', 2, @orgId2),
--   (3, 'data.gamma', 'gamma_login', 'https://data.gamma.com', 'gamma789!', 3, @orgId1);

