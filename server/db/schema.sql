-- Disable FK checks for clean rebuild
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Passwords;
DROP TABLE IF EXISTS Client;
DROP TABLE IF EXISTS Manager;

SET FOREIGN_KEY_CHECKS = 1;

-- =========================
-- Manager
-- =========================
CREATE TABLE Manager (
  UserId INT PRIMARY KEY AUTO_INCREMENT,
  UserName VARCHAR(255) NOT NULL UNIQUE,
  UserEmail VARCHAR(255) NOT NULL UNIQUE,
  UserRole VARCHAR(255) NOT NULL,
  UserActive BOOLEAN NOT NULL DEFAULT TRUE,
  OrgId VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_manager_orgid (OrgId)
) ENGINE=InnoDB;

-- =========================
-- Client
-- =========================
CREATE TABLE Client (
  ClientId INT PRIMARY KEY AUTO_INCREMENT,
  ClientUsername VARCHAR(255) NOT NULL UNIQUE,
  ClientCompany VARCHAR(255) NOT NULL,
  ClientEmail VARCHAR(255) NOT NULL,
  ClientNotes VARCHAR(255),
  ManagerId INT NULL,                  -- allow manager deletion
  OrgId VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_client_manager
    FOREIGN KEY (ManagerId)
    REFERENCES Manager(UserId)
    ON DELETE SET NULL                -- ❌ manager delete does NOT wipe clients
) ENGINE=InnoDB;

-- =========================
-- Passwords
-- =========================
CREATE TABLE Passwords (
  PassId INT PRIMARY KEY AUTO_INCREMENT,
  PassSite VARCHAR(255) NOT NULL,
  PassUsername VARCHAR(255) NOT NULL,
  PassHTML VARCHAR(1024) NOT NULL,
  PassPW VARCHAR(255) NOT NULL,
  ClientId INT NOT NULL,
  OrgId VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_passwords_client
    FOREIGN KEY (ClientId)
    REFERENCES Client(ClientId)
    ON DELETE CASCADE                 -- ✅ client delete wipes passwords
) ENGINE=InnoDB;
