USE [ParkingLot]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Parking]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Parking](
	[Id] [uniqueidentifier] NOT NULL,
	[ParkingCode] [varchar](256) NULL,
	[Name] [nvarchar](256) NULL,
	[ZipCode] [int] NULL,
	[Image] [varchar](max) NULL,
	[Latitude] [decimal](10, 8) NULL,
	[Longitude] [decimal](11, 8) NULL,
	[Address] [nvarchar](500) NULL,
	[Ward] [nvarchar](120) NULL,
	[District] [nvarchar](120) NULL,
	[Province] [nvarchar](120) NULL,
	[TotalSlots] [int] NULL,
	[Description] [nvarchar](500) NULL,
	[OpenTime] [datetime] NULL,
	[CloseTime] [datetime] NULL,
	[CreateDate] [datetime] NULL,
	[CreateBy] [nvarchar](256) NULL,
	[UpdateDate] [datetime] NULL,
	[UpdateBy] [nvarchar](256) NULL,
	[DeleteDate] [datetime] NULL,
	[DeleteBy] [nvarchar](256) NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_Parking] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ParkingSlot]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ParkingSlot](
	[Id] [uniqueidentifier] NOT NULL,
	[ParkingId] [uniqueidentifier] NULL,
	[SlotId] [uniqueidentifier] NULL,
	[CreateDate] [datetime] NULL,
	[CreateBy] [nvarchar](256) NULL,
	[UpdateDate] [datetime] NULL,
	[UpdateBy] [nvarchar](256) NULL,
	[DeleteDate] [datetime] NULL,
	[DeleteBy] [nvarchar](256) NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_ParkingSlot] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Price] [float] NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Slot]    Script Date: 12/6/2024 10:37:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Slot](
	[Id] [uniqueidentifier] NOT NULL,
	[ParkingId] [uniqueidentifier] NULL,
	[SlotCode] [varchar](256) NULL,
	[Status] [nvarchar](120) NULL,
	[CreateDate] [datetime] NULL,
	[CreateBy] [nvarchar](256) NULL,
	[UpdateDate] [datetime] NULL,
	[UpdateBy] [nvarchar](256) NULL,
	[DeleteDate] [datetime] NULL,
	[DeleteBy] [nvarchar](256) NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_Slot] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'240c76f5-a213-4027-a1dc-66f13353c5d5', N'eric@gmail.com', N'ERIC@GMAIL.COM', N'eric@gmail.com', N'ERIC@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEAfP/aaTW6gymPv9dHDy06top25yWVdCU4kG1Gjj1BHUNsHzD4uP9Upo5vvjRS43sA==', N'AHUHS33ZPMH6PGEJG4XCPYAU4UZER4W6', N'79933cb8-826e-4494-b779-9710cb59d6cc', NULL, 0, 0, NULL, 1, 0)
