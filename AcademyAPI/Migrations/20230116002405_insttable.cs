using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademyAPI.Migrations
{
    /// <inheritdoc />
    public partial class insttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "instinfo",
                columns: table => new
                {
                    InstId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InstFullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StyleId = table.Column<int>(type: "int", nullable: false),
                    InstType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InstContractFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InstContractTo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_instinfo", x => x.InstId);
                });

            migrationBuilder.CreateTable(
                name: "staffinfo",
                columns: table => new
                {
                    StaffId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StaffFullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StaffRole = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StaffContractFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StaffContractTo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_staffinfo", x => x.StaffId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "instinfo");

            migrationBuilder.DropTable(
                name: "staffinfo");
        }
    }
}
