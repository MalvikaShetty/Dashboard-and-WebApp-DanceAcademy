IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230112174353_first')
BEGIN
    CREATE TABLE [progdays] (
        [PDId] int NOT NULL IDENTITY,
        [ProgramName] nvarchar(max) NOT NULL,
        [Day] nvarchar(max) NOT NULL,
        [StartTime] nvarchar(max) NOT NULL,
        [EndTime] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_progdays] PRIMARY KEY ([PDId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230112174353_first')
BEGIN
    CREATE TABLE [programs] (
        [ProgramId] int NOT NULL IDENTITY,
        [StyleId] int NOT NULL,
        [ProgramName] nvarchar(max) NOT NULL,
        [InstructorName] nvarchar(max) NOT NULL,
        [StartDate] datetime2 NOT NULL,
        [EndDate] datetime2 NOT NULL,
        [Fees] int NOT NULL,
        CONSTRAINT [PK_programs] PRIMARY KEY ([ProgramId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230112174353_first')
BEGIN
    CREATE TABLE [studclass] (
        [StudentClId] int NOT NULL IDENTITY,
        [StudentId] int NOT NULL,
        [ProgramId] int NOT NULL,
        CONSTRAINT [PK_studclass] PRIMARY KEY ([StudentClId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230112174353_first')
BEGIN
    CREATE TABLE [studfees] (
        [StudFeesId] int NOT NULL IDENTITY,
        [StudentId] int NOT NULL,
        [FeesAmount] int NOT NULL,
        [StudFeesPaid] bit NOT NULL,
        CONSTRAINT [PK_studfees] PRIMARY KEY ([StudFeesId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230112174353_first')
BEGIN
    CREATE TABLE [studinfo] (
        [StudentId] int NOT NULL IDENTITY,
        [StudentFullName] nvarchar(max) NOT NULL,
        [StudEmail] nvarchar(max) NOT NULL,
        [StudPassword] nvarchar(max) NOT NULL,
        [RegDate] datetime2 NOT NULL,
        CONSTRAINT [PK_studinfo] PRIMARY KEY ([StudentId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230112174353_first')
BEGIN
    CREATE TABLE [studprogcount] (
        [StudentProgCountId] int NOT NULL IDENTITY,
        [ProgramId] int NOT NULL,
        [NoOfStudents] int NOT NULL,
        CONSTRAINT [PK_studprogcount] PRIMARY KEY ([StudentProgCountId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230112174353_first')
BEGIN
    CREATE TABLE [styleinfo] (
        [StyleId] int NOT NULL IDENTITY,
        [StyleName] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_styleinfo] PRIMARY KEY ([StyleId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230112174353_first')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230112174353_first', N'7.0.2');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230115234214_staffinsttable')
BEGIN
    ALTER TABLE [studinfo] ADD [Status] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230115234214_staffinsttable')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230115234214_staffinsttable', N'7.0.2');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230116002405_insttable')
BEGIN
    CREATE TABLE [instinfo] (
        [InstId] int NOT NULL IDENTITY,
        [InstFullName] nvarchar(max) NOT NULL,
        [StyleId] int NOT NULL,
        [InstType] nvarchar(max) NOT NULL,
        [InstContractFrom] datetime2 NOT NULL,
        [InstContractTo] datetime2 NOT NULL,
        [Status] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_instinfo] PRIMARY KEY ([InstId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230116002405_insttable')
BEGIN
    CREATE TABLE [staffinfo] (
        [StaffId] int NOT NULL IDENTITY,
        [StaffFullName] nvarchar(max) NOT NULL,
        [StaffRole] nvarchar(max) NOT NULL,
        [StaffContractFrom] datetime2 NOT NULL,
        [StaffContractTo] datetime2 NOT NULL,
        [Status] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_staffinfo] PRIMARY KEY ([StaffId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230116002405_insttable')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230116002405_insttable', N'7.0.2');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230116005416_progtable')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[programs]') AND [c].[name] = N'InstructorName');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [programs] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [programs] DROP COLUMN [InstructorName];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230116005416_progtable')
BEGIN
    ALTER TABLE [programs] ADD [InstId] int NOT NULL DEFAULT 0;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230116005416_progtable')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230116005416_progtable', N'7.0.2');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230116010718_progdaystable')
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[progdays]') AND [c].[name] = N'ProgramName');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [progdays] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [progdays] DROP COLUMN [ProgramName];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230116010718_progdaystable')
BEGIN
    ALTER TABLE [programs] ADD [Status] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230116010718_progdaystable')
BEGIN
    ALTER TABLE [progdays] ADD [ProgramId] int NOT NULL DEFAULT 0;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230116010718_progdaystable')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230116010718_progdaystable', N'7.0.2');
END;
GO

COMMIT;
GO

