using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademyAPI.Migrations
{
    /// <inheritdoc />
    public partial class progdaystable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProgramName",
                table: "progdays");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "programs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ProgramId",
                table: "progdays",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "programs");

            migrationBuilder.DropColumn(
                name: "ProgramId",
                table: "progdays");

            migrationBuilder.AddColumn<string>(
                name: "ProgramName",
                table: "progdays",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
