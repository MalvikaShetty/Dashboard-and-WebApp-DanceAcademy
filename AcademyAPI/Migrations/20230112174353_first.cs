using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademyAPI.Migrations
{
    /// <inheritdoc />
    public partial class first : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "progdays",
                columns: table => new
                {
                    PDId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProgramName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Day = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndTime = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_progdays", x => x.PDId);
                });

            migrationBuilder.CreateTable(
                name: "programs",
                columns: table => new
                {
                    ProgramId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StyleId = table.Column<int>(type: "int", nullable: false),
                    ProgramName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InstructorName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Fees = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_programs", x => x.ProgramId);
                });

            migrationBuilder.CreateTable(
                name: "studclass",
                columns: table => new
                {
                    StudentClId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    ProgramId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_studclass", x => x.StudentClId);
                });

            migrationBuilder.CreateTable(
                name: "studfees",
                columns: table => new
                {
                    StudFeesId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    FeesAmount = table.Column<int>(type: "int", nullable: false),
                    StudFeesPaid = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_studfees", x => x.StudFeesId);
                });

            migrationBuilder.CreateTable(
                name: "studinfo",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentFullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StudEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StudPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RegDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_studinfo", x => x.StudentId);
                });

            migrationBuilder.CreateTable(
                name: "studprogcount",
                columns: table => new
                {
                    StudentProgCountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProgramId = table.Column<int>(type: "int", nullable: false),
                    NoOfStudents = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_studprogcount", x => x.StudentProgCountId);
                });

            migrationBuilder.CreateTable(
                name: "styleinfo",
                columns: table => new
                {
                    StyleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StyleName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_styleinfo", x => x.StyleId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "progdays");

            migrationBuilder.DropTable(
                name: "programs");

            migrationBuilder.DropTable(
                name: "studclass");

            migrationBuilder.DropTable(
                name: "studfees");

            migrationBuilder.DropTable(
                name: "studinfo");

            migrationBuilder.DropTable(
                name: "studprogcount");

            migrationBuilder.DropTable(
                name: "styleinfo");
        }
    }
}