GO
INSERT [dbo].[Parking] ([Id], [ParkingCode], [Name], [ZipCode], [Image], [Latitude], [Longitude], [Address], [Ward], [District], [Province], [TotalSlots], [Description], [OpenTime], [CloseTime], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [DeleteDate], [DeleteBy], [IsActive], [IsDeleted]) VALUES (N'9ce09a02-6ee3-4fee-887b-2d6fcd1cb18e', N'', N'', NULL, N'demo2.jpg', NULL, NULL, N'', N'', N'', N'', NULL, N'', NULL, NULL, CAST(N'2024-12-03T23:51:45.493' AS DateTime), N'Nguyen Phat', CAST(N'2024-12-03T23:51:45.493' AS DateTime), N'Nguyen Phat', CAST(N'2024-12-03T23:59:58.627' AS DateTime), N'Nguyen Phat', 1, 1)
INSERT [dbo].[Parking] ([Id], [ParkingCode], [Name], [ZipCode], [Image], [Latitude], [Longitude], [Address], [Ward], [District], [Province], [TotalSlots], [Description], [OpenTime], [CloseTime], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [DeleteDate], [DeleteBy], [IsActive], [IsDeleted]) VALUES (N'54a73303-541d-4cf7-9024-35f2004632d3', N'', N'', NULL, N'demo1.jpg', NULL, NULL, N'', N'', N'', N'', NULL, N'', NULL, NULL, CAST(N'2024-12-04T07:54:27.590' AS DateTime), N'Nguyen Phat', CAST(N'2024-12-04T07:54:27.590' AS DateTime), N'Nguyen Phat', CAST(N'2024-12-04T07:54:31.853' AS DateTime), N'Nguyen Phat', 1, 1)
INSERT [dbo].[Parking] ([Id], [ParkingCode], [Name], [ZipCode], [Image], [Latitude], [Longitude], [Address], [Ward], [District], [Province], [TotalSlots], [Description], [OpenTime], [CloseTime], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [DeleteDate], [DeleteBy], [IsActive], [IsDeleted]) VALUES (N'f3a64e32-1468-4ef8-bb2c-3e18e362c700', N'ParkingCode', N'Bãi đậu xe nhất thời', 5, N'demo1.jpg', CAST(10.79968300 AS Decimal(10, 8)), CAST(106.95141600 AS Decimal(11, 8)), N'Hẻm 639 Trường Chinh, Long Đức, Long Thành, Đồng Nai', N'Long Đức', N'Long Thành', N'Đồng Nai', 234, N'', CAST(N'1970-01-01T16:39:00.000' AS DateTime), CAST(N'1969-12-31T20:40:00.000' AS DateTime), CAST(N'2024-12-03T23:40:17.963' AS DateTime), N'Nguyen Phat', CAST(N'2024-12-03T23:40:17.963' AS DateTime), N'Nguyen Phat', NULL, NULL, 1, 0)
INSERT [dbo].[Parking] ([Id], [ParkingCode], [Name], [ZipCode], [Image], [Latitude], [Longitude], [Address], [Ward], [District], [Province], [TotalSlots], [Description], [OpenTime], [CloseTime], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [DeleteDate], [DeleteBy], [IsActive], [IsDeleted]) VALUES (N'74e8246a-9211-49a0-be35-8163d6ce871d', N'', N'', NULL, N'demo1.jpg', NULL, NULL, N'', N'', N'', N'', NULL, N'', NULL, NULL, CAST(N'2024-12-04T08:28:11.403' AS DateTime), N'Nguyen Phat', CAST(N'2024-12-04T08:28:11.403' AS DateTime), N'Nguyen Phat', CAST(N'2024-12-04T08:28:15.470' AS DateTime), N'Nguyen Phat', 1, 1)
INSERT [dbo].[Parking] ([Id], [ParkingCode], [Name], [ZipCode], [Image], [Latitude], [Longitude], [Address], [Ward], [District], [Province], [TotalSlots], [Description], [OpenTime], [CloseTime], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [DeleteDate], [DeleteBy], [IsActive], [IsDeleted]) VALUES (N'58c50252-4f75-455c-9d04-8521a098de0f', N'', N'', NULL, N'demo1.jpg', NULL, NULL, N'', N'', N'', N'', NULL, N'', NULL, NULL, CAST(N'2024-12-03T23:59:50.177' AS DateTime), N'Nguyen Phat', CAST(N'2024-12-03T23:59:50.177' AS DateTime), N'Nguyen Phat', CAST(N'2024-12-03T23:59:56.063' AS DateTime), N'Nguyen Phat', 1, 1)
GO
INSERT [dbo].[Products] ([Id], [Name], [Price], [Quantity]) VALUES (N'c0ea73a4-80ed-4fc0-922e-8deb70d1e607', N'Dép lê 23222 á;ljdfasijd', 1, 2)
INSERT [dbo].[Products] ([Id], [Name], [Price], [Quantity]) VALUES (N'4e650104-7c53-4da6-ade2-cc6ae8141c7d', N'Sản phẩm DEmo', 100000, 10)
INSERT [dbo].[Products] ([Id], [Name], [Price], [Quantity]) VALUES (N'68d54dea-4cb5-408b-ace3-d691cef9f86f', N'DEMO2', 2, 1)
INSERT [dbo].[Products] ([Id], [Name], [Price], [Quantity]) VALUES (N'6a26726d-74b6-489e-a488-f19087da9fef', N'Dép lê 23', 1, 2)
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
