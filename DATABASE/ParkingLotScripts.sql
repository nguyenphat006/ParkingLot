-- Kiểm tra và tạo cơ sở dữ liệu nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ParkingLot')
BEGIN
    CREATE DATABASE ParkingLot;
END
GO

-- Sử dụng cơ sở dữ liệu ParkingLot
USE ParkingLot;
GO

-- Tạo bảng không có khóa ngoại trước
CREATE TABLE Plate (
    Id VARCHAR(256) PRIMARY KEY,
    PlateType NVARCHAR(256),
    PlateNumber VARCHAR(256),
    CreateBy NVARCHAR(256),
    CreateDate DATETIME,
    UpdateBy NVARCHAR(256),
    UpdateDate DATETIME,
    IsActive BIT,
    IsDeleted BIT
);

CREATE TABLE Parking (
    Id VARCHAR(256) PRIMARY KEY,
    ParkingCode VARCHAR(MAX),
    Name NVARCHAR(256),
    ZipCode INT,
    Image VARCHAR(MAX),
    CreateBy NVARCHAR(256),
    CreateDate DATETIME,
    UpdateBy NVARCHAR(256),
    UpdateDate DATETIME,
    IsActive BIT,
    IsDeleted BIT
);

-- Tạo bảng có khóa ngoại phụ thuộc vào bảng Plate và Parking
CREATE TABLE Slot (
    Id VARCHAR(256) PRIMARY KEY,
    ParkingId VARCHAR(256) FOREIGN KEY REFERENCES Parking(Id),
    SlotCode VARCHAR(MAX),
    CreateBy NVARCHAR(256),
    CreateDate DATETIME,
    UpdateBy NVARCHAR(256),
    UpdateDate DATETIME,
    IsActive BIT,
    IsDeleted BIT
);

-- Tạo các bảng phụ thuộc vào bảng Ticket và Slot
CREATE TABLE Ticket (
    Id VARCHAR(256) PRIMARY KEY,
    ParkingId VARCHAR(256) FOREIGN KEY REFERENCES Parking(Id),
    SlotId VARCHAR(256) FOREIGN KEY REFERENCES Slot(Id),
    StartDate DATETIME,
    EndDate DATETIME,
    CreateBy NVARCHAR(256),
    CreateDate DATETIME,
    UpdateBy NVARCHAR(256),
    UpdateDate DATETIME,
    IsActive BIT,
    IsDeleted BIT
);

-- Tạo các bảng phụ thuộc vào bảng Ticket, Slot, và Plate
CREATE TABLE TicketSlot (
    Id VARCHAR(256) PRIMARY KEY,
    TicketId VARCHAR(256) FOREIGN KEY REFERENCES Ticket(Id),
    SlotId VARCHAR(256) FOREIGN KEY REFERENCES Slot(Id),
    CreateBy NVARCHAR(256),
    CreateDate DATETIME,
    UpdateBy NVARCHAR(256),
    UpdateDate DATETIME,
    IsActive BIT,
    IsDeleted BIT
);

CREATE TABLE SlotParking (
    Id VARCHAR(256) PRIMARY KEY,
    ParkingId VARCHAR(256) FOREIGN KEY REFERENCES Parking(Id),
    SlotId VARCHAR(256) FOREIGN KEY REFERENCES Slot(Id),
    CreateBy NVARCHAR(256),
    CreateDate DATETIME,
    UpdateBy NVARCHAR(256),
    UpdateDate DATETIME,
    IsActive BIT,
    IsDeleted BIT
);

CREATE TABLE UserTicket (
    Id VARCHAR(256) PRIMARY KEY,
    UserId VARCHAR(256),
    TicketId VARCHAR(256) FOREIGN KEY REFERENCES Ticket(Id),
    CreateBy NVARCHAR(256),
    CreateDate DATETIME,
    UpdateBy NVARCHAR(256),
    UpdateDate DATETIME,
    IsActive BIT,
    IsDeleted BIT
);

CREATE TABLE HistoryTicket (
    Id VARCHAR(256) PRIMARY KEY,
    TicketId VARCHAR(256) FOREIGN KEY REFERENCES Ticket(Id),
    ActionTime DATETIME,
    CreateBy NVARCHAR(256),
    CreateDate DATETIME,
    UpdateBy NVARCHAR(256),
    UpdateDate DATETIME,
    IsActive BIT,
    IsDeleted BIT
);

CREATE TABLE PlateUser (
    Id VARCHAR(256) PRIMARY KEY,
    UserId VARCHAR(256),
    PlateId VARCHAR(256) FOREIGN KEY REFERENCES Plate(Id),
    CreateBy NVARCHAR(256),
    CreateDate DATETIME,
    UpdateBy NVARCHAR(256),
    UpdateDate DATETIME,
    IsActive BIT,
    IsDeleted BIT
);
